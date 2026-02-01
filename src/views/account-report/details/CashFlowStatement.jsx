"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, Download, Filter, TrendingUp, TrendingDown, Wallet, Activity, ArrowRight } from "lucide-react";

const CashFlowStatement = () => {
  const data = {
    operating: [
      { name: "Net Income", amount: 1265000.0, isStarting: true },
      { name: "Depreciation & Amortization", amount: 240000.0 },
      { name: "Increase in Accounts Receivable", amount: -185000.0 },
      { name: "Decrease in Inventory", amount: 84200.0 },
      { name: "Increase in Accounts Payable", amount: 95600.0 },
    ],
    investing: [
      { name: "Purchase of Equipment", amount: -450000.0 },
      { name: "Sale of Investments", amount: 280000.0 },
    ],
    financing: [
      { name: "Repayment of Long-term Debt", amount: -325000.0 },
      { name: "Dividends Paid", amount: -150000.0 },
      { name: "Proceeds from Stock Issuance", amount: 500000.0 },
    ],
    cash: {
      beginning: 845000.0,
      ending: 2199800.0
    }
  };

  const netOperating = data.operating.reduce((acc, item) => acc + item.amount, 0);
  const netInvesting = data.investing.reduce((acc, item) => acc + item.amount, 0);
  const netFinancing = data.financing.reduce((acc, item) => acc + item.amount, 0);
  const netChange = netOperating + netInvesting + netFinancing;

  return (
    <div className="bg-[#f0f4f8] min-h-screen p-4 md:p-10 animate-in fade-in zoom-in-95 duration-500">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-5">
            <div className="bg-gradient-to-br from-[#282560] to-[#4a46a3] p-4 rounded-3xl shadow-xl rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <Wallet className="text-white w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#282560] tracking-tight">Cash Flow Statement</h1>
              <p className="text-gray-400 font-medium flex items-center gap-2 mt-1">
                <Activity className="w-4 h-4 text-[#F49420]" />
                Monitored liquidity for FY 2024
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="rounded-2xl text-gray-500 hover:text-[#282560] hover:bg-white/50">
              <Filter className="w-4 h-4 mr-2" /> Adjust Period
            </Button>
            <div className="h-10 w-px bg-gray-200"></div>
            <Button className="rounded-2xl bg-[#282560] hover:bg-[#1e1c4a] text-white shadow-lg shadow-blue-100 px-6 font-bold">
              <Download className="w-4 h-4 mr-2" /> Download Report
            </Button>
          </div>
        </div>

        {/* The Statement Body */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white overflow-hidden">
          {/* Org Branding */}
          <div className="p-12 text-center bg-gradient-to-b from-slate-50 to-white">
            <h2 className="text-4xl font-black text-[#282560] mb-2 tracking-tighter">MUKTODHARA</h2>
            <div className="flex justify-center items-center gap-4">
              <div className="h-px w-8 bg-[#F49420]"></div>
              <span className="text-xs font-black uppercase text-gray-400 tracking-[0.4em]">Cash Flow Analysis</span>
              <div className="h-px w-8 bg-[#F49420]"></div>
            </div>
          </div>

          <div className="px-12 pb-20 pt-4 space-y-16">
            
            {/* OPERATING ACTIVITIES */}
            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#282560] to-transparent rounded-full opacity-20"></div>
              <h3 className="text-[#282560] font-black text-xl mb-8 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-xs">01</span>
                OPERATING ACTIVITIES
              </h3>
              
              <div className="space-y-5 px-4">
                {data.operating.map((item, i) => (
                  <div key={i} className={`flex justify-between items-center ${item.isStarting ? 'pb-4 mb-4 border-b border-gray-100 font-bold' : ''}`}>
                    <span className="text-gray-600 italic">{item.name}</span>
                    <span className={`font-mono ${item.amount < 0 ? 'text-red-500' : 'text-emerald-600 font-bold'}`}>
                      {item.amount < 0 ? `(${Math.abs(item.amount).toLocaleString()})` : item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-6 bg-slate-50/50 -mx-4 px-8 py-4 rounded-2xl border border-blue-50">
                   <span className="text-[#282560] font-black uppercase text-sm tracking-wider">Net Cash from Operating</span>
                   <span className="text-[#282560] font-black text-3xl">৳ {netOperating.toLocaleString()}</span>
                </div>
              </div>
            </section>

            {/* INVESTING ACTIVITIES */}
            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F49420] to-transparent rounded-full opacity-20"></div>
              <h3 className="text-[#282560] font-black text-xl mb-8 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-xs text-[#F49420]">02</span>
                INVESTING ACTIVITIES
              </h3>
              
              <div className="space-y-5 px-4">
                {data.investing.map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-600 italic">{item.name}</span>
                    <span className={`font-mono ${item.amount < 0 ? 'text-red-500' : 'text-emerald-600 font-bold'}`}>
                      {item.amount < 0 ? `(${Math.abs(item.amount).toLocaleString()})` : item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-6 bg-orange-50/20 -mx-4 px-8 py-4 rounded-2xl border border-orange-50/50">
                   <span className="text-[#F49420] font-black uppercase text-sm tracking-wider">Net Cash from Investing</span>
                   <span className="text-[#F49420] font-black text-3xl">৳ ({Math.abs(netInvesting).toLocaleString()})</span>
                </div>
              </div>
            </section>

            {/* FINANCING ACTIVITIES */}
            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#282560] to-transparent rounded-full opacity-20"></div>
              <h3 className="text-[#282560] font-black text-xl mb-8 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-xs">03</span>
                FINANCING ACTIVITIES
              </h3>
              
              <div className="space-y-5 px-4">
                {data.financing.map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-600 italic">{item.name}</span>
                    <span className={`font-mono ${item.amount < 0 ? 'text-red-500' : 'text-emerald-600 font-bold'}`}>
                      {item.amount < 0 ? `(${Math.abs(item.amount).toLocaleString()})` : item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-6 bg-slate-50/50 -mx-4 px-8 py-4 rounded-2xl border border-blue-50 text-[#282560]">
                   <span className="font-black uppercase text-sm tracking-wider">Net Cash from Financing</span>
                   <span className="font-black text-3xl">৳ ({Math.abs(netFinancing).toLocaleString()})</span>
                </div>
              </div>
            </section>

            {/* SUMMARY HIGHLIGHTS */}
            <section className="pt-10 border-t-4 border-double border-gray-100">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className=" p-8 rounded-[2.5rem] border border-gray-100 flex flex-col justify-center items-center text-center group bg-[#282560] hover:bg-[#F49420] text-white transition-all duration-500">
                     <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-white/10">
                        <TrendingUp className="w-6 h-6 text-[#282560] group-hover:text-blue-300" />
                     </div>
                     <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Net Change in Cash</span>
                     <span className="text-5xl font-black">৳ {netChange.toLocaleString()}</span>
                  </div>

                  <div className="bg-[#F49420] hover:bg-[#282560] p-8 rounded-[2.5rem] text-white flex flex-col justify-center items-center text-center shadow-2xl shadow-orange-100">
                     <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Ending Cash Balance</span>
                     <span className="text-6xl font-black">৳ {data.cash.ending.toLocaleString()}</span>
                     <div className="mt-4 flex items-center gap-2 text-[10px] font-bold bg-white/10 px-4 py-1.5 rounded-full">
                        <ArrowRight className="w-3 h-3" />
                        PREVIOUS: ৳ {data.cash.beginning.toLocaleString()}
                     </div>
                  </div>
               </div>
            </section>
          </div>
        </div>
        
        <div className="mt-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
           Automated Financial Summary • Muktodhara Accounting Systems • 2024
        </div>
      </div>
    </div>
  );
};

export default CashFlowStatement;
