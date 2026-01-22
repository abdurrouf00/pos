import { Button } from "@/components/ui/button";
import { Edit, Info, Trash2 } from "lucide-react";

export const loanColumn = (handleDelete, handleInfo) => {
  const columns = [
    {
      field: "employee.name",
      header: "Employee Name",
      sortable: true,
      // hidden: true,

    },
    // {
    //   field: "department_id",
    //   header: "Department",
    //   sortable: true,
    // },
    // {
    //   field: "designation_id",
    //   header: "Designation",
    //   sortable: true,
    // },
    {
      field: "loan_amount",
      header: "Loan Amount",
      sortable: true,
    },
    {
      field: "installment_amount",
      header: "Installment Amount",
      sortable: true,
    },
    {
      field: "installment_number",
      header: "Installment Number",
      sortable: true,
    },
    {
      field: "start_date",
      header: "Start Date",
      sortable: true,
    },
    {
      field: "end_date",
      header: "End Date",
      sortable: true,
    },
    {
      header: "Actions",
      sortable: false,
      body: (rowData) => (
        <div className="flex gap-2">
          <Button
            className="bg-white hover:bg-white cursor-pointer"
            onClick={() => handleInfo(rowData)}
          >
            <Edit className="text-gray-500 w-4 h-4" />
          </Button>
          <Button
            className="bg-white hover:bg-white cursor-pointer"
            onClick={() => handleDelete(rowData)}
          >
            <Trash2 className="text-red-700" />
          </Button>
        </div>
      ),
      style: { width: "100px" },
    },
  ];

  return columns;
};
