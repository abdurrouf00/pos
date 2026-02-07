"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";


const today = new Date().toISOString().split("T")[0];

export default function CreditNoteForm() {
  const [formData, setFormData] = useState({
    customerName: "",
    creditNote: "",
    reference: "",
    creditnotedate: today,
    subject: "",
    salesperson: "",
  });

  const [items, setItems] = useState([
    { name: "", qty: 1, rate: 0, tax: "0%", amount: 0 },
  ]);

  const [shipping, setShipping] = useState(0);
  const [adjustment, setAdjustment] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  // ------------ Handlers ---------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (idx, field, value) => {
    const updatedItems = [...items];
    updatedItems[idx][field] = value;

    const qty = parseFloat(updatedItems[idx].qty) || 0;
    const rate = parseFloat(updatedItems[idx].rate) || 0;
    const taxRate = parseFloat(updatedItems[idx].tax) || 0;
    const taxAmount = (qty * rate * taxRate) / 100;

    updatedItems[idx].amount = qty * rate + taxAmount;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", qty: 1, rate: 0, tax: "0%", amount: 0 }]);
  };

  const removeItem = (idx) => {
    const updated = items.filter((_, i) => i !== idx);
    setItems(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.creditNote) {
      setErrorMsg("Customer Name এবং Credit Note লাগবে!");
      return;
    }
    setErrorMsg("");

    // LocalStorage থেকে আগের ডাটা নাও
    const prevNotes = JSON.parse(localStorage.getItem("creditNotes") || "[]");

    // নতুন ডাটা বানাও
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const total = subtotal + Number(shipping || 0) + Number(adjustment || 0);

    const newNote = {
      date: formData.creditnotedate,
      creditNote: formData.creditNote,
      reference: formData.reference,
      customerName: formData.customerName,
      status: "Open",
      amount: total,
      balance: total,
    };

    // LocalStorage এ Save করো
    localStorage.setItem("creditNotes", JSON.stringify([...prevNotes, newNote]));


    // ফর্ম Reset করো
    setFormData({
      customerName: "",
      creditNote: "",
      reference: "",
      creditnotedate: today,
      subject: "",
      salesperson: "",
    });
    setItems([{ name: "", qty: 1, rate: 0, tax: "0%", amount: 0 }]);
    setShipping(0);
    setAdjustment(0);
  };

  // ------------ Calculations ---------------
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const total = subtotal + Number(shipping || 0) + Number(adjustment || 0);

  // ------------ JSX ---------------
  return (
    <div className="bg-white min-h-screen pb-40 p-6 rounded">
      <div className="w-full text-sm ">
        <form onSubmit={handleSubmit} className="pt-5 w-full space-y-5">
          {errorMsg && (
            <p className="text-red-500 font-medium pl-8">{errorMsg}</p>
          )}

          {/* Top Form Fields */}
          <div className=" grid md:grid-cols-4 grid-cols-2 gap-2">
            <HrInput
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter Name"
              label='Customer Name'
            />

            <HrInput
              name="creditNote"
              type="text"
              value={formData.creditNote}
              onChange={handleChange}
              label='Credit Note'
            />

            <HrInput
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              placeholder="SR-001"
              label='Reference#'
            />

            <HrInput
              name="creditnotedate"
              type="date"
              value={formData.creditnotedate}
              onChange={handleChange}
              label='Credit Note Date'
            />
          </div>

          {/* Item Table */}
          <div className="mt-6 border rounded-xl overflow-x-auto p-6">
            <h2 className="text-lg font-semibold mb-3">Item Table</h2>
            <table className="w-full border text-sm table-fixed ">
              <thead className="bg-gray-100  ">
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

          {/* Totals */}
          <div className="mt-6 ">

            <div className=" border rounded-xl  p-6  ">
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
              placeholder="Customer Notes"
              className="w-full h-24 border rounded p-2"
            />
          </div>
          <p className="pt-20 border-t-1 text-gray-600"> Additional Fields: Start adding custom fields for your payments received by going to Settings ➡ Sales ➡ Payments Received. </p>

          {/* Submit Button */}
          <div className="flex fixed bottom-0 w-[82%] items-center shadow-lg h-28 md:h-12 gap-8 bg-gray-200 rounded sm:px-4 md:px-6 z-50">
            <Button type="submit">Save credit note</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
