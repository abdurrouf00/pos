"use client";

import { useEffect, useState } from "react";

export default function SalesReceiptTable() {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const storedReceipts = JSON.parse(localStorage.getItem("submittedReceipts") || "[]");
    setReceipts(storedReceipts);
  }, []);

  // if (!receipts.length) {
  //   return <p className="p-6 text-center text-gray-500">No receipts found.</p>;
  // }

  return (
    <div className="overflow-x-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Sales Receipts</h2>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Receipt Date</th>
            <th className="p-2 border">Sales Receipt#</th>
            <th className="p-2 border">Reference</th>
            <th className="p-2 border">Customer Name</th>
            <th className="p-2 border">Payment Mode</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Amount (BDT)</th>
            <th className="p-2 border">Created By</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-2 border">{receipt.receiptDate}</td>
              <td className="p-2 border">{receipt.salesReceiptNo}</td>
              <td className="p-2 border">{receipt.paymentDetails?.reference || "-"}</td>
              <td className="p-2 border">{receipt.customerName}</td>
              <td className="p-2 border">{receipt.paymentDetails?.paymentMode || "-"}</td>
              <td className="p-2 border">{receipt.status || "Pending"}</td>
              <td className="p-2 border text-right">{receipt.total?.toFixed(2) || receipt.subtotal?.toFixed(2) || "0.00"}</td>
              <td className="p-2 border">{receipt.createdBy || "Admin"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
