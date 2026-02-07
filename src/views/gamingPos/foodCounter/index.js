'use client'
import { useState, useEffect } from 'react'
import SalesReturnTopSection from './foodCounter'
import PriceCalculationSection from '../priceCalculate/index'
import SalesReturnModals from '../model/index'
import productsData from './productsData.json'
import toast from 'react-hot-toast'

const today = new Date().toISOString().split('T')[0]

export default function FoodCounter() {
  // ================= STATE =================
  const [items, setItems] = useState([])
  const [descount, setDescount] = useState(0) 
  const [discountType, setDiscountType] = useState('fixed') 
  const [discountValue, setDiscountValue] = useState(0)
  const [paidAmount, setPaidAmount] = useState(0)
  const [openDiscount, setOpenDiscount] = useState(false)
  const [searchText, setSearchText] = useState('')

  // ================= HANDLERS =================
  const handleAddItem = (product) => {
    setItems((prev) => {
      const exist = prev.find((i) => i.id === product.id)
      if (exist) {
        if (exist.qty >= product.stock) return prev
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1, amount: (i.qty + 1) * i.rate } : i
        )
      }
      return [
        ...prev,
        { id: product.id, name: product.name, stock: product.stock, qty: 1, rate: product.price, tax: 0, amount: product.price },
      ]
    })
  }

  const handleItemChange = (idx, field, value) => {
    const updated = [...items]
    updated[idx][field] = Number(value)
    const { qty, rate, tax } = updated[idx]
    updated[idx].amount = qty * rate + (qty * rate * tax) / 100
    setItems(updated)
  }

  const increaseQty = (i) => {
    if (items[i].qty < items[i].stock) {
      handleItemChange(i, 'qty', items[i].qty + 1)
    }
  }

  const decreaseQty = (i) => items[i].qty > 1 && handleItemChange(i, 'qty', items[i].qty - 1)
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i))

  // ================= CALCULATIONS =================
  const subtotal = items.reduce((s, i) => s + i.amount, 0)
  
  useEffect(() => {
    const calculated = discountType === 'percent' ? (subtotal * Number(discountValue)) / 100 : Number(discountValue)
    setDescount(calculated)
  }, [subtotal, discountType, discountValue])

  const total = subtotal - descount
  const balance = paidAmount < total ? (total - paidAmount).toFixed(2) : '0.00'
  const changeReturn = paidAmount > total ? (paidAmount - total).toFixed(2) : '0.00'


  const handlePayAll = (shouldPrint = true) => {
    if (items.length === 0) return toast.error('Cart is empty!')
    setPaidAmount(total)
    
    const saleData = {
        date: today,
        customer: 'Walk-in',
        items: items,
        total: total,
    }

    if (shouldPrint) {
      const printWindow = window.open('', '', 'width=600,height=600')
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Receipt</title>
              <style>
                @page { size: 80mm auto; margin: 0; }
                body { font-family: 'Courier New', monospace; font-size: 13px; width: 72mm; margin: 0 auto; padding: 10px 0; }
                .header { text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 5px; }
                th { border-bottom: 1px dashed #000; text-align: left; }
                .right { text-align: right; }
                .total-section { margin-top: 10px; border-top: 1px dashed #000; padding-top: 5px; }
                .footer { text-align: center; margin-top: 15px; font-size: 11px; }
              </style>
            </head>
            <body>
              <div class="header"><h2>SALES RECEIPT</h2><p>POS SYSTEM</p></div>
              <div>Date: ${saleData.date}</div>
              <div>Customer: ${saleData.customer}</div>
              <hr/>
              <table>
                <thead><tr><th>Item</th><th class="right">Qty</th><th class="right">Price</th><th class="right">Total</th></tr></thead>
                <tbody>
                  ${items.map(item => `
                    <tr><td>${item.name}</td><td class="right">${item.qty}</td><td class="right">${item.rate}</td><td class="right">${item.amount.toFixed(2)}</td></tr>
                  `).join('')}
                </tbody>
              </table>
              <div class="total-section">
                <div style="display:flex; justify-content:space-between"><b>TOTAL:</b><b>${saleData.total.toFixed(2)}</b></div>
              </div>
              <div class="footer"><p>Thank you for your visit!</p></div>
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.focus()
        printWindow.print()
        printWindow.close()
      }
    }

    console.log("Saved Sale:", saleData)
    toast.success(shouldPrint ? 'Saled and Printed successfully!' : 'Saved successfully!')
    setItems([])
    setPaidAmount(0)
    setDiscountValue(0)
    setDiscountType('fixed')
    setDescount(0)
  }

  // ================= JSX =================

  return (
    <div className="flex gap-2 overflow-hidden">
      {/* ================= LEFT: FOOD COUNTER FORM & TABLE ================= */}
      <div className="flex-[1.5] flex flex-col gap-2 overflow-auto bg-slate-50 p-1 rounded border">
        <SalesReturnTopSection 
          productsData={productsData}
          handleAddItem={handleAddItem}
          items={items}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          removeItem={removeItem}
          handlePayAll={handlePayAll}
        />
      </div>

      {/* ================= MIDDLE: PRODUCT SELECTION ================= */}
      <div className="w-[320px] flex flex-col gap-2 border border-slate-200 rounded bg-white p-2 shadow-sm h-[calc(84vh-20px)] overflow-hidden">
          <div className="flex items-center justify-between gap-2 border-b pb-2 mb-1">
              <div className="flex items-center gap-2">
                  <span className="w-1 h-4 bg-red-600 rounded-full"></span>
                  <span className="font-bold text-slate-700 text-sm">Pick Products</span>
              </div>
              {/*======== Products Search ========= */}
              <div className="relative flex-1 max-w-[200px]">
                  <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                      </span>
                      <input 
                          className="w-full pl-8 pr-2 py-1.5 border rounded text-xs focus:outline-none focus:border-blue-500 bg-slate-50" 
                          placeholder="Search items..."
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                      />
                  </div>
              </div>
          </div>
          
          {/*======== Products List ========= */}
          <div className="flex-1 overflow-auto grid grid-cols-2 lg:grid-cols-3 gap-2 content-start pr-1 custom-scrollbar">
              {productsData.filter(p => 
                  p.name.toLowerCase().includes(searchText.toLowerCase()) || 
                  p.code.toLowerCase().includes(searchText.toLowerCase())
              ).map(p => (
                  <button 
                      key={p.id}
                      onClick={() => handleAddItem(p)}
                      className="flex flex-col border rounded p-1 hover:border-red-400 hover:bg-red-50 transition-all bg-white shadow-sm active:scale-95 group h-fit relative"
                  >
                      <div className="w-full aspect-square bg-slate-100 rounded overflow-hidden mb-1">
                          <img 
                              src={p.image} 
                              alt={p.name} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=' + p.name }}
                          />
                      </div>
                      <p className="text-[10px] font-bold text-slate-700 truncate w-full text-center mt-0.5 px-1">{p.name}</p>
                      <div className="flex justify-between items-center w-full mt-auto px-1">
                          <span className="text-[10px] text-red-600 font-bold">৳{p.price}</span>
                          <span className="text-[8px] bg-slate-100 px-1 rounded text-slate-500">S:{p.stock}</span>
                      </div>
                  </button>
              ))}
          </div>
      </div>

      {/* ================= RIGHT: PRICING & PAYMENT ================= */}
      <div className="w-96 flex flex-col gap-2 overflow-auto bg-slate-50 p-1 rounded border shadow-sm">
        <PriceCalculationSection 
           total={total}
           subtotal={subtotal}
           descount={descount}
           paidAmount={paidAmount}
           setPaidAmount={setPaidAmount}
           changeReturn={changeReturn}
           handlePayAll={handlePayAll}
           setOpenDiscount={setOpenDiscount}
        />
      </div>

     {/* ================= MODALS COMPONENT ================= */}
     <SalesReturnModals 
        total={total}
        changeReturn={changeReturn}
        // Discount Props
        openDiscount={openDiscount}
        setOpenDiscount={setOpenDiscount}
        discountType={discountType}
        setDiscountType={setDiscountType}
        discountValue={discountValue}
        setDiscountValue={setDiscountValue}
        subtotal={subtotal}
     />
    </div>
  )
}
