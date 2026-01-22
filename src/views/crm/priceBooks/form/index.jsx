'use client'

import { useState } from 'react'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'

export default function PriceBookCreateForm() {
  const [formData, setFormData] = useState({
    priceBookOwner: 'Admin',
    priceBookName: '',
    pricingModel: '',
    active: false,
    description: '',
  })

  const [items, setItems] = useState([
    { productName: '', quantity: '', listPrice: '' },
  ])


  // handleChange for main form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  // handle item change
  const handleItemChange = (index, field, value) => {
    const updated = [...items]
    updated[index][field] = value
    setItems(updated)
  }

  // add/remove row
  const addRow = () =>
    setItems([...items, { productName: '', quantity: '', listPrice: '' }])

  const removeRow = (index) => {
    const updated = items.filter((_, i) => i !== index)
    setItems(
      updated.length
        ? updated
        : [{ productName: '', quantity: '', listPrice: '' }]
    )
  }

  // submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // basic validation
    // if (!formData.priceBookName || !formData.pricingModel) {
    //   setErrorMsg("Please fill all required (*) fields.");
    //   return;
    // }

    alert('Price Book Saved!')
    console.log('Form Data:', formData)

    // reset
    setFormData({
      priceBookOwner: 'rouf',
      priceBookName: '',
      pricingModel: '',
      active: false,
      description: '',
    })
    setItems([{ productName: '', quantity: '', listPrice: '' }])
  }

  return (
    <div className="bg-white p-6 rounded min-h-screen space-y-6">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Price Book Information 
        </h2>

       <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <HrInput
            name="priceBookOwner"
            value={formData.priceBookOwner}
            onChange={handleChange}
            label="Price Book Owner"
            placeholder="Owner"
          />
          <HrInput
            name="priceBookName"
            value={formData.priceBookName}
            onChange={handleChange}
            label="Price Book Name"
            placeholder="Enter Name"
            required
          />
          <HrSelect
            name="pricingModel"
            value={formData.pricingModel}
            onChange={handleChange}
            label="Pricing Model"
            placeholder="Select Model"
            options={[
              { value: 'Flat', label: 'Flat' },
              { value: 'Differential', label: 'Differential' },
            ]}
          />
          <div className="flex items-center gap-3 mt-6">
            <label className="text-sm font-medium text-gray-600">Active:</label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="scale-125 accent-blue-600"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Description
          </h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Enter description..."
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Items Table */}
        <div className="border rounded-xl overflow-x-auto p-6">
  <h3 className="text-lg font-semibold mb-3 text-gray-700">
    Pricing Details
  </h3>
  <table className="w-full border text-sm table-fixed">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2 border w-6">S.No</th>
        <th className="p-2 border w-1/3">Product Name</th>
        <th className="p-2 border w-24">Quantity</th>
        <th className="p-2 border w-32">List Price</th>
        <th className="p-2 border w-6">Action</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item, idx) => (
        <tr key={idx} className="align-middle">
          <td className="border p-2 text-center">{idx + 1}</td>
          <td className="border p-1">
            <HrInput
              type="text"
              value={item.productName}
              onChange={(e) =>
                handleItemChange(idx, 'productName', e.target.value)
              }
              placeholder="Product Name"
              className="w-full box-border"
            />
          </td>
          <td className="border p-1">
            <HrInput
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(idx, 'quantity', e.target.value)
              }
              placeholder="0"
              className="w-full box-border"
            />
          </td>
          <td className="border p-1">
            <HrInput
              type="number"
              value={item.listPrice}
              onChange={(e) =>
                handleItemChange(idx, 'listPrice', e.target.value)
              }
              placeholder="0.00"
              className="w-full box-border"
            />
          </td>
          <td className="border p-1 text-center">
            <button
              onClick={() => removeRow(idx)}
              className="px-2 py-1 bg-red-500 text-white rounded"
              type="button"
            >
              ❌
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <button
    onClick={addRow}
    type="button"
    className="mt-3 px-3 py-1 bg-blue-500 text-white rounded"
  >
    + Add Row
  </button>
</div>


        {/* Submit Button */}
        <div className="text-right mr-4">
          <Button type="submit">Save Price Book</Button>
        </div>
      </form>
    </div>
  )
}
