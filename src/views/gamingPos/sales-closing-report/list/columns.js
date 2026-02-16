import React from 'react'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'

const CLOSING_TYPE_LABELS = {
  1: 'Food',
  2: 'Ticket',
  3: 'Membership',
}

const STATUS_LABELS = {
  1: 'Draft',
  2: 'Confirmed',
  3: 'Submitted',
}

export const getSalesClosingReportColumns = (onView) => {
  return [
    {
      field: 'actions',
      header: 'Actions',
      body: (row) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={() => onView?.(row)}
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </Button>
      ),
    },
    {
      field: 'closing_date',
      header: 'Date',
      body: (row) => row.closing_date || '-',
    },
    {
      field: 'closing_type',
      header: 'Type',
      body: (row) => (
        <span className="font-medium">
          {CLOSING_TYPE_LABELS[row.closing_type] ?? row.closing_type}
        </span>
      ),
    },
    {
      field: 'status',
      header: 'Status',
      body: (row) => (
        <span
          className={`inline-block px-2 py-1 rounded text-xs ${
            row.status === 3
              ? 'bg-green-100 text-green-700'
              : row.status === 2
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600'
          }`}
        >
          {STATUS_LABELS[row.status] ?? row.status}
        </span>
      ),
    },
    {
      field: 'user',
      header: 'Closed By',
      body: (row) => row.user?.name ?? '-',
    },
    {
      field: 'total_cash_amount',
      header: 'Cash (৳)',
      body: (row) => (
        <span className="font-semibold">
          {parseFloat(row.total_cash_amount || 0).toLocaleString('en-BD', {
            minimumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      field: 'total_non_cash_amount',
      header: 'Non-Cash (৳)',
      body: (row) =>
        parseFloat(row.total_non_cash_amount || 0).toLocaleString('en-BD', {
          minimumFractionDigits: 2,
        }),
    },
    {
      field: 'grand_total',
      header: 'Grand Total (৳)',
      body: (row) => (
        <span className="font-bold text-blue-700">
          {parseFloat(row.grand_total || 0).toLocaleString('en-BD', {
            minimumFractionDigits: 2,
          })}
        </span>
      ),
    },
  ]
}
