'use client'
import { Button } from '@/components/ui/button'
import React, { useState, useRef } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'

import { confirmDialog, confirmObj } from '@/lib/utils'
import toast from 'react-hot-toast'
import DataTable from '@/components/common/DataTable'
import {
  useGetAllRequisitionsQuery,
  useDeleteRequisitionMutation,
  useSubmitRequisitionMutation,
  useApproveRequisitionMutation,
  useGetRequisitionByIdQuery,
} from '../store'
import { getRequisitionsColumns } from './columns'
import ApproveRequisitionModal from './ApproveRequisitionModal'

const STATUS_LABELS = {
  1: 'Draft',
  2: 'Submitted',
  3: 'Approved',
  4: 'Rejected',
  5: 'Converted to PO',
  6: 'Cancelled',
}

const PRIORITY_LABELS = { 0: 'Low', 1: 'Normal', 2: 'High', 3: 'Urgent' }

const STATUS_DRAFT = 1
const STATUS_SUBMITTED = 2

export default function RequisitionList() {
  const router = useRouter()
  const [approveModalOpen, setApproveModalOpen] = useState(false)
  const [selectedRequisitionId, setSelectedRequisitionId] = useState(null)
  /** 'submit' = call submit API (Draft), 'approve' = call approve API (Submitted) */
  const [approveModalIntent, setApproveModalIntent] = useState('approve')
  /** Captured when "Make Approve" is clicked so modal always has valid id (avoids state timing) */
  const approveRequisitionIdRef = useRef(null)

  const { data, isLoading } = useGetAllRequisitionsQuery()
  const { data: requisitionDetail, isLoading: isLoadingRequisition } = useGetRequisitionByIdQuery(
    selectedRequisitionId,
    {
      skip: !selectedRequisitionId || !approveModalOpen,
    }
  )
  const [deleteRequisition] = useDeleteRequisitionMutation()
  const [submitRequisition, { isLoading: isSubmittedRequisition }] = useSubmitRequisitionMutation()
  const [approveRequisition, { isLoading: isApproveSubmitting }] = useApproveRequisitionMutation()

  const listData = data?.data?.data ?? data?.data ?? []
  const requisitionForModal = requisitionDetail?.data ?? requisitionDetail

  const handleEdit = rowData => {
    router.push(`/dashboard/requisition/${rowData.id}/edit`)
  }

  const handleView = rowData => {
    router.push(`/dashboard/requisition/${rowData.id}`)
  }

  const handleApproveClick = rowData => {
    const id = rowData?.id ?? rowData?.uuid ?? rowData?.requisition_id
    if (!id) {
      toast.error('Requisition id not found. Please refresh the list.')
      return
    }
    approveRequisitionIdRef.current = id
    setSelectedRequisitionId(id)
    setApproveModalIntent(Number(rowData?.status) === 1 ? 'submit' : 'approve')
    setApproveModalOpen(true)
  }

  const handleSubmitFromModal = async ({ requisitionId, payload } = {}) => {
    const id = requisitionId ?? approveRequisitionIdRef.current ?? selectedRequisitionId
    if (!id) return
    try {
      console.log('submitFromModal', id, payload)
      const res = await approveRequisition({ id, data: payload })
      if (res?.data?.success) {
        toast.success(res?.data?.message ?? 'Submitted successfully')
        setApproveModalOpen(false)
        setSelectedRequisitionId(null)
      } else {
        toast.error(res?.data?.message ?? 'Failed to submit')
      }
    } catch (err) {
      toast.error(err?.data?.message ?? 'Failed to submit')
    }
  }

  const handleApproveConfirm = async ({ requisitionId, payload } = {}) => {
    const id = requisitionId ?? approveRequisitionIdRef.current ?? selectedRequisitionId
    if (!id) {
      toast.error('Requisition id is missing.')
      return
    }
    try {
      console.log('approveRequisition', id, payload)
      const res = await approveRequisition({ id, data: payload })
      if (res?.data?.success) {
        toast.success(res?.data?.message ?? 'Approved successfully')
        setApproveModalOpen(false)
        setSelectedRequisitionId(null)
      } else {
        toast.error(res?.data?.message ?? 'Failed to approve')
      }
    } catch (err) {
      toast.error(err?.data?.message ?? 'Failed to approve')
    }
  }

  const handleAddNew = () => {
    router.push('/dashboard/requisition/new-requisition')
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
        deleteRequisition(rowData?.id).then(res => {
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

  return (
    <div className="bg-white p-4 rounded-md">
      <DataTable
        data={listData}
        columns={getRequisitionsColumns(
          handleEdit,
          handleDelete,
          handleView,
          handleApproveClick,
          STATUS_LABELS,
          PRIORITY_LABELS
        )}
        emptyMessage="No requisition found."
        rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
        showGlobalFilter={true}
        globalFilterPlaceholder="Search by requisition no, requested for..."
        extraField={extraField()}
        className="custom_datatable"
        loading={isLoading}
        lazy
        paginator
      />
      <ApproveRequisitionModal
        open={approveModalOpen}
        onOpenChange={open => {
          setApproveModalOpen(open)
          if (!open) {
            setSelectedRequisitionId(null)
            approveRequisitionIdRef.current = null
            setApproveModalIntent('approve')
          }
        }}
        requisition={requisitionForModal}
        requisitionId={
          approveRequisitionIdRef.current ??
          selectedRequisitionId ??
          requisitionForModal?.id ??
          null
        }
        intent={approveModalIntent}
        onConfirm={handleApproveConfirm}
        onSubmit={handleSubmitFromModal}
        isSubmitting={isSubmittedRequisition}
        isSubmitSubmitting={isSubmittedRequisition}
        isLoadingRequisition={isSubmittedRequisition}
      />
    </div>
  )
}
