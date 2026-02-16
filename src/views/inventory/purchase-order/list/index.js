"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/common/DataTable";
import { poColumns } from "./poColumn";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { confirmDialog, confirmObj } from "@/lib/utils";
import {
  useGetAllPurchaseOrdersQuery,
  useDeletePurchaseOrderMutation,
} from "../store";

export default function PurchaseOrderList() {
  const router = useRouter();
  const { data, isLoading } = useGetAllPurchaseOrdersQuery();
  const [deletePurchaseOrder] = useDeletePurchaseOrderMutation();

  const listData = data?.data?.data ?? data?.data ?? [];
  const poData = Array.isArray(listData) ? listData : [];

  const handleDelete = (rowData) => {
    confirmDialog(confirmObj).then(async (e) => {
      if (e?.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        try {
          const res = await deletePurchaseOrder(rowData?.id);
          if (res?.data?.success) {
            toast.dismiss(toastId);
            toast.success(res?.data?.message ?? "Deleted successfully");
          } else {
            toast.dismiss(toastId);
            toast.error(res?.data?.message ?? "Failed to delete");
          }
        } catch (err) {
          toast.dismiss(toastId);
          toast.error(err?.data?.message ?? "Failed to delete");
        }
      }
    });
  };

  const handleEdit = (rowData) => {
    router.push(`/dashboard/purchase-order/${rowData.id}/edit`);
  };

  const handleView = (rowData) => {
    router.push(`/dashboard/purchase-order/${rowData.id}`);
  };

  const extraField = () => (
    <Button
      onClick={() => router.push("/dashboard/purchase-order/new-purchase-order")}
      className="border flex items-center gap-2 py-1 px-3 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[400]"
    >
      <Plus className="h-4 w-4" />
      New
    </Button>
  );

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden mt-5">
      <DataTable
        data={poData}
        columns={poColumns(handleDelete, handleEdit, handleView)}
        globalFilterFields={["id", "challan_no", "po_no", "vendor", "department"]}
        emptyMessage="No purchase orders found."
        rowsPerPageOptions={[5, 10, 25, 50]}
        showGlobalFilter={true}
        globalFilterPlaceholder="Search by ID, Vendor, or Challan..."
        className="custom_datatable h-full"
        loading={isLoading}
        extraField={extraField()}
        paginator
      />
    </div>
  );
}