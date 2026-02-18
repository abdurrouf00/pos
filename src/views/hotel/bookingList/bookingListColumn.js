import { Button } from "@/components/ui/button";
import { Trash2, Edit, Eye } from "lucide-react";

export const bookingListColumns = (handleDelete, handleEdit, handleView) => {
    return [
        {
            field: 'booking_no',
            header: 'BOOKING NO',
            sortable: false,
            body: (rowData) => (
                <span className="font-medium">{rowData.booking_no ?? rowData.id ?? '—'}</span>
            ),
        },
        {
            field: 'guest',
            header: 'GUEST',
            sortable: false,
            body: (rowData) => (
                <span className="text-center">{rowData.guest ?? '—'}</span>
            ),
        },
        {
            field: 'check_in',
            header: 'CHECK IN',
            sortable: true,
            body: (rowData) => (
                <span>{rowData.check_in ? new Date(rowData.check_in).toLocaleDateString() : '—'}</span>
            ),
        },
        {
            field: 'check_out',
            header: 'CHECK OUT',
            sortable: true,
            body: (rowData) => (
                <span>{rowData.check_out ? new Date(rowData.check_out).toLocaleDateString() : '—'}</span>
            ),
        },
        {
            field: 'room',
            header: 'ROOM',
            sortable: true,
            body: (rowData) => (
                <span className="font-medium text-gray-900">
                    {rowData.room?.display_name ?? rowData.room?.company_name ?? rowData.room_id ?? '—'}
                </span>
            ),
        },
        {
            field: 'total',
            header: 'TOTAL',
            sortable: false,
            body: (rowData) => {
                const amount = rowData.total ?? rowData.grand_total;
                return (
                    <span className="font-semibold text-blue-600">
                        {amount != null ? Number(amount).toFixed(2) : '—'}
                    </span>
                );
            },
        },
        {
            header: 'ACTIONS',
            sortable: false,
            body: (rowData) => (
                <div className="flex items-center gap-1">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => handleView(rowData)}
                    >
                        <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-[#f0ad4e] hover:text-[#ec971f] hover:bg-orange-50"
                        onClick={() => handleEdit(rowData)}
                    >
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-[#d9534f] hover:text-[#c9302c] hover:bg-red-50"
                        onClick={() => handleDelete(rowData)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ),
        }
    ];
};