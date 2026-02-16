'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { confirmDialog, confirmObj } from '@/lib/utils'
import toast from 'react-hot-toast'
import DataTable from '@/components/common/DataTable'
import {
  useGetMembershipPackagesQuery,
  useDeleteMembershipPackageMutation,
} from '../store'
import { getMembershipPackageColumns } from './columns'
import MembershipPackageForm from '../form'

export default function MembershipPackageList() {
  const { data, isLoading } = useGetMembershipPackagesQuery()
  const [deletePackage] = useDeleteMembershipPackageMutation()
  const [openModal, setOpenModal] = useState(false)
  const [editId, setEditId] = useState(null)

  const listData = data?.data?.data ?? data?.output?.data ?? []

  const handleEdit = rowData => {
    setOpenModal(true)
    setEditId(rowData.id)
  }

  const handleAddNew = () => {
    setOpenModal(true)
    setEditId(null)
  }

  const extraField = () => (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleAddNew}
        className="border flex items-center gap-2 py-1 px-3 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[400]"
      >
        <FaCirclePlus />
        New
      </Button>
    </div>
  )

  const handleDelete = rowData => {
    confirmDialog(confirmObj).then(async e => {
      if (e.isConfirmed) {
        const toastId = toast.loading('Deleting...')
        try {
          const res = await deletePackage(rowData?.id)
          toast.dismiss(toastId)
          if (res?.data?.success) {
            toast.success('Deleted successfully')
          } else {
            toast.error(res?.data?.msg || 'Failed to delete')
          }
        } catch {
          toast.dismiss(toastId)
          toast.error('Failed to delete')
        }
      }
    })
  }

  return (
    <div className="bg-white p-4 rounded-md">
      <DataTable
        data={listData}
        columns={getMembershipPackageColumns(handleEdit, handleDelete)}
        emptyMessage="No membership package found."
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        showGlobalFilter={true}
        globalFilterPlaceholder="Search by package name..."
        extraField={extraField()}
        className="custom_datatable"
        loading={isLoading}
        paginator
      />
      {openModal && (
        <MembershipPackageForm
          open={openModal}
          setOpen={setOpenModal}
          editId={editId}
          setEditId={setEditId}
        />
      )}
    </div>
  )
}
