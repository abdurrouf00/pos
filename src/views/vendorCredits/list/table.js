"use client";

import { useEffect, useState } from "react";

export default function VendorCreditNotesTable() {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("creditNotes") || "[]");
    setNotes(stored);
  }, []);

  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleDelete = () => {
    const updated = notes.filter((_, index) => !selected.includes(index));
    setNotes(updated);
    localStorage.setItem("creditNotes", JSON.stringify(updated));
    setSelected([]);
  };

  return (
    <div className="p-5">
      <h2 className="text-lg font-bold mb-4">Vendor Credit Notes</h2>

      {selected.length > 0 && (
        <button
          onClick={handleDelete}
          className="mb-3 px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete Selected
        </button>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border p-2">✓</th>
              <th className="border p-2">Vendor Name</th>
              <th className="border p-2">Credit Note #</th>
              <th className="border p-2">Reference</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Balance</th>
            </tr>
          </thead>
          <tbody>
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(index)}
                      onChange={() => handleCheckbox(index)}
                    />
                  </td>
                  <td className="border p-2">{note.customerName || "-"}</td>
                  <td className="border p-2">{note.creditNote || "-"}</td>
                  <td className="border p-2">{note.reference || "-"}</td>
                  <td className="border p-2">{note.date || "-"}</td>
                  <td className="border p-2">{note.status || "Open"}</td>
                  <td className="border p-2">{note.amount?.toFixed(2) || 0}</td>
                  <td className="border p-2">{note.balance?.toFixed(2) || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2 text-center" colSpan="8">
                  No Vendor Credit Notes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
