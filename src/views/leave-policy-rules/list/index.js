"use client";
import DataTable from '@/components/common/DataTable';
import React, { useState } from 'react'
import { useDeleteLeavePolicyRuleMutation, useGetLeavePolicyRulesQuery } from '../store';
import { Button } from '@/components/ui/button';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { confirmDialog, confirmObj } from '@/lib/utils';
import FormModal from '../form';

export const columns = (handleEdit, handleDelete) => {
  const columns = [
    {
      header: "#SL",
      body: (row, { rowIndex }) => <span>{rowIndex + 1}</span>,
      style: {
        width: "100px",
        textAlign: "center",
      },
      sortable: false,
      filter: false,
    },
    {
      field: "leave_policy_group.name",
      header: "Leave Policy Group",
      sortable: true,
    },
    {
      field: "max_consecutive_days",
      header: "Max Consecutive Days",
      sortable: true,
    },
    {
      field: "min_service_days",
      header: "Min Service Days",
      sortable: true,
    },
    {
      field: "is_carry_forward",
      header: "Is Carry Forward",
      sortable: true,
      body: (rowData) => rowData.is_carry_forward ? "Yes" : "No",
    },

    {
      header: "Actions",
      sortable: false,
      body: (rowData) => (
        <div className="flex gap-2">
          <>
            <>
              <Button
                variant={"outline-success"}
                onClick={() => handleEdit(rowData)}
                className=""
                size={"sm"}
              >
                <Pencil size={10} />
              </Button>
              <Button
                variant={"outline-destructive"}
                onClick={() => handleDelete(rowData)}
                className=""
                size={"sm"}
              >
                <Trash2 className="text-xs" />
              </Button>
            </>



          </>
        </div>
      ),
      style: { width: "100px" },
    },
  ];

  return columns;
};
export default function LeavePolicyRulesList() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const { data: leavePolicyRules, isLoading } = useGetLeavePolicyRulesQuery();
  const [deleteLeavePolicy, { isLoading: deleteLeavePolicyLoading }] = useDeleteLeavePolicyRuleMutation();

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  }
  const extraField = () => {
    return (
      <div>
        <Button size="sm" onClick={handleOpenAddModal} variant={"primary"}>
          <Plus /> Add New
        </Button>
      </div>
    )
  }

  const handleEdit = (row) => {
    setEditId(row.id);
    setOpenAddModal(true);
  }
  const handleDelete = (rowData) => {
    confirmDialog(confirmObj).then(async (e) => {
      if (e.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        deleteLeavePolicy(rowData?.id).then(res => {
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

  };
  return (
    <div>
      <div className="bg-white px-4 pt-4 pb-8 rounded mx-0.5  border border-gray-100">
        {/* {user?.username ? (
          <div className="pb-3 flex justify-end">
            <Button onClick={handleOpenAddModal} variant={"primary"}>
              <Plus /> Add New
            </Button>
          </div>
        ) : null} */}

        <DataTable
          // loading={fetchingAllData}
          data={leavePolicyRules?.data?.data}
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
      </div>
      {openAddModal && <FormModal open={openAddModal} setOpen={setOpenAddModal} editId={editId} setEditId={setEditId} />}
    </div>
  )
}