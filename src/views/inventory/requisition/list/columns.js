import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Eye, CheckCircle, ShoppingCart } from 'lucide-react'

const STATUS_DRAFT = 1
const STATUS_SUBMITTED = 2
const STATUS_APPROVED = 3

export const getRequisitionsColumns = (
  handleEdit,
  handleDelete,
  handleView,
  handleApprove,
  statusLabels = {},
  priorityLabels = {}
) => {
  return [
    {
      field: 'requisition_no',
      header: 'Requisition No',
      body: rowData => (
        <span className="font-medium">{rowData.requisition_no ?? '—'}</span>
      ),
    },
    {
      field: 'requisition_date',
      header: 'Date',
      body: rowData => (
        <span>
          {rowData.requisition_date
            ? new Date(rowData.requisition_date).toLocaleDateString()
            : '—'}
        </span>
      ),
    },
    {
      field: 'requested_by',
      header: 'Requested By',
      body: rowData => (
        <span>{rowData.requested_by_employee?.name ?? rowData.requested_by ?? '—'}</span>
      ),
    },
    {
      field: 'department_id',
      header: 'Department',
      body: rowData => (
        <span>{rowData.department?.name ?? rowData.department_id ?? '—'}</span>
      ),
    },
    {
      field: 'requested_for',
      header: 'Requested For',
      body: rowData => (
        <span className="max-w-[180px] truncate block" title={rowData.requested_for}>
          {rowData.requested_for ?? '—'}
        </span>
      ),
    },
    {
      field: 'priority',
      header: 'Priority',
      body: rowData => (
        <span
          className={`inline-block px-2 py-0.5 rounded text-xs ${
            rowData.priority === 3
              ? 'bg-red-100 text-red-700'
              : rowData.priority === 2
                ? 'bg-amber-100 text-amber-700'
                : 'bg-gray-100 text-gray-700'
          }`}
        >
          {priorityLabels[rowData.priority] ?? rowData.priority ?? '—'}
        </span>
      ),
    },
    {
      field: 'status',
      header: 'Status',
      body: rowData => (
        <span
          className={`inline-block px-2 py-0.5 rounded text-xs ${
            rowData.status === 1
              ? 'bg-gray-100 text-gray-700'
              : rowData.status === 2
                ? 'bg-blue-100 text-blue-700'
                : rowData.status === 3
                  ? 'bg-green-100 text-green-700'
                  : rowData.status === 4
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-600'
          }`}
        >
          {statusLabels[rowData.status] ?? rowData.status ?? '—'}
        </span>
      ),
    },
    {
      field: 'expected_date',
      header: 'Expected Date',
      body: rowData => (
        <span>
          {rowData.expected_date
            ? new Date(rowData.expected_date).toLocaleDateString()
            : '—'}
        </span>
      ),
    },
    {
      field: 'total_amount',
      header: 'Total Amount',
      body: rowData => {
        const total =
          rowData.total_amount ??
          rowData.items?.reduce?.(
            (s, i) => s + (Number(i.unit_price) || 0) * (Number(i.requested_qty) || 0),
            0
          )
        return (
          <span>
            {total != null
              ? Number(total).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : '—'}
          </span>
        )
      },
    },
    {
      field: 'approve_purchase',
      header: 'Approve / Purchase',
      body: rowData => {
        const isApproved = rowData.status === STATUS_APPROVED
        const canApprove =
          rowData.status === STATUS_DRAFT || rowData.status === STATUS_SUBMITTED

        if (isApproved) {
          return (
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs text-blue-700 border-blue-300 hover:bg-blue-50"
              asChild
            >
              <Link href={`/dashboard/purchase-order/new-purchase-order?requisitionId=${rowData.id}`}>
                <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                New Purchase
              </Link>
            </Button>
          )
        }
        if (canApprove) {
          return (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs text-green-700 border-green-300 hover:bg-green-50"
              onClick={() => handleApprove(rowData)}
              title="Make Approve"
            >
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              Make Approve
            </Button>
          )
        }
        return <span className="text-gray-400 text-xs">—</span>
      },
    },
    {
      field: 'actions',
      header: 'Actions',
      body: rowData => {
        const isApproved = rowData.status === STATUS_APPROVED

        return (
          <div className="flex flex-wrap gap-1 justify-center items-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => handleView(rowData)}
              title="View"
            >
              <Eye className="h-3.5 w-3.5 mr-1" />
              View
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => handleEdit(rowData)}
              disabled={isApproved}
              title={isApproved ? 'Approved requisition cannot be edited' : 'Edit'}
            >
              <Edit className="h-3.5 w-3.5 mr-1" />
              Edit
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => handleDelete(rowData)}
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Delete
            </Button>
          </div>
        )
      },
    },
  ]
}
