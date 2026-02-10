import { Button } from '@/components/ui/button'
import { formatBDnumber } from '@/lib/utils'
import { Edit, Eye, Info, Trash2 } from 'lucide-react'

export const salarySheetColumn = (handleDelete, handleInfo) => {
  const columns = [
    {
      field: 'title',
      header: 'Title',
      sortable: true,
    },
    {
      field: 'salary_design_id',
      header: 'Salary Design',
      sortable: true,
    },
    {
      field: 'year',
      header: 'Year',
      sortable: true,
    },
    {
      field: 'month',
      header: 'Month',
      sortable: true,
    },
    {
      field: 'department_id',
      header: 'Department',
      sortable: true,
    },
    {
      field: 'designation_id',
      header: 'Designation',
      sortable: true,
    },
    {
      field: 'total_amount',
      header: 'Total Amount',
      sortable: true,
      body: rowData => <div className="text-end">{formatBDnumber(+rowData.total_amount)}</div>,
    },
    {
      header: 'Actions',
      sortable: false,
      body: rowData => (
        <div className="flex gap-2">
          <Button
            className="bg-white hover:bg-white cursor-pointer"
            onClick={() => handleInfo(rowData)}
          >
            <Eye className="text-gray-500 w-4 h-4" />
          </Button>
          {/* <Button
            className="bg-white hover:bg-white cursor-pointer"
            onClick={() => handleDelete(rowData)}
          >
            <Trash2 className="text-red-700" />
          </Button> */}
        </div>
      ),
      style: { width: '100px' },
    },
  ]

  return columns
}
