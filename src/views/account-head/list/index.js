"use client";
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import AccountHeadForm from '../form';
import DataTable from '@/components/common/DataTable';
import { accountHeadColumn } from './column';
import { useDeleteAccountHeadMutation, useGetAccountHeadsByQueryQuery } from '../store';
import { FaCirclePlus } from 'react-icons/fa6';
import { confirmDialog, confirmObj } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AccountHeadList() {
  const [openForm, setOpenForm] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const { data, isLoading: accountHeadsLoading } = useGetAccountHeadsByQueryQuery();
  const [deleteAccountHead, { isLoading: deleteAccountHeadLoading }] = useDeleteAccountHeadMutation();


  const handleNew = () => {
    setOpenForm(true);
  }

  const handleInfo = (rowData) => {
    setCurrentId(rowData?.id);
    setOpenForm(true);
  }
  const handleDelete = (rowData) => {
    confirmDialog(confirmObj).then(async (e) => {
      if (e.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        deleteAccountHead(rowData?.id).then(res => {
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
  const extraField = () => {
    return (
      <div>
        <Button
          onClick={() => setOpenForm(true)}
          className="border flex items-center gap-2 py-1 px-3 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[400]">
          <FaCirclePlus />
          New
        </Button>
      </div>
    );
  };
  return (
    <div>
      <div className="flex gap-3">
        <div className="w-full">
          <div className="p-2 bg-white shadow-lg w-full">
            <DataTable
              data={data?.data || []}
              columns={accountHeadColumn(handleDelete, handleInfo)}
              globalFilterFields={['name',]}
              emptyMessage="No account heads found."
              rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
              showGlobalFilter={true}
              globalFilterPlaceholder="Type here to search..."
              extraField={extraField()}
              loading={accountHeadsLoading}
            />
          </div>
        </div>
      </div>
      {openForm && <AccountHeadForm setOpenForm={setOpenForm} toggle={openForm} currentId={currentId} setCurrentId={setCurrentId} />}
    </div>
  )
}
