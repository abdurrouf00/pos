import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { Edit, Eye, Trash2 } from 'lucide-react'

export const productsColumn = (handleEdit, handleDelete) => {
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
          <h4 className="text-sm font-bold">{rowData.product_name}</h4>
          <p className="text-xs text-gray-500">{rowData.product_code}</p>
        </div>
      ),
    },
    {
      header: 'Manufacturer',
      accessorKey: 'manufacturer',
      body: rowData => (
        <div>
          <h4 className="text-sm font-bold">{rowData?.manufacturer?.name}</h4>
        </div>
      ),
    },
    {
      header: 'Unit Style',
      accessorKey: 'unit_style',
      body: rowData => (
        <div>
          <h4 className="text-sm font-bold">{rowData?.unit_style?.name}</h4>
        </div>
      ),
    },
    {
      header: 'Unit Price',
      accessorKey: 'unit_price',
      body: rowData => (
        <div>
          <h4 className="text-sm font-bold">{rowData?.pricing?.unit_price}</h4>
        </div>
      ),
    },
    {
      header: 'Quantity In Stock',
      accessorKey: 'quantity_in_stock',
      body: rowData => (
        <div>
          <h4 className="text-sm font-bold">{rowData?.stock?.quantity_in_stock}</h4>
        </div>
      ),
    },
    {
      header: 'Reorder Level',
      accessorKey: 'reorder_level',
      body: rowData => (
        <div>
          <h4 className="text-sm font-bold">{rowData?.stock?.reorder_level}</h4>
        </div>
      ),
    },
  ]
}
