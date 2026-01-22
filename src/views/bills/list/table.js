"use client";

import { useEffect, useState } from "react";

export default function BillsTable() {
  const [bills, setBills] = useState([]);
  const [selected, setSelected] = useState([]);

  // Load bills
  useEffect(() => {
    const storedBills = JSON.parse(localStorage.getItem("submittedBills") || "[]");
    setBills(storedBills);
  }, []);

  // Checkbox toggle
  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Delete selected bills
  const handleDelete = () => {
    const updated = bills.filter((_, index) => !selected.includes(index));
    setBills(updated);
    localStorage.setItem("submittedBills", JSON.stringify(updated));
    setSelected([]); // reset selection
  };

  if (!bills.length) {
    return <p className="p-6 text-center">No bills submitted yet.</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     

      {selected.length > 0 && (
        <button
          onClick={handleDelete}
          className="mb-3 px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete Selected
        </button>
      )}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">✓</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Bill #</th>
              <th className="p-2 border">Reference Number</th>
              <th className="p-2 border">Vendor Name</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Due Date</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Balance Due</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2 border text-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(idx)}
                    onChange={() => handleCheckbox(idx)}
                  />
                </td>
                <td className="p-2 border">{bill.billDate}</td>
                <td className="p-2 border">{bill.billNo}</td>
                <td className="p-2 border">{bill.orderNumber || "-"}</td>
                <td className="p-2 border">{bill.vendorName}</td>
                <td className="p-2 border">{bill.status || "Pending"}</td>
                <td className="p-2 border">{bill.dueDate || "-"}</td>
                <td className="p-2 border font-medium">
                  {Number(bill.total || 0).toFixed(2)}
                </td>
                <td className="p-2 border font-bold text-red-500">
                  {Number(bill.balanceDue || bill.total || 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
