'use client'
import { UserPlus, Bell, Search, Trash2, Plus, Minus, RefreshCw, Printer, Popcorn } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'
export const getItemAmount = product => {
  return product.qty * product.pricing?.unit_price - product.discount_value
}
export default function SalesReturnTopSection({
  productsData,
  handleAddItem,
  items,
  setItems,
  increaseQty,
  decreaseQty,
  removeItem,
  handlePayAll,
}) {
  // Local state for the new inputs to match UI
  const [ticketNo, setTicketNo] = useState('')
  const [mobileNo, setMobileNo] = useState('')

  const salesClose = () => {
    window.location.href = '/dashboard/sales-closing?type=food'
  }
  const discountChange = (idx, value) => {
    const updated = [...items]
    updated[idx].discount = Number(value)
    if (updated[idx].discount_type === 'fixed') {
      updated[idx].discount_value = Number(value)
    } else {
      const discountValue = (updated[idx].pricing?.unit_price * Number(value)) / 100
      updated[idx].discount_value = discountValue
    }
    setItems(updated)
  }
  const discountTypeChange = (idx, value) => {
    const updated = [...items]
    updated[idx].discount_type = value
    if (value === 'fixed') {
      updated[idx].discount_value = updated[idx]?.discount || 0
    } else {
      updated[idx].discount_value =
        (updated[idx].pricing?.unit_price * updated[idx]?.discount || 0) / 100
    }
    setItems(updated)
  }
  const discountValueChange = (idx, value) => {
    const updated = [...items]
    updated[idx].discount_value = Number(value)
    setItems(updated)
  }

  return (
    <div className="w-full flex flex-col gap-2 h-full ">
      {/* ================= HEADER BAR ================= */}
      <div className="flex justify-between items-center bg-slate-200 p-2 rounded shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-slate-700">Food Counter</span>
          <span className="bg-red-600 text-white px-1 py-0.5 rounded text-sm font-bold">
            FF : 169
          </span>
          <span className="bg-red-600 text-white px-1 py-0.5 rounded text-sm font-bold">
            PFR : 436
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => salesClose()}
            className="bg-green-600 text-white hover:bg-green-700 "
            size="sm"
          >
            Sales Close
          </Button>
          <Button
            onClick={() => window.location.reload()}
            className="bg-yellow-400 text-black hover:bg-yellow-500 "
            size="sm"
          >
            Refresh
          </Button>
          <Button
            onClick={handlePayAll}
            className="bg-red-700 text-white hover:bg-red-700 "
            size="sm"
          >
            Place Order
          </Button>
        </div>
      </div>

      {/* ================= INPUTS ROW 1 ================= */}
      <div className="bg-white p-2 rounded shadow-sm flex gap-2 items-end border">
        {/* Ticket No */}
        {/* <div className="">
          <label className="text-xs text-slate-500 block mb-1">Entry Ticket Number</label>
          <div className="flex relative items-center">
            <input
              className="border p-1 w-full text-sm rounded-l focus:outline-none focus:border-blue-500 border-r-0 h-8"
              value={ticketNo}
              onChange={e => setTicketNo(e.target.value)}
              placeholder="Enter code.."
            />
            <button className="bg-green-600 text-white px-2 rounded-r flex items-center justify-center h-8">
              Find
            </button>
          </div>
        </div> */}
             <div className="w-1/2 ">
             <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Entry Ticket Number</label>
             <div className="flex h-9 shadow-sm rounded-md overflow-hidden border border-slate-200 focus-within:ring-1 focus-within:ring-blue-500 transition-all bg-white text-xs">
                <input 
                    className="flex-1 px-2 focus:outline-none min-w-0" 
                    placeholder="Enter Code..."
                    value={ticketNo}
                    onChange={e => setTicketNo(e.target.value)}
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 font-bold text-[10px] transition-colors shrink-0 uppercase">
                    Find
                </button>
             </div>
         </div>

        {/* Mobile No */}
        {/* <div className="">
          <label className="text-xs text-slate-500 block mb-1">Mobile No</label>
          <div className="flex relative items-center h-8">
            <input
              className="border p-1 w-full text-sm rounded focus:outline-none focus:border-blue-500 h-full"
              value={mobileNo}
              onChange={e => setMobileNo(e.target.value)}
              placeholder="01XXXXXXXXX"
            />
            <button className="bg-green-600 text-white px-2 rounded-r flex items-center justify-center h-8">
              Find
            </button>
          </div>
        </div> */}
              <div className="w-1/2 ">
             <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                 Mobile Number <span className="text-red-500">*</span>
             </label>
             <div className="flex h-9 shadow-sm rounded-md overflow-hidden border border-slate-200 focus-within:ring-1 focus-within:ring-blue-500 transition-all bg-white text-xs">
                <input 
                    className="flex-1 px-2 focus:outline-none bg-blue-50/20 min-w-0" 
                    placeholder="01XXXXXXXXX"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                />
                <button 
                    
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 font-bold text-[10px] transition-colors shrink-0 uppercase"
                >
                    Find
                </button>
             </div>
         </div>

        <div className="flex gap-2">
          <Button
            onClick={() => {
              const p = productsData.find(pd => pd.name === 'Popcorn')
              if (p) handleAddItem(p)
            }}
          size="sm"
           className=" bg-slate-800 hover:bg-black text-xs"
          >
            <Popcorn
            size={12}/>
            POPCORN
          </Button>
          <Button
            onClick={() => {
              const p = productsData.find(pd => pd.name === 'FRESH WATER')
              if (p) handleAddItem(p)
            }}
            size="sm"
            className=" bg-green-600 hover:bg-green-900 text-xs"
          >
          
            Water
          </Button>
        </div>
      </div>

      {/* ================= CART TABLE ================= */}
      <div className="border rounded bg-white flex-1 overflow-auto shadow-sm min-h-[300px]">
        <table className="w-full text-xs table-fixed">
          <thead className=" bg-gray-100">
            <tr>
              <th className="p-2 text-center font-bold border-r w-12">
                ITEM
              </th>
              <th className="px-2 py-1 text-center font-bold border-r text-nowrap">M.R.P</th>
              <th className="px-2 py-1 text-center font-bold border-r w-42">QTY</th>
              <th className="px-2 py-1 text-center font-bold border-r text-nowrap">DISCOUNT</th>
              <th className="px-2 py-1 text-center font-bold border-r ">DISCOUNT TYPE</th>
              <th className="px-2 py-1 text-center font-bold border-r ">Total Discount</th>
              <th className="px-2 py-1 text-center font-bold border-r text-nowrap">ITEM AMT</th>
              <th className="px-2 py-1 text-center font-bold text-nowrap">DELETE</th>
            </tr>
          </thead>
          <tbody className="divide-y text-slate-600 font-medium">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 text-sm">
                <td className="border p-2 truncate font-semibold">{item.product_name}</td>
                <td className="border p-2 text-center">{item.pricing?.unit_price}</td>
                <td className="border p-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => decreaseQty(idx)}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 rounded w-5 h-5 flex items-center justify-center"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-12 text-center text-xs">{Math.round(item.qty)} PCS</span>
                    <button
                      onClick={() => increaseQty(idx)}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 rounded w-5 h-5 flex items-center justify-center"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="number"
                    className="w-full text-center border rounded p-1"
                    value={item.discount}
                    onChange={e => discountChange(idx, e.target.value)}
                  />
                </td>
                <td className="border p-2 text-center">
                  <select
                    className="w-full text-center border rounded p-1"
                    value={item.discount_type}
                    onChange={e => discountTypeChange(idx, e.target.value)}
                  >
                    <option value="fixed">Fixed</option>
                    <option value="percentage">Percentage</option>
                  </select>
                </td>
                <td className="border p-2 text-center">{item.discount_value.toFixed(2)}</td>
                <td className="border p-2 text-center font-bold text-slate-800">
                  {getItemAmount(item)}
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => removeItem(idx)}
                    className="text-blue-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-slate-400 italic">
                  No items added to cart
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Footer Count */}
        <div className="absolute bottom-0 right-0 p-1 text-[10px] text-slate-500 bg-white/90 border-t border-l rounded-tl">
          Total Items: {items.length}
        </div>
      </div>
    </div>
  )
}
