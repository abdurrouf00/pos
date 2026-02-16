"use client";

import React from "react";
import { CirclePlay } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDeleteManualJournalMutation, useGetAllManualJournalsQuery } from "../store";
import DataTable from "@/components/common/DataTable";
import { manualJournalsColumn } from "./columns";
import { useRouter } from "next/navigation";
import { confirmDialog, confirmObj } from "@/lib/utils";
import toast from "react-hot-toast";
export default function FrontPage() {
  const router = useRouter()
  const {data: manualJournals, isLoading: manualJournalsLoading}=useGetAllManualJournalsQuery();
 const [deleteManualJournal] = useDeleteManualJournalMutation();

  const handleDelete = (rowData) => {
   confirmDialog(confirmObj).then(async (e) => {
    if (e.isConfirmed) {
      const toastId = toast.loading("Deleting...");
      const res = await deleteManualJournal(rowData?.id).unwrap();
      if (res) {
        toast.dismiss(toastId);
        toast.success("Deleted successfully");
      }
    }
   });
  }
  const handleInfo = (rowData) => {
    router.push(`/dashboard/manual-journals/form?id=${rowData.id}`)
  }
  return (
   <div className="w-full">
   {/* { manualJournals?.data?.data?.length > 0 ? */}
      <DataTable data={manualJournals?.data?.data}  
         columns={manualJournalsColumn(handleDelete, handleInfo)}
         globalFilterFields={['name',]}
         emptyMessage="No account heads found."
         rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
         showGlobalFilter={true}
         globalFilterPlaceholder="Type here to search..."
         loading={manualJournalsLoading} />
        
   {/* <div className="flex flex-col items-center justify-center h-120 p-5 gap-6">
     
      <div className="flex items-center gap-4 bg-amber-50 border h-50  p-15 rounded-lg md:hover:border-amber-100">
        <CirclePlay size={32} className="text-black" />
        <div className="pl-3 border-l-4 border-black">
          <img
            src="/hr360-logo-copy.png"
            alt="Logo"
            className="w-20 mb-1"
          />
          <p className="font-medium">How to create manual journals</p>
        </div>
      </div>

      <div className="text-center space-y-1">
        <p className="text-gray-700 font-medium">Start making journal entries.</p>
        <p className="text-gray-600 text-sm">You can transfer & adjust money between accounts.</p>
      </div>
      
      <Link href="/dashboard/manual-journals/form">
        <Button className="px-6 py-2 mt-2">Create New Journals</Button>
      </Link>
    </div> */}
    
   </div>
  );
}
