import { Button } from '@/components/ui/button'
import { Info, Trash2 } from 'lucide-react'
import Link from 'next/link'

export const chartOfAccountsColumn = (handleDelete, handleInfo) => {
  const columns = [
    {
      header: 'Actions',
      sortable: false,
      body: rowData => (
        <div className="flex gap-2">
          <Button
            onClick={() => handleDelete(rowData)}
            className="bg-white hover:bg-white cursor-pointer"
          >
            <Trash2 className="text-red-700" />
          </Button>
          <Button
            onClick={() => handleInfo(rowData)}
            className="bg-white hover:bg-white cursor-pointer"
          >
            <Info className="text-gray-500 w-4 h-4" />
          </Button>
        </div>
      ),
      style: { width: '100px' },
    },
    {
      field: 'account_name',
      header: 'Name',
      sortable: true,
      body: rowData => (
        <div>
          <Link
            className="hover:underline text-blue-900 text-nowrap"
            href={`/dashboard/chart-of-accounts/details?id=${rowData.id}`}
          >
            {rowData.account_name}
          </Link>
        </div>
      ),
    },

    {
      field: 'account_type.name',
      header: 'Account Type',
      sortable: true,
    },
    {
      field: 'description',
      header: 'Description',
      sortable: true,
    },

    // {
    //   field: 'has_attachment',
    //   header: 'Documents',
    //   sortable: true,
    // },
  ]

  return columns
}
