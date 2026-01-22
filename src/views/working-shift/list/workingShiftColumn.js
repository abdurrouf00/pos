import { Button } from "@/components/ui/button";
import { Info, Trash2 } from "lucide-react";

export const workingShiftColumn = (handleDelete, handleInfo) => {
    const columns = [
        {
            field: 'name',
            header: 'Shift Name',
            sortable: true,
        },
        {
            field: 'start_time',
            header: 'Start Time',
            sortable: true,
        },
        {
            field: 'end_time',
            header: 'End Time',
            sortable: true,
        },
        {
            field: 'after_allowed_minutes',
            header: 'After Allowed',
            sortable: true,
        },
        {
            field: 'before_allowed_minutes',
            header: 'Before Allowed',
            sortable: true,
        },
        {
            field: 'early_allowed_minutes',
            header: 'Early Allowed',
            sortable: true,
        },
        {
            field: 'late_allowed_minutes',
            header: 'Late Allowed',
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