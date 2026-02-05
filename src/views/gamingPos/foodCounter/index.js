'use client'
import { useState, useEffect } from 'react'
import SalesReturnTopSection from './foodCounter'
import PriceCalculationSection from '../priceCalculate/index'
import SalesReturnModals from '../model/index'
import productsData from './productsData.json'
import toast from 'react-hot-toast'

const today = new Date().toISOString().split('T')[0]

export default function FoodCounter() {
  // ================= TOP FORM =================
  const [formData, setFormData] = useState({
    customerName: '',
    salesdate: today,
    salesperson: '',
    gurdianName: '',
    contactNumber: '',
    kidsName: '',
    kidsAge: '',
    totalCrowd: '',
  })

  // ================= ITEMS =================
  const [items, setItems] = useState([])

  // ================= PAYMENT =================
  const [shipping] = useState(0)
  const [adjustment] = useState(0)
  const [descount, setDescount] = useState(0) 
  const [discountType, setDiscountType] = useState('fixed') // 'fixed' or 'percent'
  const [discountValue, setDiscountValue] = useState(0)
  
  const [paidAmount, setPaidAmount] = useState(0)
  const [paymentNote, setPaymentNote] = useState('')
  const [openPayment, setopenPayment] = useState(false)
  const [openCustomer, setOpenCustomer] = useState(false)

  // MULTIPLE PAYMENT STATE
  const [openMulitplePayment, setopenMulitplePayment] = useState(false)
  const [openDiscount, setOpenDiscount] = useState(false)
  const [payments, setPayments] = useState([
    { method: 'cash', amount: '', note: '' }
  ])

  const addPaymentRow = () => {
    setPayments([...payments, { method: 'cash', amount: '', note: '' }])
  }

  const removePaymentRow = (index) => {
    if (payments.length > 1) {
      setPayments(payments.filter((_, i) => i !== index))
    }
  }

  const updatePayment = (index, field, value) => {
    const updated = [...payments]
    updated[index][field] = value
    setPayments(updated)
  }

  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0)

  // ================= HANDLERS =================
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddItem = (product) => {
    setItems((prev) => {
      const exist = prev.find((i) => i.id === product.id)

      if (exist) {
        if (exist.qty >= product.stock) return prev // 🚫 stock limit

        return prev.map((i) =>
          i.id === product.id
            ? {
                ...i,
                qty: i.qty + 1,
                amount: (i.qty + 1) * i.rate,
              }
            : i
        )
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          stock: product.stock,
          qty: 1,
          rate: product.price,
          tax: 0,
          amount: product.price,
        },
      ]
    })
  }

  // right site filtaration ===================
  const [itemSearch, setItemSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const savedSalesperson = localStorage.getItem('pos_salesperson')
    if (savedSalesperson) {
      setFormData((prev) => ({ ...prev, salesperson: savedSalesperson }))
    }
    const savedCategory = localStorage.getItem('pos_selected_category')
    if (savedCategory) {
      setSelectedCategory(savedCategory)
    }
  }, [])

  useEffect(() => {
    if (formData.salesperson) {
      localStorage.setItem('pos_salesperson', formData.salesperson)
    }
  }, [formData.salesperson])

  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem('pos_selected_category', selectedCategory)
    }
  }, [selectedCategory])

  //todo=================================== Handle Customer
  const handleCustomerChange = (e) => {
    const { name, value } = e.target
    setCustomerForm((prev) => ({ ...prev, [name]: value }))
  }
  const [customerForm, setCustomerForm] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    zip: '',
    address: '',
  })
  

  // todo Hold and Pay =============
  // HOLD SALES
  const [holdSales, setHoldSales] = useState([])
  const [showHoldList, setShowHoldList] = useState(false)
  const handleResumeSale = (id) => {
    const sale = holdSales.find((h) => h.id === id)
    if (!sale) return

    setItems(sale.items)
    setFormData(sale.formData)

    setHoldSales((prev) => prev.filter((h) => h.id !== id))
  }

  // ================= CALC =================
  const totalQty = items.reduce((q, i) => q + i.qty, 0)
  const subtotal = items.reduce((s, i) => s + i.amount, 0)

  // Recalculate discount
  useEffect(() => {
    if (discountType === 'percent') {
      const calculated = (subtotal * Number(discountValue)) / 100
      setDescount(calculated)
    } else {
      setDescount(Number(discountValue))
    }
  }, [subtotal, discountType, discountValue])

  const total = subtotal + shipping + adjustment - descount

  const handleHoldSale = () => {
    if (items.length === 0) return

    const holdData = {
      id: Date.now(),
      customer: formData.customerName || 'Walk-in Customer',
      formData: { ...formData }, // ✅ copy including new fields
      items: JSON.parse(JSON.stringify(items)), // ✅ deep copy
      total,
    }

    setHoldSales((prev) => [...prev, holdData])

    setItems([])
    setFormData(prev => ({
      ...prev,
      customerName: '',
      salesdate: today,
      gurdianName: '',
      contactNumber: '',
      kidsName: '',
      kidsAge: '',
      totalCrowd: '',
    }))
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

  const decreaseQty = (i) =>
    items[i].qty > 1 && handleItemChange(i, 'qty', items[i].qty - 1)

  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i))

  const balance = paidAmount < total ? (total - paidAmount).toFixed(2) : '0.00'
  const changeReturn =
    paidAmount > total ? (paidAmount - total).toFixed(2) : '0.00'

  const handlePayAll = (shouldPrint = true) => {
    // Check if cart is empty
    if (items.length === 0) {
      toast.error('Cart is empty!')
      return
    }

    // 1. Set full payment
    setPaidAmount(total)
    
    // 2. Prepare data
    const saleData = {
        date: formData.salesdate,
        customer: formData.customerName || 'Walk-in',
        gurdianName: formData.gurdianName,
        contactNumber: formData.contactNumber,
        kidsName: formData.kidsName,
        kidsAge: formData.kidsAge,
        totalCrowd: formData.totalCrowd,
        items: items,
        total: total,
        paid: total,
        balance: 0,
        change: 0
    }

    // 3. Print
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
                  font-family: 'Courier New', Courier, monospace; 
                  font-size: 13px; 
                  width: 72mm; /* Printable area for 80mm paper */
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
                .center { text-align: center; }
                .total-section { margin-top: 10px; border-top: 1px dashed #000; padding-top: 5px; }
                .total-row { display: flex; justify-content: space-between; font-weight: bold; }
                .footer { text-align: center; margin-top: 15px; font-size: 11px; }
                hr { border-top: 1px dashed #000; border-bottom: none; margin: 5px 0; }
              </style>
            </head>
            <body>
              <div class="header">
                <h2>SALES RECEIPT</h2>
                <p>POS SYSTEM</p>
              </div>
              <div class="info">
                <div>Date: ${saleData.date}</div>
                <div>Customer: ${saleData.customer}</div>
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
                  ${items.map(item => `
                    <tr>
                      <td>${item.name}</td>
                      <td class="right">${item.qty}</td>
                      <td class="right">${item.rate}</td>
                      <td class="right">${item.amount.toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              
              <div class="total-section">
                <div class="total-row">
                  <span>TOTAL:</span>
                  <span>${saleData.total.toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>PAID:</span>
                  <span>${saleData.paid.toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>CHANGE:</span>
                  <span>0.00</span>
                </div>
              </div>
              <hr/>
              <div class="footer">
                <p>Thank you for your visit!</p>
                <p>Please come again</p>
                <br/>
                <br/>
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
    toast.success(shouldPrint ? 'Saled and Printed successfully!' : 'Saved successfully!')
    
    setItems([])
    setFormData(prev => ({ 
      ...prev, 
      customerName: '',
      gurdianName: '',
      contactNumber: '',
      kidsName: '',
      kidsAge: '',
      totalCrowd: '',
    }))
    setPaidAmount(0)
    // window.location.reload()
  }

  // Common Print Logic
  const printReceipt = (saleData) => {
    const printWindow = window.open('', '', 'width=600,height=600')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt</title>
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
              .center { text-align: center; }
              .total-section { margin-top: 10px; border-top: 1px dashed #000; padding-top: 5px; }
              .total-row { display: flex; justify-content: space-between; font-weight: bold; }
              .footer { text-align: center; margin-top: 15px; font-size: 11px; }
              hr { border-top: 1px dashed #000; border-bottom: none; margin: 5px 0; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>SALES RECEIPT</h2>
              <p>POS SYSTEM</p>
            </div>
            <div class="info">
              <div>Date: ${saleData.date}</div>
              <div>Customer: ${saleData.customer}</div>
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
                ${saleData.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td class="right">${item.qty}</td>
                    <td class="right">${item.rate}</td>
                    <td class="right">${item.amount.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div class="total-section">
              <div class="total-row">
                <span>TOTAL:</span>
                <span>${saleData.total.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>PAID:</span>
                <span>${saleData.paid.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>CHANGE:</span>
                <span>${(saleData.paid - saleData.total).toFixed(2)}</span>
              </div>
            </div>
            <hr/>
            <div class="footer">
              <p>Thank you for your visit!</p>
              <p>Please come again</p>
              <br/>
              <br/>
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

  // Single Payment Save
  const handleSinglePaymentSave = (shouldPrint) => {
    if (items.length === 0) {
      toast.error('Cart is empty!')
      return
    }
    const saleData = {
        date: formData.salesdate,
        customer: formData.customerName || 'Walk-in',
        gurdianName: formData.gurdianName,
        contactNumber: formData.contactNumber,
        kidsName: formData.kidsName,
        kidsAge: formData.kidsAge,
        totalCrowd: formData.totalCrowd,
        items: items,
        total: total,
        paid: paidAmount,
        note: paymentNote
    }

    if (shouldPrint) {
        printReceipt(saleData)
    }

    console.log("Saved Single Payment Sale:", saleData)
    toast.success(shouldPrint ? 'Saled and Printed successfully!' : 'Saved successfully!')
    
    setItems([])
    setFormData(prev => ({ 
      ...prev, 
      customerName: '',
      gurdianName: '',
      contactNumber: '',
      kidsName: '',
      kidsAge: '',
      totalCrowd: '',
    }))
    setPaidAmount(0)
    setPaymentNote('')
    setopenPayment(false)
  }

  // Multiple Payment Save
  const handleMultiplePaymentSave = (shouldPrint) => {
    if (items.length === 0) {
      toast.error('Cart is empty!')
      return
    }
    const saleData = {
        date: formData.salesdate,
        customer: formData.customerName || 'Walk-in',
        gurdianName: formData.gurdianName,
        contactNumber: formData.contactNumber,
        kidsName: formData.kidsName,
        kidsAge: formData.kidsAge,
        totalCrowd: formData.totalCrowd,
        items: items,
        total: total,
        paid: totalPaid,
        payments: payments
    }

    if (shouldPrint) {
        printReceipt(saleData)
    }

    console.log("Saved Multiple Payment Sale:", saleData)
    toast.success(shouldPrint ? 'Saled and Printed successfully!' : 'Saved successfully!')
    
    setItems([])
    setFormData(prev => ({ 
      ...prev, 
      customerName: '',
      gurdianName: '',
      contactNumber: '',
      kidsName: '',
      kidsAge: '',
      totalCrowd: '',
    }))
    setPayments([{ method: 'cash', amount: '', note: '' }])
    setopenMulitplePayment(false)
  }


  // ================= JSX =================

  return (
    <div className="flex gap-4 ">
      {/* ================= LEFT SIDE COMPONENT ================= */}
      <SalesReturnTopSection 
        formData={formData}
        handleChange={handleChange}
        holdSales={holdSales}
        setShowHoldList={setShowHoldList}
        setOpenCustomer={setOpenCustomer}
        productsData={productsData}
        handleAddItem={handleAddItem}
        items={items}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        handleItemChange={handleItemChange}
        removeItem={removeItem}
        totalQty={totalQty}
        total={total}
        subtotal={subtotal}
        handleHoldSale={handleHoldSale}
        setopenPayment={setopenPayment}
        setopenMulitplePayment={setopenMulitplePayment}
        descount={descount}
        setOpenDiscount={setOpenDiscount}
        handlePayAll={handlePayAll}
      />

      {/* ================= RIGHT SIDE COMPONENT ================= */}
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

     {/* ================= MODALS COMPONENT ================= */}
     <SalesReturnModals 
        openCustomer={openCustomer}
        setOpenCustomer={setOpenCustomer}
        customerForm={customerForm}
        handleCustomerChange={handleCustomerChange}
        openPayment={openPayment}
        setopenPayment={setopenPayment}
        paidAmount={paidAmount}
        setPaidAmount={setPaidAmount}
        paymentNote={paymentNote}
        setPaymentNote={setPaymentNote}
        total={total}
        balance={balance}
        changeReturn={changeReturn}
        showHoldList={showHoldList}
        setShowHoldList={setShowHoldList}
        holdSales={holdSales}
        handleResumeSale={handleResumeSale}
        // Multiple Payment Props
        openMulitplePayment={openMulitplePayment}
        setopenMulitplePayment={setopenMulitplePayment}
        payments={payments}
        addPaymentRow={addPaymentRow}
        removePaymentRow={removePaymentRow}
        updatePayment={updatePayment}
        totalPaid={totalPaid}
        // Save Handlers
        handleSinglePaymentSave={handleSinglePaymentSave}
        handleMultiplePaymentSave={handleMultiplePaymentSave}
        // Discount Props
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
  )
}
