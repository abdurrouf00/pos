import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { Edit, Eye, Trash2 } from 'lucide-react'
import moment from 'moment'
export const manualJournalsColumn = (handleDelete, handleInfo) => {
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
                    onClick={() => handleInfo(rowData)}
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
      header: 'Date',
      accessorKey: 'date',
      body: rowData => (
        <div>
          <h4 className="text-sm ">{moment(rowData.date).format('DD-MM-YYYY')}</h4>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Reference',
      accessorKey: 'reference',
      body: rowData => (
        <div>
          <h4 className="text-sm ">{rowData.reference}</h4>
        </div>
      ),
    },
    {
      header: 'Journal No',
      accessorKey: 'journal_no',
      body: rowData => (
        <div>
          <h4 className="text-sm ">{rowData.journal_no}</h4>
        </div>
      ),
    },
    {
      header: 'Notes',
      accessorKey: 'notes',
      body: rowData => (
        <div>
          <h4 className="text-sm ">{rowData.notes}</h4>
        </div>
      ),
    },
    {
      header: 'Total Debits',
      accessorKey: 'total_debits',
      body: rowData => (
        <div>
          <h4 className="text-sm ">{rowData.total_dr}</h4>
        </div>
      ),
    },
    {
      header: 'Total Credits',
      accessorKey: 'total_credits',
      body: rowData => (
        <div>
          <h4 className="text-sm ">{rowData.total_cr}</h4>
        </div>
      ),
    },
    
    {
      header: 'Status',
      accessorKey: 'status',
      body: rowData => (
        <div>
          <h4 className="text-sm ">{rowData.status}</h4>
        </div>
      ),
    },
  ]
}