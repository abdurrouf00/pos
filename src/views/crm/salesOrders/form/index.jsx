'use client'

import { useState } from 'react'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'
import { FaRegTrashCan } from 'react-icons/fa6'


export default function QuoteFormDynamicTable() {
  const today = new Date().toISOString().split('T')[0]
    const [preview, setPreview] = useState(null)

  const [formData, setFormData] = useState({
    salesOwner: '',
    subject: '',
    customerNo: '',
    quoteName: '',
    pending: '',
    quoteStage: '',
    salesCommission: '',
    accountName: '',
    dealName: '',
    validUntil: today,
    dueDate: '',
    contactName: '',
    exciseDuty: '',
    carrier: '',
    terms: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const defaultRow = {
    productName: '',
    quantity: 1,
    listPrice: 0,
    discount: 0,
    tax: 0,
    amount: 0,
  }

  const [items, setItems] = useState([defaultRow])
  const [adjustment, setAdjustment] = useState(0)


  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items]
    updatedItems[index][field] =
      field === 'productName' ? value : parseFloat(value) || 0
    const amount =
      updatedItems[index].quantity * updatedItems[index].listPrice
    const discountAmount = (amount * updatedItems[index].discount) / 100
    const taxableAmount = amount - discountAmount
    const taxAmount = (taxableAmount * updatedItems[index].tax) / 100
    updatedItems[index].amount = taxableAmount + taxAmount
    setItems(updatedItems)
  }

  const addItem = () => setItems([...items, { ...defaultRow }])
  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index)
    setItems(updated.length ? updated : [defaultRow])
  }

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const total = subtotal + Number(adjustment)

  const handleSubmit = (e) => {
    e.preventDefault()
    const quoteToSave = {
      ...formData,
      items,
      adjustment: Number(adjustment),
      subtotal,
      total,
    }
    const existingQuotes = JSON.parse(localStorage.getItem('submittedQuotes') || '[]')
    localStorage.setItem(
      'submittedQuotes',
      JSON.stringify([...existingQuotes, quoteToSave])
    )
    alert('✅ Quote Saved Successfully!')

    // reset form
    setFormData({
      salesOwner: '',
      subject: '',
      customerNo: '',
      quoteName: '',
      pending: '',
      quoteStage: '',
      salesCommission: '',
      accountName: '',
      dealName: '',
      validUntil: today,
      dueDate: '',
      contactName: '',
      exciseDuty: '',
      carrier: '',
      terms: '',
      description: '',
    })
    setItems([defaultRow])
    setAdjustment(0)
  }

  return (
     <div className="bg-white p-6 rounded min-h-screen space-y-8">
          <h2 className='text-2xl text-blue-500 '> Create New Sales Order</h2>
    
            <form onSubmit={handleSubmit} className="space-y-8">
             
      
            

        
        {/* Quote Info */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <HrInput
            name="salesOwner"
            value={formData.salesOwner}
            onChange={handleChange}
            label="Sales Order Owner"
          />
          <HrInput
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            label="Subject"
          />
          <HrInput
            name="customerNo"
            value={formData.customerNo}
            onChange={handleChange}
            label="Customer No"
          />
          <HrInput
            name="quoteName"
            value={formData.quoteName}
            onChange={handleChange}
            label="Quote Name"
          />
          <HrInput
            name="pending"
            value={formData.pending}
            onChange={handleChange}
            label="Pending"
          />
          <HrSelect
            name="quoteStage"
            value={formData.quoteStage}
            onChange={handleChange}
            options={[
              { value: 'FedEX', label: 'FedEX' },
              { value: 'UPS', label: 'UPS' },
              { value: 'USPS', label: 'USPS' },
              { value: 'DHL', label: 'DHL' },
              { value: 'BlueDart', label: 'BlueDart' },
            ]}
            label="Carrier"
          />
          <HrInput
            name="salesCommission"
            value={formData.salesCommission}
            onChange={handleChange}
            label="Sales Commission"
          />
          <HrInput
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            label="Account Name"
          />
          <HrInput
            name="dealName"
            value={formData.dealName}
            onChange={handleChange}
            label="Deal Name"
          />
          <HrInput
            name="validUntil"
            type="date"
            value={formData.validUntil}
            onChange={handleChange}
            label="Valid Until"
          />
          <HrInput
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            label="Due Date"
          />
          <HrInput
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            label="Contact Name"
          />
          <HrInput
            name="exciseDuty"
            value={formData.exciseDuty}
            onChange={handleChange}
            label="Excise Duty"
          />
          <HrSelect
            name="carrier"
            value={formData.carrier}
            onChange={handleChange}
            options={[
              { value: 'Created', label: 'Created' },
              { value: 'Approved', label: 'Approved' },
              { value: 'Cancelled', label: 'Cancelled' },
              { value: 'Delivered', label: 'Delivered' },
            ]}
            label="Status"
          />
        </div>

        {/* Items Table */}
        <div className="rounded-xl border overflow-x-auto p-4">
          <h2 className="text-lg font-semibold mb-3">Quoted Items</h2>
          <table className="w-full border text-sm table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">S.NO</th>
                <th className="p-2 border">Product Name</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">List Price</th>
                <th className="p-2 border">Discount (%)</th>
                <th className="p-2 border">Tax (%)</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-1 text-center">{idx + 1}</td>
                  <td className="border p-1">
                    <HrInput
                      value={item.productName}
                      onChange={(e) =>
                        handleItemChange(idx, 'productName', e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-1">
                    <HrInput
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(idx, 'quantity', e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-1">
                    <HrInput
                      type="number"
                      value={item.listPrice}
                      onChange={(e) =>
                        handleItemChange(idx, 'listPrice', e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-1">
                    <HrInput
                      type="number"
                      value={item.discount}
                      onChange={(e) =>
                        handleItemChange(idx, 'discount', e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-1">
                    <HrInput
                      type="number"
                      value={item.tax}
                      onChange={(e) =>
                        handleItemChange(idx, 'tax', e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-1 text-right">
                    {item.amount.toFixed(2)}
                  </td>
                  <td className="border p-1 text-center">
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="text-red-500 px-2 py-1 rounded hover:text-red-600 transition"
                    >
                      <FaRegTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={addItem}
            className="mt-3 px-3 py-1 bg-blue-500 text-white rounded"
          >
            + Add Item
          </button>
        </div>

        {/* Totals */}
        <div className="mt-4 w-full flex justify-end">
          <div className="bg-white rounded-2xl border p-4 w-[42%] space-y-3">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Adjustment</span>
              <input
                type="number"
                value={adjustment}
                onChange={(e) => setAdjustment(e.target.value)}
                className="w-24 text-right border rounded-sm p-1 "
              />
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Grand Total</span>
              <span>{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Terms & Description */}
        <div className="grid grid-cols-1 gap-4">
          <textarea
            placeholder="Terms & Conditions"
            name="terms"
            rows={1}
            value={formData.terms}
            onChange={handleChange}
            className="w-full  border rounded p-2"
          />
          <textarea
            placeholder="Description"
            name="description"
            rows={1}
            value={formData.description}
            onChange={handleChange}
            className="w-full  border rounded p-2"
          />
        </div>

        {/* Submit Button */}
        <div className="text-right mr-4">
          <Button type="submit">Save Quote</Button>
        </div>
      </form>
    </div>
  )
}
