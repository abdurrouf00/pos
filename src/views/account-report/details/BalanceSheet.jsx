"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, Download, Filter, ShieldCheck, Scale, Layers, ChevronRight } from "lucide-react";

const BalanceSheet = () => {
  const data = {
    assets: {
      current: [
        { name: "Cash and Equivalents", amount: 1580500.0 },
        { name: "Accounts Receivable", amount: 845600.0 },
        { name: "Inventory", amount: 2425000.0 },
        { name: "Prepaid Expenses", amount: 127800.0 },
      ],
      nonCurrent: [
        { name: "Property, Plant & Equipment", amount: 8350000.0 },
        { name: "Intangible Assets", amount: 450000.0 },
        { name: "Long-term Investments", amount: 1200000.0 },
      ]
    },
    liabilities: {
      current: [
        { name: "Accounts Payable", amount: 432000.0 },
        { name: "Accrued Expenses", amount: 115400.0 },
        { name: "Short-term Debt", amount: 525000.0 },
      ],
      longTerm: [
        { name: "Long-term Debt", amount: 2180000.0 },
        { name: "Deferred Tax Liabilities", amount: 112500.0 },
      ]
    },
    equity: [
      { name: "Common Stock", amount: 5000000.0 },
      { name: "Retained Earnings", amount: 6614000.0 },
    ]
  };

  const totalCurrentAssets = data.assets.current.reduce((acc, item) => acc + item.amount, 0);
  const totalNonCurrentAssets = data.assets.nonCurrent.reduce((acc, item) => acc + item.amount, 0);
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;

  const totalCurrentLiabilities = data.liabilities.current.reduce((acc, item) => acc + item.amount, 0);
  const totalLongTermLiabilities = data.liabilities.longTerm.reduce((acc, item) => acc + item.amount, 0);
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

  const totalEquity = data.equity.reduce((acc, item) => acc + item.amount, 0);
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;

  return (
    <div className="bg-[#f8fafc] min-h-screen p-4 md:p-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="max-w-6xl mx-auto">
        {/* Visual Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-[#282560] p-5 rounded-[2rem] shadow-2xl shadow-blue-200">
              <Scale className="text-white w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-[#282560] tracking-tighter">Balance Sheet</h1>
              <div className="flex items-center gap-3 mt-1">
                 <span className="text-xs font-bold bg-[#F49420] text-white px-3 py-1 rounded-full uppercase tracking-tighter">Verified</span>
                 <p className="text-gray-400 text-sm font-medium italic">Statement of Financial Position as of June 30, 2025</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Button variant="ghost" size="sm" className="rounded-xl hover:bg-slate-50 text-gray-600"><Printer className="w-4 h-4 mr-2" />Print</Button>
            <div className="w-px h-6 bg-gray-200 mx-2"></div>
            <Button variant="ghost" size="sm" className="rounded-xl hover:bg-slate-50 text-gray-600"><Download className="w-4 h-4 mr-2" />SVG</Button>
            <Button size="sm" className="rounded-xl bg-[#282560] hover:bg-[#1e1c4a] ml-2 px-6">Official Download</Button>
          </div>
        </div>

        {/* Global Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 border-b-4 border-b-blue-500">
              <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] block mb-2">Total Assets</span>
              <span className="text-3xl font-black text-[#282560]">৳ {totalAssets.toLocaleString()}</span>
           </div>
           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 border-b-4 border-b-orange-500">
              <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] block mb-2">Total Liabilities</span>
              <span className="text-3xl font-black text-[#282560]">৳ {totalLiabilities.toLocaleString()}</span>
           </div>
           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 border-b-4 border-b-emerald-500">
              <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] block mb-2">Total Equity</span>
              <span className="text-3xl font-black text-[#282560]">৳ {totalEquity.toLocaleString()}</span>
           </div>
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* ASSETS SECTION */}
          <div className="space-y-10">
            <section className="bg-white rounded-[2.5rem] shadow-xl border border-gray-50 overflow-hidden transform hover:-translate-y-1 transition-transform duration-500">
              <div className="bg-[#282560] px-10 py-6 flex justify-between items-center text-white">
                 <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-blue-300" />
                    <h2 className="font-black italic tracking-wider">ASSETS</h2>
                 </div>
                 <ShieldCheck className="w-5 h-5 opacity-30" />
              </div>
              
              <div className="p-10 space-y-12">
                {/* Current Assets */}
                <div>
                   <h3 className="text-[#282560] font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                     <div className="w-1.5 h-1.5 bg-[#F49420] rounded-full"></div>
                     Current Assets
                   </h3>
                   <div className="space-y-4">
                     {data.assets.current.map((item, i) => (
                       <div key={i} className="flex justify-between items-center group">
                         <span className="text-gray-500 group-hover:text-black transition-colors flex items-center gap-2">
                            <ChevronRight className="w-3 h-3 text-orange-200 group-hover:text-orange-400 transition-colors" />
                            {item.name}
                         </span>
                         <span className="font-mono text-sm font-bold text-[#282560]">৳ {item.amount.toLocaleString()}</span>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Non-Current Assets */}
                <div>
                   <h3 className="text-[#282560] font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                     <div className="w-1.5 h-1.5 bg-[#F49420] rounded-full"></div>
                     Non-Current Assets
                   </h3>
                   <div className="space-y-4">
                     {data.assets.nonCurrent.map((item, i) => (
                       <div key={i} className="flex justify-between items-center group">
                         <span className="text-gray-500 group-hover:text-black transition-colors flex items-center gap-2">
                           <ChevronRight className="w-3 h-3 text-orange-200 group-hover:text-orange-400 transition-colors" />
                           {item.name}
                         </span>
                         <span className="font-mono text-sm font-bold text-[#282560]">৳ {item.amount.toLocaleString()}</span>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="pt-8 border-t-2 border-[#282560]/5 mt-4 flex justify-between items-center">
                   <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Total Assets Balance</span>
                   <span className="text-3xl font-black text-[#282560] border-b-2 border-[#F49420]">৳ {totalAssets.toLocaleString()}</span>
                </div>
              </div>
            </section>
          </div>

          {/* LIABILITIES & EQUITY SECTION */}
          <div className="space-y-10">
            <section className="bg-white rounded-[2.5rem] shadow-xl border border-gray-50 overflow-hidden transform hover:-translate-y-1 transition-transform duration-500">
              <div className="bg-[#F49420] px-10 py-6 flex justify-between items-center text-white">
                 <div className="flex items-center gap-3">
                    <Scale className="w-5 h-5 text-orange-100" />
                    <h2 className="font-black italic tracking-wider uppercase">Liabilities & Equity</h2>
                 </div>
                 <ShieldCheck className="w-5 h-5 opacity-30" />
              </div>
              
              <div className="p-10 space-y-12">
                {/* Liabilities */}
                <div>
                   <h3 className="text-[#282560] font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                     <div className="w-1.5 h-1.5 bg-[#282560] rounded-full"></div>
                     Total Liabilities
                   </h3>
                   <div className="space-y-4">
                     {[...data.liabilities.current, ...data.liabilities.longTerm].map((item, i) => (
                       <div key={i} className="flex justify-between items-center group">
                         <span className="text-gray-500 group-hover:text-black transition-colors flex items-center gap-2">
                            <ChevronRight className="w-3 h-3 text-blue-200 group-hover:text-blue-400 transition-colors" />
                            {item.name}
                         </span>
                         <span className="font-mono text-sm font-bold text-red-600">৳ {item.amount.toLocaleString()}</span>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Equity */}
                <div>
                   <h3 className="text-[#282560] font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                     <div className="w-1.5 h-1.5 bg-[#282560] rounded-full"></div>
                     Shareholders' Equity
                   </h3>
                   <div className="space-y-4">
                     {data.equity.map((item, i) => (
                       <div key={i} className="flex justify-between items-center group">
                         <span className="text-gray-500 group-hover:text-black transition-colors flex items-center gap-2">
                           <ChevronRight className="w-3 h-3 text-blue-200 group-hover:text-blue-400 transition-colors" />
                           {item.name}
                         </span>
                         <span className="font-mono text-sm font-bold text-emerald-600">৳ {item.amount.toLocaleString()}</span>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="pt-8 border-t-2 border-orange-500/5 mt-4 flex justify-between items-center">
                   <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Combined Balance</span>
                   <span className="text-3xl font-black text-[#282560] border-b-2 border-emerald-500">৳ {totalLiabilitiesAndEquity.toLocaleString()}</span>
                </div>
              </div>
            </section>

            {/* Verification Note */}
            <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100 flex items-center gap-6">
               <div className="bg-emerald-500/10 p-4 rounded-2xl">
                  <ShieldCheck className="w-8 h-8 text-emerald-600" />
               </div>
               <div>
                  <h4 className="font-black text-emerald-800 tracking-tight">Financial Equilibrium Met</h4>
                  <p className="text-emerald-600/70 text-sm italic font-medium">Assets match the sum of Liabilities and Equity perfectly.</p>
               </div>
            </div>
          </div>
        </div>
        
        {/* Statement Footer */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col items-center">
           <img src="/muktodhara-logo.png" alt="Branding" className="h-6 opacity-30 grayscale mb-6" />
           <p className="text-[10px] text-gray-400 text-center max-w-lg font-bold tracking-[0.1em] leading-relaxed uppercase">
              CONFIDENTIAL • MUKTODHARA ENTERPRISE SOLUTIONS • ACCOUNTING MODULE v4.2.0 • {new Date().getFullYear()}
           </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheet;
