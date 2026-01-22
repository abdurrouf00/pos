"use client";

import { useEffect, useState } from "react";

export default function CreditNoteTable() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("creditNotes") || "[]");
    setNotes(stored);
  }, []);

  if (!notes.length) return <p className="p-4 text-center">No Credit Notes Found</p>;

  return (
    <div className="p-6 overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Credit Note</th>
            <th className="p-2 border">Reference</th>
            <th className="p-2 border">Customer Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Balance</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, idx) => (
            <tr key={idx}>
              <td className="p-2 border">{note.date}</td>
              <td className="p-2 border">{note.creditNote}</td>
              <td className="p-2 border">{note.reference}</td>
              <td className="p-2 border">{note.customerName}</td>
              <td className="p-2 border">{note.status}</td>
              <td className="p-2 border text-right">{note.amount}</td>
              <td className="p-2 border text-right">{note.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
