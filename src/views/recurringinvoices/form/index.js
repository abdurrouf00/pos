"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";

const today = new Date().toISOString().split("T")[0];

export default function SalesReceiptForm() {
  // Form State
  const [formData, setFormData] = useState({
    customerName: "",
    profileName: "",
    receiptDate: today,
    salesReceiptNo: "",
    orderNo: "",
    salesperson: "",
    subject: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    paymentMode: "",
    depositTo: "",
    reference: "",
  });

  const [recurring, setRecurring] = useState({
    frequency: "",
    startDate: today,
    endDate: "",
    paymentTerms: "",
  });

  const [items, setItems] = useState([
    { name: "", qty: 1, rate: 0, tax: "0%", amount: 0 },
  ]);

  const [shipping, setShipping] = useState(0);
  const [adjustment, setAdjustment] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleRecurringChange = (e) => {
    const { name, value } = e.target;
    setRecurring({ ...recurring, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] =
      field === "rate" || field === "qty" ? parseFloat(value) || 0 : value;
    updatedItems[index].amount =
      parseFloat(updatedItems[index].qty) * parseFloat(updatedItems[index].rate);
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", qty: 1, rate: 0, tax: "0%", amount: 0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(
      updatedItems.length
        ? updatedItems
        : [{ name: "", qty: 1, rate: 0, tax: "0%", amount: 0 }]
    );
  };

  // Totals
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const total = subtotal + Number(shipping) + Number(adjustment);

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.customerName || !formData.profileName) {
      setErrorMsg("Please fill all required (*) fields.");
      return;
    }

    setErrorMsg("");

    const receiptToSave = {
      ...formData,
      items,
      subtotal,
      shipping: Number(shipping),
      adjustment: Number(adjustment),
      total,
      paymentDetails,
      recurring,
    };

    const existingReceipts = JSON.parse(
      localStorage.getItem("submittedReceipts") || "[]"
    );
    const updatedReceipts = [...existingReceipts, receiptToSave];
    localStorage.setItem("submittedReceipts", JSON.stringify(updatedReceipts));


    // Reset form
    setFormData({
      customerName: "",
      profileName: "",
      receiptDate: today,
      salesReceiptNo: "",
      orderNo: "",
      salesperson: "",
      subject: "",
    });
    setItems([{ name: "", qty: 1, rate: 0, tax: "0%", amount: 0 }]);
    setPaymentDetails({ paymentMode: "", depositTo: "", reference: "" });
    setRecurring({ frequency: today, startDate: today, endDate: today, paymentTerms: "" });
    setShipping(0);
    setAdjustment(0);
  };

  return (
    <div className=" pb-40 bg-white p-6 rounded min-h-screen space-y-4">
      <form onSubmit={handleSubmit} className="pt-5 w-full space-y-5">
        {errorMsg && (
          <p className="text-red-500 font-medium pl-8">{errorMsg}</p>
        )}

        {/* Top Form Fields */}
        <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
          <HrInput
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Enter Name"
            label='Customer Name'
          />
          <HrInput
            type="text"
            name="profileName"
            value={formData.profileName}
            onChange={handleChange}
            label='Profile Name'
          />
          <HrInput
            type="text"
            name="orderNo"
            value={formData.orderNo}
            onChange={handleChange}
            placeholder="0001"
            label='Order Number'
          />

          <HrSelect
            name="frequency"
            value={recurring.frequency}
            onChange={handleRecurringChange}
            label='Repeat Every'
            placeholder="Week"
            options={[
              { value: "2 Weeks", label: "2 Weeks" },
              { value: "Month", label: "Month" },
              { value: "2 Month", label: "2 Month" },
              { value: "3 Month", label: "3 Month" },
              { value: "6 Month", label: "6 Month" },
              { value: "Year", label: "Year" },
              { value: "2 Year", label: "2 Year" },
              { value: "3 Year", label: "3 Year" },
              { value: "Custom", label: "Custom" },
            ]}
          />
          <HrInput
            type="date"
            name="startDate"
            value={recurring.startDate}
            onChange={handleRecurringChange}
            label='Start On'
          />


          <HrInput
            type="date"
            name="endDate"
            value={recurring.endDate}
            onChange={handleRecurringChange}
            label='Ends On'
          />
          <HrSelect
            name="paymentTerms"
            value={recurring.paymentTerms}
            onChange={handleRecurringChange}
            label='Payment Terms'
            placeholder="Due on Receipt"
            options={[
              { value: "Due end of the month", label: "Due end of the month" },
              { value: "Net 15", label: "Net 15" },
              { value: "Net 30", label: "Net 30" },
              { value: "Net 45", label: "Net 45" },
              { value: "Net 60", label: "Net 60" },
              { value: "Due end of next month", label: "Due end of next month" },
              { value: "Custom", label: "Custom" },
            ]}
          />

          <HrInput
            type="text"
            name="salesperson"
            value={formData.salesperson}
            onChange={handleChange}
            label='Sales Person'
          />

          <HrInput
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            label='Subject'
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
                      onChange={(e) =>
                        handleItemChange(idx, "name", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleItemChange(idx, "qty", e.target.value)
                      }
                      className="w-full p-1 text-right"
                    />
                  </td>
                  <td className="border p-1">
                    <HrInput
                      type="number"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(idx, "rate", e.target.value)
                      }
                      className="w-full p-1 text-right"
                    />
                  </td>
                  <td className="border p-1">
                    <HrSelect
                      value={item.tax}
                      onChange={(e) =>
                        handleItemChange(idx, "tax", e.target.value)
                      }
                      className="w-full p-1"
                      options={[
                        { value: "0%", label: "0%" },
                        { value: "5%", label: "5%" },
                        { value: "10%", label: "10%" },
                        { value: "15%", label: "15%" },
                      ]}
                    />
                  </td>
                  <td className="border p-1 text-right">
                    {item.amount.toFixed(2)}
                  </td>
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

        {/* Totals & Notes */}
        <div className="mt-6 ">

          <div className="mt-6 bg-gray-100 rounded-xl border p-4 ">
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

        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          {/* Terms & Conditions */}
          <div className="">
            <textarea
              placeholder="Customer Notes"
              className="w-full h-24 border rounded p-2"
            />
            <p className="text-sm text-gray-400">
              Will be displayed on the sales receipt
            </p>
          </div>
          <div className="">
            <textarea
              placeholder="Terms & Conditions"
              className="w-full h-24 border rounded p-2"
            />
          </div>

        </div>
        {/* Submit */}
        <div className="flex fixed bottom-0  items-center shadow-lg h-28 md:h-12 gap-8 bg-gray-200 rounded sm:px-4 md:px-6 z-50">
          <Button type="submit">Save Receipt</Button>
        </div>
      </form>
    </div>
  );
}
