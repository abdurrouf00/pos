import { Button } from "@/components/ui/button";
import { Info, Trash2 } from "lucide-react";

export const employeeCategoryColumn = (handleDelete, handleInfo) => {
    const columns = [
        {
            field: 'name',
            header: 'Category Name',
            sortable: true,
        },
        {
            header: 'Actions',
            sortable: false,
            body: (rowData) => (
                <div className="flex gap-2">
                    <Button 
                        onClick={() => handleDelete(rowData)}
                        className="bg-white hover:bg-white cursor-pointer"
                    >
                        <Trash2 className="text-red-700" />
                    </Button>
                    <Button 
                        onClick={() => handleInfo(rowData)}
                        className="bg-white hover:bg-white cursor-pointer"
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