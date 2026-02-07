'use client'
import packages from './packege.json'
import { Bell, Search, Trash2, Plus, Minus, User, Users, Baby, Footprints, Ticket, Coins, Armchair } from 'lucide-react'
import HrInput from '@/components/common/HrInput'
import { Button } from '@/components/ui/button'
import HrSelect from '@/components/common/HrSelect'

export default function EntryLeftSection({
  items,
  handleAddItem,
  removeItem,
  increaseQty,
  decreaseQty,
  handleAddCsPack,

  handleReprint,
  // Form states from props
  mobileNo,
  setMobileNo,
  token,
  setToken,
  childDobs,
  setChildDobs,
  couponCode,
  setCouponCode,
  qtyInput,
  setQtyInput,
  setOpenCustomer,
  // New visit props
  lastVisit,
  visitCount,
  handleFindCustomer
}) {

  // Quick Add Buttons Handler
  const addQuickItem = (pkg) => {
    handleAddItem({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      type: pkg.type, // Added this line
      stock: 999,
      code: pkg.type.toUpperCase() + "-" + pkg.id
    }, qtyInput)
  }

  const getIcon = (type) => {
    switch (type) {
      case 'ticket': return <Ticket size={18} />
      case 'coin': return <Coins size={18} />
      case 'massage': return <Armchair size={18} />
      case 'sock': return <Footprints size={18} />
      default: return <Plus size={18} />
    }
  }

  const getColorClass = (type) => {
    switch (type) {
      case 'ticket': return 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
      case 'coin': return 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
      case 'massage': return 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
      case 'sock': return 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
      default: return 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
    }
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
               <span className="bg-red-500 text-white px-3 py-1 rounded text-lg font-bold">FF : 123</span>
               <span className="bg-red-500 text-white px-3 py-1 rounded text-lg font-bold">PFR : 120</span>
           </div>

           <div className="flex gap-2">
               <button onClick={handleReprint} className="text-blue-600 font-semibold text-sm hover:underline">Reprint</button>
               <button className="bg-black text-white px-3 py-1 rounded text-sm font-bold flex items-center gap-1">
                 <Bell size={14} /> CS Pack
               </button>
           </div>
       </div>

      {/* ================= INPUTS AREA ================= */}
      <div className="bg-white p-3 rounded-lg shadow-md border border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-nowrap items-end gap-3 text-sm">
         
         {/* Coupon Code */}
         <div className="w-full ">
             <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Coupon Code</label>
             <div className="flex h-9 shadow-sm rounded-md overflow-hidden border border-slate-200 focus-within:ring-1 focus-within:ring-blue-500 transition-all bg-white text-xs">
                <input 
                    className="flex-1 px-2 focus:outline-none min-w-0" 
                    placeholder="Enter Code..."
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 font-bold text-[10px] transition-colors shrink-0 uppercase">
                    Find
                </button>
             </div>
         </div>

         {/* Mobile Number */}
         <div className="w-full ">
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
                    onClick={handleFindCustomer}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 font-bold text-[10px] transition-colors shrink-0 uppercase"
                >
                    Find
                </button>
             </div>
         </div>

         {/* Action Buttons */}
         <div className="flex gap-2 w-full lg:w-auto h-9">
            <button 
                onClick={() => setOpenCustomer(true)}
                className="flex-1 lg:flex-none px-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-bold text-[10px] flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95 whitespace-nowrap"
            >
                <Plus size={14}/> MEMBERSHIP
            </button>
  
            <button 
                onClick={() => addQuickItem({ id: 'day_pass', name: 'Day Pass', price: 1200, type: 'ticket' })}
                className="flex-1 lg:flex-none px-3 bg-slate-800 hover:bg-black text-white rounded-md font-bold text-[10px] flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95 whitespace-nowrap"
            >
                <Bell size={12}/> DAY PASS
            </button>
         </div>

         {/* Visit Info Card */}
         <div className="flex gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-3 w-full lg:w-auto lg:ml-auto">
             <div className="flex flex-col flex-1 lg:flex-none text-center lg:min-w-[60px]">
                 <span className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">Last Visit</span>
                 <span className="text-xs font-black text-slate-700 leading-none">{lastVisit}</span>
             </div>
             <div className="flex flex-col flex-1 lg:flex-none text-center lg:min-w-[60px]">
                 <span className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">Visited</span>
                 <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded leading-none w-fit mx-auto">{visitCount}</span>
             </div>
         </div>
      </div>

       {/* ================= BUTTONS ROW ================= */}
       <div className="grid grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-2">
           {packages.map((pkg) => (
             <button 
                  key={pkg.id}
                  onClick={() => addQuickItem(pkg)}
                  className={`flex flex-col items-center justify-center gap-1 p-1 rounded border transition-all active:scale-95 shadow-sm h-16 ${getColorClass(pkg.type)}`}
              >
                 {getIcon(pkg.type)}
                 <span className="font-bold text-[9px] text-center uppercase leading-tight">{pkg.name}</span>
                 <span className="text-[9px] font-bold opacity-80">৳{pkg.price}</span>
             </button>
           ))}
       </div>


       {/* ================= ITEMS TABLE ================= */}
       <div className="border rounded bg-white flex-1 overflow-auto shadow-sm min-h-[300px]">
         <table className="w-full text-sm table-fixed">
           <thead className="bg-gray-200 ">
             <tr>
               <th className="p-2 text-center font-bold border-r w-12">SL</th>
               <th className="p-2 text-left font-bold border-r w-[40%]">Particulars</th>
               <th className="p-2 text-center font-bold border-r ">M.R.P.</th>
               <th className="p-2 text-center font-bold border-r ">QTY</th>              
               <th className="p-2 text-center font-bold border-r ">Amt</th>
               <th className="p-2 text-center font-bold">Remove</th>
             </tr>
           </thead>
           <tbody className="divide-y text-slate-700 font-medium">
             {items.map((item, idx) => (
               <tr key={idx} className="hover:bg-slate-50 bg-gray-100">
                 <td className="p-2 text-center font-bold border-r bg-gray-100">
                   {idx + 1}
                 </td>
                 <td className="p-2 truncate font-bold bg-gray-100">
                   {item.name}
                 </td>
                 <td className="p-0 text-center border-r">
                    <div className="bg-gray-100  font-bold p-2 h-full flex items-center justify-center">
                        {item.price}
                    </div>
                 </td>
                 <td className="p-0 text-center border-r">
                    <div className="bg-gray-100 font-bold p-2 h-full flex items-center justify-center">
                        {item.qty}
                    </div>
                 </td>              
                 <td className="p-2 text-center font-bold border-r bg-gray-100">
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
