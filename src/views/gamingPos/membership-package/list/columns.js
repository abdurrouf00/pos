import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '@/components/ui/button'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { Edit, Trash2 } from 'lucide-react'

export const getMembershipPackageColumns = (handleEdit, handleDelete) => {
  return [
    {
      field: 'actions',
      header: 'Actions',
      body: rowData => (
        <div className="flex gap-1 justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <span className="inline-block px-2 py-1 cursor-pointer">
                <HiOutlineDotsVertical />
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-40 px-2">
              <h4 className="text-xs text-gray-500 font-medium px-1">Actions</h4>
              <div className="pt-1">
                <Button
                  className="text-xs w-full pl-1 justify-start"
                  variant="ghost"
                  onClick={() => handleEdit(rowData)}
                >
                  <Edit /> Edit
                </Button>
                <Button
                  className="text-xs w-full pl-1 justify-start"
                  variant="ghost"
                  onClick={() => handleDelete(rowData)}
                >
                  <Trash2 className="text-red-500" /> Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ),
    },
    {
      field: 'package_name',
      header: 'Package Name',
    },
    {
      field: 'package_days',
      header: 'Duration (Days)',
      body: rowData => <span>{rowData.package_days} days</span>,
    },
    {
      field: 'amount',
      header: 'Amount (৳)',
      body: rowData => (
        <span className="font-semibold">
          {parseFloat(rowData.amount || 0).toFixed(2)}
        </span>
      ),
    },
    {
      field: 'is_active',
      header: 'Status',
      body: rowData => (
        <span
          className={`inline-block px-2 py-1 rounded text-xs ${
            rowData.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {rowData.is_active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ]
}
