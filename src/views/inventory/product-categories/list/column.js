import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Button } from '@/components/ui/button'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { Edit, Trash2 } from 'lucide-react'

export const getProductCategoryColumns = (handleEdit, handleDelete) => {
  return [
    {
      field: 'actions',
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
    },
    {
      field: 'name',
      header: 'Name',
    },

    {
      field: 'description',
      header: 'Description',
    },
    {
      field: 'slug',
      header: 'Slug',
    },
    {
      field: 'parent.name',
      header: 'Parent',
    },
    {
      field: 'icon',
      header: 'Icon',
    },
    {
      field: 'is_active',
      header: 'Is Active',
      body: rowData => (
        <div className="flex justify-center">
          {rowData.is_active ? (
            <span className="inline-block px-2 py-1 bg-green-500 text-white rounded-md">
              Active
            </span>
          ) : (
            <span className="inline-block px-2 py-1 bg-red-500 text-white rounded-md">
              Inactive
            </span>
          )}
        </div>
      ),
    },
  ]
}
