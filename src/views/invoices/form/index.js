"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";


const today = new Date().toISOString().split("T")[0];

export default function InvoiceForm() {
  const [formData, setFormData] = useState({
    customerName: "",
    invoiceNo: "",
    invoiceDate: today,
    dueDate: "",
    terms: "",
    salesperson: "",
    subject: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [items, setItems] = useState([
    { name: "", qty: 1.0, rate: 0.0, tax: "0%", amount: 0.0 },
  ]);
  const [shipping, setShipping] = useState(0);
  const [adjustment, setAdjustment] = useState(0);

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // subtotal & total
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const total = subtotal + Number(shipping) + Number(adjustment);

  // item change
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] =
      field === "rate" || field === "qty" ? parseFloat(value) || 0 : value;

    updatedItems[index].amount =
      parseFloat(updatedItems[index].qty) * parseFloat(updatedItems[index].rate);

    setItems(updatedItems);
  };

  // add/remove item
  const addItem = () => {
    setItems([...items, { name: "", qty: 1.0, rate: 0.0, tax: "0%", amount: 0.0 }]);
  };
  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(
      updatedItems.length
        ? updatedItems
        : [{ name: "", qty: 1.0, rate: 0.0, tax: "0%", amount: 0.0 }]
    );
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.customerName || !formData.invoiceNo || !formData.invoiceDate) {
      setErrorMsg("Please fill all required (*) fields.");
      return;
    }

    setErrorMsg("");

    const invoiceToSave = {
      ...formData,
      items,
      shipping: Number(shipping),
      adjustment: Number(adjustment),
      subtotal,
      total,
    };

    const existingInvoices = JSON.parse(localStorage.getItem("submittedInvoices") || "[]");
    const updatedInvoices = [...existingInvoices, invoiceToSave];
    localStorage.setItem("submittedInvoices", JSON.stringify(updatedInvoices));


    // reset
    setFormData({
      customerName: "",
      invoiceNo: "",
      invoiceDate: today,
      dueDate: "",
      terms: "",
      salesperson: "",
      subject: "",
    });
    setItems([{ name: "", qty: 1.0, rate: 0.0, tax: "0%", amount: 0.0 }]);
    setShipping(0);
    setAdjustment(0);
  };

  return (
    <div className=" bg-white p-6 rounded min-h-screen space-y-4">
      {/* Form Section */}
      <div className="w-full text-sm bg-white ">
        <form onSubmit={handleSubmit} className="pt-5 w-full  space-y-5">
          {errorMsg && <p className="text-red-500 font-medium">{errorMsg}</p>}

          {/* Customer Name */}
          <div className="grid md:grid-cols-4 grid-cols-2 gap-2">

            <HrInput
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter Name"
              label='Customer Name'
            />

            {/* Invoice# */}
            <HrInput
              name="invoiceNo"
              value={formData.invoiceNo}
              onChange={handleChange}
              placeholder="INV-001"
              label='Invoice'
            />
            {/* Invoice# */}
            <HrInput
              name="orderNo"
              value={formData.orderNo}
              onChange={handleChange}
              placeholder="001"
              label='Order Number'
            />
            {/* Invoice Date */}
            <HrInput
              name="invoiceDate"
              type="date"
              value={formData.invoiceDate}
              onChange={handleChange}
              label='Invoice Date'
            />
            {/* Due Date */}
            <HrInput
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              label='Due Date'
            />
            {/* Terms */}
            <HrSelect
              name="terms"
              value={formData.terms}
              onChange={handleChange}
              placeholder="Select Terms"
              options={[
                { value: "Due end of the month", label: "Due end of the month" },
                { value: "Due on Receipt", label: "Due on Receipt" },
                { value: "Net 15", label: "Net 15" },
                { value: "Net 30", label: "Net 30" },
                { value: "Net 45", label: "Net 45" },
                { value: "Net 60", label: "Net 60" },
                { value: "Due end of the next month", label: "Due end of the next month" },
                { value: "Custom", label: "Custom" },
              ]}
              label='Terms'
            />
            {/* Salesperson */}
            <HrInput
              name="salesperson"
              value={formData.salesperson}
              onChange={handleChange}
              placeholder="Sales Person Name"
              label='Sales Person'
            />
            {/* Subject */}
            <HrInput
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              label='Subject'
            />
          </div>
          {/* Submit Button */}
          <div className="flex fixed bottom-0 w-[82%] items-center shadow-lg h-28 md:h-12 gap-8 bg-gray-200 rounded sm:px-4 md:px-6 z-50">
            <Button type="submit">Save Invoice</Button>
          </div>
        </form>
      </div>

      {/* Item Table */}
      <div className=" rounded-xl border overflow-x-auto p-6">
        <h2 className="text-lg font-semibold mb-3">Item Table</h2>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Item/Details</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Rate</th>
              <th className="p-2 border">Tax</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-1">
                  <HrInput
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(idx, "name", e.target.value)}
                    placeholder="Item Name"
                    className="w-full p-1"
                  />
                </td>
                <td className="border p-1">
                  <HrInput
                    type="number"
                    step="0.01"
                    min="1"
                    value={item.qty}
                    onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                    className="w-full p-1 text-right"
                  />
                </td>
                <td className="border p-1">
                  <HrInput
                    type="number"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => handleItemChange(idx, "rate", e.target.value)}
                    className="w-full p-1 text-right"
                  />
                </td>
                <td className="border p-1">
                  <HrSelect
                    value={item.tax}
                    onChange={(e) => handleItemChange(idx, "tax", e.target.value)}
                    className="w-full p-1"
                    options={[
                      { value: "0%", label: "0%" },
                      { value: "5%", label: "5%" },
                      { value: "10%", label: "10%" },
                      { value: "15%", label: "15%" },
                    ]}
                  />
                </td>
                <td className="border p-1 text-right">{item.amount.toFixed(2)}</td>
                <td className="border p-1 text-center">
                  <button
                    onClick={() => removeItem(idx)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addItem}
          className="mt-3 px-3 py-1 bg-blue-500 text-white rounded"
        >
          + Add Item
        </button>
      </div>

      {/* Totals */}
      <div className="">

        <div className="mt-6 bg-white rounded-2xl border  p-4 ">
          <div className="flex justify-between py-1">
            <span>Sub Total</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 ">
            <span className="text-sm">Shipping Charges</span>
            <HrInput
              type="number"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
              className="w-44 text-right"
            />
          </div>
          <div className="flex  gap-5 py-1">
            <span className="text-sm">Adjustment</span>
            <HrInput
              type="number"
              value={adjustment}
              onChange={(e) => setAdjustment(e.target.value)}
              className="w-44 text-right"
            />
          </div>
          <div className="flex justify-between py-2 font-bold text-lg border-t mt-2">
            <span>Total (BDT)</span>
            <span>{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="grid grid-cols-2  gap-4">
        <textarea placeholder="Customer Notes" className="w-full h-24 border rounded p-2" />

        <textarea
          placeholder="Terms & Conditions"
          className="w-full h-24 border rounded  p-2"
        />
      </div>
    </div>
  );
}
