"use client";

import { useEffect, useState } from "react";

export default function PaymentsTable() {
  const [payments, setPayments] = useState([]);
  const [selected, setSelected] = useState([]);

  // Load payments from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("submittedPayments") || "[]");
    setPayments(stored);
  }, []);

  // Checkbox toggle
  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Delete selected rows
  const handleDelete = () => {
    const updated = payments.filter((_, index) => !selected.includes(index));
    setPayments(updated);
    localStorage.setItem("submittedPayments", JSON.stringify(updated));
    setSelected([]); // reset selection
  };

  return (
    <div className="p-5">
      <h2 className="text-lg font-bold mb-4">Payments List</h2>

      {selected.length > 0 && (
        <button
          onClick={handleDelete}
          className="mb-3 px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete Selected
        </button>
      )}

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border p-2">✓</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Payment</th>
            <th className="border p-2">Reference #</th>
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Invoice</th>
            <th className="border p-2">Mode</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Unsent Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((p, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(index)}
                    onChange={() => handleCheckbox(index)}
                  />
                </td>
                <td className="border p-2">{p.paymentDate || "-"}</td>
                <td className="border p-2">{p.paymentNo || "-"}</td>
                <td className="border p-2">{p.referenceNo || "-"}</td>
                <td className="border p-2">{p.customerName || "-"}</td>
                <td className="border p-2">{p.invoiceNo || "-"}</td>
                <td className="border p-2">{p.paymentMode || "-"}</td>
                <td className="border p-2">{p.amountReceived || 0}</td>
                <td className="border p-2">{p.unsentAmount || 0}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border p-2 text-center" colSpan="9">
                No payments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
