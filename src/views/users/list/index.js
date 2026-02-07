'use client'
import DataTable from '@/components/common/DataTable'
import { useDeleteUserMutation, useGetAllUserQuery } from '../store'
import { getUsersColumns } from './columns'
import { Button } from '@/components/ui/button'
import { FaCirclePlus } from 'react-icons/fa6'
import { useState } from 'react'
import UserForm from '../form'
import { confirmDialog, confirmObj } from '@/lib/utils'
import toast from 'react-hot-toast'

const UserList = () => {
  const [currentItem, setCurrentItem] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const { data: users, isLoading } = useGetAllUserQuery()
  const [deleteUser] = useDeleteUserMutation()
  console.log('users', users)
  const data = users?.users?.data

  const handleEdit = item => {
    setCurrentItem(item)
    setOpenModal(true)
  }
  const handleAddNew = () => {
    setOpenModal(true)
    setCurrentItem(null)
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
        deleteUser(rowData?.id).then(res => {
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
  return (
    <div className="bg-white p-4 rounded-md">
      <DataTable
        data={data}
        columns={getUsersColumns(handleEdit, handleDelete)}
        emptyMessage="No Users found."
        rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
        showGlobalFilter={true}
        globalFilterPlaceholder="Type here to search..."
        extraField={extraField()}
        className="custom_datatable"
        // onPage={handlePage}
        // rows={perPage}
        loading={isLoading}
        // page={currentPage}
        // first={firstRow}
        // totalRecords={totalPages}
        lazy
        paginator

        // size="small"
      />
      {openModal && (
        <UserForm
          open={openModal}
          setOpen={setOpenModal}
          editId={currentItem?.id}
          setEditId={setCurrentItem}
        />
      )}
    </div>
  )
}

export default UserList
