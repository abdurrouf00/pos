'use client'

import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getVendorsColumns } from './columns'
import DataTable from '@/components/common/DataTable'
import { useDeleteVendorMutation, useGetVendorsQuery } from '../store'
import { useRouter } from 'next/navigation'
import { confirmObj } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function SecondHeader() {
  const pathname = usePathname()
  const { data, isLoading } = useGetVendorsQuery()
  const router = useRouter()
  const [deleteVendor] = useDeleteVendorMutation()
  const title =
    pathname
      ?.split('/')
      ?.pop()
      ?.replace(/^\w/, c => c.toUpperCase()) || ''
  const handleEdit = rowData => {
    router.push(`/dashboard/vendors/form?id=${rowData?.id}`)
  }
  const handleDelete = rowData => {
    confirmDialog(confirmObj).then(async e => {
      if (e.isConfirmed) {
        const toastId = toast.loading('Deleting...')
        deleteVendor(rowData?.id).then(res => {
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
    return <Button onClick={handleAddNew}>New</Button>
  }
  const handleAddNew = () => {
    router.push('/dashboard/vendors/form')
  }
  return (
    <div className="bg-white p-4 rounded-md">
      <DataTable
        data={data?.data?.data}
        columns={getVendorsColumns(handleEdit, handleDelete)}
        emptyMessage="No Vendors found."
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
      {/* {openModal && (
        <ProductCategoriesForm
          open={openModal}
          setOpen={setOpenModal}
          editId={editId}
          setEditId={setEditId}
        />
      )} */}
    </div>
  )
}
