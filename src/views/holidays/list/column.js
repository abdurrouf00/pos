import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { Edit, Trash2 } from 'lucide-react'
import moment from 'moment'
export const columns = (handleEdit, handleDelete) => {
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
            header: 'Name',
            field: 'name',
        },
        {
            header: 'Date',
            field: 'date',
            body: (row) => {
                return <div>{moment(row.date).format('DD-MM-YYYY')}</div>
            },
        },
        {
            header: 'Description',
            field: 'description',
        },
        {
            header: 'Is Recurring Yearly',
            field: 'is_recurring_yearly',
            body: (row) => {
                return <div>{row.is_recurring_yearly ? 'Yes' : 'No'}</div>
            },
        },
        {
            header: 'Is Active',
            field: 'is_active',
            body: (row) => {
                return <div>{row.is_active ? 'Yes' : 'No'}</div>
            },
        },
        
    ]
}
export default columns