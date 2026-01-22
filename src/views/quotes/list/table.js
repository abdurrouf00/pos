"use client";

import { useEffect, useState } from "react";

export default function QuoteList() {
  const [quotes, setQuotes] = useState([]);
  const [selected, setSelected] = useState([]);

  // Load quotes from localStorage
  useEffect(() => {
    const storedQuotes = JSON.parse(localStorage.getItem("submittedQuotes") || "[]");
    setQuotes(storedQuotes);
  }, []);

  // Checkbox toggle
  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Delete selected quotes
  const handleDelete = () => {
    const updated = quotes.filter((_, index) => !selected.includes(index));
    setQuotes(updated);
    localStorage.setItem("submittedQuotes", JSON.stringify(updated));
    setSelected([]); // reset selection
  };

  // if (!quotes.length) {
  //   return <p className="p-6 text-center">No quotes submitted yet.</p>;
  // }

  return (
    <div className="p-6 bg-white shadow rounded  min-h-screen">

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
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Quote#</th>
              <th className="p-2 border">Quote Date</th>
              <th className="p-2 border">Expiry Date</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Subtotal</th>
              <th className="p-2 border">Shipping</th>
              <th className="p-2 border">Adjustment</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote, idx) => (
              <tr key={idx} className="border-b text-center">
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    checked={selected.includes(idx)}
                    onChange={() => handleCheckbox(idx)}
                  />
                </td>
                <td className="p-2 border">{quote.customerName}</td>
                <td className="p-2 border">{quote.quoteNo}</td>
                <td className="p-2 border">{quote.quoteDate}</td>
                <td className="p-2 border">{quote.expiryDate || "-"}</td>
                <td className="p-2 border">
                  {quote.items.map((item, i) => (
                    <div key={i}>
                      {item.name} ({item.qty} × {item.rate})
                    </div>
                  ))}
                </td>
                <td className="p-2 border">{quote.subtotal.toFixed(2)}</td>
                <td className="p-2 border">{quote.shipping.toFixed(2)}</td>
                <td className="p-2 border">{quote.adjustment.toFixed(2)}</td>
                <td className="p-2 border font-bold">{quote.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
