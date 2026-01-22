import { Button } from "@/components/ui/button";
import { Info, Trash2 } from "lucide-react";

export const payScaleColumn = (handleDelete, handleInfo ) => {
    const columns = [
        {
            field: 'name',
            header: 'Name',
            sortable: true,
        },
        {
            field: 'salary_from',
            header: 'Salary From',
            sortable: true,
        },
        {
            field: 'salary_to',
            header: 'Salary To',
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