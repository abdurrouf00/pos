"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HrInput from "@/components/common/HrInput";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import moment from "moment";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCreateRequisitionMutation, useUpdateRequisitionMutation, useGetRequisitionByIdQuery } from "../store";
import { useGetAllProductsQuery, useGetProductUnitsQuery } from "@/views/products/store";
import { getAllEmployee } from "@/views/employee/store";
import { getAllDepartment } from "@/views/department/store";

const PRIORITY_OPTIONS = [
  { value: 0, label: "Low" },
  { value: 1, label: "Normal" },
  { value: 2, label: "High" },
  { value: 3, label: "Urgent" },
];

const STATUS_OPTIONS = [
  { value: 1, label: "Draft" },
  { value: 2, label: "Submitted" },
  { value: 3, label: "Approved" },
  { value: 4, label: "Rejected" },
  { value: 5, label: "Converted to PO" },
  { value: 6, label: "Cancelled" },
];

const initialFormData = {
  requisition_date: moment().format("YYYY-MM-DD"),
  requested_by: "",
  department_id: "",
  requested_for: "",
  priority: 2,
  status: 1,
  expected_date: "",
  purpose: "",
  notes: "",
};

const createEmptyItem = () => ({
  product_id: "",
  requested_qty: 0,
  unit_id: "",
  unit_price: 0,
  purpose: "",
  notes: "",
});

const initialItems = [];

function ProductUnitSelect({ productId, value, onChange, placeholder = "Unit" }) {
  const { data: unitsData } = useGetProductUnitsQuery(productId, { skip: !productId });
  const units = Array.isArray(unitsData?.data) ? unitsData.data : [];
  const options = mapOptions(units, "name", "id");
  return (
    <HrSelect
      value={value}
      onChange={onChange}
      options={options}
      placeholder={productId ? placeholder : "Select product first"}
    />
  );
}

export default function RequisitionForm({ editId }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [items, setItems] = useState(initialItems);
  const [productSelectValue, setProductSelectValue] = useState("");
  const [initialized, setInitialized] = useState(false);

  const [createRequisition, { isLoading: isCreateLoading }] = useCreateRequisitionMutation();
  const [updateRequisition, { isLoading: isUpdateLoading }] = useUpdateRequisitionMutation();
  const { data: requisitionResponse, isLoading: isLoadingRequisition, isError: isRequisitionError } = useGetRequisitionByIdQuery(editId, { skip: !editId });
  const { data: productsData } = useGetAllProductsQuery();
  const { employeeData = [] } = useSelector((state) => state.employee);
  const { departmentData = [] } = useSelector((state) => state.department);

  const requisition = requisitionResponse?.data ?? requisitionResponse;
  const isSubmitting = isCreateLoading || isUpdateLoading;
  const isLoadingEdit = !!editId && isLoadingRequisition;
  const isEditNotFound = !!editId && !isLoadingRequisition && (isRequisitionError || !requisition);

  useEffect(() => {
    if (!editId || !requisition || initialized) return;
    setFormData({
      requisition_date: requisition.requisition_date
        ? moment(requisition.requisition_date).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
      requested_by: requisition.requested_by ?? "",
      department_id: requisition.department_id ?? "",
      requested_for: requisition.requested_for ?? "",
      priority: requisition.priority ?? 2,
      status: requisition.status ?? 1,
      expected_date: requisition.expected_date
        ? moment(requisition.expected_date).format("YYYY-MM-DD")
        : "",
      purpose: requisition.purpose ?? "",
      notes: requisition.notes ?? "",
    });
    const mappedItems = (requisition.items ?? []).map((i) => ({
      product_id: i.product_id ?? "",
      requested_qty: Number(i.requested_qty) || 0,
      unit_id: i.unit_id ?? "",
      unit_price: Number(i.unit_price) || 0,
      purpose: i.purpose ?? "",
      notes: i.notes ?? "",
    }));
    setItems(mappedItems);
    setInitialized(true);
  }, [editId, requisition, initialized]);

  useEffect(() => {
    dispatch(getAllDepartment({ page: 1, per_page: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    if (formData.department_id) {
      dispatch(
        getAllEmployee({
          department_id: formData.department_id,
          page: 1,
          per_page: 1000,
        })
      );
    }
  }, [formData.department_id, dispatch]);

  const products = productsData?.data?.data ?? [];
  const allProductOptions =
    products?.map((p) => ({
      label: p.product_name || p.product_code || "Product",
      value: p.id,
    })) ?? [];
  const addedProductIds = items.map((i) => i.product_id).filter(Boolean);
  const productOptionsToAdd = allProductOptions.filter(
    (opt) => !addedProductIds.includes(opt.value)
  );
  const employeeOptions = mapOptions(employeeData, "name", "id");
  const departmentOptions = mapOptions(departmentData, "name", "id");

  const getProductName = (productId) =>
    products.find((p) => p.id === productId)?.product_name ||
    products.find((p) => p.id === productId)?.product_code ||
    "—";

  const totalAmount = items.reduce(
    (sum, item) => sum + (Number(item.requested_qty) || 0) * (Number(item.unit_price) || 0),
    0
  );
  const totalQty = items.reduce((sum, item) => sum + (Number(item.requested_qty) || 0), 0);
  const totalProducts = items.filter((i) => i.product_id).length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsed =
      name === "priority" || name === "status" ? parseInt(value, 10) : value;
    setFormData((prev) => {
      const next = { ...prev, [name]: parsed };
      if (name === "department_id") {
        next.requested_by = "";
      }
      return next;
    });
  };

  const handleItemChange = (idx, field, value) => {
    const updatedItems = [...items];
    const parsed =
      field === "requested_qty" || field === "unit_price"
        ? parseFloat(value) || 0
        : value;
    updatedItems[idx] = { ...updatedItems[idx], [field]: parsed };
    setItems(updatedItems);
  };

  const addItemByProduct = (e) => {
    const productId = e?.target?.value;
    if (!productId) return;
    const product = products.find((p) => p.id === productId);
    const unitPrice = Number(product?.pricing?.unit_price) || 0;
    setItems((prev) => [
      ...prev,
      {
        ...createEmptyItem(),
        product_id: productId,
        requested_qty: 1,
        unit_price: unitPrice,
      },
    ]);
    setProductSelectValue("");
  };

  const removeItemRow = (idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const buildPayload = () => {
    return {
      requisition_date: formData.requisition_date,
      requested_by: formData.requested_by || null,
      department_id: formData.department_id || null,
      requested_for: formData.requested_for || "",
      priority: formData.priority,
      status: formData.status,
      expected_date: formData.expected_date || null,
      purpose: formData.purpose || "",
      notes: formData.notes || "",
      items: items
        .filter((row) => row.product_id && (row.requested_qty > 0 || row.unit_price > 0))
        .map((row) => ({
          product_id: row.product_id,
          requested_qty: Number(row.requested_qty) || 0,
          unit_id: row.unit_id || null,
          unit_price: Number(row.unit_price) || 0,
          purpose: row.purpose || null,
          notes: row.notes || null,
        })),
    };
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const payload = buildPayload();
    if (!payload.requested_by) {
      toast.error("Please select Requested By (Employee).");
      return;
    }
    if (!payload.department_id) {
      toast.error("Please select Department.");
      return;
    }
    if (!payload.items.length) {
      toast.error("Please add at least one item with product and quantity.");
      return;
    }
    try {
      if (editId) {
        await updateRequisition({ id: editId, data: payload }).unwrap();
        toast.success("Requisition updated successfully.");
      } else {
        await createRequisition(payload).unwrap();
        toast.success("Requisition saved successfully.");
        setFormData({
          ...initialFormData,
          requisition_date: moment().format("YYYY-MM-DD"),
        });
        setItems([]);
        setProductSelectValue("");
      }
    } catch (err) {
      const msg = err?.data?.message || err?.message || (editId ? "Failed to update requisition." : "Failed to save requisition.");
      toast.error(msg);
    }
  };

  if (isLoadingEdit) {
    return (
      <div className="bg-[#fbfcff] min-h-screen p-4 md:p-8 flex items-center justify-center">
        <p className="text-gray-500">Loading requisition…</p>
      </div>
    );
  }

  if (isEditNotFound) {
    return (
      <div className="bg-[#fbfcff] min-h-screen p-4 md:p-8">
        <p className="text-red-600">Requisition not found.</p>
        <Button variant="outline" asChild className="mt-4">
          <Link href="/dashboard/requisition">Back to list</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#fbfcff] min-h-screen p-4 md:p-8 pb-32">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 transition-all hover:shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            {editId ? "Edit Requisition" : "Create Requisition"}
          </h1>
          {!editId && (
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase tracking-wider">
              New
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <HrInput
            label="Requisition Date"
            name="requisition_date"
            type="date"
            value={formData.requisition_date}
            onChange={handleInputChange}
          />
          <HrSelect
            label="Department"
            name="department_id"
            value={formData.department_id}
            onChange={handleInputChange}
            options={departmentOptions}
            placeholder="Select department"
          />
          <HrSelect
            label="Requested By"
            name="requested_by"
            value={formData.requested_by}
            onChange={handleInputChange}
            options={employeeOptions}
            placeholder={formData.department_id ? "Select employee" : "Select department first"}
          />
          <HrInput
            label="Requested For"
            name="requested_for"
            value={formData.requested_for}
            onChange={handleInputChange}
            placeholder="e.g. Office Supplies for Q1"
          />
          <HrSelect
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            options={PRIORITY_OPTIONS}
          />
          <HrSelect
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            options={STATUS_OPTIONS}
            placeholder="Select status"
          />
          <HrInput
            label="Expected Date"
            name="expected_date"
            type="date"
            value={formData.expected_date}
            onChange={handleInputChange}
            placeholder="YYYY-MM-DD"
          />
          <div className="md:col-span-2">
            <HrInput
              label="Purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              placeholder="e.g. Monthly office supplies restocking"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Items</h2>
        <div className="mb-4 max-w-md">
          <HrSelect
            label="Add product"
            name="product_to_add"
            value={productSelectValue}
            onChange={addItemByProduct}
            options={productOptionsToAdd}
            placeholder="Search and select product to add…"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-2 py-3 text-[10px] font-black border text-center w-12">SL</th>
                <th className="px-3 py-3 text-[10px] font-black border min-w-[200px]">Product</th>
                <th className="px-3 py-3 text-[10px] font-black border text-center w-28">Qty</th>
                <th className="px-3 py-3 text-[10px] font-black border min-w-[120px]">Unit</th>
                <th className="px-3 py-3 text-[10px] font-black border text-right w-32">Unit Price</th>
                <th className="px-3 py-3 text-[10px] font-black border min-w-[140px]">Purpose</th>
                <th className="px-2 py-3 text-[10px] font-black border text-center w-16">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500 text-sm">
                    Select a product above to add items.
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={index} className="border">
                    <td className="p-2 border text-sm text-center">
                      {(index + 1).toString().padStart(2, "0")}
                    </td>
                    <td className="p-2 border text-sm min-w-[200px]">
                      {getProductName(item.product_id)}
                    </td>
                    <td className="p-2 border">
                      <HrInput
                        type="number"
                        min={0}
                        value={item.requested_qty}
                        onChange={(e) => handleItemChange(index, "requested_qty", e.target.value)}
                      />
                    </td>
                    <td className="p-2 border min-w-[120px]">
                      <ProductUnitSelect
                        productId={item.product_id}
                        value={item.unit_id}
                        onChange={(e) => handleItemChange(index, "unit_id", e.target.value)}
                        placeholder="Unit"
                      />
                    </td>
                    <td className="p-2 border">
                      <HrInput
                        type="number"
                        min={0}
                        step={0.01}
                        value={item.unit_price}
                        onChange={(e) => handleItemChange(index, "unit_price", e.target.value)}
                      />
                    </td>
                    <td className="p-2 border">
                      <HrInput
                        value={item.purpose}
                        onChange={(e) => handleItemChange(index, "purpose", e.target.value)}
                        placeholder="e.g. For marketing team"
                      />
                    </td>
                    <td className="p-2 border text-center">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-600 h-8 w-8"
                        onClick={() => removeItemRow(index)}
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <HrInput
          label="Notes"
          name="notes"
          type="textarea"
          rows={6}
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="e.g. Urgent - needed for new project"
          className="min-h-[140px] resize-y"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-wrap gap-6 md:gap-10">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total products</span>
            <span className="text-xl font-bold text-gray-900">{totalProducts}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total quantity</span>
            <span className="text-xl font-bold text-gray-900">{totalQty.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total amount</span>
            <span className="text-xl font-bold text-gray-900">
              {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full justify-end mr-4">
        <Button variant="outline" asChild>
          <Link href={editId ? `/dashboard/requisition/${editId}` : "/dashboard/requisition"}>
            Cancel
          </Link>
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : editId ? "Update Requisition" : "Save Requisition"}
        </Button>
      </div>
    </div>
  );
}
