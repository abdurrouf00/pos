'use client'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'

export default function SalesReturnRightSection({
  total,
  subtotal,
  descount,
  paidAmount,
  setPaidAmount,
  changeReturn,
  handlePayAll,
  setOpenDiscount,
}) {
  const [method, setMethod] = useState('cash')
  const [paidRef, setPaidRef] = useState('')
  const [bankType, setBankType] = useState('Bank')

  return (
    <div className="flex-1 border p-2 rounded bg-white h-full flex flex-col gap-2 font-sans">
      Total & Discountable
      <div className="grid grid-cols-2 gap-2">
        <div className="border p-3 rounded flex justify-between items-center shadow-sm">
          <span className="font-semibold text-slate-700">Total</span>
          <span className="font-bold text-xl">
            {typeof total === 'number' ? total.toFixed(2) : total}
          </span>
        </div>
        <div className="border p-3 rounded flex justify-between items-center shadow-sm">
          <span className="font-semibold text-slate-700">Discountable Amount</span>
          <span className="font-bold text-xl text-slate-700">0</span>
        </div>
      </div>
      {/* Method Toggle */}
      <div className=" grid grid-cols-2 gap-2 mt-4 mb-4 ">
        <div className="px-2 p-1 gap-0 grid grid-cols-1 border rounded shadow-sm">
          <p className="text-sm">Choose Method</p>

          <div className="flex flex-col-1 gap-1">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="method"
                checked={method === 'cash'}
                onChange={() => setMethod('cash')}
                className="accent-sky-600 w-4 h-4"
              />
              <span className="font-bold text-sm">Cash</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="method"
                checked={method === 'non-cash'}
                onChange={() => setMethod('non-cash')}
                className="accent-sky-600 w-4 h-4"
              />
              <span className="font-bold text-sm text-gray-400">Non-Cash</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {method === 'non-cash' && (
            <div className="text-sm text-gray-600 ">
              <HrSelect
                options={[
                  { value: 'Bank', label: 'Bank' },
                  { value: 'EBL', label: 'EBL' },
                ]}
                className="p-6"
                value={bankType}
                onChange={(e) => setBankType(e.target.value)}
              />
            </div>
          )}

          {method === 'cash' && (
            <div className="mt-0">
              <div className="border p-4 rounded text-xs text-slate-500 flex justify-between">
                Machine Name
                <span className="text-black font-semibold">Cash</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Discount / Coupon Button */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button 
          onClick={() => setOpenDiscount && setOpenDiscount(true)}
          className=" border p-1 rounded flex justify-between items-center font-bold text-gray-700 hover:bg-gray-300 shadow-sm transition-colors"
        >
          <p className="flex items-center gap-1">
            <span className="text-red-500"> Discount</span> | Coupon
          </p>
        </button>
        
        <HrInput 
          type="text" 
          placeholder="Paid Reference No" 
          value={paidRef} 
          onChange={(e) => setPaidRef(e.target.value)}
        />
      </div>
      {/* Payment Summary */}
      <div className="flex flex-col gap-2 flex-1">
        {/* Discount Amount */}
        <div className="border p-2 rounded flex justify-between items-center h-10 shadow-sm">
          <p className="text-xs font-semibold">Discount Amount</p>
          <p className="font-bold text-sm">{descount || 0}</p>
        </div>

        {/* Sub Total */}
        <div className="border p-2 rounded flex justify-between items-center h-10 shadow-sm">
          <div className="flex items-center gap-2">
            <button className="bg-transparent text-slate-700 w-6 h-6 flex items-center justify-center rounded">
              <ArrowRight size={16} />
            </button>
            <span className="text-ms font-semibold">Sub Total</span>
          </div>
          <span className="font-bold text-sm">
            {subtotal ? subtotal.toFixed(2) : '0.00'}
          </span>
        </div>

        {/* VAT &&  Net Amt */}
        <div className='grid grid-cols-2 gap-2'>
          <div className="border p-2 rounded flex justify-between items-center h-12 shadow-sm">
            <p className="text-xs font-semibold ">
              VAT [Excluding]
            </p>

            <p className="font-bold text-red-600 text-sm">0</p>
          </div>

          <div className="border p-2 rounded flex justify-between items-center h-12 shadow-sm border border-gray-300">
            <p className="text-sm font-semibold">Net Amount</p>

            <p className="font-bold text-red-600 text-lg">
              {typeof total === 'number' ? total.toFixed(0) : total}
            </p>
          </div>
        </div>

        {/* Received Amount */}
        <div className="grid grid-cols-2 gap-2 ">
          <div className="border p-2 rounded  h-15 shadow-sm  pb-3">
            <p className="text-xs font-semibold">Received Amount</p>

            <input
              type="number"
              className=" text-right font-bold text-lg w-full  h-full focus:outline-none pb-3 "
              value={paidAmount || ''}
              onChange={(e) => setPaidAmount(Number(e.target.value))}
              placeholder="0"
            />
          </div>

          {/* Return Amount */}
          <div className="border p-2 rounded  h-15 shadow-sm ">
            <p className="text-xs font-semibold">Return Amount</p>
            <p className="font-bold text-red-600 text-lg w-full  h-full text-right pb-3 overflow-hidden">
              {changeReturn}
            </p>
          </div>
        </div>

        {/* Order Proceed */}
        <div className="flex gap-2">
            <Button
              onClick={() => handlePayAll(false)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
             Order Save
            </Button>
            <Button
              onClick={() => handlePayAll(true)}
              className="flex-1"
            >
             Order & Print
            </Button>
        </div>
      </div>
    </div>
  )
}