import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Button } from '@/components/ui/button'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { Edit, Eye, Trash2 } from 'lucide-react'

export const getPaymentMethodColumns = (handleEdit, handleDelete) => {
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
      field: 'name',
      header: 'Type',
      width: 150,
      filter: false,
      body: rowData => (
        <div>
          <h4 className="text-sm ">{rowData.method_type === '1' ? 'Cash' : 'Bank'}</h4>
        </div>
      ),
    },
    {
      field: 'symbol',
      header: 'Name',
      width: 150,
      filter: false,
      body: rowData => (
        <div>
          <h4 className="text-sm ">{rowData.method_name}</h4>
        </div>
      ),
    },
    {
      field: 'account_head_id',
      header: 'Account Head',
      width: 150,
      filter: false,
      body: rowData => (
        <div>
          <h4 className="text-sm ">{rowData.account_head?.account_name}</h4>
        </div>
      ),
    },

  
  ]
}
