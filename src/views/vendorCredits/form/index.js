"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";


const today = new Date().toISOString().split("T")[0];

export default function VendorCreditNoteForm() {
  const [formData, setFormData] = useState({
    vendorName: "",
    orderNo: "",
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
    if (!formData.vendorName || !formData.creditNote) {
      setErrorMsg("Fill-Up Vendor Name and Credit Note!");
      return;
    }
    setErrorMsg("");

    // LocalStorage .. keep data from localStorage
    const prevNotes = JSON.parse(localStorage.getItem("creditNotes") || "[]");

    //create new data
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const total = subtotal + Number(shipping || 0) + Number(adjustment || 0);

    const newNote = {
      date: formData.creditnotedate,
      creditNote: formData.creditNote,
      reference: formData.reference,
      orderN0: formData.orderNo,
      customerName: formData.vendorName,
      status: "Open",
      amount: total,
      balance: total,
    };

    // save at LocalStorage
    localStorage.setItem("creditNotes", JSON.stringify([...prevNotes, newNote]));


    //  Reset form
    setFormData({
      vendorName: "",
      creditNote: "",
      orderNo: "",
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


  return (
    <div className="bg-white p-6 rounded min-h-screen pb-40">
      <div className="w-full text-sm bg-white">
        <form onSubmit={handleSubmit} className="pt-5 w-full space-y-5">
          {errorMsg && (
            <p className="text-red-500 font-medium pl-8">{errorMsg}</p>
          )}

          {/* Vendor & Credit Note Fields */}
          <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
            <HrInput
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              placeholder="Enter Vendor Name"
              label="Vendor Name"
            />
            <HrInput
              name="creditNote"
              value={formData.creditNote}
              onChange={handleChange}
              label="Credit Note"
            />

            <HrInput
              name="orderNo"
              value={formData.orderNo}
              onChange={handleChange}
              label="Order Number"
            />

            <HrInput
              name="creditnotedate"
              type="date"
              value={formData.creditnotedate}
              onChange={handleChange}
              label="Vendor Credit Date"
            />

            <HrInput
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              label="Reference Number"
            />
            <HrInput
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter a subject within 250 charectars"
              label="Subject"
            />
          </div>

          {/* Item Table */}
          <div className="mt-6 bg-white border rounded overflow-x-auto p-6">
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

          {/* Totals */}
          <div className="mt-6 ">

            <div className="mt-6 bg-gray-100 rounded-xl shadow p-4  ">
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
              placeholder="Customer Notes"
              className="w-full h-24 border rounded p-2"
            />
          </div>

          {/* Submit Button */}
          <div className="flex fixed right-4  bottom-4 items-center    rounded sm:px-4 md:px-6 z-50">
            <Button type="submit">Save Vendor Credit Note</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
