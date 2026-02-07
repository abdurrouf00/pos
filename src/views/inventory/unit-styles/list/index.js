'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { useDeleteProductTypeMutation, useGetAllProductTypesQuery } from '../store'
import { confirmDialog, confirmObj } from '@/lib/utils'
import toast from 'react-hot-toast'
import DataTable from '@/components/common/DataTable'
import { getProductTypesColumns } from './column'
import ProductTypesForm from '../form'
import { useGetAllUnitStylesQuery, useDeleteUnitStyleMutation } from '../store'
import { getUnitStylesColumns } from './column'
import UnitStylesForm from '../form'

export default function UnitStylesList() {
  const { data, isLoading } = useGetAllUnitStylesQuery()
  const [deleteUnitStyle] = useDeleteUnitStyleMutation()
  const [openModal, setOpenModal] = useState(false)
  const [editId, setEditId] = useState(null)

  console.log('data', data)

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
        deleteUnitStyle(rowData?.id).then(res => {
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
        data={data?.data?.data}
        columns={getUnitStylesColumns(handleEdit, handleDelete)}
        emptyMessage="No Unit styles found."
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
        <UnitStylesForm
          open={openModal}
          setOpen={setOpenModal}
          editId={editId}
          setEditId={setEditId}
        />
      )}
    </div>
  )
}
