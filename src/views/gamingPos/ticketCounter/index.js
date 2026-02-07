'use client'
import React, { useState, useEffect } from 'react'
import EntryLeftSection from './ticketCouter'
import PriceCalculationSection from '../priceCalculate'
import SalesReturnModals from '../model/index'
import toast from 'react-hot-toast'

export default function CounterSales  ()  {
  const [items, setItems] = useState([])
  const [paidAmount, setPaidAmount] = useState(0)
  const [lastSale, setLastSale] = useState(null)
  
  // Lifted form states
  const [mobileNo, setMobileNo] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [qtyInput, setQtyInput] = useState(1)
  
  // Visit History States
  const [lastVisit, setLastVisit] = useState('-')
  const [visitCount, setVisitCount] = useState(0)

  // Simulation of finding customer data
  const handleFindCustomer = () => {
    if (!mobileNo) return toast.error('Enter mobile number first!')
    
    // Mock logic: different data for different numbers
    if (mobileNo === '01700000055') {
       setLastVisit('2026-02-01')
       setVisitCount(5)
       toast.success('Customer data fetched!')
    } else if(mobileNo.length >= 11) {
       setLastVisit('2026-02-05')
       setVisitCount(2)
       toast.success('Customer found!')
    } else {
       setLastVisit('-')
       setVisitCount(0)
       toast.error('Customer not found!')
    }
  }


  // Add Item Handler
  const handleAddItem = (product, qty = 1) => {
    let newItems = [...items]
    const existingIndex = newItems.findIndex((item) => item.id === product.id)
    
    if (existingIndex >= 0) {
      // Update existing item
      const updatedQty = newItems[existingIndex].qty + qty
      newItems[existingIndex].qty = updatedQty
      
      // Special Pricing for Socks: First is free, others 50 each
      if (product.type === 'sock') {
        newItems[existingIndex].amount = (updatedQty - 1) * 50
      } else {
        newItems[existingIndex].amount = updatedQty * newItems[existingIndex].price
      }
    } else {
      // Add new item
      const newItem = {
        ...product,
        qty: qty,
        tax: 0,
        amount: product.id === 'sock' ? (qty - 1) * 50 : product.price * qty,
      }
      newItems.push(newItem)
    }

    // TRIGGER: If adding ANY product that is NOT a sock, ensure at least 1 free sock exists
    if (product.type !== 'sock' && !newItems.find(i => i.type === 'sock')) {
        newItems.push({
            id: 12, // Using the ID from packege.json
            name: 'Sock',
            price: 50,
            qty: 1,
            tax: 0,
            amount: 0, // First one is free
            code: 'SOCK-12',
            type: 'sock'
        })
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

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.amount, 0)
  const totalTax = items.reduce((acc, item) => acc + (item.amount * (item.tax || 0)) / 100, 0)

  // Recalculate discount
  useEffect(() => {
    if (discountType === 'percent') {
      const calculated = (subtotal * Number(discountValue)) / 100
      setDescount(calculated)
    } else {
      setDescount(Number(discountValue))
    }
  }, [subtotal, discountType, discountValue])

  const total = subtotal + totalTax - descount
  const changeReturn = paidAmount - total > 0 ? (paidAmount - total).toFixed(2) : 0

   // Handle Pay All / Order Save
   const handlePayAll = (shouldPrint = true) => {
     if (!mobileNo || mobileNo.trim() === '') {
       toast.error('Mobile number is required for sale!')
       return
     }
     if (items.length === 0) {
       toast.error('Cart is empty!')
       return
     }
    // if (paidAmount < total) {
    //   toast.error('Paid amount is less than total!')
    //   return
    // }

    const saleData = {
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        customer: 'Walk-in',
        mobile: mobileNo,
        coupon: couponCode,
        items: items,
        total: total,
        paid: Number(paidAmount || total),
        change: changeReturn
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
                      <td class="right">${item.qty}</td>
                      <td class="right">${(item.price || item.rate).toFixed(0)}</td>
                      <td class="right">${item.amount.toFixed(0)}</td>
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

    // 4. Save (Simulation) & Reset
    console.log("Saved Sale:", saleData)
    setLastSale(saleData) // Save for reprint
    toast.success('Order Submitted Successfully!')
    
    // Reset Form
    setItems([])
    setPaidAmount(0)
    setDescount(0)
    setDiscountValue(0)
    // Clear Input States
    setMobileNo('')
    setCouponCode('')
    setQtyInput(1)
    setLastVisit('-')
    setVisitCount(0)
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
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        qtyInput={qtyInput}
        setQtyInput={setQtyInput}
        // Visit states
        lastVisit={lastVisit}
        visitCount={visitCount}
        handleFindCustomer={handleFindCustomer}
      />
      
      {/* Right Section */}
      <div className="w-full md:w-[320px] lg:w-[350px]">
         <PriceCalculationSection 
            total={total}
            subtotal={subtotal}
            paidAmount={paidAmount}
            setPaidAmount={setPaidAmount}
            changeReturn={changeReturn}
            handlePayAll={handlePayAll}
            descount={descount}
            setOpenDiscount={setOpenDiscount}
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


