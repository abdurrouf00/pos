import { Button } from "@/components/ui/button";
import { Edit, Info, Trash2 } from "lucide-react";

export const attendanceTypeColumn = (handleDelete, handleInfo) => {
  const columns = [
    {
      field: "serial_no",
      header: "Serial No",
      sortable: true,
      style: { width: "150px" },
      filter: false,
    },
    {
      field: "name",
      header: "Name",
      sortable: true,
      filter: false,
    },
    {
      field: "short_name",
      header: "Short Name",
      sortable: true,
      filter: false,
    },
    {
      field: "color",
      header: "Color",
      sortable: true,
      filter: false,
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
