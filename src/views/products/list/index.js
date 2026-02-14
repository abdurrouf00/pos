'use client'
import { useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { Button } from '@/components/ui/button'
import { productsColumn } from './column'
import { useDeleteProductMutation, useGetAllProductsQuery } from '../store'
import { FaCirclePlus } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { confirmDialog, confirmObj } from '@/lib/utils'
import toast from 'react-hot-toast'
import ProductChannelsModal from './ProductChannelsModal'

const ProductsList = () => {
  const router = useRouter()
  const [channelsModalOpen, setChannelsModalOpen] = useState(false)
  const [channelsProduct, setChannelsProduct] = useState(null)

  const { data: products, isLoading } = useGetAllProductsQuery()
  const [deleteProduct] = useDeleteProductMutation()

  const extraField = () => {
    return (
      <div>
        <Button onClick={() => router.push('/dashboard/products/form')}>
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
        deleteProduct(rowData?.id).then(res => {
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

  const handleEdit = rowData => {
    router.push(`/dashboard/products/form?id=${rowData.id}`)
  }

  const handleAssignChannels = rowData => {
    setChannelsProduct({ id: rowData.id, name: rowData.product_name || rowData.product_code || 'Product' })
    setChannelsModalOpen(true)
  }

  return (
    <div>
      <div className="flex gap-3">
        <div className="w-full">
          <div className="p-4 bg-white w-full rounded-lg">
            <DataTable
              data={products?.data?.data || []}
              columns={productsColumn(handleEdit, handleDelete, handleAssignChannels)}
              globalFilterFields={['name']}
              emptyMessage="No account heads found."
              rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
              showGlobalFilter={true}
              globalFilterPlaceholder="Type here to search..."
              extraField={extraField()}
              loading={isLoading}
              className="custom_datatable"
            />
          </div>
        </div>
      </div>
      <ProductChannelsModal
        open={channelsModalOpen}
        setOpen={setChannelsModalOpen}
        productId={channelsProduct?.id ?? null}
        productName={channelsProduct?.name ?? null}
      />
    </div>
  )
}

export default ProductsList
