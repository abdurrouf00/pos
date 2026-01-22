import DashboardLayout from "@/components/layouts/DashboardLayout";
import AttendanceReportForm from "@/views/attendance-report/form";
import React from "react";

function page() {
  return (
    <div className="flex gap-3">
      <div className="w-full min-h-[70vh]">
        <div className="p-2 bg-white shadow-lg w-full border-2 border-gray-200 rounded-lg">
          <AttendanceReportForm />
        </div>
      </div>
    </div>
  );
}

export default page;
