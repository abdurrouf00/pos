import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { Edit, Trash2 } from 'lucide-react'

export const getChannelsColumns = (handleEdit, handleDelete) => {
  return [
    {
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
      sortable: false,
      filter: false,
    },
    {
      field: 'code',
      header: 'Code',
      width: 120,
      filter: false,
    },
    {
      field: 'name',
      header: 'Name',
      width: 150,
      filter: false,
    },
    {
      field: 'description',
      header: 'Description',
      width: 200,
      filter: false,
      body: rowData => rowData.description ?? '—',
    },
    {
      field: 'display_order',
      header: 'Display Order',
      width: 120,
      filter: false,
    },
    {
      field: 'is_active',
      header: 'Is Active',
      width: 100,
      body: rowData => (
        <span className={rowData.is_active ? 'text-green-600' : 'text-gray-400'}>
          {rowData.is_active ? 'Yes' : 'No'}
        </span>
      ),
    },
  ]
}
