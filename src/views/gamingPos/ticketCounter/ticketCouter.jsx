'use client'
import { useMemo, useEffect } from 'react'
import { useGetTicketCounterQuery, useLazySearchMemberByMobileQuery } from './store'
import { Bell, Search, Trash2, Plus, Minus, Footprints, Ticket, Coins, Armchair, User, Baby, ShieldCheck, Timer, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import HrInput from '@/components/common/HrInput'
import MembershipFormModal from './MembershipFormModal'


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
  qtyInput,
  setQtyInput,
  // New visit props
  lastVisit,
  visitCount,
  handleFindCustomer,
  // Customer props
  customerData,
  setCustomerData,
  formResetTrigger,
}) {
  const { data: ticketData, isLoading: ticketsLoading } = useGetTicketCounterQuery()
  const [searchMemberByMobile, { isLoading: customerLoading }] = useLazySearchMemberByMobileQuery()

  // Ticket response = POS products API: { data: { data: { data: [...], current_page } } } (paginated) or { data: { data: [...] } }
  const packages = useMemo(() => {
    const res = ticketData?.data?.data
    const list = Array.isArray(res) ? res : (res?.data ?? [])
    return list.map((item) => {
      const typeSource = item.type ?? item.product_type?.name ?? item.product_type?.code ?? item.product_type ?? 'ticket'
      const type = typeof typeSource === 'string' ? typeSource.toLowerCase() : 'ticket'
      const posChannel = item.product_channels?.find?.(
        pc => pc.channel?.code === 'pos' || pc.channel?.name?.toLowerCase() === 'pos'
      )
      const unitPrice = posChannel?.custom_price != null
        ? parseFloat(posChannel.custom_price)
        : parseFloat(item.pricing?.unit_price ?? item.price ?? item.unit_price ?? 0)
      return {
        id: item.id,
        name: item.product_name ?? item.name ?? '',
        price: Number(unitPrice) || 0,
        mrp: Number(item.pricing?.unit_price ?? item.price ?? 0) || unitPrice,
        type,
        code: item.product_code ?? item.code ?? `${type.toUpperCase()}-${item.id}`,
        stock: item.stock?.quantity_in_stock != null ? parseFloat(item.stock.quantity_in_stock) : null,
      }
    })
  }, [ticketData])
  const [activeTab, setActiveTab] = useState('ticket')
  const [memberMobile, setMemberMobile] = useState('')
  const [memberData, setMemberData] = useState(null)
  const [memberFound, setMemberFound] = useState(null)
  const [searchedNotFound, setSearchedNotFound] = useState(false)
  const [membershipModalOpen, setMembershipModalOpen] = useState(false)

  useEffect(() => {
    if (formResetTrigger > 0) {
      setMemberMobile('')
      setMemberData(null)
      setMemberFound(null)
      setSearchedNotFound(false)
      setMembershipModalOpen(false)
    }
  }, [formResetTrigger])

  // Handle Customer/Member Search by Mobile - gamezone-pos API
  const handleCustomerSearch = async () => {
    if (!mobileNo || mobileNo.trim().length < 10) {
      toast.error('Please enter a valid mobile number (min 10 digits)!')
      return
    }

    try {
      const res = await searchMemberByMobile(mobileNo.trim())
      
      const memberships = res?.data?.data
      const first = Array.isArray(memberships) ? memberships[0] : memberships
      if (res?.data?.success && first) {
        const customer = {
          id: first.id,
          membership_id: first.id,
          guardian_name: first.guardian_name || first.client?.name || '-',
          guardian_phone: first.guardian_phone || first.client?.contact,
          child_name: first.child_name,
          dob: first.dob ? String(first.dob).split('T')[0] : '',
          package_name: first.membership_package?.package_name,
          activation_date: first.activation_date,
          expiry_date: first.expiry_date,
          remaining_days: first.remaining_days,
        }
        setCustomerData && setCustomerData(customer)
        handleFindCustomer && handleFindCustomer(Array.isArray(memberships) ? memberships : [first])
        toast.success(res.data.message || 'Member found!')
      } else {
        setCustomerData && setCustomerData(null)
        handleFindCustomer && handleFindCustomer(null)
        toast.info(res?.data?.message || 'No member found - will add as new')
      }
    } catch (error) {
      setCustomerData && setCustomerData(null)
      handleFindCustomer && handleFindCustomer(null)
      toast.error(error?.data?.message || 'Error searching member')
    }
  }

  const handleMemberSearch = async (phoneOverride) => {
    const phone = (phoneOverride ?? memberMobile)?.trim?.()
    if (!phone || phone.length < 10) {
      if (!phoneOverride) {
        toast.error('Please enter a valid mobile number (min 10 digits)')
        setMemberData(null)
        setMemberFound(null)
      }
      return
    }
    if (phoneOverride) setMemberMobile(phone)
    try {
      const res = await searchMemberByMobile(phone)
      const m = res?.data?.data

      if (res?.data?.success && m && typeof m === 'object') {
        setSearchedNotFound(false)
        setMemberFound(m)
        setMemberData({
          id: m.id,
          guardian: m.guardian_name || m.client?.name || '-',
          kidName: m.child_name || '-',
          age: m.dob ? new Date().getFullYear() - new Date(m.dob).getFullYear() + ' Years' : '-',
          packageType: m.membership_package?.package_name || '-',
          duration: m.membership_package?.package_days ? `${m.membership_package.package_days} Days` : '-',
          startDay: m.activation_date || '-',
          endDay: m.expiry_date || '-',
          daysLeft: m.remaining_days ?? '-'
        })
        setCustomerData && setCustomerData({
          id: m.id,
          membership_id: m.id,
          guardian_name: m.guardian_name || m.client?.name || '-',
          guardian_phone: m.guardian_phone || m.client?.contact || phone,
          child_name: m.child_name,
          dob: m.dob ? String(m.dob).split('T')[0] : '',
          package_name: m.membership_package?.package_name,
          activation_date: m.activation_date,
          expiry_date: m.expiry_date,
          remaining_days: m.remaining_days,
        })
        setMobileNo && setMobileNo(phone)
        toast.success('Member found!')
      } else {
        setSearchedNotFound(true)
        setMemberFound(null)
        setMemberData(null)
        setCustomerData && setCustomerData(null)
        toast.error('No member found for this phone no')
      }
    } catch (error) {
      setSearchedNotFound(true)
      setMemberFound(null)
      setMemberData(null)
      setCustomerData && setCustomerData(null)
      toast.error(error?.data?.message || 'Error searching member')
    }
  }

  const getMembershipModalInitialData = () => {
    if (memberFound) {
      return {
        id: memberFound.id,
        guardian_phone: memberFound.guardian_phone || memberFound.client?.contact || memberMobile,
        guardian_name: memberFound.guardian_name || memberFound.client?.name || '',
        guardian_phone_secondary: memberFound.guardian_phone_secondary || memberFound.client?.alt_contact || '',
        guardian_email: memberFound.guardian_email || memberFound.client?.mail || '',
        child_name: memberFound.child_name || '',
        dob: memberFound.dob ? String(memberFound.dob).split('T')[0] : '',
        address: memberFound.address || memberFound.client?.present_address || '',
        child_class: memberFound.child_class || '',
        school_name: memberFound.school_name || '',
        package_for: memberFound.package_for || '',
      }
    }
    return { guardian_phone: memberMobile.trim() }
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
      mrp: pkg.mrp ?? pkg.price,
      type: pkg.type,
      stock: pkg.stock ?? 999,
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
        <div className="bg-amber-50/50 p-3 rounded-lg shadow-md border border-amber-100 flex flex-col gap-4 text-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Mobile + Search */}
          <div className="flex items-end gap-2">
            <div className="flex-1 max-w-[220px]">
              <HrInput
                label="Member Mobile"
                required
                placeholder="01XXXXXXXXX"
                value={memberMobile}
                onChange={(e) => setMemberMobile(e.target.value)}
                className="h-10 bg-white"
              />
            </div>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleMemberSearch(); }}
              disabled={customerLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-2.5 h-10 rounded-lg flex items-center justify-center"
              title="Search member"
            >
              {customerLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setMembershipModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white p-2.5 h-10 rounded-lg flex items-center justify-center gap-1.5 font-medium text-sm"
              title={memberFound ? 'Edit member' : 'Add membership'}
            >
              {memberFound ? 'Edit' : 'Add'}
            </button>
          </div>

          {searchedNotFound && !memberFound && (
            <p className="text-amber-700 text-xs font-medium bg-amber-100 px-3 py-2 rounded">
              No member found for this phone no
            </p>
          )}

          {/* Member Info (when found) */}
          {memberData && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-white p-2 rounded-lg border flex items-center gap-2">
                <User size={16} className="text-blue-600" />
                <div>
                  <span className="text-[9px] text-slate-400 block">Guardian</span>
                  <span className="font-bold text-xs truncate">{memberData.guardian || '-'}</span>
                </div>
              </div>
              <div className="bg-white p-2 rounded-lg border flex items-center gap-2">
                <Baby size={16} className="text-pink-600" />
                <div>
                  <span className="text-[9px] text-slate-400 block">Child</span>
                  <span className="font-bold text-xs truncate">{memberData.kidName || '-'}</span>
                </div>
              </div>
              <div className="bg-white p-2 rounded-lg border flex items-center gap-2">
                <ShieldCheck size={16} className="text-green-600" />
                <div>
                  <span className="text-[9px] text-slate-400 block">Package</span>
                  <span className="font-bold text-xs truncate">{memberData.packageType || '-'}</span>
                </div>
              </div>
              <div className="bg-white p-2 rounded-lg border flex items-center gap-2">
                <Timer size={16} className="text-red-600" />
                <div>
                  <span className="text-[9px] text-slate-400 block">Remaining</span>
                  <span className="font-bold text-xs">{memberData.daysLeft ?? '-'}</span>
                </div>
              </div>
            </div>
          )}

          {membershipModalOpen && (
            <MembershipFormModal
              open={membershipModalOpen}
              onClose={() => setMembershipModalOpen(false)}
              mode={memberFound ? 'edit' : 'add'}
              initialData={getMembershipModalInitialData()}
              onSuccess={(savedData) => {
                const phone = savedData?.guardian_phone || memberMobile?.trim()
                handleMemberSearch(phone || undefined)
              }}
            />
          )}
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
                   {((item.mrp ?? item.price ?? 0) * (item.qty ?? 1)).toFixed(0)}
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
