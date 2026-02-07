'use client'

import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import AccountForm from '../form/index'
import HrModal from '@/components/common/HrModal'
import DataTable from '@/components/common/DataTable'
import { chartOfAccountsColumn } from './columns'
import { FaCirclePlus } from 'react-icons/fa6'
import { useGetChartOfAccountsQuery, useLazySeedChartOfAccountsQuery, useDeleteChartOfAccountsMutation } from '../store'
import { confirmDialog, confirmObj } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function SecondHeader() {
  const { data: chartOfAccounts, isLoading } = useGetChartOfAccountsQuery()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [seedChartOfAccounts, { isLoading: isSeeding }] = useLazySeedChartOfAccountsQuery()
  //delete
  const [deleteChartOfAccounts, { isLoading: isDeleting }] = useDeleteChartOfAccountsMutation()
  const data = null
  const title =
    pathname
      ?.split('/')
      ?.filter(Boolean)
      ?.pop()
      ?.replace(/^\w/, c => c.toUpperCase()) || ''

  const handleDelete = rowData => {
    confirmDialog(confirmObj).then(async e => {
      if (e.isConfirmed) {
        const toastId = toast.loading('Deleting...')
        deleteChartOfAccounts(rowData?.id).then(res => {
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
  const handleInfo = rowData => {
    setCurrentId(rowData?.id)
    setIsOpen(true)
  }
  const extraField = () => {
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>
          <FaCirclePlus /> New
        </Button>
      </div>
    )
  }
const handleSeed = () => {
  seedChartOfAccounts().then(res => {
    console.log('res', res)
  })
}
  return (
    <div className="">
      {/* <div className="flex items-center justify-between h-10 md:h-12">
        <div className="hover:bg-gray-100 font-bold text-2xl p-2 rounded">Al {title}</div>

        <Button onClick={() => setIsOpen(true)}>
          <span className="text-2xl">+</span> New
        </Button>
      </div> */}
     

      <div className="flex gap-3">
        <div className="w-full">
          <div className="p-4 bg-white  w-full rounded-lg">
          <div className="flex justify-end mb-4">
        <Button onClick={handleSeed} disabled={isSeeding}>{isSeeding ? 'Seeding...' : 'Seed'}</Button>
      </div>
            <DataTable
              data={chartOfAccounts?.data || []}
              columns={chartOfAccountsColumn(handleDelete, handleInfo)}
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

      {isOpen && (
          <AccountForm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
      )}
    </div>
  )
}
