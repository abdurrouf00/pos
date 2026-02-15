"use client";

import React, { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { poColumns } from "./poColumn";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

const mockPOData = [
    {
        id: "1",
        source: "REQUISITION",
        challan_no: "CH-8821",
        po_date: "2026-02-14",
        receive_date: "2026-02-15",
        vendor: "Global Traders",
        department: "Sweet Factory 1",
        warehouse: "Main Warehouse",
       
        purchase_by: "Admin User",
        grand_total: 12500.50,
        items_count: 5,
    },
    {
        id: "2",
        source: "DIRECT",
        challan_no: "CH-8825",
        po_date: "2026-02-14",
        receive_date: "2026-02-14",
        vendor: "local Supplier",
        department: "Sweet Factory 1",
        warehouse: "Main Warehouse",
       
        purchase_by: "Admin User",
        grand_total: 3420.00,
        items_count: 2,
    }
];

export default function PurchaseOrderList() {
    const [poData, setPoData] = useState(mockPOData);
    const [loading, setLoading] = useState(false);

    const handleDelete = (rowData) => {
        setPoData(prev => prev.filter(item => item.id !== rowData.id));
        toast.error('PO Deleted Successfully');
    };

    const handleEdit = (rowData) => {
        console.log("Edit PO:", rowData);
        toast.success(`Editing PO: ${rowData.id}`);
    };

    const handleView = (rowData) => {
        console.log("View PO:", rowData);
    };

    return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden mt-5 ">
        <DataTable
            data={poData}
            columns={poColumns(handleDelete, handleEdit, handleView)}
            globalFilterFields={['id', 'challan_no', 'vendor', 'department']}
            emptyMessage="No purchase orders found."
            rowsPerPageOptions={[5, 10, 25, 50]}
            showGlobalFilter={true}
            globalFilterPlaceholder="Search by ID, Vendor, or Challan..."
            className="custom_datatable h-full"
            loading={loading}
        />
    </div>
      
    );
}