import { Button } from "@/components/ui/button";
import { Edit, Info, Trash2 } from "lucide-react";

export const providentFundColumn = (handleInfo) => {
  const columns = [
    {
      field: "name",
      header: "Name",
      sortable: true,
    },
    {
      field: "department_id",
      header: "Department",
      sortable: true,
    },
    {
      field: "designation_id",
      header: "Designation",
      sortable: true,
    },
    {
      field: "total_amount",
      header: "Total Amount",
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
          {/* <Button
            className="bg-white hover:bg-white cursor-pointer"
            onClick={() => handleDelete(rowData)}
          >
            <Trash2 className="text-red-700" />
          </Button> */}
        </div>
      ),
      style: { width: "100px" },
    },
  ];

  return columns;
};
