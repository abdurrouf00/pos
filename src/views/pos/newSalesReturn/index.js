'use client'
import { useState } from 'react'
import SalesReturnTopSection from './SalesReturnTopSection'
import SalesReturnRightSection from './SalesReturnRightSection'
import SalesReturnModals from './SalesReturnModals'

// RIGHT SIDE PRODUCTS
const productsData = [
  {
    id: 1,
    name: 'POTATO-1',
    category: 'Vegetables',
    price: 120,
    stock: 111,
    image: '/img/potato.webp',
  },
  {
    id: 2,
    name: 'EGG1',
    category: 'Vegetables',
    price: 110,
    stock: 41,
    image: '/img/egg.png',
  },
  {
    id: 3,
    name: 'Rice',
    category: 'Electronics',
    price: 300,
    stock: 8,
    image: '/img/miniket.jpg',
  },
  {
    id: 4,
    name: 'FRESH WATER',
    category: 'drinks',
    price: 120,
    stock: 9,
    image: '/img/fresh.jpg',
  },

  {
    id: 8,
    name: 'FRESH WATER',
    category: 'drinks',
    price: 120,
    stock: 9,
    image: '/img/fresh.jpg',
  },
  {
    id: 7,
    name: 'Rice',
    category: 'Electronics',
    price: 300,
    stock: 8,
    image: '/img/miniket.jpg',
  },
  {
    id: 6,
    name: 'EGG1',
    category: 'Vegetables',
    price: 110,
    stock: 41,
    image: '/img/egg.png',
  },
  {
    id: 5,
    name: 'POTATO-2',
    category: 'Vegetables',
    price: 120,
    stock: 111,
    image: '/img/potato.webp',
  },

  {
    id: 11,
    name: 'POTATO-3',
    category: 'Vegetables',
    price: 120,
    stock: 111,
    image: '/img/potato.webp',
  },
  {
    id: 12,
    name: 'EGG1',
    category: 'Vegetables',
    price: 110,
    stock: 41,
    image: '/img/egg.png',
  },
  {
    id: 17,
    name: 'Rice',
    category: 'Electronics',
    price: 300,
    stock: 8,
    image: '/img/miniket.jpg',
  },
  {
    id: 18,
    name: 'FRESH WATER',
    category: 'drinks',
    price: 120,
    stock: 9,
    image: '/img/fresh.jpg',
  },

  {
    id: 118,
    name: 'FRESH WATER',
    category: 'drinks',
    price: 120,
    stock: 9,
    image: '/img/fresh.jpg',
  },
  {
    id: 117,
    name: 'Rice',
    category: 'Electronics',
    price: 300,
    stock: 8,
    image: '/img/miniket.jpg',
  },
  {
    id: 112,
    name: 'EGG1',
    category: 'Vegetables',
    price: 110,
    stock: 41,
    image: '/img/egg.png',
  },
  {
    id: 111,
    name: 'POTATO-4',
    category: 'Vegetables',
    price: 120,
    stock: 111,
    image: '/img/potato.webp',
  },
]

const today = new Date().toISOString().split('T')[0]

export default function SalesInvoice() {
  // ================= TOP FORM =================
  const [formData, setFormData] = useState({
    customerName: '',
    salesdate: today,
    salesperson: '',
  })

  // ================= ITEMS =================
  const [items, setItems] = useState([])

  // ================= PAYMENT =================
  const [shipping] = useState(0)
  const [adjustment] = useState(0)
  const [descount] = useState(0) // Fixed typo per user requirement
  
  const [paidAmount, setPaidAmount] = useState(0)
  const [paymentNote, setPaymentNote] = useState('')
  const [openPayment, setopenPayment] = useState(false)
  const [openCustomer, setOpenCustomer] = useState(false)

  // MULTIPLE PAYMENT STATE
  const [openMulitplePayment, setopenMulitplePayment] = useState(false)
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
  const total = subtotal + shipping + adjustment

  const handleHoldSale = () => {
    if (items.length === 0) return

    const holdData = {
      id: Date.now(),
      customer: formData.customerName || 'Walk-in Customer',
      items: JSON.parse(JSON.stringify(items)), // ✅ deep copy
      formData: { ...formData }, // ✅ copy
      total,
    }

    setHoldSales((prev) => [...prev, holdData])

    setItems([])
    setFormData({
      customerName: '',
      salesdate: today,
      salesperson: '',
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

  const decreaseQty = (i) =>
    items[i].qty > 1 && handleItemChange(i, 'qty', items[i].qty - 1)

  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i))

  const balance = paidAmount < total ? (total - paidAmount).toFixed(2) : '0.00'
  const changeReturn =
    paidAmount > total ? (paidAmount - total).toFixed(2) : '0.00'

  const handlePayAll = () => {
    // 1. Set full payment
    setPaidAmount(total)
    
    // 2. Prepare data
    const saleData = {
        date: formData.salesdate,
        customer: formData.customerName || 'Walk-in',
        items: items,
        total: total,
        paid: total,
        balance: 0,
        change: 0
    }

    // 3. Print
    const printWindow = window.open('', '', 'width=400,height=600')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt</title>
            <style>
              body { font-family: 'Courier New', monospace; font-size: 12px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border-bottom: 1px dashed #000; padding: 4px; text-align: left; }
              .right { text-align: right; }
              .center { text-align: center; }
            </style>
          </head>
          <body>
            <h3 class="center">Sales Return Receipt</h3>
            <p>Date: ${saleData.date}</p>
            <p>Customer: ${saleData.customer}</p>
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
            <br/>
            <div class="right">
              <p><strong>Total: ${saleData.total.toFixed(2)}</strong></p>
              <p>Paid: ${saleData.paid.toFixed(2)}</p>
              <p>Change: 0.00</p>
            </div>
            <hr/>
            <p class="center">Thank you!</p>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }

    // 4. Save (Simulation) & Reset
    console.log("Saved Sale:", saleData)
    setItems([])
    setFormData(prev => ({ ...prev, customerName: '', salesperson: '' }))
    setPaidAmount(0)
  }

  // Common Print Logic
  const printReceipt = (saleData) => {
    const printWindow = window.open('', '', 'width=400,height=600')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt</title>
            <style>
              body { font-family: 'Courier New', monospace; font-size: 12px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border-bottom: 1px dashed #000; padding: 4px; text-align: left; }
              .right { text-align: right; }
              .center { text-align: center; }
            </style>
          </head>
          <body>
            <h3 class="center">Sales Return Receipt</h3>
            <p>Date: ${saleData.date}</p>
            <p>Customer: ${saleData.customer}</p>
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
            <br/>
            <div class="right">
              <p><strong>Total: ${saleData.total.toFixed(2)}</strong></p>
              <p>Paid: ${saleData.paid.toFixed(2)}</p>
              <p>Change: ${(saleData.paid - saleData.total).toFixed(2)}</p>
            </div>
            <hr/>
            <p class="center">Thank you!</p>
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
    const saleData = {
        date: formData.salesdate,
        customer: formData.customerName || 'Walk-in',
        items: items,
        total: total,
        paid: paidAmount,
        note: paymentNote
    }

    if (shouldPrint) {
        printReceipt(saleData)
    }

    console.log("Saved Single Payment Sale:", saleData)
    setItems([])
    setFormData(prev => ({ ...prev, customerName: '', salesperson: '' }))
    setPaidAmount(0)
    setPaymentNote('')
    setopenPayment(false)
  }

  // Multiple Payment Save
  const handleMultiplePaymentSave = (shouldPrint) => {
    const saleData = {
        date: formData.salesdate,
        customer: formData.customerName || 'Walk-in',
        items: items,
        total: total,
        paid: totalPaid,
        payments: payments
    }

    if (shouldPrint) {
        printReceipt(saleData)
    }

    console.log("Saved Multiple Payment Sale:", saleData)
    setItems([])
    setFormData(prev => ({ ...prev, customerName: '', salesperson: '' }))
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
        handleHoldSale={handleHoldSale}
        setopenPayment={setopenPayment}
        setopenMulitplePayment={setopenMulitplePayment}
        descount={descount}
        handlePayAll={handlePayAll}
      />

      {/* ================= RIGHT SIDE COMPONENT ================= */}
      <SalesReturnRightSection 
         productsData={productsData}
         handleAddItem={handleAddItem}
         itemSearch={itemSearch}
         setItemSearch={setItemSearch}
         selectedCategory={selectedCategory}
         setSelectedCategory={setSelectedCategory}
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
     />
    </div>
  )
}
