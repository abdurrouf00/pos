"use client";
import React from "react";
import ProfitAndLoss from "./ProfitAndLoss";
import IncomeStatement from "./IncomeStatement";
import CashFlowStatement from "./CashFlowStatement";
import BalanceSheet from "./BalanceSheet";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReportDetails = () => {
  const params = useParams();
  const router = useRouter();
  const reportType = params.type;

  // Function to render the specific report based on slug/type
  const renderReport = () => {
    switch (reportType) {
      case "profit-and-loss":
        return <ProfitAndLoss />;
      case "income-statement":
        return <IncomeStatement />;
      case "cash-flow-statement":
        return <CashFlowStatement />;
      case "balance-sheet":
        return <BalanceSheet />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-3xl border border-blue-100 shadow-sm mx-4">
            <div className="bg-blue-50 p-6 rounded-full mb-6">
              <svg className="w-16 h-16 text-[#282560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#282560] mb-2">Report in Progress</h2>
            <p className="text-gray-500 max-w-md">
              The <span className="font-bold text-[#F49420]">{reportType?.replace(/-/g, " ")}</span> report details are currently being generated or integrated. 
              Please check back shortly or view available reports.
            </p>
            <Button 
              onClick={() => router.back()}
              className="mt-8 bg-[#282560] hover:bg-[#1e1c4a] rounded-full px-8"
            >
              Back to Reports
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-700">
      <div className="pb-4 px-4 md:px-8 pt-4">
         <button 
           onClick={() => router.back()}
           className="flex items-center gap-2 text-[#282560] font-semibold hover:text-[#F49420] transition-colors"
         >
           <ChevronLeft className="w-5 h-5" /> Back to All Reports
         </button>
      </div>
      {renderReport()}
    </div>
  );
};

export default ReportDetails;
