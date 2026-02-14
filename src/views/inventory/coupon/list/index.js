'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'

import { confirmDialog, confirmObj } from '@/lib/utils'
import toast from 'react-hot-toast'
import DataTable from '@/components/common/DataTable'
import {
  useGetAllCouponsQuery,
  useDeleteCouponMutation,
  useChangeCouponStatusMutation,
} from '../store'
import { getCouponsColumns } from './columns'
import CouponForm from '../form'

export default function CouponList() {
  const { data, isLoading } = useGetAllCouponsQuery()
  const [deleteCoupon] = useDeleteCouponMutation()
  const [changeCouponStatus, { isLoading: statusLoading }] = useChangeCouponStatusMutation()
  const [openModal, setOpenModal] = useState(false)
  const [editId, setEditId] = useState(null)

  const handleEdit = rowData => {
    setOpenModal(true)
    setEditId(rowData.id)
  }

  const handleAddNew = () => {
    setOpenModal(true)
    setEditId(null)
  }

  const extraField = () => {
    return (
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
  }

  const handleDelete = rowData => {
    confirmDialog(confirmObj).then(async e => {
      if (e.isConfirmed) {
        const toastId = toast.loading('Deleting...')
        deleteCoupon(rowData?.id).then(res => {
          if (res?.data?.success) {
            toast.dismiss(toastId)
            toast.success('Deleted successfully')
          } else {
            toast.dismiss(toastId)
            toast.error('Failed to delete')
          }
        })
      }
    })
  }

  const handleStatusChange = async (id, is_active) => {
    const toastId = toast.loading('Updating status...')
    try {
      const res = await changeCouponStatus({ id, is_active })
      toast.dismiss(toastId)
      if (res?.data?.success) {
        toast.success(res?.data?.message || 'Status updated successfully')
      } else {
        toast.error(res?.data?.message || 'Failed to update status')
      }
    } catch (error) {
      toast.dismiss(toastId)
      toast.error('Failed to update status')
    }
  }

  return (
    <div className="bg-white p-4 rounded-md">
      <DataTable
        data={data?.data?.data}
        columns={getCouponsColumns(handleEdit, handleDelete, handleStatusChange, statusLoading)}
        emptyMessage="No Coupon found."
        rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
        showGlobalFilter={true}
        globalFilterPlaceholder="Search by coupon name or code..."
        extraField={extraField()}
        className="custom_datatable"
        loading={isLoading}
        lazy
        paginator
      />
      {openModal && (
        <CouponForm open={openModal} setOpen={setOpenModal} editId={editId} setEditId={setEditId} />
      )}
    </div>
  )
}
