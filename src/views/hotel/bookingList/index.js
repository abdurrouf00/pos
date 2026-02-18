"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/common/DataTable";
import { bookingListColumns } from "./bookingListColumn";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function BookingList() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Dummy data for bookings
  const [bookingListData] = useState([
    {
      id: "1",
      booking_no: "BK-2026-001",
      source: "DIRECT",
      check_in: "2026-02-15",
      check_out: "2026-02-18",
      room: { display_name: "Room 101 (Deluxe)" },
      total: 360.00,
      guest: "John Doe",
      requisition_ids: []
    },
    {
      id: "2",
      booking_no: "BK-2026-002",
      source: "REQUISITION",
      check_in: "2026-02-16",
      check_out: "2026-02-17",
      room: { display_name: "Room 205 (Standard)" },
      total: 1200.00,
      guest: "Jane Smith",
      requisition_ids: ["REQ-001"]
    },
    {
      id: "3",
      booking_no: "BK-2026-003",
      source: "DIRECT",
      check_in: "2026-02-18",
      check_out: "2026-02-20",
      room: { display_name: "Room 302 (Suite)" },
      total: 500.00,
      guest: "Robert Brown",
      requisition_ids: []
    }
  ]);

  const handleDelete = (rowData) => {   
      
        const toastId = toast.loading("Deleting...");
        try {   
            toast.dismiss(toastId);
            toast.success("Deleted successfully");
          
        } catch (err) {
          toast.dismiss(toastId);
          toast.error("Failed to delete");
        }
      
    };

  const handleEdit = (rowData) => {
    router.push(`/dashboard/room-booking/${rowData.id}/edit`);
  };

  const handleView = (rowData) => {
    router.push(`/dashboard/room-booking/${rowData.id}`);
  };

  const extraField = () => (
    <Button
      onClick={() => router.push("/dashboard/room-booking/new-room-booking")}
      className="border flex items-center gap-2 py-1 px-3 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[400]"
    >
      <Plus className="h-4 w-4" />
      New
    </Button>
  );

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden mt-5">
      <DataTable
        data={bookingListData}
        columns={bookingListColumns(handleDelete, handleEdit, handleView)}
        globalFilterFields={["id", "booking_no", "check_in", "check_out", "room", "guest"]}
        emptyMessage="No bookings found."
        rowsPerPageOptions={[5, 10, 25, 50]}
        showGlobalFilter={true}
        globalFilterPlaceholder="Search by ID, Booking No, Check In, Check Out, Room, Guest..."
        className="custom_datatable h-full"
        loading={isLoading}
        extraField={extraField()}
        paginator
      />
    </div>
  );
}
