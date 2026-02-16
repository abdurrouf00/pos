'use client'

import React, { useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { useGetPurchaseHistoryQuery } from '../store'
import { getPurchaseHistoryColumns } from './columns'
import PurchaseHistoryDetailModal from '../PurchaseHistoryDetailModal'

export default function PurchaseHistoryList() {
  const { data, isLoading } = useGetPurchaseHistoryQuery()
  const listData = data?.data?.data ?? []
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState(null)

  const handleView = (row) => {
    setSelectedPurchase(row)
    setModalOpen(true)
  }

  const handleModalChange = (open) => {
    setModalOpen(open)
    if (!open) setSelectedPurchase(null)
  }

  return (
    <div className="bg-white p-4 rounded-md">
      <DataTable
        data={listData}
        columns={getPurchaseHistoryColumns(handleView)}
        emptyMessage="No purchase history found."
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        showGlobalFilter={true}
        globalFilterPlaceholder="Search by customer, mobile, sale no..."
        globalFilterFields={['sale_no', 'customer_name', 'mobile', 'kids_name']}
        className="custom_datatable"
        loading={isLoading}
        paginator
      />
      <PurchaseHistoryDetailModal
        open={modalOpen}
        onOpenChange={handleModalChange}
        purchase={selectedPurchase}
      />
    </div>
  )
}
