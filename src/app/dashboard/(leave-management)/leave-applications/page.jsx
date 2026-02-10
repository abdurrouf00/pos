'use client'
import DataTable from '@/components/common/DataTable'
import { Button } from '@/components/ui/button'
import { confirmDialog, confirmObj } from '@/lib/utils'
import ApproveForm from '@/views/leave-application/form/ApproveForm'
import FormModal from '@/views/leave-application/form/FormModal'
import { deleteLeaveApplication, getAllLeaveApplications } from '@/views/leave-application/store'
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
export const columns = (handleDelete, handleEdit, handleApprove, userRole) => {
  const columns = [
    {
      header: '#SL',
      body: (row, { rowIndex }) => <span>{rowIndex}</span>,
      style: {
        width: '100px',
        textAlign: 'center',
      },
      sortable: false,
      filter: false,
    },
    {
      field: 'employee.name',
      header: 'Name',
      sortable: true,
    },
    {
      field: 'employee.department.name',
      header: 'Department',
      sortable: true,
    },
    {
      field: 'employee.designation.name',
      header: 'Designation',
      sortable: true,
    },
    {
      field: 'from_date',
      header: 'App Date',
      sortable: true,
    },
    {
      header: 'Actions',
      sortable: false,
      body: rowData => (
        <div className="flex gap-2">
          <>
            <>
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
            </>

            {userRole && userRole === 'MAdmin' ? (
              <>
                <Button
                  variant={'outline-success'}
                  size={'sm'}
                  onClick={() => handleApprove(rowData)}
                >
                  <Eye size={10} />
                </Button>
              </>
            ) : null}
          </>
        </div>
      ),
      style: { width: '100px' },
    },
  ]

  return columns
}
export default function LeaveApplication() {
  //
  const [openFormModal, setOpenFormModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [openApproveModal, setOpenApproveModal] = useState(false)
  const [approveId, setApproveId] = useState(null)
  const [approveData, setApproveData] = useState(null)
  const { data, fetchingAllData } = useSelector(state => state.leaveApplication)
  const { user } = useSelector(state => state.user)
  const userRole = user?.role?.name
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllLeaveApplications())
  }, [])

  const handleDelete = async row => {
    confirmDialog(confirmObj).then(async e => {
      if (e.isConfirmed) {
        const toastId = toast.loading('Deleting...')
        const res = await dispatch(deleteLeaveApplication(row.id)).unwrap()

        if (res) {
          toast.dismiss(toastId)
          toast.success('Deleted successfully')
          dispatch(getAllLeaveApplications())
        } else {
          toast.dismiss(toastId)
          toast.error('Failed to delete')
        }
      }
    })
  }

  const handleEdit = row => {
    setEditId(row.id)
    setOpenFormModal(true)
  }
  const handleOpenAddModal = () => {
    setOpenFormModal(true)
  }
  const handleApprove = row => {
    setApproveId(row.id)
    setOpenApproveModal(true)
    setApproveData(row)
  }
  return (
    <>
      <div className="bg-white px-4 pt-4 pb-8 rounded mx-0.5  border border-gray-100">
        {user?.username ? (
          <div className="pb-3 flex justify-end">
            <Button onClick={handleOpenAddModal} variant={'primary'}>
              <Plus /> Add New
            </Button>
          </div>
        ) : null}
        <DataTable
          // loading={fetchingAllData}
          data={data?.data}
          columns={columns(handleDelete, handleEdit, handleApprove, userRole)}
          globalFilterFields={['name']}
          emptyMessage="No leave applications found."
          rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
          showGlobalFilter={true}
          className="custom_datatable"
          globalFilterPlaceholder="Type here to search..."
          // extraField={extraField()}
          loading={fetchingAllData}
        />
      </div>
      {openFormModal ? (
        <FormModal open={openFormModal} setOpen={setOpenFormModal} editId={editId} />
      ) : null}
      {openApproveModal ? (
        <ApproveForm
          open={openApproveModal}
          setOpen={setOpenApproveModal}
          id={approveId}
          data={approveData}
        />
      ) : null}
    </>
  )
}
