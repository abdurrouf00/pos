"use client";
import React, { useState } from 'react'
import { useDeleteEmployeeLeavePolicyMutation, useGetEmployeeLeavePoliciesQuery } from '../store';
import DataTable from '@/components/common/DataTable';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import FormModal from '../form';
import { confirmDialog, confirmObj } from '@/lib/utils';
import toast from 'react-hot-toast';
export default function EmployeeLeavePolicyList() {
  const { data: employeeLeavePolicies, isLoading } = useGetEmployeeLeavePoliciesQuery();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteEmployeeLeavePolicy, { isLoading: deleteEmployeeLeavePolicyLoading }] = useDeleteEmployeeLeavePolicyMutation();

  const extraField = () => {
    return (
      <div>
        <Button size="sm" onClick={handleOpenAddModal} variant={"primary"}>
          <Plus /> Add New
        </Button>
      </div>
    )
  }

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  }
  const handleEdit = (row) => {
    setEditId(row.id);
    setOpenAddModal(true);
  }
  const handleDelete = (rowData) => {
    confirmDialog(confirmObj).then(async (e) => {
      if (e.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        deleteEmployeeLeavePolicy(rowData?.id).then(res => {
          if (res?.data?.success) {
            toast.dismiss(toastId);
            toast.success("Deleted successfully");
          } else {
            toast.dismiss(toastId);
            toast.error("Failed to delete");
          }
        })
      }
    });
  }
  return (
    <div>
      <DataTable
        // loading={fetchingAllData}
        data={employeeLeavePolicies?.data?.data || []}
        columns={columns(handleEdit, handleDelete)}
        globalFilterFields={["name"]}
        emptyMessage="No leave applications found."
        rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
        showGlobalFilter={true}
        className="custom_datatable"
        globalFilterPlaceholder="Type here to search..."
        extraField={extraField()}
        loading={isLoading}
      />
      <FormModal open={openAddModal} setOpen={setOpenAddModal} editId={editId} setEditId={setEditId} />
    </div>
  )
}