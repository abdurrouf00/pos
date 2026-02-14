'use client'
import { useMemo } from 'react'
import { useGetTicketCounterQuery, useCheckCouponMutation, useFindCustomerByMobileMutation } from './store'
import { Bell, Search, Trash2, Plus, Minus, Footprints, Ticket, Coins, Armchair, User, Baby, Calendar, ShieldCheck, Clock, Timer, CheckCircle, XCircle, Loader2 } from 'lucide-react'

import toast from 'react-hot-toast'
import { useState } from 'react'
import HrInput from '@/components/common/HrInput'

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
  kidsName,
  setKidsName,
  couponCode,
  setCouponCode,
  qtyInput,
  setQtyInput,
  // New visit props
  lastVisit,
  visitCount,
  handleFindCustomer,
  // Coupon props
  couponData,
  setCouponData,
  // Customer props
  customerData,
  setCustomerData,
}) {
  const { data: ticketData, isLoading: ticketsLoading } = useGetTicketCounterQuery()
  const [checkCoupon, { isLoading: couponLoading }] = useCheckCouponMutation()
  const [findCustomerByMobile, { isLoading: customerLoading }] = useFindCustomerByMobileMutation()

  // Ticket response = POS products API: { data: { data: [ { id, product_name, product_code, pricing: { unit_price }, ... } ] } }
  const packages = useMemo(() => {
    const raw = ticketData?.data?.data ?? ticketData?.data ?? []
    const list = Array.isArray(raw) ? raw : []
    return list.map((item) => {
      const typeSource = item.type ?? item.product_type?.name ?? item.product_type?.code ?? item.product_type ?? 'ticket'
      const type = typeof typeSource === 'string' ? typeSource.toLowerCase() : 'ticket'
      return {
        id: item.id,
        name: item.product_name ?? item.name ?? '',
        price: Number(item.pricing?.unit_price ?? item.price ?? item.unit_price ?? 0),
        type,
        code: item.product_code ?? item.code ?? `${type.toUpperCase()}-${item.id}`,
      }
    })
  }, [ticketData])
  const [activeTab, setActiveTab] = useState('ticket')
  const [memberMobile, setMemberMobile] = useState('')
  const [memberData, setMemberData] = useState(null)

  // Handle Coupon Code Check using real API
  const handleCouponCheck = async () => {
    if (!couponCode || couponCode.trim() === '') {
      toast.error('Please enter a coupon code!')
      return
    }

    try {
      const res = await checkCoupon(couponCode.trim())
      
      if (res?.data?.success) {
        const coupon = res.data.data
        setCouponData && setCouponData(coupon)
        toast.success(res.data.message || 'Coupon is valid!')
      } else {
        setCouponData && setCouponData(null)
        toast.error(res?.data?.message || 'Invalid coupon code')
      }
    } catch (error) {
      setCouponData && setCouponData(null)
      toast.error('Error checking coupon')
    }
  }

  // Handle Customer/Member Search by Mobile
  const handleCustomerSearch = async () => {
    if (!mobileNo || mobileNo.trim().length < 11) {
      toast.error('Please enter a valid mobile number (11 digits)!')
      return
    }

    try {
      const res = await findCustomerByMobile(mobileNo.trim())
      
      if (res?.data?.success) {
        const customer = res.data.data
        setCustomerData && setCustomerData(customer)
        // Also trigger the parent's handleFindCustomer if needed
        handleFindCustomer && handleFindCustomer()
        toast.success(res.data.message || 'Customer found!')
      } else {
        // API not ready yet - fall back to mock/parent handler
        setCustomerData && setCustomerData(null)
        // Use parent handler for now (mock data)
        handleFindCustomer && handleFindCustomer()
      }
    } catch (error) {
      // API not ready - fall back to parent handler (mock)
      handleFindCustomer && handleFindCustomer()
    }
  }

  const handleMemberSearch = async () => {
    // Try API first, fall back to mock if not ready
    if (memberMobile.length >= 10) {
      try {
        const res = await findCustomerByMobile(memberMobile.trim())
        
        if (res?.data?.success) {
          const member = res.data.data
          setMemberData({
            guardian: member.guardian_name || member.name || '-',
            kidName: member.kid_name || '-',
            age: member.age || '-',
            packageType: member.package_type || member.membership?.package_name || '-',
            duration: member.duration || member.membership?.duration || '-',
            startDay: member.start_date || member.membership?.start_date || '-',
            endDay: member.end_date || member.membership?.end_date || '-',
            daysLeft: member.days_left || member.membership?.days_left || 0
          })
          toast.success('Member Found!')
          return
        }
      } catch (error) {
        // API not ready - use mock
      }
      
      // Mock fallback
      setMemberData({
        guardian: 'Simulated Guardian',
        kidName: 'Simulated Kid',
        age: '5 Years',
        packageType: 'Gold Pack',
        duration: '12 Months',
        startDay: '2025-01-01',
        endDay: '2025-12-31',
        daysLeft: 320
      })
      toast.success('Member Found!')
    } else {
      toast.error('Member not found (Enter 10+ digits)')
      setMemberData(null)
    }
  }

  const salesClose = () => {
    window.location.href = '/dashboard/sales-closing?type=ticket'
  }

  // Quick Add Buttons Handler
  const addQuickItem = (pkg) => {
    handleAddItem({
      id: pkg.id,
      name: pkg.name,
      price: activeTab === 'membership' ? 0 : pkg.price,
      mrp: pkg.price, // Store original price for display
      type: pkg.type,
      stock: 999,
      code: (pkg.type || 'ITEM').toUpperCase() + "-" + pkg.id
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

  return (
    <div className="flex-[3] flex flex-col gap-2 h-full font-sans">
      
      {/* ================= HEADER BAR ================= */}
      <div className="flex items-center bg-gray-100 p-2 rounded shadow-sm justify-between">
           <div className="flex bg-white p-1 rounded-md shadow-sm border border-slate-200">
             <button 
                onClick={() => setActiveTab('ticket')}
                className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'ticket' ? 'bg-sky-100  shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
             >
                Ticket
             </button>
             <button 
                onClick={() => setActiveTab('membership')}
                className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'membership' ? 'bg-sky-100 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
             >
                Membership
             </button>
           </div>

           <div className="flex gap-2 ">
            <button 
                  onClick={() => salesClose()}
                  className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded text-sm font-semibold"
                >
                 Sales Close
               </button>              
               <button className="bg-black text-white px-3 py-1 rounded text-sm font-bold flex items-center gap-1">
                 <Bell size={14} /> CS Pack
               </button>
           </div>
       </div>

      {/* ================= INPUTS AREA ================= */}
      {activeTab === 'ticket' ? (
        <div className="bg-white p-3 rounded-lg shadow-md border border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-nowrap items-end gap-3 text-sm">
           {/* Mobile Number */}
           <div className="flex items-end w-full max-w-[200px] gap-1">
              <div className="flex-1">
                <HrInput 
                    label="Mobile Number"
                    required
                    placeholder="01XXXXXXXXX"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    
                />
              </div>
              <button 
                  onClick={handleCustomerSearch}
                  disabled={customerLoading}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-3 h-9 font-bold text-[10px] uppercase rounded-md flex items-center justify-center gap-1"
              >
                  {customerLoading ? <Loader2 size={12} className="animate-spin" /> : 'Find'}
              </button>
           </div>
           
           {/* Kid's Name */}
           <div className="w-full max-w-[150px]">
              <HrInput 
                  label="Kid's Name"
                  placeholder="Enter Name..."
                  value={kidsName}
                  onChange={(e) => setKidsName(e.target.value)}
                  className="h-9"
              />
           </div>
              
           

           
           {/* Coupon Code */}
           <div className="flex items-end w-full max-w-[240px] gap-1">
              <div className="flex-1 relative">
                <HrInput 
                    label="Coupon Code"
                    placeholder="Enter Code..."
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value)
                      // Clear coupon data when code changes
                      setCouponData && setCouponData(null)
                    }}
                />
                {/* Coupon validation indicator */}
                {couponData && (
                  <span className="absolute right-2 top-7 text-green-500">
                    <CheckCircle size={16} />
                  </span>
                )}
              </div>
              <button 
                  onClick={handleCouponCheck}
                  disabled={couponLoading}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-3 h-9 font-bold text-[10px] uppercase rounded-md flex items-center justify-center gap-1"
              >
                  {couponLoading ? <Loader2 size={12} className="animate-spin" /> : 'Check'}
              </button>
           </div>

           {/* Coupon Info Display */}
           {couponData && (
             <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-md px-3 py-1.5">
               <CheckCircle size={14} className="text-green-600" />
               <div className="text-xs">
                 <span className="font-bold text-green-700">{couponData.coupon_name || couponData.coupon_code}</span>
                 <span className="text-green-600 ml-2">
                   {couponData.discount_type === 1 
                     ? `৳${parseFloat(couponData.discount_amount).toFixed(0)} off` 
                     : `${parseFloat(couponData.discount_amount).toFixed(0)}% off`}
                 </span>
               </div>
             </div>
           )}

           {/* Day pass action Buttons */}
           <div className="flex gap-2 w-full lg:w-auto h-9">
    
              <button 
                  onClick={() => {
                    if (!mobileNo) {
                      toast.error('Please enter mobile number first!')
                      return
                    }
                    
                    const today = new Date().toISOString().split('T')[0]
                    const hasRegularTicket = items.some(item => item.type === 'ticket' && item.id !== 'day_pass')
                    const alreadyVisitedToday = lastVisit === today

                    if (hasRegularTicket || alreadyVisitedToday) {
                        addQuickItem({ id: 'day_pass', name: 'Day Pass', price: 1200, type: 'ticket' })
                    } else {
                        toast.error('Day Pass only allowed if a ticket is purchased today!')
                    }
                  }}
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
      ) : (
        <div className="bg-amber-50/50 p-3 rounded-lg shadow-md border border-amber-100 flex flex-col items-start gap-4 text-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex w-full gap-3 items-end">
             
        <div className="  w-full">       

          {/* Details Grid */}
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3">
            <div className="w-full max-w-[240px] ">
                <HrInput 
                    label="Member Mobile / ID"
                    required
                    placeholder="01XXXXXXXXX"
                    value={memberMobile}
                    onChange={(e) => setMemberMobile(e.target.value)}
                    className="h-10 bg-white"
                />
             </div>
            

             {/* Personal Info */}
             <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <User size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold leading-none mb-1">Guardian</span>
                  <span className="font-bold text-slate-800 text-xs block truncate">{memberData?.guardian || '-'}</span>
                </div>
             </div>

             <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                  <Baby size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold leading-none mb-1">Kid Name</span>
                  <span className="font-bold text-slate-800 text-xs block truncate">{memberData?.kidName || '-'}</span>
                </div>
             </div>

             <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <Calendar size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold leading-none mb-1">Age</span>
                  <span className="font-bold text-slate-800 text-xs block">{memberData?.age || '-'}</span>
                </div>
             </div> 

             {/*  Package Info */}
             <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold leading-none mb-1">Package</span>
                  <span className="font-bold text-green-700 text-xs block truncate">{memberData?.packageType || '-'}</span>
                </div>
             </div>

             <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold leading-none mb-1">Duration</span>
                  <span className="font-bold text-amber-700 text-xs block">{memberData?.duration || '-'}</span>
                </div>
             </div>

             <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex items-center gap-3 col-span-1 md:col-span-1">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Calendar size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold leading-none mb-1">Validity</span>
                  <span className="font-bold text-indigo-800 text-[10px] block font-mono">
                    {memberData ? `${memberData.startDay} to ${memberData.endDay}` : '-'}
                  </span>
                </div>
             </div>

             <div className="bg-red-50 p-2 rounded-lg border border-red-100 shadow-sm flex items-center gap-3">
                <div className="p-2 bg-white text-red-600 rounded-lg shadow-sm">
                  <Timer size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-red-400 uppercase font-bold leading-none mb-1">Remaining</span>
                  <span className="font-bold text-red-600 text-xs block">{memberData ? `${memberData.daysLeft} Days` : '-'}</span>
                </div>
             </div>
            
             
              <button 
                  onClick={handleMemberSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-10 font-bold text-xs uppercase rounded-lg shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                  <Search size={14} /> Find Member
              </button>
             
          </div>
        </div>
          </div>
        </div>
      )}

       {/* ================= BUTTONS ROW ================= */}
       <div className="grid grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-2">
           {ticketsLoading ? (
             <div className="col-span-full p-4 text-center text-slate-500 text-sm">Loading tickets...</div>
           ) : packages.length === 0 ? (
             <div className="col-span-full p-4 text-center text-slate-500 text-sm">No ticket products found.</div>
           ) : (
             packages.map((pkg) => (
               <button
                 key={pkg.id}
                 onClick={() => addQuickItem(pkg)}
                 className={`flex flex-col items-center justify-center gap-1 p-1 rounded border transition-all active:scale-95 shadow-sm h-16 ${getColorClass(pkg.type)}`}
               >
                 {getIcon(pkg.type)}
                 <span className="font-bold text-[9px] text-center uppercase leading-tight">{pkg.name}</span>
                 <span className="text-[9px] font-bold opacity-80">৳{pkg.price}</span>
               </button>
             ))
           )}
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
                        {item.mrp || item.price}
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
