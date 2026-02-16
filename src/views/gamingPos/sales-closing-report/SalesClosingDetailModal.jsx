'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import DataBox from './DataBox'

const CLOSING_TYPE_LABELS = { 1: 'Food', 2: 'Ticket', 3: 'Membership' }
const STATUS_LABELS = { 1: 'Draft', 2: 'Confirmed', 3: 'Submitted' }

export default function SalesClosingDetailModal({ open, onOpenChange, record }) {
  if (!record) return null

  const details = Array.isArray(record.details) ? record.details : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Sales Closing - {record.closing_date} (
            {CLOSING_TYPE_LABELS[record.closing_type] ?? record.closing_type})
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-gray-500">Date:</span> {record.closing_date}
            </div>
            <div>
              <span className="text-gray-500">Type:</span>{' '}
              {CLOSING_TYPE_LABELS[record.closing_type] ?? record.closing_type}
            </div>
            <div>
              <span className="text-gray-500">Status:</span>{' '}
              <span
                className={`inline-block px-2 py-0.5 rounded text-xs ${
                  record.status === 3
                    ? 'bg-green-100 text-green-700'
                    : record.status === 2
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                {STATUS_LABELS[record.status] ?? record.status}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Closed By:</span>{' '}
              {record.user?.name ?? '-'}
            </div>
          </div>

          <DataBox
            label="Remarks"
            value={record.remarks}
            type="text"
            readonly
            className="min-h-12 h-auto"
          />

          <div>
            <h4 className="font-medium mb-2">Denomination Breakdown</h4>
            <div className="grid grid-cols-4 gap-2">
              {[...details]
                .sort((a, b) => (b.denomination || 0) - (a.denomination || 0))
                .map((d) => (
                  <React.Fragment key={d.id}>
                    <DataBox
                      label={d.denomination ? `৳ ${d.denomination} X` : '-'}
                      value={d.count}
                      readonly
                    />
                    <DataBox
                      label="Amount"
                      value={parseFloat(d.amount || 0).toFixed(2)}
                      type="text"
                      readonly
                    />
                  </React.Fragment>
                ))}
            </div>
          </div>

          <div className="border-t pt-3 space-y-1">
            <div className="flex justify-between font-medium">
              <span>Total Cash</span>
              <span>৳ {parseFloat(record.total_cash_amount || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total Non-Cash</span>
              <span>
                ৳ {parseFloat(record.total_non_cash_amount || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-blue-700 text-base">
              <span>Grand Total</span>
              <span>৳ {parseFloat(record.grand_total || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
