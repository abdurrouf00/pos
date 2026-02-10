'use client'

import DataTable from '@/components/common/DataTable'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { confirmDialog, confirmObj } from '@/lib/utils'
import { useDispatch, useSelector } from 'react-redux'
import { deleteLeaveType, getAllLeaveType } from '@/views/leave-type/store'
import toast from 'react-hot-toast'
import FormModal from '@/views/leave-type/form/FormModal'

export const columns = (handleDelete, handleEdit) => {
  //
  const columns = [
    {
      header: '#SL',
      field: 'serial_no',
      style: {
        width: '100px',
        textAlign: 'center',
      },
      sortable: false,
      filter: false,
    },
    {
      field: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      field: 'short_name',
      header: 'Short Name',
      sortable: true,
    },
    {
      header: 'Actions',
      sortable: false,
      body: rowData => (
        <div className="flex gap-2">
          <Button
            variant={'outline-success'}
            onClick={() => handleEdit(rowData)}
            className=""
            size={'sm'}
          >
            <Pencil size={10} />
          </Button>
          <Button
            variant={'outline-destructive'}
            onClick={() => handleDelete(rowData)}
            className=""
            size={'sm'}
          >
            <Trash2 className="text-xs" />
          </Button>
        </div>
      ),
      style: { width: '100px' },
    },
  ]

  return columns
}

export default function LeaveType() {
  const [openFormModal, setOpenFormModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const { data, fetchingAllData } = useSelector(state => state.leaveType)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllLeaveType())
  }, [])
  const handleDelete = async row => {
    confirmDialog(confirmObj).then(async e => {
      if (e.isConfirmed) {
        const toastId = toast.loading('Deleting...')
        const res = await dispatch(deleteLeaveType(row.id)).unwrap()

        if (res) {
          toast.dismiss(toastId)
          toast.success('Deleted successfully')
          dispatch(getAllLeaveType())
        } else {
          toast.dismiss(toastId)
          toast.error('Failed to delete')
        }
      }
    })
  }

  const handleOpenFormModal = () => {
    setOpenFormModal(true)
  }
  const handleEdit = row => {
    setEditId(row.id)
    setOpenFormModal(true)
  }
  return (
    <>
      <div className="bg-white px-4 pt-4 pb-8 rounded mx-0.5  border border-gray-100">
        <div className="pb-3 flex justify-end">
          <Button onClick={handleOpenFormModal} variant={'primary'}>
            <Plus /> Add New
          </Button>
        </div>
        <DataTable
          loading={fetchingAllData}
          data={data?.data}
          columns={columns(handleDelete, handleEdit)}
          globalFilterFields={['name']}
          emptyMessage="No leave types found."
          rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
          showGlobalFilter={true}
          className="custom_datatable"
          globalFilterPlaceholder="Type here to search..."
          // extraField={extraField()}
        />
      </div>
      {openFormModal ? (
        <FormModal open={openFormModal} setOpen={setOpenFormModal} editId={editId} />
      ) : null}
    </>
  )
}
