"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";

import { Upload } from 'lucide-react';

const today = new Date().toISOString().split("T")[0];

export default function SalesReceiptForm() {
  const [formData, setFormData] = useState({
    customerName: "",
    receiptDate: today,
    salesReceiptNo: "",
    salesperson: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    paymentMode: "",
    depositTo: "",
    reference: "",
  });

  const [items, setItems] = useState([
    { name: "", qty: 1.0, rate: 0.0, tax: "0%", amount: 0.0 },
  ]);

  const [errorMsg, setErrorMsg] = useState("");
  const [shipping, setShipping] = useState(0);
  const [adjustment, setAdjustment] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
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
    setItems(
      updatedItems.length
        ? updatedItems
        : [{ name: "", qty: 1.0, rate: 0.0, tax: "0%", amount: 0.0 }]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.customerName || !formData.salesReceiptNo || !formData.receiptDate) {
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

    };

    const existingReceipts = JSON.parse(localStorage.getItem("submittedReceipts") || "[]");
    const updatedReceipts = [...existingReceipts, receiptToSave];
    localStorage.setItem("submittedReceipts", JSON.stringify(updatedReceipts));


    // Reset
    setFormData({ customerName: "", receiptDate: today, salesReceiptNo: "", salesperson: "" });
    setItems([{ name: "", qty: 1.0, rate: 0.0, tax: "0%", amount: 0.0 }]);
    setPaymentDetails({ paymentMode: "", depositTo: "", reference: "" });
    setShipping(0);
    setAdjustment(0);
    file("");
  };

  return (
    <div className=" bg-white p-6 rounded min-h-screen space-y-4">
      <div className="w-full text-sm bg-white ">
        <form onSubmit={handleSubmit} className="pt-5 w-full space-y-5">
          {errorMsg && <p className="text-red-500 font-medium">{errorMsg}</p>}

          {/* Top Form Fields */}
          <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
            <HrInput
              name="customerName"
              value={formData.customerName}
              onChange={handleChange} placeholder="Enter Name"
              label='Customer Name'
            />

            <HrInput
              name="receiptDate"
              type="date" value={formData.receiptDate}
              onChange={handleChange}
              label='Receipt Date'
            />


            <HrInput
              name="salesReceiptNo"
              value={formData.salesReceiptNo}
              onChange={handleChange}
              placeholder="SR-001"
              label='Sales Receipt#'
            />


            <HrInput
              name="salesperson"
              value={formData.salesperson}
              onChange={handleChange}
              placeholder="Sales Person Name"
              label='Sales Person'
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
            <button type="button" onClick={addItem} className="mt-3 px-3 py-1 bg-blue-500 text-white rounded">
              + Add Item
            </button>
          </div>



          {/* Totals */}
          <div className="mt-6 ">

            <div className="mt-6  rounded-xl border p-4 ">
              <div className="flex justify-between py-1">
                <span>Sub Total</span>
                <span>{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between  py-1">
                <span className="text-sm">Shipping Charges</span>
                <HrInput
                  type="number"
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                  className="w-44 text-right bg-white" />
              </div>
              <div className="flex gap-6 py-1">
                <span className="text-sm">Adjustment</span>
                <HrInput
                  type="number"
                  value={adjustment}
                  onChange={(e) => setAdjustment(e.target.value)}
                  className="w-44 text-right bg-white" />
              </div>
              <div className="flex justify-between py-2 font-bold text-lg border-t mt-2">
                <span>Total (BDT)</span>
                <span>{total.toFixed(2)}</span>
              </div>
            </div>
          </div>


          {/* text area and file upload */}
          <div className="mt-6 ">
            <div>
              <div className="">
                <textarea
                  placeholder="Customer Notes"
                  className="w-full h-24 border rounded p-2" />
                <p className="text-sm text-gray-400">
                  Will be displayed on the sales receipt
                </p>
              </div>
              <div className="flex  gap-10 ">

                <div className="w-[60%] ">
                  <textarea
                    placeholder="Terms & Conditions"
                    className="w-full h-24 border rounded-2xl p-2 bg-white" />
                </div>
                <div className="flex gap-5 py-1 ">
                  <span className="text-sm ">Upload file</span>
                  <HrInput
                    type="file"
                    value={items.file}
                    onChange={(e) => setUploadedFile(e.target.files[0])}
                    className="w-44 text-right bg-white" />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="mt-6  border rounded-xl overflow-x-auto p-6">
              <h2 className="text-lg font-semibold mb-3">Payment Details</h2>

              <div className="flex gap-10">
                <div className="flex items-center gap-11 mb-3">
                  <label className="w-40">Payment Mode</label>
                  <HrSelect
                    name="paymentMode"
                    value={paymentDetails.paymentMode}
                    onChange={handlePaymentChange}
                    placeholder="Cash / Bank"
                    options={[
                      { value: "Bank Remittance", label: "Bank Remittance" },
                      { value: "Bank Transfer", label: "Bank Transfer" },
                      { value: "Cash", label: "Cash" },
                      { value: "Check", label: "Check" },
                      { value: "Credit Card", label: "Credit Card" },
                    ]}
                    className="!w-75 bg-white" />
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <label className="w-40">Deposit To</label>
                  <HrSelect
                    name="depositTo"
                    value={paymentDetails.depositTo}
                    onChange={handlePaymentChange}
                    placeholder="Bank / Cash"
                    options={[
                      { value: "Cash", label: "Cash" },
                      { value: "Petty Cash", label: "Petty Cash" },
                      { value: "Undeposited Funds", label: "Undeposited Funds" },
                    ]}
                    className="!w-75 bg-white" />
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <label className="w-40">Reference#</label>
                <HrInput
                  name="reference"
                  value={paymentDetails.reference}
                  onChange={handlePaymentChange}
                  placeholder="REF-001"
                  className="w-75 bg-white" />
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="flex fixed right-4  bottom-4 items-center    rounded sm:px-4 md:px-6 z-50">
            <Button type="submit">Save Receipt</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
