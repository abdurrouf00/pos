"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";


export default function RecurringBillsTable() {
  const [bills, setBills] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const storedBills = JSON.parse(localStorage.getItem("recurringBills") || "[]");
    setBills(storedBills);
  }, []);

  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleDelete = () => {
    const updatedBills = bills.filter((_, index) => !selected.includes(index));
    setBills(updatedBills);
    localStorage.setItem("recurringBills", JSON.stringify(updatedBills));
    setSelected([]);

  };

  return (
    <div className="mt-4  min-h-screen">
      <h2 className="text-xl font-bold mb-4">Recurring Bills List</h2>

      {selected.length > 0 && (
        <Button
          onClick={handleDelete}
          className="mb-3 px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete Selected
        </Button>
      )}

      <div className="overflow-x-auto bg-white rounded border p-4">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">✓</th>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Account</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Paid Through</th>
              <th className="p-2 border">Vendor</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Project</th>
              <th className="p-2 border">Billable</th>
            </tr>
          </thead>
          <tbody>
            {bills.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center p-4">
                  No bills found.
                </td>
              </tr>
            )}
            {bills.map((bill, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(idx)}
                    onChange={() => handleCheckbox(idx)}
                  />
                </td>
                <td className="border p-2 text-center">{idx + 1}</td>
                <td className="border p-2">{bill.date}</td>
                <td className="border p-2">{bill.expenseAccount}</td>
                <td className="border p-2 text-right">{Number(bill.amount).toFixed(2)}</td>
                <td className="border p-2">{bill.paidThrough}</td>
                <td className="border p-2">{bill.vendor}</td>
                <td className="border p-2">{bill.customerName}</td>
                <td className="border p-2">{bill.project}</td>
                <td className="border p-2 text-center">{bill.billable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
