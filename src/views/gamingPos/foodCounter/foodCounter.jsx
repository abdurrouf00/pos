'use client'
import { UserPlus, Bell, Search, Trash2, Plus, Minus, RefreshCw, Printer } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'

export default function SalesReturnTopSection({

  productsData,
  handleAddItem,
  items,
  increaseQty,
  decreaseQty,
  removeItem,
  handlePayAll,
}) {
  // Local state for the new inputs to match UI
  const [ticketNo, setTicketNo] = useState('985606')
  const [mobileNo, setMobileNo] = useState('019000000093')

  return (
    <div className="w-full flex flex-col gap-2 h-full font-sans">
      
      {/* ================= HEADER BAR ================= */}
      <div className="flex justify-between items-center bg-slate-200 p-2 rounded shadow-sm">
           <div className="flex items-center gap-2">
               <span className="font-bold text-lg text-slate-700">Food Counter</span>
               <span className="bg-red-600 text-white px-2 py-0.5 rounded text-sm font-bold">FF : 169</span>
               <span className="bg-red-600 text-white px-2 py-0.5 rounded text-sm font-bold">PFR : 436</span>
           </div>
           <div className="flex gap-2">
               <button 
                  onClick={() => window.location.reload()}
                  className="bg-yellow-400 text-black hover:bg-yellow-500 px-4 py-1 rounded text-sm font-semibold"
                >
                 Refresh
               </button>
               <button 
                onClick={handlePayAll}
                className="bg-red-600 text-white hover:bg-red-700 px-4 py-1 rounded text-sm font-semibold">
                 Place Order
               </button>
           </div>
       </div>

      {/* ================= INPUTS ROW 1 ================= */}
      <div className="bg-white p-2 rounded shadow-sm flex gap-2 items-end border">
         {/* Ticket No */}
         <div className="">
             <label className="text-xs text-slate-500 block mb-1">Entry Ticket Number</label>
             <div className="flex relative items-center">
                 <input 
                    className="border p-1 w-full text-sm rounded-l focus:outline-none focus:border-blue-500 border-r-0 h-8" 
                    value={ticketNo}
                    onChange={(e) => setTicketNo(e.target.value)}
                 />
                 <button className="bg-green-600 text-white px-2 rounded-r flex items-center justify-center h-8">
                   Find
                 </button>
             </div>
         </div>

         {/* Mobile No */}
         <div className="">
             <label className="text-xs text-slate-500 block mb-1">Mobile No</label>
             <div className="flex h-8">
                 <input 
                    className="border p-1 w-full text-sm rounded focus:outline-none focus:border-blue-500 h-full" 
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                 />
             </div>
         </div> 

         <div className="flex gap-2">
           <button 
             onClick={() => {
               const p = productsData.find(pd => pd.name === 'Popcorn');
               if(p) handleAddItem(p);
             }}
             className="bg-amber-100 text-amber-700 border border-amber-200 px-4 py-1 rounded font-bold text-sm hover:bg-amber-200 transition-all active:scale-95 h-8 flex items-center"
           >
            Popcorn
           </button>
           <button 
             onClick={() => {
               const p = productsData.find(pd => pd.name === 'FRESH WATER');
               if(p) handleAddItem(p);
             }}
             className="bg-blue-100 text-blue-700 border border-blue-200 px-4 py-1 rounded font-bold text-sm hover:bg-blue-200 transition-all active:scale-95 h-8 flex items-center"
           >
            Water
           </button>
         </div>
      </div>

       {/* ================= CART TABLE ================= */}
       <div className="border rounded bg-white flex-1 overflow-auto shadow-sm relative min-h-[400px]">
         <table className="w-full text-xs table-fixed">
           <thead className=" border bg-gray-100 sticky top-0 z-10">
             <tr>
               <th className="p-3 text-left font-bold border-r w-[35%]">Item Name</th>
               <th className="p-3 text-center font-bold border-r">M.R.P</th>
               <th className="p-3 text-center font-bold border-r">QTY</th>
               <th className="p-3 text-center font-bold border-r">ITEM AMT</th>
               <th className="p-3 text-center font-bold ">DELETE</th>
             </tr>
           </thead>
           <tbody className="divide-y text-slate-600 font-medium">
             {items.map((item, idx) => (
               <tr key={idx} className="hover:bg-gray-50 text-sm">
                 <td className="border p-2 truncate font-semibold">
                   {item.name}
                 </td>
                 <td className="border p-2 text-center">
                   {item.rate}
                 </td>
                 <td className="border p-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <button 
                            onClick={() => decreaseQty(idx)}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 rounded w-5 h-5 flex items-center justify-center"
                        >
                            <Minus size={12} />
                        </button>
                        <span className="w-12 text-center text-xs">{item.qty} PCS</span>
                        <button 
                            onClick={() => increaseQty(idx)}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 rounded w-5 h-5 flex items-center justify-center"
                        >
                            <Plus size={12} />
                        </button>
                    </div>
                 </td>
                
                 <td className="border p-2 text-center font-bold text-slate-800">
                   {item.amount.toFixed(2)}
                   <div className="text-[9px] text-slate-400 font-normal">0.00</div>
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
