'use client'
import React, { useState } from 'react'
import ProductCategoriesForm from '../form'
import DataTable from '@/components/common/DataTable'
import { useDeleteProductCategoryMutation, useGetAllProductCategoriesQuery } from '../store'
import { Button } from '@/components/ui/button'
import { FaCirclePlus } from 'react-icons/fa6'
import { getProductCategoryColumns } from './column'
import toast from 'react-hot-toast'
import { confirmDialog, confirmObj } from '@/lib/utils'

export default function ProductCategoriesList() {
  const { data, isLoading } = useGetAllProductCategoriesQuery()
  const [openModal, setOpenModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [deleteProductCategory] = useDeleteProductCategoryMutation()
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
  const handleEdit = rowData => {
    setOpenModal(true)
    setEditId(rowData.id)
  }
  const handleAddNew = () => {
    setOpenModal(true)
    setEditId(null)
  }
  const handleDelete = rowData => {
    confirmDialog(confirmObj).then(async e => {
      if (e.isConfirmed) {
        const toastId = toast.loading('Deleting...')
        deleteProductCategory(rowData?.id).then(res => {
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
        columns={getProductCategoryColumns(handleEdit, handleDelete)}
        emptyMessage="No Product Categories found."
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
        <ProductCategoriesForm
          open={openModal}
          setOpen={setOpenModal}
          editId={editId}
          setEditId={setEditId}
        />
      )}
    </div>
  )
}
