"use client";

import { useEffect, useState } from "react";

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("submittedExpenses") || "[]");
    setExpenses(stored);
  }, []);

  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleDelete = () => {
    const updated = expenses.filter((_, index) => !selected.includes(index));
    setExpenses(updated);
    localStorage.setItem("submittedExpenses", JSON.stringify(updated));
    setSelected([]);
  };

  return (
    <div className="p-5 mt-8 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Expenses List</h2>

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
            <th className="border p-2">Profile Name</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Expense Account</th>
            <th className="border p-2">Paid Through</th>
            <th className="border p-2">Vendor</th>
            <th className="border p-2">Customer Name</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(index)}
                    onChange={() => handleCheckbox(index)}
                  />
                </td>
                <td className="border p-2">{item.profileName}</td>
                <td className="border p-2">{item.amount}</td>
                <td className="border p-2">{item.expenseAccount}</td>
                <td className="border p-2">{item.paidThrough || "-"}</td>
                <td className="border p-2">{item.vendor || "-"}</td>
                <td className="border p-2">{item.customerName || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border p-2 text-center" colSpan="7">
                No expenses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
