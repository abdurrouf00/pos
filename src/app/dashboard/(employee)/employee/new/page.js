import DashboardLayout from "@/components/layouts/DashboardLayout";
import EmployeeForm from "@/views/employee/form";
import React from "react";

const page = () => {
  return (
    <div className="flex gap-3">
      <div className="w-full min-h-[70vh]">
        <div className="p-2 bg-white shadow-lg w-full border-2 border-gray-200 rounded-lg">
          <EmployeeForm />
        </div>
      </div>
    </div>
  );
};

export default page;
