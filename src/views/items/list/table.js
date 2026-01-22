"use client";

import { useEffect, useState } from "react";
import RRR from "./index"; // যদি খালি থাকে দেখাতে চাই

export default function ItemsTable() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);

  // Load items from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("submittedItems") || "[]");
    setItems(stored);
  }, []);

  // Checkbox toggle
  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Select / Deselect All
  const handleSelectAll = () => {
    if (selected.length === items.length) {
      setSelected([]);
    } else {
      setSelected(items.map((_, i) => i));
    }
  };

  // Delete selected rows
  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete selected items?")) return;
    const updated = items.filter((_, index) => !selected.includes(index));
    setItems(updated);
    localStorage.setItem("submittedItems", JSON.stringify(updated));
    setSelected([]);
  };

  // Show RRR if no items
  // if (items.length === 0) return <RRR />;

  return (
    <div className="p-5 max-w-7xl mx-auto bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Items List</h2>
        {selected.length > 0 && (
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete Selected ({selected.length})
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 w-10 text-center">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selected.length === items.length && items.length > 0}
                />
              </th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Purchase Description</th>
              <th className="border p-2">Purchase Rate</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Selling Price</th>
              <th className="border p-2">Usage Unit</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className={`text-center hover:bg-gray-50 ${selected.includes(index) ? "bg-blue-50" : ""
                  }`}
              >
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(index)}
                    onChange={() => handleCheckbox(index)}
                  />
                </td>
                <td className="border p-2">{item.product.name}</td>
                <td className="border p-2">
                  {item.purchase?.purchaseDescription || "-"}
                </td>
                <td className="border p-2">{item.purchase?.costPrice || "-"}</td>
                <td className="border p-2">{item.sales?.salesDescription || "-"}</td>
                <td className="border p-2">{item.sales?.sellingPrice || "-"}</td>
                <td className="border p-2">{item.product.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
