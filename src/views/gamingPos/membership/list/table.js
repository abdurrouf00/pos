'use client'

import DataTable from '@/components/common/DataTable'
import { useGetMembershipsQuery } from '../store'

const getColumns = () => [
  {
    header: 'Mobile',
    field: 'guardian_phone',
    body: rowData => rowData.guardian_phone ?? rowData.client?.contact ?? '-',
  },
  { header: 'Guardian Name', field: 'guardian_name' },
  { header: "Child's Name", field: 'child_name' },
  {
    header: 'Package',
    field: 'membership_package',
    body: rowData =>
      rowData.membership_package?.package_name ?? rowData.membershipPackage?.package_name ?? '-',
  },
  {
    header: 'Start Day',
    field: 'activation_date',
    body: rowData =>
      rowData.activation_date
        ? new Date(rowData.activation_date).toLocaleDateString()
        : '-',
  },
  {
    header: 'End Day',
    field: 'expiry_date',
    body: rowData =>
      rowData.expiry_date ? new Date(rowData.expiry_date).toLocaleDateString() : '-',
  },
  {
    header: 'Amount (৳)',
    field: 'package_amount',
    body: rowData => parseFloat(rowData.package_amount || 0).toFixed(2),
  },
  {
    header: 'Status',
    field: 'is_active',
    body: rowData => {
      const expired = rowData.expiry_date && new Date(rowData.expiry_date) < new Date()
      return (
        <span
          className={`inline-block px-2 py-1 rounded text-xs ${
            expired ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {expired ? 'Expired' : 'Active'}
        </span>
      )
    },
  },
]

export default function MembershipList() {
  const { data, isLoading } = useGetMembershipsQuery()
  const listData = data?.data?.data ?? []

  return (
    <div className="flex flex-col bg-white shadow px-5 py-6 rounded">
      <DataTable
        data={listData}
        columns={getColumns()}
        emptyMessage="No membership found."
        rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
        showGlobalFilter={true}
        globalFilterPlaceholder="Type here to search..."
        className="custom_datatable"
        loading={isLoading}
        paginator
      />
    </div>
  )
}
