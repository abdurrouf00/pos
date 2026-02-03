'use client';

import React from 'react';

const OrderInvoice = ({ orderData }) => {
  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">No order data available</p>
      </div>
    );
  }

  const { table, waiter, items, totals, totalPayable, orderDate } = orderData;

  const handlePrint = () => {
    window.print();
  };

  // Convert number to words (simplified version)
  const numberToWords = (num) => {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    
    if (num === 0) return 'zero';
    
    const convert = (n) => {
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
      if (n < 1000) return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + convert(n % 100) : '');
      return n.toString();
    };
    
    return convert(Math.floor(num));
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
            margin: 10mm;
          }
        }
      `}</style>
      
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-3xl mx-auto bg-white">
          {/* Header */}
          <div className="text-center border-b-2 border-black pb-4 mb-4">
            <div className="text-2xl mb-2">﷽</div>
            <h1 className="text-3xl font-bold mb-1">Panaderia</h1>
            <p className="text-sm">Dhanmondi</p>
            <p className="text-sm">+8801847467972</p>
            <p className="text-sm">panaderiabangladesh@gmail.com</p>
          </div>

          {/* Invoice Title */}
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">Sales Invoice</h2>
          </div>

          {/* Customer & Invoice Info */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p><strong>Customer:</strong> Walking Customer</p>
              <p><strong>Phone:</strong></p>
              <p><strong>Address:</strong></p>
            </div>
            <div className="text-right">
              <p><strong>Mushak 6.3</strong></p>
              <p><strong>Invoice No:</strong> S-{Math.floor(Math.random() * 1000)}</p>
              <p><strong>Date & Time:</strong> {orderDate}</p>
              <p><strong>Created By:</strong> Admin</p>
            </div>
          </div>

          <div className="mb-4 text-sm flex justify-between">
            <p><strong>Table:</strong> {table}</p>
            <p><strong>Waiter:</strong> {waiter}</p>
          </div>

          {/* Items Table */}
          <table className="w-full border-collapse border border-black mb-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-left">SL</th>
                <th className="border border-black p-2 text-left">Item</th>
                <th className="border border-black p-2 text-center">QTY</th>
                <th className="border border-black p-2 text-right">Rate</th>
                <th className="border border-black p-2 text-right">VAT</th>
                <th className="border border-black p-2 text-right">VAT Amount</th>
                <th className="border border-black p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const itemTotal = item.Price * item.qty;
                const vatAmount = itemTotal * (item.VatRate / 100);
                
                return (
                  <tr key={index}>
                    <td className="border border-black p-2">{index + 1}</td>
                    <td className="border border-black p-2">{item.Item}</td>
                    <td className="border border-black p-2 text-center">{item.qty.toFixed(2)}</td>
                    <td className="border border-black p-2 text-right">{item.Price.toFixed(2)}</td>
                    <td className="border border-black p-2 text-right">{item.VatRate.toFixed(2)}</td>
                    <td className="border border-black p-2 text-right">{vatAmount.toFixed(2)}</td>
                    <td className="border border-black p-2 text-right">{itemTotal.toFixed(2)}</td>
                  </tr>
                );
              })}
              
              {/* Sub Total Row */}
              <tr className="font-bold">
                <td colSpan="2" className="border border-black p-2">Sub Total</td>
                <td className="border border-black p-2 text-center">{items.reduce((sum, item) => sum + item.qty, 0).toFixed(2)}</td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2 text-right">{totals.totalVat.toFixed(2)}</td>
                <td className="border border-black p-2 text-right">{totals.subTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          {/* Calculation Summary */}
          <div className="mb-4 text-sm">
            <div className="flex justify-between mb-1">
              <span>VAT[+]</span>
              <span>{totals.totalVat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Service Charge[+]</span>
              <span>{totals.totalService.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Discount[-]</span>
              <span>{totals.totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t-2 border-black pt-2">
              <span>Net Total</span>
              <span>{totalPayable.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Invoice Due</span>
              <span>{totalPayable.toFixed(2)}</span>
            </div>
          </div>

          {/* In Words */}
          <div className="mb-4 text-sm">
            <p><strong>In Words:</strong> Tk. {numberToWords(totalPayable)} Only.</p>
          </div>

          {/* Footer */}
          <div className="text-center text-sm border-t-2 border-black pt-4">
            <p>Goods sold are not returnable. If need any support, Call: +8801847467972</p>
          </div>

          {/* Print Button - Hidden when printing */}
          <div className="mt-6 print:hidden">
            <button
              onClick={handlePrint}
              className="w-full bg-[#109df9] hover:bg-[#0e8ad9] text-white font-bold py-3 px-6 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInvoice;
