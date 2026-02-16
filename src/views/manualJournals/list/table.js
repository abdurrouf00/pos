"use client";

import { useEffect, useState } from "react";
import RRR from "./frontPage";

export default function JournalTable() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("journalData") || "[]");
    setData(stored);
  }, []);

  const calculateTotals = (rows) => {
    const debitTotal = rows.reduce((sum, r) => sum + (parseFloat(r.debits) || 0), 0);
    const creditTotal = rows.reduce((sum, r) => sum + (parseFloat(r.credits) || 0), 0);
    return { debitTotal, creditTotal };
  };

  const handleSelect = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === data.length) {
      setSelected([]);
    } else {
      setSelected(data.map((_, i) => i));
    }
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete selected journals?")) return;
    const remaining = data.filter((_, i) => !selected.includes(i));
    setData(remaining);
    localStorage.setItem("journalData", JSON.stringify(remaining));
    setSelected([]);
  };

  return (
    <div className=" mt-8 bg-white p-6 rounded shadow items-center justify-center">
      {/* যদি data খালি থাকে তাহলে শুধু <RRR /> দেখাবে */}
      {data.length === 0 ? (
        <RRR />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Saved Journals</h2>
            {selected.length > 0 && (
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete Selected ({selected.length})
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-center w-10">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selected.length === data.length && data.length > 0}
                    />
                  </th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Reference Number</th>
                  <th className="border p-2">Journal #</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Notes</th>
                  <th className="border p-2 text-right">Amount</th>
                  <th className="border p-2">Created By</th>
                  <th className="border p-2">Reporting Method</th>
                </tr>
              </thead>

              <tbody>
                {data.map((journal, idx) => {
                  const { debitTotal, creditTotal } = calculateTotals(journal.rows);
                  const balanced = debitTotal.toFixed(2) === creditTotal.toFixed(2);

                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-gray-50 transition-colors ${
                        selected.includes(idx) ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="border p-2 text-center">
                        <input
                          type="checkbox"
                          checked={selected.includes(idx)}
                          onChange={() => handleSelect(idx)}
                        />
                      </td>

                      <td className="border p-2">{journal.date}</td>
                      <td className="border p-2">{journal.reference || "-"}</td>
                      <td className="border p-2">{journal.journalNo}</td>

                      <td className="border p-2 font-medium">
                        {balanced ? (
                          <span className="text-green-600">Balanced</span>
                        ) : (
                          <span className="text-red-600">Unbalanced</span>
                        )}
                      </td>

                      <td className="border p-2">{journal.notes || "-"}</td>

                      <td className="border p-2 text-right">
                        {debitTotal.toFixed(2)} {journal.currency}
                      </td>

                      <td className="border p-2">{journal.createdBy || "Admin"}</td>

                      <td className="border p-2">{journal.reportingMethod}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
