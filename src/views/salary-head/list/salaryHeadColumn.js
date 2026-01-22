import { Button } from "@/components/ui/button";
import { Edit, Info, Trash2 } from "lucide-react";

const types = {
  "1": "Addition",
  "2": "Deduction",
}
const calcTypes = {
  "1": "Fixed ",
  "2": "Percentage",
}
export const salaryHeadColumn = (handleDelete, handleInfo) => {
  const columns = [
    {
      field: "name",
      header: "Name",
      sortable: true,
    },
    {
      field: "type",
      header: "Type",
      sortable: true,
      body: (rowData) => types[rowData.type],
    },
    {
      field: "calc_type",
      header: "Calc Type",
      sortable: true,
      body: (rowData) => calcTypes[rowData.calc_type],
    },
    {
      field: "amount",
      header: "Amount",
      sortable: true,
    },
    {
      header: "Actions",
      sortable: false,
      body: (rowData) => (
        <div className="flex gap-2" hidden={!rowData.organization_id}>
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
