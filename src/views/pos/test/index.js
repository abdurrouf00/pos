
'use client'

import { useState } from 'react'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import ProductsData from '@/views/pos/productsData/data.json'
import Link from 'next/link'

const today = new Date().toISOString().split('T')[0]

export default function CreditNoteForm() {
  // ================= STATES =================
  const [formData, setFormData] = useState({
    customerName: '',
    salesdate: today,
    salesperson: '',
  })

  const [customerForm, setCustomerForm] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    zip: '',
    address: '',
  })

  const [items, setItems] = useState([])
  const [shipping, setShipping] = useState(0)
  const [adjustment, setAdjustment] = useState(0)

  const [paymentType, setPaymentType] = useState('Cash')
  const [paidAmount, setPaidAmount] = useState()
  const [paymentNote, setPaymentNote] = useState('')

  const [opens, setopens] = useState(false)
  const [open, setopen] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // ================= HANDLERS =================
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCustomerChange = (e) => {
    const { name, value } = e.target
    setCustomerForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleProductAdd = (productName) => {
    const product = ProductsData.find((p) => p.item_name === productName)
    if (!product) return

    setItems((prev) => [
      ...prev,
      {
        name: product.item_name,
        qty: 1,
        rate: product.price,
        tax: 0,
        amount: product.price,
      },
    ])
  }

  const handleItemChange = (idx, field, value) => {
    const updated = [...items]
    updated[idx][field] = Number(value)

    const { qty, rate, tax } = updated[idx]
    updated[idx].amount = qty * rate + (qty * rate * tax) / 100
    setItems(updated)
  }

  const increaseQty = (i) => handleItemChange(i, 'qty', items[i].qty + 1)
  const decreaseQty = (i) =>
    items[i].qty > 1 && handleItemChange(i, 'qty', items[i].qty - 1)
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i))

  // ================= CALC =================
  const subtotal = items.reduce((s, i) => s + i.amount, 0)
  const total = subtotal + Number(shipping) + Number(adjustment)

  const balance = paidAmount < total ? (total - paidAmount).toFixed(2) : '0.00'
  const changeReturn =
    paidAmount > total ? (paidAmount - total).toFixed(2) : '0.00'

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.customerName) {
      setErrorMsg('Please select customer')
      return
    }

    const data = {
      ...formData,
      items,
      total,
      paidAmount,
      balance,
      paymentType,
      paymentNote,
    }

    console.log('Saved Sale:', data)
    alert('Sale Saved Successfully ✅')
  }

  // ================= JSX =================
  return (
    <div className="bg-white p-6 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* TOP */}
        <div className="grid grid-cols-4 gap-3">
          <HrSelect
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            label="Customer"
            placeholder="Select Customer"
            options={[
              { value: 'Customer A', label: 'Customer A' },
              { value: 'Customer B', label: 'Customer B' },
            ]}
          />

          <div className="flex items-end gap-1">
            <HrSelect
              name="salesperson"
              value={formData.salesperson}
              onChange={handleChange}
              label="Sales Man"
              placeholder="Select Salesman"
              options={[
                { value: 'Salesman A', label: 'Salesman A' },
                { value: 'Salesman B', label: 'Salesman B' },
              ]}
            />
            <button
              type="button"
              onClick={() => setopens(true)}
              className="border bg-sky-50 p-2 rounded"
            >
              <UserPlus />
            </button>
          </div>

          <HrInput
            label="Sales Date"
            type="date"
            name="salesdate"
            value={formData.salesdate}
            onChange={handleChange}
          />
        </div>
        {/* PRODUCTS */}
        <div>
          <label className='text-bold '> add products</label>

        <HrSelect
          
          onChange={(e) => handleProductAdd(e.target.value)}
          options={ProductsData.map((p) => ({
            value: p.item_name,
            label: p.item_name,
          }))}
          />
          </div>
        {/* TABLE */}
        {/* Item Table */} 
        <div className="border rounded-xl p-6 overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Item</th> 
                <th className="border p-2 w-60">Qty</th> 
                <th className="border p-2">Rate</th> 
                <th className="border p-2">Tax</th> 
                <th className="border p-2">Amount</th> 
                <th className="border p-2">Action</th> 
              </tr> 
            </thead> 
            <tbody>
               
              {items.map((item, idx) => (
                <tr key={idx}>
                   
                  <td className="border p-1">
                     
                    <HrInput value={item.name} readOnly /> 
                  </td> 
                  <td className="border p-1 flex items-center gap-1 w-60">
                     
                    <button type="button" onClick={() => decreaseQty(idx)}>
                       
                      ➖ 
                    </button> 
                    <HrInput value={item.qty} readOnly /> 
                    <button type="button" onClick={() => increaseQty(idx)}>
                       
                      ➕ 
                    </button> 
                  </td> 
                  <td className="border p-1">
                     
                    <HrInput
                      type="number"
                      value={item.rate}
                      readOnly
                      onChange={(e) =>
                        handleItemChange(idx, 'rate', e.target.value)
                      }
                    /> 
                  </td> 
                  <td className="border p-1">
                     
                    <HrSelect
                      value={item.tax}
                      onChange={(e) =>
                        handleItemChange(idx, 'tax', e.target.value)
                      }
                      options={[
                        { value: '0%', label: '0%' },
                        { value: '5%', label: '5%' },
                        { value: '10%', label: '10%' },
                        { value: '15%', label: '15%' },
                      ]}
                    /> 
                  </td> 
                  <td className="border p-1 text-right">
                     
                    {item.amount.toFixed(2)} 
                  </td> 
                  <td className="border p-1 text-center">
                     
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                       
                      ❌ 
                    </button> 
                  </td> 
                </tr>
              ))} 
            </tbody> 
          </table>
        </div>
       
        {/* BUTTONS */}
        <div className="flex  bg-gray-300 p-4 justify-around rounded-lg">
          <div>
            <p>Quantity</p>
            <p>0</p>
            <Button>Hold</Button>
          </div>
          <div>
            <p >Total Amount</p>
            <p>0.00</p>
            <Button onClick={() => setopen(true)}
              
              > Multiple</Button>
          </div>
          <div>
            <p>Total Discount:</p>
            <p>0.00</p>
            <Button onClick={() => setopen(true)}
             > Cash</Button>
          </div>
          <div>
            <p>grand Total:</p>
            <p>0.00</p>
            <Button> Pay All</Button>
          </div>
          
          
         
          {/* <Button variant="outline">
            <Link href="/dashboard">Close</Link>
          </Button> */}
        </div>
      </form>

      {/* ================= POPUP 1 for Add New Customer ================= */}
      {opens && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-start  z-50">
          <div className="bg-white w-[900px] rounded-b-xl ">
            <div className="relative flex items-center border-b">
              <h3 className="w-full text-center font-semibold p-2 bg-amber-100">
                Add New Customer
              </h3>
              <span
                onClick={() => setopens(false)}
                className="absolute right-3 cursor-pointer  hover:bg-red-500 rounded-full p-1 px-3 hover:text-white"
                >
                X
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 p-6">
              <HrInput
                name="name"
                label="Name"
                onChange={handleCustomerChange}
                />
              <HrInput
                name="mobile"
                label="Mobile"
                onChange={handleCustomerChange}
                />
              <HrInput
                name="email"
                label="Email"
                onChange={handleCustomerChange}
                />
              <HrInput
                name="city"
                label="City"
                onChange={handleCustomerChange}
                />
              <HrInput
                name="state"
                label="State"
                onChange={handleCustomerChange}
                />
              <HrInput name="zip" label="Zip" onChange={handleCustomerChange} />
              <HrInput
                name="address"
                label="Address"
                onChange={handleCustomerChange}
                />
            </div>

            <div className="flex gap-2 mt-4 p-6">
              <Button onClick={() => setopens(false)}>Save</Button>
              <Button variant="outline" onClick={() => setopens(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* ================= POPUP 2 for payment form ================= */}

      {open && (
        <div className="fixed inset-0 bg-black/40  flex justify-center items-start  z-50">
          <div className="bg-white w-xl rounded-b-xl ">
            <div className="relative flex items-center border-b">
              <h3 className="w-full text-center font-semibold p-2 bg-amber-100">
               payment
              </h3>
              <span
                onClick={() => setopen(false)}
                className="absolute right-3 cursor-pointer  hover:bg-red-500 rounded-full p-1 px-3 hover:text-white"
              >
                X
              </span>
            </div>

            <div className="flex justify-around p-6">
            <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded">
          <HrInput
            label="Paid Amount"
            type="number"
            value={paidAmount}
            className="bg-white"
            onChange={(e) => setPaidAmount(+e.target.value)}
          />
         
          <HrInput
            label="Note"
            value={paymentNote}
            className="bg-white"
            onChange={(e) => setPaymentNote(e.target.value)}
          />
          </div>
          <div className='flex flex-col gap-1'>
            <p className='p-2 bg-blue-500'>Total Items: {''} </p>
            <p className='p-2 bg-blue-500'> Total: {total}</p>
            <p className='p-2 bg-blue-500'>Descount: {''} </p>
            <p className='p-2 bg-blue-500'>Balance</p>
            <p className='bg-amber-600 p-2'> Total Payable: {balance}</p>
            <p className='bg-orange-300 p-2'>Change : {changeReturn}</p>
          </div>
        </div>


            <div className="flex gap-2 mt-4 p-6 right-3 ">
              <Button variant="outline" onClick={() => setopen(false)}>
                Close
              </Button>

              <Button onClick={() => setopens(false)}>Save</Button>

              <Button  onClick={() => setopen(false)}>
               Save & Print
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
