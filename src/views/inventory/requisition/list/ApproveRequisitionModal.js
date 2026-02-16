'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import HrInput from '@/components/common/HrInput'

export default function ApproveRequisitionModal({
  open,
  onOpenChange,
  requisition,
  /** Requisition uuid - used when calling onConfirm so API always gets valid id */
  requisitionId,
  /** 'submit' = Draft → call submit API; 'approve' = Submitted → call approve API */
  intent = 'approve',
  onConfirm,
  onSubmit,
  isSubmitting,
  isSubmitSubmitting,
  isLoadingRequisition,
}) {
  const items = requisition?.items ?? []
  const isSubmitFlow = intent === 'submit'
  const idFromProps = requisition?.id ?? requisitionId
  const idRef = useRef(null)

  // Capture id when modal opens so we always have it when user clicks Approve
  useEffect(() => {
    if (open && idFromProps) idRef.current = idFromProps
    if (!open) idRef.current = null
  }, [open, idFromProps])

  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    if (open && items.length) {
      const initial = {}
      items.forEach(item => {
        initial[item.id] = Number(item.requested_qty) ?? 0
      })
      setQuantities(initial)
    }
  }, [open, items])

  const handleQtyChange = (itemId, value) => {
    const num = parseFloat(value) || 0
    setQuantities(prev => ({ ...prev, [itemId]: num }))
  }

  const handleApprove = () => {
    // if (isSubmitFlow) {
    //   onConfirm({
    //     requisitionId: idFromProps,
    //     payload: {
    //       items: items.map(item => ({
    //         id: item.id,
    //         approved_qty: Math.max(0, Math.floor(Number(quantities[item.id]) || 0)),
    //       })),
    //     },
    //   })
    //   return
    // }
    const effectiveId = idRef.current ?? idFromProps
    if (!effectiveId) {
      return
    }
    const payload = {
      items: items.map(item => ({
        id: item.id,
        approved_qty: Math.max(0, Math.floor(Number(quantities[item.id]) || 0)),
      })),
    }
    onConfirm({ requisitionId: effectiveId, payload })
  }

  const productName = item =>
    item.product?.product_name ?? item.product_name ?? item.product_id ?? '—'

  const busy = isSubmitting || isSubmitSubmitting

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 bg-gray-50/50">
          <DialogTitle className="text-xl font-bold text-gray-900">Approve Requisition</DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            {requisition?.requisition_no && (
              <span className="font-medium text-gray-700">Requisition No:</span>
            )}{' '}
            {requisition?.requisition_no ?? '—'}
          </p>
        </DialogHeader>

        <div className="px-6 py-5">
          {isLoadingRequisition ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">Loading items…</p>
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                        <td className="px-4 py-3 text-sm text-gray-600">{idx + 1}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {productName(item)}
                        </td>
                        <td className="px-4 py-3">
                          <HrInput
                            type="number"
                            min={0}
                            value={quantities[item.id] ?? ''}
                            onChange={e => handleQtyChange(item.id, e.target.value)}
                            className="w-24"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
            Cancel
          </Button>
          <Button onClick={handleApprove} disabled={busy} type="button">
            {busy ? 'Please wait…' : 'Approve'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
