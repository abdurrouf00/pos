import { Button } from "@/components/ui/button";
import { Info, Lock, Trash2 } from "lucide-react";

export const roleColumn = (handleDelete, handleInfo, handleAccess) => {
  const contractStyles = {
    yellow: "bg-yellow-100 text-yellow-600",
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-600",
  };
  const columns = [
    {
      field: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      header: 'Actions',
      sortable: false,
      body: (rowData) => (
        <div className="flex gap-2">
          <Button
            onClick={() => handleDelete(rowData)}
            className="bg-white hover:bg-white cursor-pointer">
            <Trash2 className="text-red-700" />
          </Button>
          <Button
            onClick={() => handleInfo(rowData)}
            className="bg-white hover:bg-white cursor-pointer">
            <Info className="text-gray-500 w-4 h-4" />
          </Button>
          <Button
            title="Access"
            onClick={() => handleAccess(rowData)}
            className="bg-white hover:bg-white cursor-pointer">
            <Lock className="text-green-700" />
          </Button>
        </div>
      ),
      style: { width: '100px' },
    },
  ];

  return columns;
};
