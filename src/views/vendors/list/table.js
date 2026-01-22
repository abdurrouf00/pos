"use client";

import { useEffect, useState } from "react";

export default function PurchasesTable() {
  const [purchases, setPurchases] = useState([]);
  const [selected, setSelected] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("purchases") || "[]");
    setPurchases(stored);
  }, []);

  // Checkbox toggle
  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Delete selected rows
  const handleDelete = () => {
    const updated = purchases.filter((_, index) => !selected.includes(index));
    setPurchases(updated);
    localStorage.setItem("purchases", JSON.stringify(updated));
    setSelected([]);
  };

  return (
    <div className="p-5 bg-white">
      <h2 className="text-lg font-bold mb-4">Purchases List</h2>

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
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Customer Type</th>
          </tr>
        </thead>
        <tbody>
          {purchases.length > 0 ? (
            purchases.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(index)}
                    onChange={() => handleCheckbox(index)}
                  />
                </td>
                <td className="border p-2">{item.name || "-"}</td>
                <td className="border p-2">{item.email || "-"}</td>
                <td className="border p-2">{item.phone || "-"}</td>
                <td className="border p-2">{item.customer_type || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border p-2 text-center" colSpan="5">
                No purchases found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}