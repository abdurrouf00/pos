"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, Download, Share2, Filter, ChevronDown } from "lucide-react";

const ProfitAndLoss = () => {
  const data = [
    {
      category: "Operating Income",
      items: [
        { name: "Sales", amount: 150000.0 },
        { name: "Service Income", amount: 25000.0 },
      ],
      total: 175000.0,
    },
    {
      category: "Cost of Goods Sold",
      items: [
        { name: "Purchases", amount: 85000.0 },
        { name: "Direct Labor", amount: 15000.0 },
      ],
      total: 100000.0,
    },
    {
      category: "Operating Expenses",
      items: [
        { name: "Rent Expense", amount: 12000.0 },
        { name: "Salaries and Wages", amount: 20000.0 },
        { name: "Utilities", amount: 1500.0 },
        { name: "Office Supplies", amount: 800.0 },
        { name: "Marketing", amount: 3500.0 },
      ],
      total: 37800.0,
    },
  ];

  const grossProfit = data[0].total - data[1].total;
  const netIncome = grossProfit - data[2].total;

  return (
    <div className="bg-[#f8fafc] min-h-screen p-4 md:p-8 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto">
        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#282560]">Profit and Loss</h1>
            <p className="text-gray-500 mt-1">Jan 1, 2024 - Dec 31, 2024</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-blue-100 hover:bg-blue-50">
              <Printer className="w-4 h-4" /> Print
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-blue-100 hover:bg-blue-50">
              <Download className="w-4 h-4" /> Export
            </Button>
            <Button size="sm" className="bg-[#282560] hover:bg-[#1e1c4a] flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </div>
        </div>

        {/* Report Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-blue-50 overflow-hidden">
          {/* Organization Header */}
          <div className="bg-gradient-to-r from-[#282560] to-[#3d3989] p-8 text-center text-white">
            <h2 className="text-2xl font-bold tracking-tight">MUKTODHARA</h2>
            <p className="text-blue-200 mt-1 uppercase tracking-widest text-sm">Profit and Loss Statement</p>
            <p className="text-blue-100/80 text-xs mt-2 italic">For the period ended December 31, 2024</p>
          </div>

          <div className="p-8">
            <div className="space-y-8">
              {/* Operating Income Section */}
              <section>
                <h3 className="text-[#282560] font-bold text-lg mb-4 border-b pb-2 flex justify-between items-center">
                  <span>OPERATING INCOME</span>
                </h3>
                <div className="space-y-3 px-2">
                  {data[0].items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-gray-700 hover:bg-slate-50 p-1 rounded transition-colors">
                      <span>{item.name}</span>
                      <span className="font-medium">৳ {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 border-t font-bold text-[#282560]">
                    <span>Total Operating Income</span>
                    <span className="text-lg underline decoration-double">৳ {data[0].total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </section>

              {/* COGS Section */}
              <section>
                <h3 className="text-[#282560] font-bold text-lg mb-4 border-b pb-2 flex justify-between items-center">
                  <span>COST OF GOODS SOLD (COGS)</span>
                </h3>
                <div className="space-y-3 px-2">
                  {data[1].items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-gray-700 hover:bg-slate-50 p-1 rounded transition-colors">
                      <span>{item.name}</span>
                      <span className="text-red-600 font-medium">৳ ({item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })})</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 border-t font-bold text-[#282560]">
                    <span>Total Cost of Goods Sold</span>
                    <span className="text-red-700">৳ ({data[1].total.toLocaleString(undefined, { minimumFractionDigits: 2 })})</span>
                  </div>
                </div>
              </section>

              {/* Gross Profit Highlighting */}
              <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex justify-between items-center shadow-sm">
                <span className="text-[#282560] font-black text-xl">GROSS PROFIT</span>
                <span className="text-2xl font-black text-[#282560]">৳ {grossProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>

              {/* Operating Expenses Section */}
              <section>
                <h3 className="text-[#282560] font-bold text-lg mb-4 border-b pb-2">OPERATING EXPENSES</h3>
                <div className="space-y-3 px-2">
                  {data[2].items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-gray-700 hover:bg-slate-50 p-1 rounded transition-colors">
                      <span>{item.name}</span>
                      <span className="text-red-600 font-medium">৳ {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 border-t font-bold text-[#282560]">
                    <span>Total Operating Expenses</span>
                    <span className="text-red-700">৳ {data[2].total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </section>

              {/* Net Income Section */}
              <div className="mt-12 bg-gradient-to-br from-[#282560] to-[#1e1c4a] rounded-3xl p-8 text-white shadow-2xl flex flex-col md:flex-row justify-between items-center transform transition-transform hover:scale-[1.01]">
                <div className="mb-4 md:mb-0">
                  <span className="text-blue-200 uppercase tracking-widest font-bold text-sm block mb-1">Final Result</span>
                  <span className="text-3xl font-black">NET INCOME</span>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-[#F49420]">
                    ৳ {netIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <p className="text-blue-200 text-xs mt-1">Calculated automatically based on system data</p>
                </div>
              </div>
            </div>

            {/* Footer Notes */}
            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-400 text-xs">This report is strictly for internal use and contains confidential financial information.</p>
              <div className="flex justify-center gap-8 mt-6">
                <div className="text-center">
                  <div className="w-32 h-px bg-gray-300 mx-auto mb-2"></div>
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Authorized Signature</span>
                </div>
                <div className="text-center">
                  <div className="w-32 h-px bg-gray-300 mx-auto mb-2"></div>
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Accountant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitAndLoss;
