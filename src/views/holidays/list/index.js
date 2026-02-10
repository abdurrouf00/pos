'use client'
import React from 'react'
import { columns } from './column'
import DataTable from '@/components/common/DataTable'
// import { useGetHolidaysQuery } from '../store'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import HolidayForm from '../form'
import { useGetHolidaysQuery, useDeleteHolidayMutation } from '../store'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { confirmDialog, confirmObj } from '@/lib/utils'
const HolidayList = () => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const { data: holidays, isLoading } = useGetHolidaysQuery()
  const [deleteHoliday, { isLoading: deleteHolidayLoading }] = useDeleteHolidayMutation()
  const handleEdit = row => {
    setEditId(row.group_id)
    setOpenAddModal(true)
  }
  console.log('edit list id', editId)
  const handleDelete = row => {
    confirmDialog(confirmObj).then(async e => {
      if (e.isConfirmed) {
        const toastId = toast.loading('Deleting...')
        deleteHoliday(row.id).then(res => {
          console.log('res', res)
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
  const extraField = () => {
    return (
      <div>
        <Button onClick={() => setOpenAddModal(true)}>Add New</Button>
      </div>
    )
  }
  return (
    <div>
      <div className="bg-white px-4 pt-4 pb-8 rounded mx-0.5  border border-gray-100">
        <DataTable
          // loading={fetchingAllData}
          data={holidays?.data?.data}
          columns={columns(handleEdit, handleDelete)}
          globalFilterFields={['name']}
          emptyMessage="No holidays found."
          rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
          showGlobalFilter={true}
          className="custom_datatable"
          globalFilterPlaceholder="Type here to search..."
          extraField={extraField()}
          loading={isLoading}
        />
      </div>
      {openAddModal && (
        <HolidayForm
          open={openAddModal}
          setOpen={setOpenAddModal}
          editId={editId}
          setEditId={setEditId}
        />
      )}
    </div>
  )
}

export default HolidayList
