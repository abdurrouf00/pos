"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";


const today = new Date().toISOString().split("T")[0];

export default function RecurringBillsForm() {
  const [formData, setFormData] = useState({
    vendorName: "",
    profileName: "",
    repeatEvery: "",
    startOn: today,
    endsOn: "",
    paymentTerms: "",
  });

  const [items, setItems] = useState([
    { name: "", qty: 1.0, rate: 0.0, tax: "0%", amount: 0.0 },
  ]);

  const [shipping, setShipping] = useState(0);
  const [adjustment, setAdjustment] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const total = subtotal + Number(shipping) + Number(adjustment);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] =
      field === "rate" || field === "qty" ? parseFloat(value) || 0 : value;
    updatedItems[index].amount =
      parseFloat(updatedItems[index].qty) * parseFloat(updatedItems[index].rate);
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", qty: 1.0, rate: 0.0, tax: "0%", amount: 0.0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems.length ? updatedItems : [{ name: "", qty: 1.0, rate: 0.0, tax: "0%", amount: 0.0 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.vendorName || !formData.profileName || !formData.startOn) {
      setErrorMsg("Please fill all required (*) fields.");
      return;
    }
    setErrorMsg("");

    const recurringBill = {
      ...formData,
      items,
      subtotal,
      shipping: Number(shipping),
      adjustment: Number(adjustment),
      total,
      uploadedFileName: uploadedFile?.name || null,
      status: "Pending",
    };

    const existingBills = JSON.parse(localStorage.getItem("recurringBills") || "[]");
    localStorage.setItem("recurringBills", JSON.stringify([...existingBills, recurringBill]));

    // Reset
    setFormData({
      vendorName: "",
      profileName: "",
      repeatEvery: "",
      startOn: today,
      endsOn: "",
      paymentTerms: "",
    });
    setItems([{ name: "", qty: 1.0, rate: 0.0, tax: "0%", amount: 0.0 }]);
    setShipping(0);
    setAdjustment(0);
    setUploadedFile(null);
  };

  return (
    <div className="bg-white p-6 rounded min-h-screen pb-40">
      <div className="w-full text-sm bg-white">
        <form onSubmit={handleSubmit} className="pt-5 w-full space-y-5">
          {errorMsg && <p className="text-red-500 font-medium pl-8">{errorMsg}</p>}

          {/* Vendor Name */}
          <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
            <HrInput
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              placeholder="Enter Vendor Name"
              label="Vendor Name"
            />

            {/* Profile Name */}
            <HrInput
              name="profileName"
              value={formData.profileName}
              onChange={handleChange}
              label="Profile Name"
            />

            {/* Repeat Every */}
            <HrSelect
              name="repeatEvery"
              value={formData.repeatEvery}
              onChange={handleChange}
              label="Repeat Every"
              options={[
                { label: "Daily", value: "daily" },
                { label: "Weekly", value: "weekly" },
                { label: "Monthly", value: "monthly" },
                { label: "Yearly", value: "yearly" },
              ]}
            />

            {/* Start On */}
            <HrInput
              name="startOn"
              type="date"
              value={formData.startOn}
              onChange={handleChange}
              label="Start On"
            />

            {/* Ends On */}
            <HrInput
              name="endsOn"
              type="date"
              value={formData.endsOn}
              onChange={handleChange}
              label="Ends On"
            />

            {/* Payment Terms */}
            <HrSelect
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleChange}
              label="Payment Terms"
              placeholder="Select Terms"
              options={[
                { value: "Due end of the month", label: "Due end of the month" },
                { value: "Due on Receipt", label: "Due on Receipt" },
                { value: "Net 15", label: "Net 15" },
                { value: "Net 30", label: "Net 30" },
              ]}
            />
          </div>

          {/* Item Table */}
          <div className="mt-6  border rounded overflow-x-auto p-6">
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
                        type="button"
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
              type="button"
              onClick={addItem}
              className="mt-3 px-3 py-1 bg-blue-500 text-white rounded"
            >
              + Add Item
            </button>
          </div>

          {/* Totals */}
          <div className="mt-6  ">

            <div className="bg-gray-100 rounded-xl  p-4">
              <div className="flex justify-between py-1">
                <span>Sub Total</span>
                <span>{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-sm">Shipping Charges</span>
                <HrInput
                  type="number"
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                  className="w-44 text-right bg-white"
                />
              </div>
              <div className="flex gap-6 py-1">
                <span className="text-sm">Adjustment</span>
                <HrInput
                  type="number"
                  value={adjustment}
                  onChange={(e) => setAdjustment(e.target.value)}
                  className="w-44 text-right bg-white"
                />
              </div>
              <div className="flex justify-between py-2 font-bold text-lg border-t mt-2">
                <span>Total (BDT)</span>
                <span>{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="">
            <textarea
              placeholder="Vendor Notes"
              className="w-full h-24 border rounded p-2"
            />
          </div>

          {/* Terms & File Upload */}
          <div className="w-full pl-6 p-10 gap-10 mt-6 bg-gray-100 pt-6 px-6">
            <p className="p-2">Notes</p>
            <textarea
              placeholder="Terms & Conditions"
              className="w-[60%] h-14 border rounded-2xl p-2 bg-white"
            />

          </div>

          {/* Submit */}
          <div className="flex fixed bottom-0 w-[82%] items-center shadow-lg h-14 gap-8 bg-gray-200 rounded sm:px-4 md:px-6 z-50">
            <Button type="submit">Save Recurring Bill</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
