"use client";

import { useEffect, useState } from "react";

export default function ReceiptsTable() {
  const [receipts, setReceipts] = useState([]);
  const [selected, setSelected] = useState([]);

  // Load submitted receipts from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("submittedReceipts") || "[]");
    setReceipts(stored);
  }, []);

  // Checkbox toggle
  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Delete selected receipts
  const handleDelete = () => {
    const updated = receipts.filter((_, index) => !selected.includes(index));
    setReceipts(updated);
    localStorage.setItem("submittedReceipts", JSON.stringify(updated));
    setSelected([]);
  };

  // Status calculation
  const getStatus = (endDate) => {
    if (!endDate) return "-";
    return new Date(endDate) >= new Date() ? "Active" : "Expired";
  };

  if (!receipts.length) {
    return <p className="p-6 text-center">No receipts submitted yet.</p>;
  }

  return (
    <div className="p-5">
      <h2 className="text-lg font-bold mb-4">Sales Receipts</h2>

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
          <tr className="bg-gray-200">
            <th className="border p-2">✓</th>
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Profile Name</th>
            <th className="border p-2">Frequency</th>
            <th className="border p-2">Last Invoice Date</th>
            <th className="border p-2">Next Invoice Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((r, index) => (
            <tr key={index} className="text-center hover:bg-gray-50">
              <td className="border p-2">
                <input
                  type="checkbox"
                  checked={selected.includes(index)}
                  onChange={() => handleCheckbox(index)}
                />
              </td>
              <td className="border p-2">{r.customerName}</td>
              <td className="border p-2">{r.profileName || "-"}</td>
              <td className="border p-2">{r.recurring?.frequency || "-"}</td>
              <td className="border p-2">{r.receiptDate || "-"}</td>
              <td className="border p-2">{r.recurring?.endDate || "-"}</td>
              <td className="border p-2">{getStatus(r.recurring?.endDate)}</td>
              <td className="border p-2 text-right">{r.total?.toFixed(2) || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
