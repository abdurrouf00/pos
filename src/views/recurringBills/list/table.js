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
    <div className="p-6 bg-gray-50 min-h-screen">


      {selected.length > 0 && (
        <Button
          onClick={handleDelete}
          className="mb-3 px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete Selected
        </Button>
      )}


      <div className="overflow-x-auto bg-white rounded shadow p-4">

        {bills.length === 0 ? (
          <p> No recurring bills found.</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">✓</th>
                <th className="p-2 border">Vendor Name</th>
                <th className="p-2 border">Profile Name</th>
                <th className="p-2 border">Frequency</th>
                <th className="p-2 border">Last Bill Date</th>
                <th className="p-2 border">Next Bill Date</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Amount</th>
              </tr>
            </thead>
            <tbody>

              {bills.map((bill, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(idx)}
                      onChange={() => handleCheckbox(idx)}
                    />
                  </td>
                  <td className="border p-2">{bill.vendorName}</td>
                  <td className="border p-2">{bill.profileName}</td>
                  <td className="border p-2">{bill.repeatEvery || "-"}</td>
                  <td className="border p-2">{bill.startOn || "-"}</td>
                  <td className="border p-2">{bill.endsOn || "-"}</td>
                  <td className="border p-2">{bill.statusOn || "EXPIRED"} </td>
                  <td className="border p-2 text-right">{bill.total?.toFixed(2) || "0.00"}</td>
                </tr>
              ))}
            </tbody>
          </table>

        )}

      </div>


    </div>
  );
}
