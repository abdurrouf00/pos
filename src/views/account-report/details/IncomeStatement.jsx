"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, Download, Filter, FileText, Calendar, DollarSign } from "lucide-react";

const IncomeStatement = () => {
  const data = {
    revenue: [
      { name: "Gross Sales", amount: 4850000.0 },
      { name: "Returns & Allowances", amount: -150000.0 },
      { name: "Other Operating Income", amount: 85000.0 },
    ],
    expenses: [
      { name: "Cost of Goods Sold", amount: 2150000.0, isCogs: true },
      { name: "Advertising", amount: 125000.0 },
      { name: "Depreciation", amount: 64200.0 },
      { name: "Insurance", amount: 32100.0 },
      { name: "Office Expenses", amount: 53400.0 },
      { name: "Rent", amount: 180000.0 },
      { name: "Salaries & Benefits", amount: 648000.0 },
      { name: "Utilities", amount: 42800.0 },
    ],
  };

  const totalRevenue = data.revenue.reduce((acc, item) => acc + item.amount, 0);
  const cogs = data.expenses.find(e => e.isCogs).amount;
  const grossProfit = totalRevenue - cogs;
  const totalOperatingExpenses = data.expenses.filter(e => !e.isCogs).reduce((acc, item) => acc + item.amount, 0);
  const operatingIncome = grossProfit - totalOperatingExpenses;
  const netIncome = operatingIncome;

  return (
    <div className="bg-[#f1f5f9] min-h-screen p-4 md:p-10 animate-in slide-in-from-bottom-2 duration-500">
      <div className="max-w-5xl mx-auto">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#282560] p-3 rounded-2xl shadow-lg">
              <FileText className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#282560] tracking-tight">Income Statement</h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Fiscal Year: 2024</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 self-end md:self-auto">
            <Button variant="outline" className="rounded-xl border-white bg-white/50 backdrop-blur shadow-sm hover:bg-white text-gray-700">
              <Printer className="w-4 h-4 mr-2" /> Print
            </Button>
            <Button className="rounded-xl bg-[#F49420] hover:bg-[#e08510] text-white shadow-lg shadow-orange-200">
              <Download className="w-4 h-4 mr-2" /> Export PDF
            </Button>
          </div>
        </div>

        {/* The Statement Paper */}
        <div className="bg-white rounded-[2rem] shadow-2xl border border-white overflow-hidden flex flex-col">
          {/* Statement Header */}
          <div className="p-10 text-center border-b border-gray-50 bg-slate-50/50">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-[#282560] text-xs font-bold rounded-full mb-4 uppercase tracking-[0.2em]">
              Financial Report
            </div>
            <h2 className="text-3xl font-black text-[#282560] mb-1 italic tracking-tight">MUKTODHARA</h2>
            <p className="text-gray-400 font-medium text-sm">Corporate Headquarters: Dhaka, Bangladesh</p>
            <div className="mt-6 flex justify-center items-center gap-4 text-sm font-semibold text-gray-600">
              <span>FOR THE PERIOD ENDED</span>
              <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
              <span className="text-[#F49420]">DECEMBER 31, 2024</span>
            </div>
          </div>

          {/* Statement Content */}
          <div className="p-10 md:p-16">
            <div className="space-y-12">
              
              {/* REVENUE SECTION */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                   <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-gray-100"></div>
                   <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest">Revenue Streams</h3>
                   <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-gray-100"></div>
                </div>
                
                <div className="space-y-4">
                  {data.revenue.map((item, i) => (
                    <div key={i} className="flex justify-between items-center group">
                      <span className="text-gray-600 group-hover:text-black transition-colors">{item.name}</span>
                      <span className={`font-mono text-sm ${item.amount < 0 ? 'text-red-500' : 'text-gray-900 font-bold'}`}>
                        {item.amount < 0 ? `৳ (${Math.abs(item.amount).toLocaleString()})` : `৳ ${item.amount.toLocaleString()}`}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 border-t-2 border-gray-50 mt-4">
                    <span className="text-[#282560] font-black text-lg">TOTAL REVENUE</span>
                    <span className="text-[#282560] font-black text-2xl">৳ {totalRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </section>

              {/* COGS & GROSS PROFIT */}
              <section className="bg-slate-50 p-8 rounded-3xl border border-blue-50/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium">Cost of Goods Sold (COGS)</span>
                  <span className="text-red-600 font-mono text-sm font-bold">৳ ({cogs.toLocaleString()})</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-blue-100/50">
                   <h3 className="text-[#282560] font-black text-2xl tracking-tighter">GROSS PROFIT</h3>
                   <div className="text-right">
                     <span className="text-[#282560] font-black text-4xl">৳ {grossProfit.toLocaleString()}</span>
                     <div className="text-[10px] text-blue-400 font-bold uppercase mt-1 tracking-wider">Margin: {((grossProfit/totalRevenue)*100).toFixed(1)}%</div>
                   </div>
                </div>
              </section>

              {/* EXPENSES SECTION */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                   <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-gray-100"></div>
                   <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest">Operating Expenses</h3>
                   <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-gray-100"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 px-2">
                  {data.expenses.filter(e => !e.isCogs).map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-gray-600 text-sm">{item.name}</span>
                      <span className="text-red-500 font-mono text-xs">৳ {item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-8 pt-4 border-t-2 border-dashed border-gray-100">
                  <span className="text-[#282560] font-bold">Total Operating Expenses</span>
                  <span className="text-red-600 font-black text-lg">৳ ({totalOperatingExpenses.toLocaleString()})</span>
                </div>
              </section>

              {/* FINAL SUMMARY */}
              <section className="mt-16 relative">
                 <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-6">
                    <div className="w-12 h-1 bg-[#F49420] rounded-full"></div>
                 </div>
                 
                 <div className="bg-[#282560] rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl overflow-hidden relative group">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-colors"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F49420]/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                       <div className="text-center md:text-left">
                          <span className="text-blue-300 font-bold text-xs uppercase tracking-[0.3em] block mb-2">Final Performance Index</span>
                          <h2 className="text-4xl font-black italic tracking-tighter">NET INCOME</h2>
                          <p className="text-blue-200/60 text-xs mt-3 max-w-xs">Representing the final profit after all operating costs and statutory obligations.</p>
                       </div>
                       
                       <div className="text-center md:text-right">
                          <div className="inline-flex items-center gap-2 mb-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
                             <DollarSign className="w-4 h-4 text-[#F49420]" />
                             <span className="text-[10px] font-black tracking-widest uppercase">Certified Result</span>
                          </div>
                          <div className="text-3xl md:text-4xl font-black text-[#F49420] drop-shadow-2xl">
                             ৳ {netIncome.toLocaleString()}
                          </div>
                       </div>
                    </div>
                 </div>
              </section>
            </div>

            {/* Verification Footer */}
            <div className="mt-20 flex flex-col md:flex-row justify-between items-end gap-10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
               <div className="text-[10px] text-gray-400 max-w-[200px] leading-relaxed">
                  Digitally generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}. 
                  Verified for accounting standards compatibility.
               </div>
               
               <div className="flex gap-16">
                  <div className="text-center">
                     <div className="h-px w-40 bg-gray-300 mb-2"></div>
                     <span className="text-[9px] font-black uppercase text-gray-500 tracking-tighter">Chief Financial Officer</span>
                  </div>
                  <div className="text-center">
                     <div className="h-px w-40 bg-gray-300 mb-2"></div>
                     <span className="text-[9px] font-black uppercase text-gray-500 tracking-tighter">Managing Director</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeStatement;
