'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'

export default function PurchaseHistoryDetailModal({ open, onOpenChange, purchase }) {
  if (!purchase) return null

  const items = Array.isArray(purchase.items) ? purchase.items : []
  const subtotal = parseFloat(purchase.subtotal || 0)
  const discount = parseFloat(purchase.discount_amount || 0)
  const total = parseFloat(purchase.total || 0)
  const paidTotal = parseFloat(purchase.paid_total || 0)
  const changeAmount = parseFloat(purchase.change_amount || 0)

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=700')
    if (!printWindow) return

    const itemsHtml = items
      .map(
        (item) => `
        <tr>
          <td style="font-weight:bold;">${item.product_name || '-'}</td>
          <td class="right">${parseFloat(item.qty || 0)}</td>
          <td class="right">${parseFloat(item.rate || 0).toFixed(2)}</td>
          <td class="right">${parseFloat(item.line_total || 0).toFixed(2)}</td>
        </tr>
      `
      )
      .join('')

    printWindow.document.write(`
      <html>
        <head>
          <title>Sale Receipt #${purchase.sale_no || purchase.id}</title>
          <style>
            @page { size: 80mm auto; margin: 0; }
            body { font-family: 'Arial', sans-serif; font-size: 12px; width: 72mm; margin: 0 auto; padding: 10px 0; color: #000; line-height: 1.4; }
            .header { text-align: center; margin-bottom: 10px; border-bottom: 2px solid #000; padding-bottom: 5px; }
            .header h2 { margin: 0; font-size: 18px; text-transform: uppercase; }
            .info { margin-bottom: 10px; font-size: 11px; }
            .info div { margin-bottom: 2px; }
            table { width: 100%; border-collapse: collapse; margin-top: 5px; }
            th { border-bottom: 1px solid #000; text-align: left; padding: 4px 2px; font-size: 11px; }
            td { padding: 4px 2px; vertical-align: top; font-size: 11px; }
            .right { text-align: right; }
            .divider { border-top: 1px dashed #000; margin: 10px 0; }
            .total-section { margin-top: 5px; }
            .total-row { display: flex; justify-content: space-between; font-weight: bold; font-size: 13px; margin-bottom: 2px; }
            .total-row.small { font-size: 11px; font-weight: normal; }
            .footer { text-align: center; margin-top: 20px; font-size: 10px; border-top: 1px solid #000; padding-top: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>SALES RECEIPT</h2>
            <p>Sale #${purchase.sale_no || '-'}</p>
          </div>
          <div class="info">
            <div><b>Date:</b> ${purchase.sale_date || '-'}  <b>Time:</b> ${(purchase.sale_time || '').slice(0, 5) || '-'}</div>
            <div><b>Customer:</b> ${purchase.customer_name || '-'}</div>
            <div><b>Mobile:</b> ${purchase.mobile || '-'}</div>
            ${purchase.kids_name ? `<div><b>Kid's Name:</b> ${purchase.kids_name}</div>` : ''}
            ${purchase.coupon_code ? `<div><b>Coupon:</b> ${purchase.coupon_code}</div>` : ''}
          </div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th class="right">Qty</th>
                <th class="right">Price</th>
                <th class="right">Total</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <div class="divider"></div>
          <div class="total-section">
            <div class="total-row small"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
            ${discount > 0 ? `<div class="total-row small"><span>Discount:</span><span>-${discount.toFixed(2)}</span></div>` : ''}
            <div class="total-row"><span>NET TOTAL:</span><span>৳ ${total.toFixed(2)}</span></div>
            <div class="divider"></div>
            <div class="total-row small"><span>Paid Amount:</span><span>${paidTotal.toFixed(2)}</span></div>
            <div class="total-row small"><span>Change:</span><span>${changeAmount.toFixed(2)}</span></div>
          </div>
          <div class="footer">
            <p>Thank you for your purchase!</p>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Purchase # {purchase.sale_no}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div><span className="text-gray-500">Date:</span> {purchase.sale_date}</div>
            <div><span className="text-gray-500">Time:</span> {(purchase.sale_time || '').slice(0, 8)}</div>
            <div className="col-span-2"><span className="text-gray-500">Customer:</span> {purchase.customer_name || '-'}</div>
            <div><span className="text-gray-500">Mobile:</span> {purchase.mobile || '-'}</div>
            <div><span className="text-gray-500">Status:</span>
              <span className={`ml-1 px-2 py-0.5 rounded text-xs ${
                purchase.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>{purchase.status}</span>
            </div>
            {purchase.kids_name && <div><span className="text-gray-500">Kid's Name:</span> {purchase.kids_name}</div>}
            {purchase.coupon_code && <div><span className="text-gray-500">Coupon:</span> {purchase.coupon_code}</div>}
          </div>

          <div>
            <h4 className="font-medium mb-2">Items</h4>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1">Product</th>
                  <th className="text-right py-1">Qty</th>
                  <th className="text-right py-1">Rate</th>
                  <th className="text-right py-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-1.5">{item.product_name}</td>
                    <td className="text-right">{parseFloat(item.qty || 0)}</td>
                    <td className="text-right">{parseFloat(item.rate || 0).toFixed(2)}</td>
                    <td className="text-right">{parseFloat(item.line_total || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t pt-3 space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>{subtotal.toFixed(2)}</span></div>
            {discount > 0 && <div className="flex justify-between text-amber-600"><span>Discount</span><span>-{discount.toFixed(2)}</span></div>}
            <div className="flex justify-between font-semibold"><span>Total</span><span>৳ {total.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Paid</span><span>{paidTotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Change</span><span>{changeAmount.toFixed(2)}</span></div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
