import React, { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import DetailsEdit from "../form/DetailsEdit";

const columns = (handleEdit) => {
  const cols = [
    {
      field: "employee.name",
      header: "Name",
      sortable: true,
    },
    {
      field: "in_time",
      header: "In Time",
      sortable: true,
    },
    {
      field: "out_time",
      header: "Out Time",
      sortable: true,
    },

    {
      field: "working_shift.name",
      header: "Working Shift",
      sortable: true,
    },
    {
      header: "Actions",
      sortable: false,
      body: (rowData) => (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(rowData)}>Edit</Button>
        </div>
      ),
    },
  ];
  return cols;
};
export default function details(rowData, handleEdit) {
  // const [openEdit, setOpenEdit] = useState(false);
  // const handleEdit = () => {
  //   // setOpenEdit(true);
  // };

  return (
    <div>
      <DataTable
        data={rowData.attendance_details}
        columns={columns(handleEdit)}
        emptyMessage="No attendance details found."
        className="custom_datatable"
        paginator={false}
      />
    </div>
  );
}
