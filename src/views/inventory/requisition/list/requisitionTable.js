'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Building2,
  Trash2,
  Edit,
  CheckCircle,
  Hash,
  Plus,
  RefreshCcw,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const RequisitionTable = ({ data = [], onEdit, onDelete, onApprove, onSettle, onCreatePurchase }) => {
  return (
    <div className="space-y-6">
      {data.map((requisition) => (
        <div
          key={requisition.id}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
        >
          {/* Card Header */}
          <div className="p-3.5 flex flex-wrap items-center justify-between gap-4 bg-white border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-4">
              {/* ID */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                <FileText className="w-4 h-4 text-gray-400" />
                <span>{requisition.requisition_no}</span>
              </div>

              {/* Approval Status */}
              <div
                className={cn(
                  'px-2 py-0.5 rounded text-[10px] font-bold border',
                  requisition.is_approved === 1
                    ? 'bg-green-50 text-green-600 border-green-200'
                    : 'bg-orange-50 text-orange-600 border-orange-200'
                )}
              >
                {requisition.is_approved === 1 ? 'APPROVED' : 'NOT APPROVED'}
              </div>

              {/* Fulfillment Status */}
              <div
                className={cn(
                  'px-2 py-0.5 rounded text-[10px] font-bold border underline decoration-dotted underline-offset-2',
                  requisition.status === 'FULFILLED'
                    ? 'bg-blue-50 text-blue-600 border-blue-200'
                    : 'bg-purple-50 text-purple-600 border-purple-200'
                )}
              >
                {requisition.status}
              </div>

              

              {/* PC No Challan */}
              <div className="flex items-center gap-1.5 text-xs">
               
               
                {requisition.is_approved === 1 && requisition.status !== 'FULFILLED' ? (
                  <Button
                    variant="primary"
                    size="sm"
                    className="h-8 px-3 text-[11px] bg-blue-600 hover:bg-blue-700 font-bold border-none"
                    onClick={() => onCreatePurchase?.(requisition)}
                  >
                    <Plus className="w-4 h-4 mr-1 stroke-[3]" />
                    Create Purchase
                  </Button>
                ) : (
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-500 border border-gray-200',
                      requisition.purchase_challan_nos && 'bg-blue-50 text-blue-600 border-blue-100'
                    )}
                  >
                    {requisition.purchase_challan_nos || 'No Challan'}
                  </span>
                )}
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              {requisition.is_approved !== 1 && (
                <Button
                  size="sm"
                  className="h-8 px-3 text-[11px] bg-[#f0ad4e] text-white hover:bg-[#ec971f] font-bold border-none shadow-sm"
                  onClick={() => onEdit?.(requisition)}
                >
                  <Edit className="w-3.5 h-3.5 mr-1" />
                  Edit
                </Button>
              )}
              <Button
                size="sm"
                className="h-8 px-3 text-[11px] bg-[#5cb85c] text-white hover:bg-[#449d44] font-bold border-none shadow-sm transition-all"
                onClick={() => onApprove?.(requisition)}
                disabled={requisition.is_approved === 1}
              >
                <CheckCircle className="w-3.5 h-3.5 mr-1" />
                {requisition.is_approved === 1 ? 'Approved' : 'Approve'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-[11px] text-[#6f42c1] border-[#6f42c1] hover:bg-[#6f42c1]/10 font-bold"
                onClick={() => onSettle?.(requisition)}
              >
                <RefreshCcw className="w-3.5 h-3.5 mr-1" />
                Settle
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-[11px] text-[#d9534f] border-[#d9534f] hover:bg-[#d9534f]/10 font-bold"
                onClick={() => onDelete?.(requisition)}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Delete
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight border-r border-gray-100 w-[50px] text-center">
                    SL
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight border-r border-gray-100">
                    PRODUCT NAME
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight border-r border-gray-100">
                    BRAND
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight border-r border-gray-100 text-center">
                    UNIT
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight border-r border-gray-100 text-center">
                    CLOSING STOCK
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight border-r border-gray-100 text-center">
                    REQ. QTY
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight border-r border-gray-100 text-center">
                    REC. QTY
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-orange-600 uppercase tracking-tight border-r border-gray-100 text-center bg-orange-50/20">
                    PEN. QTY
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight border-r border-gray-100">
                    ORDER TO
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight border-r border-gray-100">
                    ORDER BY
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight border-r border-gray-100">
                    ORDER DATE AND TIME
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-900 uppercase tracking-tight text-center">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {requisition.details?.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-3.5 text-[11px] text-gray-600 border-r border-gray-50 text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3.5 text-[11px] font-bold text-gray-800 border-r border-gray-50">
                      {item.product_name}
                    </td>
                    <td className="px-4 py-3.5 text-[11px] text-gray-500 border-r border-gray-50">
                      {item.brand || '-'}
                    </td>
                    <td className="px-4 py-3.5 text-[11px] text-center text-gray-600 border-r border-gray-50">
                      {item.unit}
                    </td>
                    <td className="px-4 py-3.5 text-[11px] text-center font-bold text-gray-700 border-r border-gray-50">
                      {item.closing_stock?.toFixed(3)}
                    </td>
                    <td className="px-4 py-3.5 text-[11px] text-center font-bold text-gray-700 border-r border-gray-50">
                      {item.requisition_qty?.toFixed(3)}
                    </td>
                    <td className="px-4 py-3.5 text-[11px] text-center font-bold text-gray-700 border-r border-gray-50">
                      {item.received_qty?.toFixed(3)}
                    </td>
                    <td className="px-4 py-3.5 text-[11px] text-center font-black text-orange-600 border-r border-gray-50 bg-orange-50/40">
                      {(item.requisition_qty - item.received_qty).toFixed(3)}
                    </td>
                    <td className="px-4 py-3.5 text-[11px] text-gray-600 border-r border-gray-50">
                      {item.order_to || '-'}
                    </td>
                    <td className="px-4 py-3.5 text-[11px] text-gray-600 border-r border-gray-50">
                      {item.order_by || '-'}
                    </td>
                    <td className="px-4 py-3.5 text-[11px] text-gray-500 border-r border-gray-50">
                      {item.order_date || '-'}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-[#d9534f] border-[#d9534f]/30 hover:bg-[#d9534f]/10"
                        onClick={() => {}}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RequisitionTable
