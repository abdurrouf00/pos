'use client'
import DataTable from '@/components/common/DataTable'
import React, { useMemo, useState } from 'react'
import { getChannelsColumns } from './column'
import { Button } from '@/components/ui/button'
import { FaCirclePlus } from 'react-icons/fa6'
import ChannelsForm from '../form'
import { useDeleteChannelMutation, useGetAllChannelsQuery } from '../store'
import { confirmDialog, confirmObj } from '@/lib/utils'
import toast from 'react-hot-toast'

/** Active channels only, sorted by display_order ascending */
function getActiveChannelsSorted(rawList) {
  const list = Array.isArray(rawList) ? rawList : []
  return [...list]
    .filter(c => c.is_active === true)
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
}

export default function ChannelsList() {
  const [openModal, setOpenModal] = useState(false)
  const [editId, setEditId] = useState(null)

  const { data, isLoading } = useGetAllChannelsQuery()
  const [deleteChannel] = useDeleteChannelMutation()

  const channelList = useMemo(() => {
    const raw = data?.data?.data ?? data?.data ?? []
    return getActiveChannelsSorted(raw)
  }, [data])

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
        deleteChannel(rowData?.id).then(res => {
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
        data={channelList}
        columns={getChannelsColumns(handleEdit, handleDelete)}
        emptyMessage="No channels found."
        rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
        showGlobalFilter={true}
        globalFilterPlaceholder="Type here to search..."
        extraField={extraField()}
        className="custom_datatable"
        loading={isLoading}
        lazy
        paginator
      />
      {openModal && (
        <ChannelsForm open={openModal} setOpen={setOpenModal} editId={editId} setEditId={setEditId} />
      )}
    </div>
  )
}
