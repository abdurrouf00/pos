import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '@/components/ui/button'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { Edit, Trash2 } from 'lucide-react'

export const getAllTaxRatesColumns = (handleEdit, handleDelete) => [
  {
    header: 'Actions',
    body: rowData => (
      <div className="flex gap-1 justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <span className="inline-block px-2 py-1">
              <HiOutlineDotsVertical />
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-40 px-2">
            <h4 className="text-xs text-gray-500 font-medium px-1">Actions</h4>
            <div className="pt-1">
              <Button
                className={'text-xs w-full pl-1 justify-start'}
                variant="ghost"
                onClick={() => handleEdit(rowData)}
              >
                <Edit /> Edit
              </Button>
              <Button
                className={'text-xs w-full pl-1 justify-start'}
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
    sortable: false,
    filter: false,
  },
  {
    field: 'name',
    header: 'Name',
    sortable: true,
  },
  {
    field: 'rate',
    header: 'Rate',
    sortable: true,
  },
  {
    field: 'tax_type',
    header: 'Tax Type',
    sortable: true,
  },
  {
    field: 'is_active',
    header: 'Active',
    sortable: true,
    body: rowData => (
      <div className="flex gap-1 justify-center">
        {rowData.is_active ? (
          <span className="inline-block px-2 py-1 bg-green-500 text-white rounded-md">Active</span>
        ) : (
          <span className="inline-block px-2 py-1 bg-red-500 text-white rounded-md">Inactive</span>
        )}
      </div>
    ),
    sortable: false,
    filter: false,
  },
]
