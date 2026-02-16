'use client'

import React, { useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { useGetDenominationCountListQuery } from '../../salesClosing/store'
import { getSalesClosingReportColumns } from './columns'
import SalesClosingDetailModal from '../SalesClosingDetailModal'

export default function SalesClosingReportList() {
  const { data, isLoading } = useGetDenominationCountListQuery()
  const raw = data?.data
  const listData = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.data)
      ? raw.data
      : []

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)

  const handleView = (row) => {
    setSelectedRecord(row)
    setModalOpen(true)
  }

  const handleModalChange = (open) => {
    setModalOpen(open)
    if (!open) setSelectedRecord(null)
  }

  return (
    <div className="bg-white p-4 rounded-md">
      <DataTable
        data={listData}
        columns={getSalesClosingReportColumns(handleView)}
        emptyMessage="No sales closing records found."
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        showGlobalFilter={true}
        globalFilterPlaceholder="Search by date, type, user..."
        globalFilterFields={['closing_date', 'closing_type', 'user.name']}
        className="custom_datatable"
        loading={isLoading}
        paginator
      />
      <SalesClosingDetailModal
        open={modalOpen}
        onOpenChange={handleModalChange}
        record={selectedRecord}
      />
    </div>
  )
}
