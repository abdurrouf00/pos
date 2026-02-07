import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '@/components/ui/button'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { Edit, Eye, Trash2 } from 'lucide-react'
export const getUsersColumns = (handleEdit, handleDelete) => {
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
      // field: 'name',
      header: 'Name',
      sortable: true,
      body: rowData => {
        return (
          <div>
            <h4 className="text-sm font-bold">{rowData?.name}</h4>
            <p className="text-xs text-gray-500">{rowData?.email}</p>
          </div>
        )
      },
    },
    {
      field: 'organization.phone',
      header: 'Phone',
      // sortable: true,
    },
    {
      field: 'branch.name',
      header: 'Branch name',
      // sortable: true,
    },
    {
      field: 'organization.status',
      header: 'Status',
      // sortable: true,
    },
  ]
}
