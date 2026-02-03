'use client'
import { useState } from 'react'
import { Bell, Search, Trash2, Plus, Minus, User, Users, Baby, Footprints } from 'lucide-react'
import HrInput from '@/components/common/HrInput'
import { Button } from '@/components/ui/button'

export default function EntryLeftSection({
  items,
  handleAddItem,
  removeItem,
  increaseQty,
  decreaseQty
}) {
  const [mobileNo, setMobileNo] = useState('01700000055')
  const [token, setToken] = useState('')
  const [childDobs, setChildDobs] = useState([''])
  const [couponCode, setCouponCode] = useState('')
  const [qtyInput, setQtyInput] = useState(1)

  // Quick Add Buttons Handler
  const addQuickItem = (name, price, type) => {
    handleAddItem({
      id: type, // simple unique id by type for now
      name: name,
      price: price,
      stock: 999,
      code: type.toUpperCase()
    }, qtyInput) // Pass qtyInput if needed, or default 1
  }

  const handleChildDobChange = (index, value) => {
    const newDobs = [...childDobs]
    newDobs[index] = value
    setChildDobs(newDobs)
  }

  const addChildInput = () => {
    setChildDobs([...childDobs, ''])
  }

  const removeChildInput = (index) => {
    if (childDobs.length > 1) {
      const newDobs = childDobs.filter((_, i) => i !== index)
      setChildDobs(newDobs)
    }
  }

  return (
    <div className="flex-[3] flex flex-col gap-2 h-full font-sans">
      
      {/* ================= HEADER BAR ================= */}
      <div className="flex items-center bg-slate-200 p-2 rounded shadow-sm gap-4">
           <div className="bg-slate-800 text-white p-2 rounded-lg">
             <Bell size={20} />
           </div>
           
           <div className="flex items-center gap-2 flex-1">
               <span className="font-bold text-xl text-slate-700">ENTRY | User ID </span>
               <span className="bg-red-500 text-white px-3 py-1 rounded text-lg font-bold">FF : Total Customer</span>
               <span className="bg-red-500 text-white px-3 py-1 rounded text-lg font-bold">PFR : Total Sales</span>
           </div>

           <div className="flex gap-2">
               <button className="text-blue-600 font-semibold text-sm hover:underline">Reprint</button>
               <button className="bg-black text-white px-3 py-1 rounded text-sm font-bold flex items-center gap-1">
                 <Bell size={14} /> CS Pack
               </button>
           </div>
       </div>

      {/* ================= INPUTS AREA ================= */}
      <div className="bg-white p-2 rounded shadow-sm border grid grid-cols-12 gap-2 text-sm">
         
         {/* Row 1 */}
         <div className="col-span-3">
             <label className="text-xs text-slate-500 block mb-1">Mobile No</label>
             <input 
                className="border p-1 w-full rounded focus:outline-none focus:border-blue-500 bg-blue-50" 
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
             />
         </div>
         
         <div className="col-span-2 flex items-end">
              <div className="flex items-center border rounded overflow-hidden w-full">
                  <span className="bg-gray-100 px-2 py-1 text-xs text-slate-600">Token</span>
                  
              </div>
         </div>

         <div className="col-span-3">
             <label className="text-xs text-slate-500 block mb-1">Child's DOB</label>
             <div className="flex flex-col gap-1">
                {childDobs.map((dob, idx) => (
                    <div key={idx} className="relative flex items-center gap-1">
                        <input 
                            type="date"
                            className="border p-1 w-full rounded focus:outline-none focus:border-blue-500" 
                            placeholder="DD-MON-YY"
                            value={dob}
                            onChange={(e) => handleChildDobChange(idx, e.target.value)}
                        />
                        {childDobs.length > 1 && (
                            <button 
                                onClick={() => removeChildInput(idx)}
                                className="text-red-500 hover:bg-red-50 rounded p-1"
                            >
                                <Minus size={14} />
                            </button>
                        )}
                    </div>
                ))}
             </div>
         </div>

         <div className="col-span-2">
             <label className="text-xs text-slate-500 block mb-1">Coupon Code</label>
             <input 
                className="border p-1 w-full rounded focus:outline-none focus:border-blue-500" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
             />
         </div>

         <div className="col-span-2 flex items-end">
             <button 
                onClick={addChildInput}
                className="bg-orange-400 text-white px-2 py-1.5 rounded w-full font-bold text-xs flex items-center justify-center gap-1">
                 <Bell size={12}/> Multiple
             </button>
         </div>

         {/* Row 2 */}
         <div className="col-span-5">
             <label className="text-xs text-slate-500 block mb-1">Item</label>
             <input 
                className="border p-1 w-full rounded focus:outline-none focus:border-blue-500 bg-blue-50" 
                placeholder="Scan / Search"
             />
         </div>

         <div className="col-span-2">
             <label className="text-xs text-slate-500 block mb-1">Qty</label>
             <div className="flex">
                 <input 
                    type="number"
                    className="border p-1 w-full rounded-l focus:outline-none focus:border-blue-500 text-center" 
                    value={qtyInput}
                    onChange={(e) => setQtyInput(Number(e.target.value))}
                 />
                 <button className="bg-green-700 text-white px-3 rounded-r font-bold">+</button>
             </div>
         </div>

         <div className="col-span-2 flex items-end">
             <button 
                onClick={() => addQuickItem('Day Pass', 1200, 'day_pass')}
                className="bg-orange-400 text-white px-2 py-1.5 rounded w-full font-bold text-xs flex items-center justify-center gap-1 uppercase">
                 <Bell size={12}/> Day Pass
             </button>
         </div>

         {/* Visit Info Box */}
         <div className="col-span-3 row-span-2 border rounded bg-gray-50 p-1 flex flex-col justify-between">
             <div className="flex justify-between border-b pb-1">
                 <div>
                     <span className="text-[10px] text-slate-500 block">Last Visit</span>
                     <span className="text-xs font-bold">-</span>
                 </div>
                 <div>
                     <span className="text-[10px] text-slate-500 block">Visited</span>
                     <span className="text-xs font-bold">0</span>
                 </div>
             </div>
             <div className="flex gap-1 mt-1">
                  <div className="flex-1 border rounded bg-white p-1 text-center">
                      <span className="text-[10px] text-blue-600 font-bold flex items-center justify-center gap-1"><Users size={10}/> Referral</span>
                      <span className="text-[9px] text-slate-400 block">Ref. Code</span>
                  </div>
                  <div className="flex-1 border rounded bg-white p-1 text-center">
                       <span className="text-[10px] text-blue-600 font-bold flex items-center justify-center gap-1"><Plus size={10}/> Add</span>
                   </div>
                   <div className="flex-1 border rounded bg-white p-1 text-center">
                       <span className="text-[10px] text-slate-500 block">Credit</span>
                       <span className="text-xs font-bold">0</span>
                   </div>
             </div>
         </div>
      </div>

       {/* ================= BUTTONS ROW ================= */}
       <div className="grid grid-cols-4 gap-2">
           <button 
                onClick={() => addQuickItem('Guardian', 150, 'guardian')}
                className="bg-green-700 text-white h-12 rounded flex items-center justify-center gap-2 hover:bg-green-800 transition-colors shadow-sm">
               <User size={20} />
               <span className="font-bold">GUARDIAN</span>
           </button>
           <button 
                onClick={() => addQuickItem('Child', 400, 'child')}
                className="bg-green-700 text-white h-12 rounded flex items-center justify-center gap-2 hover:bg-green-800 transition-colors shadow-sm">
               <Users size={20} />
               <span className="font-bold">CHILD</span>
           </button>
           <button 
                onClick={() => addQuickItem('Infant', 0, 'infant')}
                className="bg-green-700 text-white h-12 rounded flex items-center justify-center gap-2 hover:bg-green-800 transition-colors shadow-sm">
               <Baby size={20} />
               <span className="font-bold">INFANT</span>
           </button>
           <button 
                onClick={() => addQuickItem('Sock', 50, 'sock')}
                className="bg-green-700 text-white h-12 rounded flex items-center justify-center gap-2 hover:bg-green-800 transition-colors shadow-sm">
               <Footprints size={20} />
               <span className="font-bold">SOCK</span>
           </button>
       </div>


       {/* ================= ITEMS TABLE ================= */}
       <div className="border rounded bg-white flex-1 overflow-auto shadow-sm min-h-[300px]">
         <table className="w-full text-sm table-fixed">
           <thead className="bg-green-700 text-white">
             <tr>
               <th className="p-2 text-left font-bold border-r border-green-600 w-[40%]">Particulars</th>
               <th className="p-2 text-center font-bold border-r border-green-600">M.R.P.</th>
               <th className="p-2 text-center font-bold border-r border-green-600">QTY</th>              
               <th className="p-2 text-center font-bold border-r border-green-600">VAT[%]</th>
               <th className="p-2 text-center font-bold border-r border-green-600">Amt</th>
               <th className="p-2 text-center font-bold">Remove</th>
             </tr>
           </thead>
           <tbody className="divide-y text-slate-700 font-medium">
             {items.map((item, idx) => (
               <tr key={idx} className="hover:bg-slate-50 bg-gray-100">
                 <td className="p-2 truncate font-bold bg-gray-100">
                   {item.name}
                 </td>
                 <td className="p-0 text-center">
                    <div className="bg-red-500 text-white font-bold p-2 h-full flex items-center justify-center">
                        {item.price}
                    </div>
                 </td>
                 <td className="p-0 text-center">
                    <div className="bg-red-500 text-white font-bold p-2 h-full flex items-center justify-center">
                        {item.qty}
                    </div>
                 </td>
                 <td className="p-2 text-center bg-gray-100">
                   {item.tax || 0}
                 </td>              
                 <td className="p-2 text-center font-bold bg-gray-100">
                   {item.amount.toFixed(0)}
                 </td>
                 <td className="p-2 text-center bg-gray-100">
                   <button
                     onClick={() => removeItem(idx)}
                     className="text-slate-400 hover:text-red-500 transition-colors"
                   >
                     <Trash2 size={16} />
                   </button>
                 </td>
               </tr>
             ))}
             {items.length === 0 && (
                <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400 italic bg-gray-50">
                        No items added
                    </td>
                </tr>
             )}
           </tbody>
         </table>
       </div>


    </div>
  )
}
