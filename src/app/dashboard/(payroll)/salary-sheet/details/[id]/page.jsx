import EditForm from "@/views/salary-sheet/form/EditForm";
import React, { use } from "react";

export default function SalarySheetDetails({ params }) {
  const { id } = use(params);
  console.log("sheet id", id);
  return <EditForm id={id} />;
}
