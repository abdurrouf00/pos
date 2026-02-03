'use client'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function SalesReturnRightSection({
  total,
  subtotal,
  descount,
  paidAmount,
  setPaidAmount,
  changeReturn,
  handlePayAll,
}) {
  const [method, setMethod] = useState('cash')

  return (
    <div className="flex-1 border p-2 rounded bg-white h-full flex flex-col gap-2 font-sans">
      
      Total & Discountable
      <div className="grid grid-cols-1 gap-2">
        <div className="bg-green-300 p-3 rounded flex justify-between items-center shadow-sm">
           <span className="font-semibold text-slate-700">Total</span>
           <span className="font-bold text-xl">{typeof total === 'number' ? total.toFixed(2) : total}</span>
        </div>
        <div className="bg-orange-400 p-3 rounded flex justify-between items-center shadow-sm">
           <span className="font-semibold text-white">Discountable Amount</span>
           <span className="font-bold text-xl text-white">0</span>
        </div>
      </div>

       {/* Method Toggle */}
       <div className="bg-white p-2 border rounded shadow-sm">
          <div className="flex justify-between items-center mb-2">
             <span className="font-bold text-red-600 bg-black/5 px-1 text-sm">Choose Method</span>
          </div>
          <div className="flex gap-4">
             <label className="flex items-center gap-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="method" 
                  checked={method === 'cash'} 
                  onChange={() => setMethod('cash')}
                  className="accent-green-600 w-4 h-4"
                />
                <span className="font-bold text-sm">Cash</span>
             </label>
             <label className="flex items-center gap-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="method" 
                  checked={method === 'non-cash'} 
                  onChange={() => setMethod('non-cash')}
                  className="accent-green-600 w-4 h-4"
                />
                <span className="font-bold text-sm text-gray-400">Non-Cash</span>
             </label>
          </div>
          
           {method === 'non-cash' && (
             <div className="mt-2 text-sm text-gray-600">
               <select className="w-full border p-1 rounded mb-1 bg-white">
                 <option>Select Bank / Machine</option>
                 <option>Cash</option>
               </select>
               <input className="w-full border p-1 rounded" placeholder="Card 4 Digit | MFS Mobile" />
             </div>
           )}

           {method === 'cash' && (
              <div className="mt-2">
                  <div className="bg-gray-50 border p-1 rounded text-xs text-slate-500 flex justify-between">
                      Machine Name
                      <span className="text-black font-semibold">Cash</span>
                  </div>
                  <div className="mt-1 border p-1 rounded text-xs text-gray-400 italic">
                      Paid Reference No <br/>
                      Card 4 Digit | MFS Mobile
                  </div>
              </div>
           )}
       </div>

       {/* Discount / Coupon Button */}
       <button className="bg-gray-200 border p-2 rounded flex justify-between items-center font-bold text-gray-700 hover:bg-gray-300 shadow-sm transition-colors">
           <span className="flex items-center gap-1"><ArrowRight size={16} /> Discount | Coupon</span>
       </button>


       {/* Payment Summary */}
       <div className="flex flex-col gap-2 flex-1">
           {/* Discount Amount */}
           <div className="bg-green-300 p-2 rounded flex justify-between items-center h-10 shadow-sm">
               <div className="flex items-center gap-2">
                   <button className="bg-slate-700 text-white w-6 h-6 flex items-center justify-center rounded text-sm font-bold">-</button>
                   <span className="text-xs font-semibold">Discount Amount</span>
               </div>
               <span className="font-bold text-sm">{descount || 0}</span>
           </div>
           
           {/* Sub Total */}
           <div className="bg-green-300 p-2 rounded flex justify-between items-center h-10 shadow-sm">
                <div className="flex items-center gap-2">
                   <button className="bg-transparent text-slate-700 w-6 h-6 flex items-center justify-center rounded"><ArrowRight size={16}/></button>
                   <span className="text-xs font-semibold">Sub Total</span>
               </div>
               <span className="font-bold text-sm">{subtotal ? subtotal.toFixed(2) : '0.00'}</span>
           </div>

           {/* VAT */}
           <div className="bg-green-300 p-2 rounded flex justify-between items-center h-10 shadow-sm">
               <div className="flex items-center gap-2">
                   <button className="bg-transparent text-slate-700 w-6 h-6 flex items-center justify-center rounded"><span className="border border-slate-700 px-1 text-[10px] font-bold">E+</span></button>
                   <span className="text-xs font-semibold text-red-600">VAT [Excluding]</span>
               </div>
               <span className="font-bold text-red-600 text-sm">0</span>
           </div>

           {/* Net Amt */}
           <div className="bg-gray-200 p-2 rounded flex justify-between items-center h-12 shadow-sm border border-gray-300">
               <div className="flex items-center gap-2">
                   <button className="bg-transparent w-6 h-6 flex items-center justify-center"><span className="text-lg">🖩</span></button>
                   <span className="text-sm font-semibold">Net Amt</span>
               </div>
               <span className="font-bold text-red-600 text-lg">{typeof total === 'number' ? total.toFixed(0) : total}</span>
           </div>

           {/* Received Amount */}
           <div className="bg-green-300 p-2 rounded flex justify-between items-center h-12 shadow-sm relative mt-2">
               <div className="flex items-center gap-2 z-10 pointer-events-none">
                   <button className="bg-transparent text-slate-700 w-6 h-6 flex items-center justify-center font-bold">▷</button>
                   <span className="text-xs font-semibold">Received Amount</span>
               </div>
               <input 
                  type="number" 
                  className="bg-transparent text-right font-bold text-lg w-full absolute right-2 top-0 h-full focus:outline-none pr-2"
                  value={paidAmount || ''}
                  onChange={(e) => setPaidAmount(Number(e.target.value))}
                  placeholder="0"
               />
           </div>

           {/* Return Amount */}
           <div className="bg-green-300 p-2 rounded flex justify-between items-center h-12 shadow-sm mt-1">
               <div className="flex items-center gap-2">
                   <button className="bg-transparent text-slate-700 w-6 h-6 flex items-center justify-center"><span className="rotate-45 block transform">✈</span></button>
                   <span className="text-xs font-semibold">Return Amount</span>
               </div>
               <span className="font-bold text-red-600 text-lg">{changeReturn}</span>
           </div>

           

           {/* Order Proceed */}
            <button 
                onClick={handlePayAll}
                className="bg-red-600 text-white w-full py-2 rounded shadow-sm font-bold text-sm mt-1 hover:bg-red-700 uppercase">
                &gt;&gt; Order Proceed
            </button>
       </div>
    </div>
  )
}
