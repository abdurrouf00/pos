import EmployeeForm from "@/views/employee/form";
import React, { use } from "react";

function employeeEdit({ params }) {
  const { empId } = use(params);

  return <EmployeeForm id={empId} />;
}

export default employeeEdit;
