import { Button } from "@/components/ui/button";
import { Info, Trash2 } from "lucide-react";

export const departmentColumn = (handleDelete, handleInfo) => {
  const columns = [
    {
      field: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      field: 'has_overtime',
      header: 'Over Time',
      sortable: true,
    },
    {
      field: 'overtime_rate',
      header: 'Over Time Rate',
      sortable: true,
    },
    {
      field: 'min_overtime_minutes',
      header: 'Minimum Over Time Muniutes',
      sortable: true,
    },
    {
      header: 'Actions',
      sortable: false,
      body: (rowData) => (
        <div className="flex gap-2">
          <Button
            className="bg-white hover:bg-white cursor-pointer"
            onClick={() => handleDelete(rowData)}
          >
            <Trash2 className="text-red-700" />
          </Button>
          <Button
            className="bg-white hover:bg-white cursor-pointer"
            onClick={() => handleInfo(rowData)}
          >
            <Info className="text-gray-500 w-4 h-4" />
          </Button>
        </div>
      ),
      style: { width: '100px' },
    },
  ];

  return columns;
};
