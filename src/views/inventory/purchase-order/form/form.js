"use client";

import React, { useState, useEffect } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import moment from "moment";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCreatePurchaseOrderMutation } from "../store";
import { useGetAllProductsQuery, useGetProductUnitsQuery } from "@/views/products/store";
import { useGetVendorsQuery } from "@/views/vendors/store";
import { useGetAllPaymentTermsQuery } from "@/views/inventory/payment-terms/store";
import { useGetAllCurrencyQuery } from "@/views/inventory/currencies/store";

const DISCOUNT_TYPE_OPTIONS = [
  { value: 0, label: "Fixed" },
  { value: 1, label: "Percentage" },
];

const ITEM_DISCOUNT_TYPE_OPTIONS = [
  { value: "fixed", label: "Fixed" },
  { value: "percentage", label: "Percentage" },
];

const initialFormData = {
  po_date: moment().format("YYYY-MM-DD"),
  supplier_id: "",
  reference_no: "",
  delivery_date: "",
  payment_terms_id: "",
  currency_id: "",
  exchange_rate: 1,
  discount_type: 0,
  discount_value: 0,
  shipping_charge: 0,
  notes: "",
  terms_conditions: "",
};

const createEmptyItem = () => ({
  product_id: "",
  ordered_qty: 1,
  unit_id: "",
  unit_price: 0,
  tax_percent: 0,
  discount_type: "fixed",
  discount_value: 0,
  expected_date: "",
  notes: "",
});

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

export default function PurchaseOrderForm({ requisitionId = null }) {
  const [formData, setFormData] = useState(initialFormData);
  const [items, setItems] = useState([]);
  const [productSelectValue, setProductSelectValue] = useState("");

  const [createPurchaseOrder, { isLoading: isSubmitting }] = useCreatePurchaseOrderMutation();
  const { data: productsData } = useGetAllProductsQuery();
  const { data: vendorsData } = useGetVendorsQuery();
  const { data: paymentTermsData } = useGetAllPaymentTermsQuery();
  const { data: currenciesData } = useGetAllCurrencyQuery({ per_page: 100 });

  const products = productsData?.data?.data ?? productsData?.data ?? [];
  const vendors = vendorsData?.data?.data ?? vendorsData?.data ?? [];
  const paymentTerms = paymentTermsData?.data?.data ?? paymentTermsData?.data ?? [];
  const currencies = currenciesData?.data?.data ?? currenciesData?.data ?? [];

  const vendorOptions = vendors?.map((v) => ({
    label: v.display_name || v.company_name || v.id,
    value: v.id,
  })) ?? [];
  const paymentTermOptions = mapOptions(paymentTerms, "name", "id");
  const currencyOptions = mapOptions(currencies, "name", "id");
  const allProductOptions = products?.map((p) => ({
    label: p.product_name || p.product_code || "Product",
    value: p.id,
  })) ?? [];
  const addedProductIds = items.map((i) => i.product_id).filter(Boolean);
  const productOptionsToAdd = allProductOptions.filter((opt) => !addedProductIds.includes(opt.value));

  const getProductName = (productId) =>
    products.find((p) => p.id === productId)?.product_name ||
    products.find((p) => p.id === productId)?.product_code ||
    "—";

  const totalAmount = items.reduce(
    (sum, item) => sum + (Number(item.ordered_qty) || 0) * (Number(item.unit_price) || 0),
    0
  );
  const totalProducts = items.filter((i) => i.product_id).length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numFields = [
      "exchange_rate",
      "discount_value",
      "shipping_charge",
    ];
    const parsed = numFields.includes(name) ? (parseFloat(value) || 0) : value;
    const intFields = ["discount_type"];
    const final = intFields.includes(name) ? parseInt(value, 10) : parsed;
    setFormData((prev) => ({ ...prev, [name]: final }));
  };

  const handleItemChange = (idx, field, value) => {
    const updatedItems = [...items];
    const item = updatedItems[idx];
    const numFields = ["ordered_qty", "unit_price", "tax_percent", "discount_value"];
    const parsed = numFields.includes(field)
      ? (field === "ordered_qty" || field === "unit_price" ? parseFloat(value) || 0 : parseFloat(value) || 0)
      : value;
    updatedItems[idx] = { ...item, [field]: parsed };
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
        ordered_qty: 1,
        unit_price: unitPrice,
      },
    ]);
    setProductSelectValue("");
  };

  const removeItemRow = (idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const buildPayload = () => {
    const payload = {
      po_date: formData.po_date || moment().format("YYYY-MM-DD"),
      supplier_id: formData.supplier_id || null,
      reference_no: formData.reference_no || null,
      delivery_date: formData.delivery_date || null,
      payment_terms_id: formData.payment_terms_id || null,
      currency_id: formData.currency_id || null,
      exchange_rate: Number(formData.exchange_rate) || 1,
      discount_type: Number(formData.discount_type) ?? 0,
      discount_value: Number(formData.discount_value) || 0,
      shipping_charge: Number(formData.shipping_charge) || 0,
      notes: formData.notes || null,
      terms_conditions: formData.terms_conditions || null,
      items: items
        .filter((row) => row.product_id && (Number(row.ordered_qty) > 0 || Number(row.unit_price) > 0))
        .map((row) => ({
          product_id: row.product_id,
          ordered_qty: Number(row.ordered_qty) || 0,
          unit_id: row.unit_id || null,
          unit_price: Number(row.unit_price) || 0,
          tax_percent: Number(row.tax_percent) || 0,
          discount_type: row.discount_type === "percentage" ? "percentage" : "fixed",
          discount_value: Number(row.discount_value) || 0,
          expected_date: row.expected_date || null,
          notes: row.notes || null,
        })),
    };
    if (requisitionId) {
      payload.requisition_ids = [requisitionId];
    }
    return payload;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const payload = buildPayload();
    if (!payload.supplier_id) {
      toast.error("Please select Supplier (Vendor).");
      return;
    }
    if (!payload.items.length) {
      toast.error("Please add at least one item with product and quantity.");
      return;
    }
    try {
      await createPurchaseOrder(payload).unwrap();
      toast.success("Purchase order created successfully.");
      setFormData({
        ...initialFormData,
        po_date: moment().format("YYYY-MM-DD"),
      });
      setItems([]);
      setProductSelectValue("");
    } catch (err) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "Failed to create purchase order.";
      toast.error(msg);
    }
  };

  return (
    <div className="bg-[#fbfcff] min-h-screen p-4 md:p-8 pb-32">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 transition-all hover:shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Create Purchase Order
          </h1>
          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase tracking-wider">
            New Purchase Order
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <HrInput
            label="PO Date"
            name="po_date"
            type="date"
            value={formData.po_date}
            onChange={handleInputChange}
          />
          <HrSelect
            label="Supplier (Vendor)"
            name="supplier_id"
            value={formData.supplier_id}
            onChange={handleInputChange}
            options={vendorOptions}
            placeholder="Select supplier"
          />
          <HrInput
            label="Reference No"
            name="reference_no"
            value={formData.reference_no}
            onChange={handleInputChange}
            placeholder="e.g. PO-REF-2026-001"
          />
          <HrInput
            label="Delivery Date"
            name="delivery_date"
            type="date"
            value={formData.delivery_date}
            onChange={handleInputChange}
          />
          <HrSelect
            label="Payment Terms"
            name="payment_terms_id"
            value={formData.payment_terms_id}
            onChange={handleInputChange}
            options={paymentTermOptions}
            placeholder="Select payment terms"
          />
          <HrSelect
            label="Currency"
            name="currency_id"
            value={formData.currency_id}
            onChange={handleInputChange}
            options={currencyOptions}
            placeholder="Select currency"
          />
          <HrInput
            label="Exchange Rate"
            name="exchange_rate"
            type="number"
            min={0}
            step={0.01}
            value={formData.exchange_rate}
            onChange={handleInputChange}
          />
          <HrSelect
            label="Discount Type"
            name="discount_type"
            value={formData.discount_type}
            onChange={handleInputChange}
            options={DISCOUNT_TYPE_OPTIONS}
          />
          <HrInput
            label="Discount Value"
            name="discount_value"
            type="number"
            min={0}
            value={formData.discount_value}
            onChange={handleInputChange}
          />
          <HrInput
            label="Shipping Charge"
            name="shipping_charge"
            type="number"
            min={0}
            value={formData.shipping_charge}
            onChange={handleInputChange}
          />
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
            placeholder="Select product to add…"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-2 py-3 text-[10px] font-black border text-center w-12">#</th>
                <th className="px-3 py-3 text-[10px] font-black border min-w-[160px]">Product</th>
                <th className="px-3 py-3 text-[10px] font-black border text-center w-20">Qty</th>
                <th className="px-3 py-3 text-[10px] font-black border min-w-[100px]">Unit</th>
                <th className="px-3 py-3 text-[10px] font-black border text-right w-24">Unit Price</th>
                <th className="px-3 py-3 text-[10px] font-black border text-center w-16">Tax %</th>
                <th className="px-3 py-3 text-[10px] font-black border min-w-[90px]">Disc Type</th>
                <th className="px-3 py-3 text-[10px] font-black border text-center w-20">Disc Val</th>
                <th className="px-3 py-3 text-[10px] font-black border min-w-[100px]">Expected Date</th>
                <th className="px-3 py-3 text-[10px] font-black border min-w-[100px]">Notes</th>
                <th className="px-2 py-3 text-[10px] font-black border text-center w-14">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={11} className="p-4 text-center text-gray-500 text-sm">
                    Select a product above to add items.
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={index} className="border">
                    <td className="p-2 border text-sm text-center">
                      {(index + 1).toString().padStart(2, "0")}
                    </td>
                    <td className="p-2 border text-sm min-w-[160px]">
                      {getProductName(item.product_id)}
                    </td>
                    <td className="p-2 border">
                      <HrInput
                        type="number"
                        min={0}
                        step={0.01}
                        value={item.ordered_qty}
                        onChange={(e) => handleItemChange(index, "ordered_qty", e.target.value)}
                      />
                    </td>
                    <td className="p-2 border min-w-[100px]">
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
                        type="number"
                        min={0}
                        step={0.01}
                        value={item.tax_percent}
                        onChange={(e) => handleItemChange(index, "tax_percent", e.target.value)}
                      />
                    </td>
                    <td className="p-2 border min-w-[90px]">
                      <HrSelect
                        value={item.discount_type}
                        onChange={(e) => handleItemChange(index, "discount_type", e.target.value)}
                        options={ITEM_DISCOUNT_TYPE_OPTIONS}
                      />
                    </td>
                    <td className="p-2 border">
                      <HrInput
                        type="number"
                        min={0}
                        value={item.discount_value}
                        onChange={(e) => handleItemChange(index, "discount_value", e.target.value)}
                      />
                    </td>
                    <td className="p-2 border">
                      <HrInput
                        type="date"
                        value={item.expected_date}
                        onChange={(e) => handleItemChange(index, "expected_date", e.target.value)}
                        placeholder="YYYY-MM-DD"
                      />
                    </td>
                    <td className="p-2 border">
                      <HrInput
                        value={item.notes}
                        onChange={(e) => handleItemChange(index, "notes", e.target.value)}
                        placeholder="Item notes"
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
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="e.g. Purchase order for office supplies"
          className="min-h-[80px] resize-y"
        />
        <HrInput
          label="Terms & Conditions"
          name="terms_conditions"
          type="textarea"
          value={formData.terms_conditions}
          onChange={handleInputChange}
          placeholder="e.g. Payment within 30 days of delivery"
          className="min-h-[80px] resize-y mt-4"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-wrap gap-6 md:gap-10">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total products</span>
            <span className="text-xl font-bold text-gray-900">{totalProducts}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total amount</span>
            <span className="text-xl font-bold text-gray-900">
              {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full justify-end">
        <Button variant="outline" asChild>
          <Link href="/dashboard/purchase-order">Cancel</Link>
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save Purchase Order"}
        </Button>
      </div>
    </div>
  );
}
