'use client';

import React from 'react';

const KOTInvoice = ({ kotData }) => {
  if (!kotData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">No KOT data available</p>
      </div>
    );
  }

  const { table, waiter, items, orderDate } = kotData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          @page {
            margin: 5mm;
          }
        }
      `}</style>
      
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-md mx-auto bg-white border border-gray-100 p-4">
          {/* Header */}
          <div className="text-center border-b border-dashed border-gray-400 pb-4 mb-4">
            <h1 className="text-2xl font-bold mb-1">KOT</h1>
            <p className="text-sm font-medium">Panaderia</p>
          </div>

          {/* KOT Info */}
          <div className="mb-4 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="font-bold">Table:</span>
              <span>{table}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Waiter:</span>
              <span>{waiter}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Date:</span>
              <span>{orderDate}</span>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full border-collapse mb-4 text-sm">
            <thead>
              <tr className="border-b border-t border-dashed border-gray-400">
                <th className="py-2 text-left">Item Name</th>
                <th className="py-2 text-right">Qty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed divide-gray-200">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="py-2">{item.Item}</td>
                  <td className="py-2 text-right font-bold">{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="text-center text-xs border-t border-dashed border-gray-400 pt-4 text-gray-500">
            <p>Kitchen Copy</p>
          </div>

          {/* Print Button - Hidden when printing */}
          <div className="mt-8 print:hidden">
            <button
              onClick={handlePrint}
              className="w-full bg-[#109df9] hover:bg-[#0e8ad9] text-white font-bold py-3 px-6 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Print KOT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default KOTInvoice;
