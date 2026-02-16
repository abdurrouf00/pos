'use client'
import React, { useState, useEffect } from 'react'
import EntryLeftSection from './ticketCouter'
import PriceCalculationSection from '../priceCalculate'
import SalesReturnModals from '../model/index'
import HrInput from '@/components/common/HrInput'
import toast from 'react-hot-toast'
import packages from './packege.json'
import { useCreateTicketCounterSaleMutation, useCheckCouponMutation } from './store'
import { CheckCircle, Loader2 } from 'lucide-react'

export default function CounterSales  ()  {
  const [items, setItems] = useState([])
  const [paidAmount, setPaidAmount] = useState(0)
  const [lastSale, setLastSale] = useState(null)
  
  // Lifted form states
  const [mobileNo, setMobileNo] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [kidsName, setKidsName] = useState('')
  const [qtyInput, setQtyInput] = useState(1)
  
  // Visit History States
  const [lastVisit, setLastVisit] = useState('-')
  const [visitCount, setVisitCount] = useState(0)

  // Coupon Data State
  const [couponData, setCouponData] = useState(null)
  
  // Customer Data State
  const [customerData, setCustomerData] = useState(null)

  const [formResetTrigger, setFormResetTrigger] = useState(0)

  const [createTicketCounterSale, { isLoading: saleSubmitting }] = useCreateTicketCounterSaleMutation()
  const [checkCoupon, { isLoading: couponLoading }] = useCheckCouponMutation()

  const handleCouponCheck = async () => {
    if (!couponCode || couponCode.trim() === '') {
      toast.error('Please enter a coupon code!')
      return
    }
    try {
      const res = await checkCoupon(couponCode.trim())
      if (res?.data?.success) {
        setCouponData(res.data.data)
        toast.success(res.data.message || 'Coupon is valid!')
      } else {
        setCouponData(null)
        toast.error(res?.data?.message || 'Invalid coupon code')
      }
    } catch (error) {
      setCouponData(null)
      toast.error('Error checking coupon')
    }
  }

  // Update visit info from membership search result
  const handleFindCustomer = (memberships) => {
    if (!memberships || memberships.length === 0) {
      setLastVisit('-')
      setVisitCount(0)
      return
    }
    const first = memberships[0]
    setLastVisit(first.activation_date || '-')
    setVisitCount(memberships.length)
  }


const handleAddItem = (product, qty = 1) => {
  let newItems = [...items]

  // same product + same free/paid sock আলাদা ধরা
  const existingIndex = newItems.findIndex(
    item => item.id === product.id && item.isFree === product.isFree
  )

  // ---------------------------
  // 1️⃣ ADD / UPDATE PRODUCT
  // ---------------------------
  if (existingIndex >= 0) {
    newItems[existingIndex].qty += qty
    newItems[existingIndex].amount =
      newItems[existingIndex].type === 'sock'
        ? (newItems[existingIndex].isFree ? 0 : newItems[existingIndex].qty * newItems[existingIndex].price)
        : newItems[existingIndex].qty * newItems[existingIndex].price
  } else {
    newItems.push({
      ...product,
      qty,
      tax: 0,
      amount:
        product.type === 'sock'
          ? (product.isFree ? 0 : product.price * qty)
          : product.price * qty
    })
  }

  // ---------------------------
  // 2️⃣ Ticket / Massage → FREE SOCK
  // ---------------------------
  if (product.type === 'ticket' || product.type === 'massage') {
    const sockIndex = newItems.findIndex(
      i => i.type === 'sock' && i.isFree === true
    )

    if (sockIndex >= 0) {
      newItems[sockIndex].qty += qty
    } else {
      const sockPkg = packages.find(p => p.type === 'sock') || { id: 12, name: 'Sock', price: 50, type: 'sock' }
      newItems.push({
        id: sockPkg.id,
        name: `${sockPkg.name} (Free)`,
        price: 0,
        mrp: sockPkg.price,
        qty: qty,
        tax: 0,
        amount: 0,
        code: 'FREE-SOCK',
        type: 'sock',
        isFree: true
      })
    }
  }

  setItems(newItems)
}



  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index)
    setItems(updatedItems)
  }

  const increaseQty = (index) => {
    const updatedItems = [...items]
    updatedItems[index].qty += 1
    
    if (updatedItems[index].type === 'sock') {
      updatedItems[index].amount = (updatedItems[index].qty - 1) * 50
    } else {
      updatedItems[index].amount = updatedItems[index].qty * updatedItems[index].price
    }
    
    setItems(updatedItems)
  }

  const decreaseQty = (index) => {
    const updatedItems = [...items]
    if (updatedItems[index].qty > 1) {
      updatedItems[index].qty -= 1
      
      if (updatedItems[index].type === 'sock') {
        updatedItems[index].amount = (updatedItems[index].qty - 1) * 50
      } else {
        updatedItems[index].amount = updatedItems[index].qty * updatedItems[index].price
      }
      
      setItems(updatedItems)
    }
  }

  // Calculations
  // Discount States
  const [descount, setDescount] = useState(0)
  const [discountType, setDiscountType] = useState('fixed')
  const [discountValue, setDiscountValue] = useState(0)
  const [openDiscount, setOpenDiscount] = useState(false)

  // Calculations - use mrp/price * qty per line for subtotal
  const getLineAmount = (item) => (item.mrp ?? item.price ?? 0) * (item.qty ?? 1)
  const subtotal = items.reduce((acc, item) => acc + getLineAmount(item), 0)
  const totalTax = items.reduce((acc, item) => acc + (getLineAmount(item) * (item.tax || 0)) / 100, 0)

  // Recalculate discount (including coupon discount)
  useEffect(() => {
    let manualDiscount = 0
    
    // Calculate manual discount
    if (discountType === 'percent') {
      manualDiscount = (subtotal * Number(discountValue)) / 100
    } else {
      manualDiscount = Number(discountValue)
    }
    
    // Add coupon discount if valid coupon applied
    let couponDiscount = 0
    if (couponData) {
      if (couponData.discount_type === 2) {
        // Percentage discount
        couponDiscount = (subtotal * parseFloat(couponData.discount_amount)) / 100
      } else {
        // Fixed discount
        couponDiscount = parseFloat(couponData.discount_amount)
      }
    }
    
    setDescount(manualDiscount + couponDiscount)
  }, [subtotal, discountType, discountValue, couponData])

  const total = Math.max(0, subtotal + totalTax - descount)
  const changeReturn = paidAmount - total > 0 ? (paidAmount - total).toFixed(2) : 0

   // Handle Pay All / Order Save - with or without coupon
   const handlePayAll = async (shouldPrint = true) => {
     const saleMobile = (mobileNo?.trim() || customerData?.guardian_phone || '').trim()
     if (!saleMobile || saleMobile.length < 10) {
       toast.error('Mobile number is required for sale! (Enter on Ticket tab or search member on Membership tab)')
       return
     }
     if (items.length === 0) {
       toast.error('Cart is empty!')
       return
     }

     // Build ticket counter items - only items with valid product_id (uuid)
     const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
     const ticketItems = items
       .filter((item) => typeof item.id === 'string' && uuidRegex.test(item.id))
       .map((item) => ({
         product_id: item.id,
         qty: item.qty ?? 1,
         rate: item.isFree ? 0 : Number(item.mrp ?? item.price ?? 0),
         item_type: item.type || 'ticket',
         is_free: !!item.isFree,
         tax_percent: item.tax ?? 0,
         discount_type: 0, // 0 = fixed, 1 = percent
         discount_value: 0,
       }))

     if (ticketItems.length === 0) {
       toast.error('No valid ticket products in cart. Add products from the list.')
       return
     }

     const salePayload = {
       sale_date: new Date().toISOString().split('T')[0],
       sale_time: new Date().toTimeString().slice(0, 5),
       membership_id: customerData?.membership_id ?? customerData?.id ?? '',
       mobile: saleMobile,
       coupon_code: couponCode?.trim() || null,
       kids_name: kidsName?.trim() || null,
       kids_age: '',
       dob: customerData?.dob ?? '',
       customer_name: customerData?.guardian_name ?? 'Walk-in Customer',
       status: 'completed',
       note: '',
       items: ticketItems,
       paid_total: Number(paidAmount || total),
       discount_type: discountType === 'percent' ? 1 : 0,
       discount_value: Number(discountValue) || 0,
       discount_amount: Number(descount) || 0,
       vat_amount: Number(totalTax) || 0,
     }

     const saleData = {
       date: salePayload.sale_date,
       time: salePayload.sale_time,
       customer: salePayload.customer_name,
       mobile: saleMobile,
       coupon: couponCode,
       items: items,
       total: total,
       paid: Number(paidAmount || total),
       change: changeReturn,
     }

     try {
       const res = await createTicketCounterSale(salePayload)
       if (!res?.data?.success) {
         toast.error(res?.data?.msg || 'Failed to save sale')
         return
       }
     } catch (err) {
       toast.error(err?.data?.message || err?.message || 'Failed to save sale')
       return
     }

    // PRINTING LOGIC
    if (shouldPrint) {
      const printWindow = window.open('', '', 'width=600,height=600')
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Receipt</title>
              <style>
                @page { size: 80mm auto; margin: 0; }
                body { 
                  font-family: 'Arial', sans-serif; 
                  font-size: 12px; 
                  width: 72mm; 
                  margin: 0 auto;
                  padding: 10px 0;
                  color: #000;
                  line-height: 1.4;
                }
                .header { text-align: center; margin-bottom: 10px; border-bottom: 2px solid #000; padding-bottom: 5px; }
                .header h2 { margin: 0; font-size: 18px; text-transform: uppercase; }
                .header p { margin: 2px 0; font-size: 10px; }
                .info { margin-bottom: 10px; display: flex; flex-wrap: wrap; justify-content: space-between; }
                .info div { width: 100%; margin-bottom: 2px; }
                .info b { font-size: 11px; }
                table { width: 100%; border-collapse: collapse; margin-top: 5px; }
                th { border-bottom: 1px solid #000; text-align: left; padding: 4px 2px; font-size: 11px; }
                td { padding: 4px 2px; vertical-align: top; font-size: 11px; }
                .right { text-align: right; }
                .divider { border-top: 1px dashed #000; margin: 10px 0; }
                .total-section { margin-top: 5px; }
                .total-row { display: flex; justify-content: space-between; font-weight: bold; font-size: 13px; margin-bottom: 2px; }
                .total-row.small { font-size: 11px; font-weight: normal; }
                .footer { text-align: center; margin-top: 20px; font-size: 10px; border-top: 1px solid #000; padding-top: 5px; }
                .barcode { margin-top: 10px; text-align: center; font-size: 20px; font-family: 'Libre Barcode 39', cursive; }
              </style>
            </head>
            <body>
              <div class="header">
                <h2>BAHAAR</h2>
                <p>Gaming POS & Entertainment</p>
                <p>Bali Arcade, Chattogram</p>
              </div>

              <div class="info">
                <div><b>Date:</b> ${saleData.date}  <b>Time:</b> ${saleData.time}</div>
                <div><b>Mobile:</b> ${saleData.mobile}</div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th class="right">Qty</th>
                    <th class="right">Price</th>
                    <th class="right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map(item => `
                    <tr>
                      <td style="font-weight:bold;">${item.name}</td>
                      <td class="right">${item.qty ?? 1}</td>
                      <td class="right">${Number(item.mrp ?? item.price ?? item.rate ?? 0).toFixed(0)}</td>
                      <td class="right">${((item.mrp ?? item.price ?? 0) * (item.qty ?? 1)).toFixed(0)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              
              <div class="divider"></div>

              <div class="total-section">
                <div class="total-row small">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                ${descount > 0 ? `
                <div class="total-row small">
                  <span>Discount:</span>
                  <span>-${descount.toFixed(2)}</span>
                </div>` : ''}
                <div class="total-row">
                  <span>NET TOTAL:</span>
                  <span>৳ ${saleData.total.toFixed(0)}</span>
                </div>
                <div class="divider"></div>
                <div class="total-row small">
                  <span>Paid Amount:</span>
                  <span>${saleData.paid.toFixed(2)}</span>
                </div>
                <div class="total-row small">
                  <span>Change:</span>
                  <span>${saleData.change}</span>
                </div>
              </div>

              <div class="footer">
                <p>Thank you for choosing BAHAAR!</p>
                <p>Software by POS Solutions</p>
              </div>
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.focus()
        printWindow.print()
        printWindow.close()
      }
    }

    // Reset Form
    setLastSale(saleData)
    toast.success('Order Submitted Successfully!')
    setItems([])
    setPaidAmount(0)
    setDescount(0)
    setDiscountValue(0)
    setDiscountType('fixed')
    setOpenDiscount(false)
    setMobileNo('')
    setCouponCode('')
    setKidsName('')
    setQtyInput(1)
    setLastVisit('-')
    setVisitCount(0)
    setCouponData(null)
    setCustomerData(null)
    setFormResetTrigger((t) => t + 1)
  }

  const handleReprint = () => {
    if (!lastSale) {
      toast.error('No recent sale to reprint!')
      return
    }

    const printWindow = window.open('', '', 'width=600,height=600')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt (Reprint)</title>
            <style>
              @page { size: 80mm auto; margin: 0; }
              body { 
                font-family: 'Courier New', Courier, monospace; 
                font-size: 13px; 
                width: 72mm; 
                margin: 0 auto;
                padding: 10px 0;
                color: #000;
              }
              .header { text-align: center; margin-bottom: 5px; }
              .header h2 { margin: 0; font-size: 16px; }
              .info { margin-bottom: 5px; font-size: 12px; }
              table { width: 100%; border-collapse: collapse; margin-top: 5px; }
              th { border-bottom: 1px dashed #000; text-align: left; padding: 2px; }
              td { padding: 2px; vertical-align: top; }
              .right { text-align: right; }
              .total-section { margin-top: 10px; border-top: 1px dashed #000; padding-top: 5px; }
              .total-row { display: flex; justify-content: space-between; font-weight: bold; }
              .footer { text-align: center; margin-top: 15px; font-size: 11px; }
              hr { border-top: 1px dashed #000; border-bottom: none; margin: 5px 0; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>SALES RECEIPT (REPRINT)</h2>
              <p>POS SYSTEM</p>
            </div>
            <div class="info">
              <div>Date: ${lastSale.date}</div>
              <div>Customer: ${lastSale.customer}</div>
            </div>
            <hr/>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th class="right">Qty</th>
                  <th class="right">Price</th>
                  <th class="right">Total</th>
                </tr>
              </thead>
              <tbody>
                ${lastSale.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td class="right">${item.qty}</td>
                    <td class="right">${item.price || item.rate}</td>
                    <td class="right">${item.amount.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div class="total-section">
              <div class="total-row">
                <span>TOTAL:</span>
                <span>${lastSale.total.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>PAID:</span>
                <span>${Number(lastSale.paid).toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>CHANGE:</span>
                <span>${lastSale.change}</span>
              </div>
            </div>
            <hr/>
            <div class="footer">
              <p>Thank you!</p>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-100px)] p-2 bg-gray-50">
      {/* Left Section */}
      <EntryLeftSection 
        items={items}
        handleAddItem={handleAddItem}
        removeItem={removeItem}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        handleReprint={handleReprint}
        // Form states
        mobileNo={mobileNo}
        setMobileNo={setMobileNo}
        kidsName={kidsName}
        setKidsName={setKidsName}
        qtyInput={qtyInput}
        setQtyInput={setQtyInput}
        // Visit states
        lastVisit={lastVisit}
        visitCount={visitCount}
        handleFindCustomer={handleFindCustomer}
        // Customer states
        customerData={customerData}
        setCustomerData={setCustomerData}
        formResetTrigger={formResetTrigger}
      />
      
      {/* Right Section */}
      <div className="w-full md:w-[320px] lg:w-[350px] flex flex-col gap-4">
         {/* Coupon Section */}
         <div className="bg-white p-3 rounded-lg shadow-md border border-slate-100">
           <div className="flex items-end gap-2">
             <div className="flex-1 relative">
               <HrInput
                 label="Coupon Code"
                 placeholder="Enter Code..."
                 value={couponCode}
                 onChange={(e) => {
                   setCouponCode(e.target.value)
                   setCouponData(null)
                 }}
               />
               {couponData && (
                 <span className="absolute right-2 top-7 text-green-500">
                   <CheckCircle size={16} />
                 </span>
               )}
             </div>
             <button
               type="button"
               onClick={handleCouponCheck}
               disabled={couponLoading}
               className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-3 h-9 font-bold text-[10px] uppercase rounded-md flex items-center justify-center gap-1"
             >
               {couponLoading ? <Loader2 size={12} className="animate-spin" /> : 'Check'}
             </button>
           </div>
           {couponData && (
             <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-md px-3 py-1.5 mt-2">
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
         </div>

         <PriceCalculationSection 
            total={total}
            subtotal={subtotal}
            paidAmount={paidAmount}
            setPaidAmount={setPaidAmount}
            changeReturn={changeReturn}
            handlePayAll={handlePayAll}
            descount={descount}
            setOpenDiscount={setOpenDiscount}
            isSubmitting={saleSubmitting}
         />
         <SalesReturnModals 
            openDiscount={openDiscount}
            setOpenDiscount={setOpenDiscount}
            discountType={discountType}
            setDiscountType={setDiscountType}
            discountValue={discountValue}
            setDiscountValue={setDiscountValue}
            setDescount={setDescount}
            subtotal={subtotal}
         />
      </div>
    </div>
  )
}


