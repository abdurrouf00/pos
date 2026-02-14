import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { Edit, Eye, Trash2 } from 'lucide-react'

export const taxSettingColumn = (handleEdit, handleDelete) => {
  return [
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
        header: 'Name',
        accessorKey: 'name',
        body: rowData => (
          <div>
            <h4 className="text-sm ">{rowData.name}</h4>
          </div>
        ),
      },
      {
        header: 'Code',
        accessorKey: 'code',
        body: rowData => (
          <div>
            <h4 className="text-sm ">{rowData.code}</h4>
          </div>
        ),
      },
      {
        header: 'Rate',
        accessorKey: 'rate',
        body: rowData => (
          <div>
            <h4 className="text-sm ">{rowData.rate}</h4>
          </div>
        ),
      },
      {
        header: 'Type',
        accessorKey: 'type',
        body: rowData => (
          <div>
            <h4 className="text-sm ">{rowData.type}</h4>
          </div>
        ),
      },
      {
        header: 'Is Active',
        accessorKey: 'is_active',
        body: rowData => (
          <div>
            <h4 className="text-sm ">{rowData.is_active}</h4>
          </div>
        ),
      },
  ]
}