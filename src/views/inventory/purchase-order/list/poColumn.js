import { Button } from "@/components/ui/button";
import { Trash2, Edit, Eye } from "lucide-react";

export const poColumns = (handleDelete, handleEdit, handleView) => {
    return [
        {
            field: 'po_no',
            header: 'PO NO',
            sortable: false,
            body: (rowData) => (
                <span className="font-medium">{rowData.po_no ?? rowData.id ?? '—'}</span>
            ),
        },
        {
            field: 'source',
            header: 'SOURCE',
            sortable: false,
            body: (rowData) => {
                const fromRequisition = Array.isArray(rowData.requisition_ids) && rowData.requisition_ids.length > 0;
                return (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        fromRequisition ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-green-50 text-green-600 border-green-200'
                    }`}>
                        {fromRequisition ? 'REQUISITION' : 'DIRECT'}
                    </span>
                );
            },
        },
        {
            field: 'po_date',
            header: 'PO DATE',
            sortable: true,
            body: (rowData) => (
                <span>{rowData.po_date ? new Date(rowData.po_date).toLocaleDateString() : '—'}</span>
            ),
        },
        {
            field: 'delivery_date',
            header: 'DELIVERY DATE',
            sortable: true,
            body: (rowData) => (
                <span>{rowData.delivery_date ? new Date(rowData.delivery_date).toLocaleDateString() : '—'}</span>
            ),
        },
        {
            field: 'supplier',
            header: 'VENDOR',
            sortable: true,
            body: (rowData) => (
                <span className="font-medium text-gray-900">
                    {rowData.supplier?.display_name ?? rowData.supplier?.company_name ?? rowData.supplier_id ?? '—'}
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
            field: 'items_count',
            header: 'ITEMS',
            sortable: false,
            body: (rowData) => (
                <span className="text-center">{rowData.items?.length ?? rowData.items_count ?? '—'}</span>
            ),
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