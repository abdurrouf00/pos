import { Button } from "@/components/ui/button";
import { Trash2, Edit, Eye } from "lucide-react";

export const poColumns = (handleDelete, handleEdit, handleView) => {
    return [
        {
            field: 'id',
            header: 'ID',
            sortable: false,
        },
        {
            field: 'source',
            header: 'SOURCE',
            sortable: false,
            body: (rowData) => (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    rowData.source === 'REQUISITION' 
                        ? 'bg-blue-50 text-blue-600 border-blue-200' 
                        : 'bg-green-50 text-green-600 border-green-200'
                }`}>
                    {rowData.source === 'REQUISITION' ? 'REQUISITION' : 'DIRECT'}
                </span>
            ),
        },
        {
            field: 'challan_no',
            header: 'CHALAN NO',
            sortable: false,
            className: "font-medium",
        },
        {
            field: 'po_date',
            header: 'PO DATE',
            sortable: true,
        },
        {
            field: 'receive_date',
            header: 'RECEIVE DATE',
            sortable: true,
        },
        {
            field: 'vendor',
            header: 'VENDOR',
            sortable: true,
            className: "font-bold text-gray-900",
        },
        {
            field: 'purchase_by',
            header: 'PURCHASE BY',
            sortable: false,
        },
        {
            field: 'grand_total',
            header: 'GRAND TOTAL',
            sortable: false,
            body: (rowData) => (
                <span className="font-black text-blue-600">
                    {rowData.grand_total?.toFixed(2)}
                </span>
            ),
        },
        {
            field: 'items_count',
            header: 'ITEMS',
            sortable: false,
            className: "text-center",
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