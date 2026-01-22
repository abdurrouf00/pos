"use client";

import { useEffect, useState } from "react";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [selected, setSelected] = useState([]);

  // Load invoices
  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem("submittedInvoices") || "[]");
    setInvoices(storedInvoices);
  }, []);

  // Checkbox toggle
  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Delete selected invoices
  const handleDelete = () => {
    const updated = invoices.filter((_, index) => !selected.includes(index));
    setInvoices(updated);
    localStorage.setItem("submittedInvoices", JSON.stringify(updated));
    setSelected([]); // reset selection
  };

  // if (!invoices.length) {
  //   return <p className="p-6 text-center">No invoices submitted yet.</p>;
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
              <th className="p-2 border">Invoice#</th>
              <th className="p-2 border">Invoice Date</th>
              <th className="p-2 border">Due Date</th>
              <th className="p-2 border">Terms</th>
              <th className="p-2 border">Salesperson</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Subtotal</th>
              <th className="p-2 border">Shipping</th>
              <th className="p-2 border">Adjustment</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2 border text-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(idx)}
                    onChange={() => handleCheckbox(idx)}
                  />
                </td>
                <td className="p-2 border">{invoice.customerName}</td>
                <td className="p-2 border">{invoice.invoiceNo}</td>
                <td className="p-2 border">{invoice.invoiceDate}</td>
                <td className="p-2 border">{invoice.dueDate || "-"}</td>
                <td className="p-2 border">{invoice.terms || "-"}</td>
                <td className="p-2 border">{invoice.salesperson || "-"}</td>
                <td className="p-2 border">
                  {invoice.items.map((item, i) => (
                    <div key={i}>
                      {item.name} ({item.qty} × {item.rate})
                    </div>
                  ))}
                </td>
                <td className="p-2 border">{invoice.subtotal.toFixed(2)}</td>
                <td className="p-2 border">{invoice.shipping.toFixed(2)}</td>
                <td className="p-2 border">{invoice.adjustment.toFixed(2)}</td>
                <td className="p-2 border font-bold">{invoice.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
