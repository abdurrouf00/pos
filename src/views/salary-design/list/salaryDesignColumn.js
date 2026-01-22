import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export const salaryDesignColumn = ( handleDelete, handleInfo ) => {
  const columns = [
    {
      field: "name",
      header: "Name",
      sortable: true,
    },
    {
      field: "Design Details",
      header: "Type",
      sortable: true,
    },
    {
      header: "Actions",
      sortable: false,
      body: ( rowData ) => (
        <div className="flex gap-2">
          <Button
            className="bg-white hover:bg-white cursor-pointer"
            onClick={() => handleInfo( rowData )}
          >
            <Edit className="text-gray-500 w-4 h-4" />
          </Button>
          <Button
            className="bg-white hover:bg-white cursor-pointer"
            onClick={() => handleDelete( rowData )}
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
