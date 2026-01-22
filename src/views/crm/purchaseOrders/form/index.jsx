'use client'

import { useState } from 'react'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'
import { FaRegTrashCan } from 'react-icons/fa6'

export default function QuoteFormDynamicTable() {
  const defaultRow = {
    productName: '',
    quantity: 1,
    listPrice: 0,
    discount: 0,
    tax: 0,
  }

  const [formData, setFormData] = useState({
    purchaseOwner: '',
    subject: '',
    requisitionNo: '',
    contactName: '',
    dueDate: '',
    exciseDuty: '',
    quoteStage: '',
    accountName: '',
    poNumber: '',
    vendorName: '',
    trackingNo: '',
    poDate: '',
    carrier: '',
    salesCommission: '',
    billingStreet: '',
    billingCity: '',
    billingState: '',
    billingCode: '',
    billingCountry: '',
    shippingStreet: '',
    shippingCity: '',
    shippingState: '',
    shippingCode: '',
    shippingCountry: '',
    terms: '',
    description: '',
  })

  const [items, setItems] = useState([defaultRow])
  const [adjustment, setAdjustment] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleItemChange = (index, field, value) => {
    const newItems = [...items]
    newItems[index][field] =
      field === 'productName' ? value : Number(value) || 0
    setItems(newItems)
  }

  const addRow = () => setItems([...items, { ...defaultRow }])
  const removeRow = (index) => {
    if (items.length === 1) return
    setItems(items.filter((_, i) => i !== index))
  }

  const subTotal = items.reduce(
    (sum, item) => sum + item.quantity * item.listPrice,
    0
  )
  const totalDiscount = items.reduce(
    (sum, item) => sum + (item.quantity * item.listPrice * item.discount) / 100,
    0
  )
  const totalTax = items.reduce((sum, item) => {
    const taxable =
      item.quantity * item.listPrice -
      (item.quantity * item.listPrice * item.discount) / 100
    return sum + (taxable * item.tax) / 100
  }, 0)
  const grandTotal = subTotal - totalDiscount + totalTax + Number(adjustment)

  const copyBilling = () => {
    setFormData((prev) => ({
      ...prev,
      shippingStreet: prev.billingStreet,
      shippingCity: prev.billingCity,
      shippingState: prev.billingState,
      shippingCode: prev.billingCode,
      shippingCountry: prev.billingCountry,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Quote Data:', { ...formData, items, adjustment, grandTotal })
    alert('✅ Quote Created Successfully!')
    // Reset form
    setFormData({
      purchaseOwner: '',
      subject: '',
      requisitionNo: '',
      contactName: '',
      dueDate: '',
      exciseDuty: '',
      quoteStage: '',
      accountName: '',
      poNumber: '',
      vendorName: '',
      trackingNo: '',
      poDate: '',
      carrier: '',
      salesCommission: '',
      billingStreet: '',
      billingCity: '',
      billingState: '',
      billingCode: '',
      billingCountry: '',
      shippingStreet: '',
      shippingCity: '',
      shippingState: '',
      shippingCode: '',
      shippingCountry: '',
      terms: '',
      description: '',
    })
    setItems([defaultRow])
    setAdjustment(0)
  }

  return (
    <div className="bg-white p-6 min-h-screen space-y-6">
      <h2 className="text-2xl font-semibold text-blue-500  mb-4">
        Purchase Order
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <HrInput
            name="purchaseOwner"
            value={formData.purchaseOwner}
            onChange={handleChange}
            label="Purchase Owner"
          />
          <HrInput
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            label="Subject"
          />
          <HrInput
            name="requisitionNo"
            value={formData.requisitionNo}
            onChange={handleChange}
            label="Requisition No"
          />
          <HrInput
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            label="Contact Name"
          />
          <HrInput
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            label="Due Date"
          />
          <HrInput
            name="exciseDuty"
            value={formData.exciseDuty}
            onChange={handleChange}
            label="Excise Duty"
          />
          <HrSelect
            name="quoteStage"
            value={formData.quoteStage}
            onChange={handleChange}
            label="Status"
            options={[
              { value: 'Created', label: 'Created' },
              { value: 'Approved', label: 'Approved' },
              { value: 'Cancelled', label: 'Cancelled' },
              { value: 'Delivered', label: 'Delivered' },
            ]}
          />
          <HrInput
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            label="Account Name"
          />
          <HrInput
            name="poNumber"
            value={formData.poNumber}
            onChange={handleChange}
            label="PO Number"
          />
          <HrInput
            name="vendorName"
            value={formData.vendorName}
            onChange={handleChange}
            label="Vendor Name"
          />
          <HrInput
            name="trackingNo"
            value={formData.trackingNo}
            onChange={handleChange}
            label="Tracking Number"
          />
          <HrInput
            name="poDate"
            value={formData.poDate}
            onChange={handleChange}
            label="PO Date"
          />
          <HrSelect
            name="carrier"
            value={formData.carrier}
            onChange={handleChange}
            label="Carrier"
            options={[
              { value: 'FedEX', label: 'FedEX' },
              { value: 'UPS', label: 'UPS' },
              { value: 'USPS', label: 'USPS' },
              { value: 'DHL', label: 'DHL' },
              { value: 'BlueDart', label: 'BlueDart' },
            ]}
          />
          <HrInput
            name="salesCommission"
            value={formData.salesCommission}
            onChange={handleChange}
            label="Sales Commission"
          />
        </div>

        {/* Billing / Shipping */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              Billing Address
            </h3>
            <HrInput
              name="billingStreet"
              value={formData.billingStreet}
              onChange={handleChange}
              placeholder="Street"
            />
            <HrInput
              name="billingCity"
              value={formData.billingCity}
              onChange={handleChange}
              placeholder="City"
            />
            <HrInput
              name="billingState"
              value={formData.billingState}
              onChange={handleChange}
              placeholder="State"
            />
            <HrInput
              name="billingCode"
              value={formData.billingCode}
              onChange={handleChange}
              placeholder="Code"
            />
            <HrInput
              name="billingCountry"
              value={formData.billingCountry}
              onChange={handleChange}
              placeholder="Country"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center justify-between">
              Shipping Address
              <button
                type="button"
                className="text-sm text-blue-600 underline"
                onClick={copyBilling}
              >
                Copy Billing
              </button>
            </h3>
            <HrInput
              name="shippingStreet"
              value={formData.shippingStreet}
              onChange={handleChange}
              placeholder="Street"
            />
            <HrInput
              name="shippingCity"
              value={formData.shippingCity}
              onChange={handleChange}
              placeholder="City"
            />
            <HrInput
              name="shippingState"
              value={formData.shippingState}
              onChange={handleChange}
              placeholder="State"
            />
            <HrInput
              name="shippingCode"
              value={formData.shippingCode}
              onChange={handleChange}
              placeholder="Code"
            />
            <HrInput
              name="shippingCountry"
              value={formData.shippingCountry}
              onChange={handleChange}
              placeholder="Country"
            />
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Product Name</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">List Price</th>
                <th className="border p-2">Discount (%)</th>
                <th className="border p-2">Tax (%)</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const amount = item.quantity * item.listPrice
                const discountAmount = (amount * item.discount) / 100
                const taxable = amount - discountAmount
                const taxAmount = (taxable * item.tax) / 100
                const total = taxable + taxAmount

                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">{idx + 1}</td>
                    <td className="border p-2">
                      <input
                        value={item.productName}
                        onChange={(e) =>
                          handleItemChange(idx, 'productName', e.target.value)
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(idx, 'quantity', e.target.value)
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={item.listPrice}
                        onChange={(e) =>
                          handleItemChange(idx, 'listPrice', e.target.value)
                        }
                        className="w-full border p-1 rounded text-right"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={item.discount}
                        onChange={(e) =>
                          handleItemChange(idx, 'discount', e.target.value)
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={item.tax}
                        onChange={(e) =>
                          handleItemChange(idx, 'tax', e.target.value)
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="border p-2 text-right">
                      {total.toFixed(2)}
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(idx)}
                        className="text-red-500"
                      >
                        <FaRegTrashCan />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Button
            type="button"
            onClick={addRow}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            + Add Row
          </Button>
        </div>

        {/* Totals */}
        <div className="flex justify-end mt-6">
          <div className="w-[40%] bg-gray-50 p-4 rounded space-y-2">
            <div className="flex justify-between">
              <span>Sub Total:</span>
              <span>{subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>{totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>{totalTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Adjustment:</span>
              <input
                type="number"
                value={adjustment}
                onChange={(e) => setAdjustment(e.target.value)}
                className="w-20 border rounded px-1"
              />
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Grand Total:</span>
              <span>{grandTotal.toFixed(2)}</span>
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

        {/* Submit */}
        <div className="text-center mt-6">
          <Button type="submit">Save Purchase</Button>
        </div>
      </form>
    </div>
  )
}
