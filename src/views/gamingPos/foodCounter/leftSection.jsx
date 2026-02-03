'use client'
import { UserPlus, Bell, Search, Trash2, Plus, Minus, RefreshCw, Printer } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'

export default function SalesReturnTopSection({
  formData,
  handleChange,
  holdSales,
  setShowHoldList,
  setOpenCustomer,
  productsData,
  handleAddItem,
  items,
  increaseQty,
  decreaseQty,
  handleItemChange,
  removeItem,
  //Summary Props
  totalQty,
  total,
  subtotal,
  handleHoldSale,
  setopenPayment,
  setopenMulitplePayment,
  descount,
  setOpenDiscount,
  handlePayAll,
}) {
  // search
  const [searchText, setSearchText] = useState('')
  const [showList, setShowList] = useState(false)
  const searchRef = useRef(null)

  // Local state for the new inputs to match UI
  const [ticketNo, setTicketNo] = useState('985606')
  const [mobileNo, setMobileNo] = useState('01963822093')
  const [skip, setSkip] = useState(false)
  const [membership, setMembership] = useState('')
  const [branchStore, setBranchStore] = useState('Chattogram (Bahaddarhat)')
  
  // Item Entry State
  const [qtyInput, setQtyInput] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowList(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleManualAdd = () => {
    if (selectedProduct) {
       // Create a copy with the specific qty
       const productToAdd = { ...selectedProduct }
       // We'll rely on the parent's handleAddItem logic which usually increments or adds.
       // But if we want specific Qty from input:
       // The parent logic increments by 1 if exists. 
       // We might need to call it 'qtyInput' times or adjust logic.
       // For now, let's just call handleAddItem.
       // Since parent logic is basic, we might need a loop or update parent later.
       // For THIS step, we'll just add 1 or call it N times.
       for(let i=0; i<qtyInput; i++) {
         handleAddItem(selectedProduct)
       }
       setQtyInput(1)
       setSearchText('')
       setSelectedProduct(null)
    }
  }

  // // Dummy Active Packages Data
  // const activePackages = [
  //   { name: 'Heavy Relax - 90 Days VR/MS - 10 Qty', availed: 2, remain: 8, start: '23-APR-25', end: '22-JUL-25' },
  //   { name: 'Heavy Relax - 90 Days VR/MS - 10 Qty', availed: 0, remain: 1, start: '23-APR-25', end: '22-JUL-25' },
  // ]

  return (
    <div className="flex-[3] flex flex-col gap-2 h-full font-sans">
      
      {/* ================= HEADER BAR ================= */}
      <div className="flex justify-between items-center bg-slate-200 p-2 rounded shadow-sm">
           <div className="flex items-center gap-2">
               <span className="font-bold text-lg text-slate-700">Food Counter</span>
               <span className="bg-red-600 text-white px-2 py-0.5 rounded text-sm font-bold">FF : 169</span>
               <span className="bg-red-600 text-white px-2 py-0.5 rounded text-sm font-bold">PFR : 436</span>
           </div>
           <div className="flex gap-2">
               <button className="text-blue-500 text-sm hover:underline flex items-center gap-1 font-semibold">
                 Reprint
               </button>
               <button className="bg-yellow-400 text-black hover:bg-yellow-500 px-4 py-1 rounded text-sm font-semibold">
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
         <div className="w-1/6">
             <label className="text-xs text-slate-500 block mb-1">Entry Ticket Number</label>
             <div className="flex relative items-center">
                 <input 
                    className="border p-1 w-full text-sm rounded-l focus:outline-none focus:border-blue-500 border-r-0 h-8" 
                    value={ticketNo}
                    onChange={(e) => setTicketNo(e.target.value)}
                 />
                 <button className="bg-green-600 text-white px-2 rounded-r flex items-center justify-center h-8">
                    <Bell size={14}/>
                    <span className="ml-1 text-xs font-bold">0</span>
                 </button>
             </div>
         </div>

         {/* Mobile No */}
         <div className="w-1/5">
             <label className="text-xs text-slate-500 block mb-1">Mobile No</label>
             <div className="flex h-8">
                 <input 
                    className="border p-1 w-full text-sm rounded focus:outline-none focus:border-blue-500 h-full" 
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                 />
             </div>
         </div>

         {/* Skip Button */}
         {/* <div className="h-8">
             <button className="bg-yellow-400 px-3 h-full rounded text-sm font-bold hover:bg-yellow-500 text-slate-800 flex items-center">
               &gt;&gt; Skip
             </button>
         </div> */}

         {/* Consumer Membership */}
         <div className="flex-1">
             <label className="text-xs text-slate-500 block mb-1">Consumer</label>
             <input 
                className="border p-1 w-full text-sm rounded focus:outline-none focus:border-blue-500 bg-gray-50 h-8" 
                value={membership}
                placeholder="Membership."
                onChange={(e) => setMembership(e.target.value)}
             />
         </div>

         {/* Branch Store */}
         <div className="w-1/4">
             <label className="text-xs text-slate-500 block mb-1">Branch's Store</label>
             <select 
                className="border p-1 w-full text-sm rounded focus:outline-none focus:border-blue-500 h-8 bg-white"
                value={branchStore}
                onChange={(e) => setBranchStore(e.target.value)}
             >
                 <option>Bali Arcade</option>
                 <option>Agrabad</option>                
             </select>
         </div>
      </div>

       {/* ================= INPUTS ROW 2: ITEM ENTRY ================= */}
       <div className="bg-white p-2 rounded shadow-sm flex gap-2 items-end border">
           {/* Find Item Search */}
           <div className="flex-[2] relative">
               <label className="text-xs text-slate-500 block mb-1">Find Item</label>
               <HrSelect 
                  placeholder="Scan / Search Item"
                  options={productsData.map(p => ({
                    label: `${p.name} (${p.stock})`,
                    value: p.id
                  }))}
                  value={selectedProduct?.id}
                  onChange={(e) => {
                     const p = productsData.find(item => item.id === e.target.value)
                     setSelectedProduct(p)
                     handleAddItem(p)
                  }}
                  className="h-9"
               />
           </div>



           {/* Stock Display */}
           <div className="flex-1">
               <label className="text-xs text-slate-500 block mb-1">Stock</label>
               <div className="border p-1 w-full text-sm rounded bg-gray-50 h-9 flex items-center px-2">
                   {selectedProduct ? selectedProduct.stock : ''}
               </div>
           </div>

           {/* MRP Display */}
           <div className="flex-1">
               <label className="text-xs text-slate-500 block mb-1">MRP</label>
               <div className="border p-1 w-full text-sm rounded bg-gray-50 h-9 flex items-center px-2">
                    {selectedProduct ? selectedProduct.price : ''}
               </div>
           </div>

           {/* Water Button */}
           <div>
               <button 
                  onClick={() => handleAddItem({
                    id: 'water-manual',
                    name: 'Water',
                    price: 20,
                    stock: 1000,
                    code: 'WATER'
                  })}
                  className="bg-yellow-400 w-28 h-9 rounded flex items-center justify-center hover:bg-yellow-500 border border-yellow-500">
                  <div className="grid grid-cols-2 gap-0.5 mr-1">
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold text-black">Water</span>
               </button>
           </div>

           {/* Plus/Minus Buttons */}
           {/* <div className="flex gap-1">
               <button className="bg-white border text-slate-700 rounded px-2 h-9 text-xs font-bold hover:bg-gray-50 flex items-center justify-center w-16 shadow-sm">Plus (+)</button>
               <button className="bg-slate-700 text-white border border-slate-700 rounded px-2 h-9 text-xs font-bold hover:bg-slate-800 flex items-center justify-center w-16 shadow-sm">Minus (-)</button>
           </div> */}
       </div>

       {/* ================= ACTIVE PACKAGES TABLE (Placeholder) ================= */}
       {/* <div className=""> */}
           {/* <table className="w-full text-xs">
               <thead className="bg-gray-100 border-b">
                   <tr>
                       <th className="p-2 text-left font-bold text-slate-700 w-1/3">Name</th>
                       <th className="p-2 text-center font-bold text-slate-700">Availed Qty</th>
                       <th className="p-2 text-center font-bold text-slate-700">Remain Qty</th>
                       <th className="p-2 text-center font-bold text-slate-700">Start</th>
                       <th className="p-2 text-center font-bold text-slate-700">End</th>
                       <th className="p-2 text-center font-bold text-slate-700">-</th>
                   </tr>
               </thead>
               <tbody className="divide-y text-slate-600 font-medium">
                   {activePackages.map((pkg, idx) => (
                       <tr key={idx} className="hover:bg-slate-50 text-[11px]">
                           <td className="p-2">{pkg.name}</td>
                           <td className="p-2 text-center">{pkg.availed}</td>
                           <td className="p-2 text-center">{pkg.remain}</td>
                           <td className="p-2 text-center">{pkg.start}</td>
                           <td className="p-2 text-center">{pkg.end}</td>
                           <td className="p-2 text-center">
                               <button className="text-blue-500 hover:text-blue-700 font-bold text-lg leading-none">+</button>
                           </td>
                       </tr>
                   ))}
               </tbody>
           </table> */}
           {/* Pagination / Info Row */}
           {/* <div className="p-1 text-right text-xs text-slate-500 bg-white border-t">
               1 - 2
           </div> */}
       {/* </div> */}

       {/* ================= CART TABLE ================= */}
       <div className="border rounded bg-white flex-1 overflow-auto shadow-sm min-h-[250px] relative">
         <table className="w-full text-xs table-fixed">
           <thead className=" border bg-gray-100">
             <tr>
               <th className="p-3 text-left font-bold  border-r w-[35%]">Item Name</th>
               <th className="p-3 text-center font-bold  border-r">M.R.P</th>
               <th className="p-3 text-center font-bold  border-r">QTY</th>              
               <th className="p-3 text-center font-bold  border-r">DISCOUNT[%]</th>
               <th className="p-3 text-center font-bold  border-r">VAT[%]</th>
               <th className="p-3 text-center font-bold  border-r">ITEM AMT</th>
               <th className="p-3 text-center font-bold ">DELETE</th>
             </tr>
           </thead>
           <tbody className="divide-y text-slate-600 font-medium">
             {items.map((item, idx) => (
               <tr key={idx} className="hover:bg-gray-50 text-sm">
                 <td className="border p-2 truncate">
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
                        <span>{item.qty} PCS</span>
                        <button 
                            onClick={() => increaseQty(idx)}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 rounded w-5 h-5 flex items-center justify-center"
                        >
                            <Plus size={12} />
                        </button>
                    </div>
                 </td>
                 <td className="border p-2 text-center">
                   0
                 </td>              
                 <td className="border p-2 text-center">
                   {item.tax || 0}
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
                    <td colSpan={7} className="p-12 text-center text-slate-400 italic">
                        No items added to cart
                    </td>
                </tr>
             )}
           </tbody>
         </table>
         {/* Footer Count */}
          <div className="absolute bottom-0 right-0 p-1 text-xs text-slate-500 bg-white/90">
                {items.length} - {items.length}
          </div>
       </div>


    </div>
  )
}
