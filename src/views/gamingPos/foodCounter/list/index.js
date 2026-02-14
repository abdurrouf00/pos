'use client'
import DataTable from '@/components/common/DataTable'
import React from 'react'
import { useGetOrdersQuery } from '../store'
import { columns } from './columns'
import { useState } from 'react'
import SaveOrderModal from '../SaveOrderModal'
export default function FoodCounterList() {
  const { data, isLoading } = useGetOrdersQuery()
  const [orderSaveModal, setOrderSaveModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  console.log('data', data?.data?.data)
  const handleEdit = rowData => {
    setCurrentId(rowData?.id)
    setOrderSaveModal(true)
  }
  const handleDelete = rowData => {
    console.log('rowData', rowData)
  }
  return (
    <div>
      <DataTable
        columns={columns(handleEdit, handleDelete)}
        data={data?.data?.data}
        globalFilterFields={['name']}
        emptyMessage="No Orders found."
        rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
        showGlobalFilter={true}
        className="custom_datatable"
        globalFilterPlaceholder="Type here to search..."
        // extraField={extraField()}
        loading={isLoading}
      />
       {orderSaveModal && <SaveOrderModal 
      toggle={orderSaveModal} 
      setToggle={setOrderSaveModal}
       currentId={currentId}
       setCurrentId={setCurrentId}
       />}
    </div>
  )
}
