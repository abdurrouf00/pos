import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '@/components/ui/button'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { Edit, Trash2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

export const getCouponsColumns = (handleEdit, handleDelete, handleStatusChange, statusLoading) => {
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
      field: 'coupon_name',
      header: 'Coupon Name',
    },
    {
      field: 'coupon_code',
      header: 'Coupon Code',
      body: rowData => (
        <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
          {rowData.coupon_code}
        </span>
      ),
    },
    {
      field: 'discount_amount',
      header: 'Discount',
      body: rowData => (
        <span>
          {rowData.discount_type === 1
            ? `$${parseFloat(rowData.discount_amount).toFixed(2)}`
            : `${parseFloat(rowData.discount_amount).toFixed(0)}%`}
        </span>
      ),
    },
    {
      field: 'discount_type',
      header: 'Type',
      body: rowData => (
        <span
          className={`inline-block px-2 py-1 rounded text-xs ${
            rowData.discount_type === 1
              ? 'bg-blue-100 text-blue-700'
              : 'bg-purple-100 text-purple-700'
          }`}
        >
          {rowData.discount_type === 1 ? 'Fixed' : 'Percentage'}
        </span>
      ),
    },
    {
      field: 'expiry_date',
      header: 'Expiry Date',
      body: rowData => (
        <span>
          {rowData.expiry_date
            ? new Date(rowData.expiry_date).toLocaleDateString()
            : 'No Expiry'}
        </span>
      ),
    },
    {
      field: 'usage_count',
      header: 'Usage',
      body: rowData => (
        <span>
          {rowData.usage_count}
          {rowData.max_usage_limit ? ` / ${rowData.max_usage_limit}` : ' / Unlimited'}
        </span>
      ),
    },
    {
      field: 'is_active',
      header: 'Status',
      body: rowData => (
        <div className="flex items-center justify-center">
          <Switch
            checked={rowData.is_active}
            disabled={statusLoading}
            onCheckedChange={checked => handleStatusChange(rowData.id, checked)}
          />
        </div>
      ),
    },
  ]
}
