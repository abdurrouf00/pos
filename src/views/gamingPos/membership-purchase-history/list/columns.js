import React from 'react'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'

export const getPurchaseHistoryColumns = (onView) => {
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
    { field: 'sale_no', header: 'Sale #', sortable: true },
    {
      field: 'sale_date',
      header: 'Date',
      body: (row) => row.sale_date || '-',
    },
    {
      field: 'sale_time',
      header: 'Time',
      body: (row) => (row.sale_time ? String(row.sale_time).slice(0, 5) : '-'),
    },
    {
      field: 'customer_name',
      header: 'Customer',
      body: (row) => row.customer_name || '-',
    },
    {
      field: 'mobile',
      header: 'Mobile',
      body: (row) => row.mobile || '-',
    },
    {
      field: 'kids_name',
      header: "Kid's Name",
      body: (row) => row.kids_name || '-',
    },
    {
      field: 'status',
      header: 'Status',
      body: (row) => (
        <span
          className={`inline-block px-2 py-1 rounded text-xs ${
            row.status === 'completed' ? 'bg-green-100 text-green-700' : row.status === 'draft' ? 'bg-gray-100 text-gray-600' : 'bg-amber-100 text-amber-700'
          }`}
        >
          {row.status || '-'}
        </span>
      ),
    },
    {
      field: 'total',
      header: 'Total (৳)',
      body: (row) => (
        <span className="font-semibold">{parseFloat(row.total || 0).toFixed(2)}</span>
      ),
    },
    {
      field: 'paid_total',
      header: 'Paid (৳)',
      body: (row) => parseFloat(row.paid_total || 0).toFixed(2),
    },
    {
      field: 'items',
      header: 'Items',
      body: (row) => (Array.isArray(row.items) ? row.items.length : 0),
    },
  ]
}
