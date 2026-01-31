
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BsImageAlt } from 'react-icons/bs'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'

export default function ProductCreateForm() {
  const [preview, setPreview] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const [formData, setFormData] = useState({
    productOwner: '',
    productCode: '',
    productName: '',
    vendorName: '',
    manufacturer: '',
    category: '',
    unitPrice: '',
    commissionRate: '',
    tax: '',
    taxable: false,
    salesStartDate: '',
    salesEndDate: '',
    supportStartDate: '',
    supportEndDate: '',
    usageUnit: '',
    qtyOrdered: '',
    quantityInStock: '',
    reorderLevel: '',
    handler: '',
    quantityInDemand: '',
    description: '',
    productActive: false,

    // 🔹 sales / purchase fields
    salesAccount: '',
    salesTax: '',
    purchaseAccount: '',
    purchaseTax: '',
  })

  const [selectedSections, setSelectedSections] = useState({
    sales: true,
    purchase: true,
  })

  // dummy accounts
  const salesAccounts = [
    { value: 'Sales A/C', label: 'Sales A/C' },
    { value: 'Online Sales', label: 'Online Sales' },
  ]

  const purchaseAccounts = [
    { value: 'Purchase A/C', label: 'Purchase A/C' },
    { value: 'Local Purchase', label: 'Local Purchase' },
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  // const handleSectionChange = (e) => {
  //   const { name, checked } = e.target;
  //   setSelectedSections({ ...selectedSections, [name]: checked });
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // validation
    // if (selectedSections.sales) {
    //   if (!formData.salesAccount) {
    //     setErrorMsg('Sales Information incomplete')
    //     return
    //   }
    // }

    // if (selectedSections.purchase) {
    //   if (!formData.purchaseAccount) {
    //     setErrorMsg('Purchase Information incomplete')
    //     return
    //   }
    // }

    setErrorMsg('')
    console.log(formData)

    // reset
    setFormData({
      ...formData,
      productOwner: '',
      productCode: '',
      productName: '',
      vendorName: '',
      manufacturer: '',
      category: '',
      unitPrice: '',
      commissionRate: '',
      tax: '',
      taxable: false,
      salesStartDate: '',
      salesEndDate: '',
      supportStartDate: '',
      supportEndDate: '',
      usageUnit: '',
      qtyOrdered: '',
      quantityInStock: '',
      reorderLevel: '',
      handler: '',
      quantityInDemand: '',
      description: '',
      productActive: false,
      salesAccount: '',
      salesTax: '',
      purchaseAccount: '',
      purchaseTax: '',
    })

    setPreview(null)
  }
  return (
    <div className="bg-white p-6 rounded min-h-screen space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Image */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Product Image</h3>
          <div className="flex items-center gap-6">
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="imageUpload"
              className="relative w-15 h-15 cursor-pointer group"
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="Product"
                  fill
                  className="object-cover rounded-full border border-gray-300 group-hover:opacity-80 transition"
                />
              ) : (
                <div className="w-15 h-15 rounded-full overflow-hidden border border-gray-400 flex items-center justify-center text-gray-400 text-sm group-hover:bg-gray-50 transition">
                  <BsImageAlt className="h-13  w-13 mt-3 " />
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Product Information */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Product Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <HrInput
              label="Product Owner"
              name="productOwner"
              value={formData.productOwner}
              onChange={handleChange}
              required
            />
            <HrInput
              name="productCode"
              label="Product Code *"
              value={formData.productCode}
              onChange={handleChange}
            />
            <HrInput
              label="Product Name *"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
            <HrInput
              name="vendorName"
              label="Vendor Name"
              value={formData.vendorName}
              onChange={handleChange}
            />
            <HrSelect
              label="Manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              options={[
                { value: 'Samsung', label: 'Samsung' },
                { value: 'Apple', label: 'Apple' },
                { value: 'Sony', label: 'Sony' },
                { value: 'Dell', label: 'Dell' },
                { value: 'Other', label: 'Other' },
              ]}
            />
            <HrSelect
              label="Product Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={[
                { value: 'Electronics', label: 'Electronics' },
                { value: 'Clothing', label: 'Clothing' },
                { value: 'Software', label: 'Software' },
                { value: 'Accessories', label: 'Accessories' },
                { value: 'Other', label: 'Other' },
              ]}
            />
            <HrInput
              label="Sales Start Date"
              name="salesStartDate"
              type="date"
              value={formData.salesStartDate}
              onChange={handleChange}
            />
            <HrInput
              label="Sales End Date"
              name="salesEndDate"
              type="date"
              value={formData.salesEndDate}
              onChange={handleChange}
            />
            <HrInput
              label="Support Start Date"
              name="supportStartDate"
              type="date"
              value={formData.supportStartDate}
              onChange={handleChange}
            />
            <HrInput
              name="supportEndDate"
              type="date"
              label="Support End Date"
              value={formData.supportEndDate}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-3 mt-3">
            <input
              type="checkbox"
              name="productActive"
              checked={formData.productActive}
              onChange={handleChange}
            />
            <label>Product Active</label>
          </div>
        </div>

        {/* accounts name and tax info add  */}
        <div className="flex flex-col md:flex-row gap-16 w-full ">
          {/* Sales Section */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              {/* <input
                type="checkbox"
                name="sales"
                checked={selectedSections.sales}
                onChange={handleSectionChange}
              /> */}
              <h3 className="text-lg font-semibold">Sales Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HrSelect
                name="salesAccount"
                value={formData.salesAccount}
                onChange={handleChange}
                placeholder="Select Account"
                options={salesAccounts}
                label="Account"
              />
              <HrSelect
                name="salesTax"
                value={formData.salesTax}
                onChange={handleChange}
                placeholder="Select Tax"
                label="Tax"
                options={[
                  { value: 'VAT 5%', label: 'VAT 5%' },
                  { value: 'GST 10%', label: 'GST 10%' },
                ]}
              />
            </div>
          </div>

          {/* Purchase Section */}
          <div className="flex-1 space-y-4 mt-6">
            <div className="flex items-center gap-2 mb-2">
              {/* <input
                type="checkbox"
                name="purchase"
                checked={selectedSections.purchase}
                onChange={handleSectionChange}
              /> */}
              <h3 className="text-lg font-semibold">Purchase Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HrSelect
                name="purchaseAccount"
                value={formData.purchaseAccount}
                onChange={handleChange}
                placeholder="Select Account"
                options={purchaseAccounts}
                label="Account"
              />
              <HrSelect
                name="purchaseTax"
                value={formData.purchaseTax}
                onChange={handleChange}
                placeholder="Select Tax"
                label="Tax"
                options={[
                  { value: 'VAT 5%', label: 'VAT 5%' },
                  { value: 'GST 10%', label: 'GST 10%' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Price Information */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Price Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <HrInput
              label="Unit Price"
              name="unitPrice"
              placeholder="$"
              value={formData.unitPrice}
              onChange={handleChange}
            />
            <HrInput
              label="Commission Rate"
              name="commissionRate"
              value={formData.commissionRate}
              onChange={handleChange}
            />
            <HrInput
              label="Tax"
              name="tax"
              value={formData.tax}
              onChange={handleChange}
            />
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="taxable"
                checked={formData.taxable}
                onChange={handleChange}
              />
              <label>Taxable</label>
            </div>
          </div>
        </div>

        {/* Stock Information */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stock Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <HrSelect
              label="Usage Unit"
              name="usageUnit"
              value={formData.usageUnit}
              onChange={handleChange}
              options={[
                { value: 'Each', label: 'Each' },
                { value: 'Pack', label: 'Pack' },
                { value: 'Box', label: 'Box' },
                { value: 'Dozen', label: 'Dozen' },
                { value: 'Sheet', label: 'Sheet' },
              ]}
            />
            <HrInput
              label="Qty Ordered"
              name="qtyOrdered"
              type="number"
              value={formData.qtyOrdered}
              onChange={handleChange}
            />
            <HrInput
              label="Quantity in Stock"
              name="quantityInStock"
              type="number"
              value={formData.quantityInStock}
              onChange={handleChange}
            />
            <HrInput
              label="Reorder Level"
              name="reorderLevel"
              type="number"
              value={formData.reorderLevel}
              onChange={handleChange}
            />
            <HrSelect
              name="handler"
              label="Handler"
              value={formData.handler}
              onChange={handleChange}
              options={[
                { value: 'None', label: 'None' },
                { value: 'Admin', label: 'Admin' },
                { value: 'Warehouse', label: 'Warehouse' },
              ]}
            />
            <HrInput
              label="Quantity in Demand"
              name="quantityInDemand"
              type="number"
              value={formData.quantityInDemand}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Description</h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Submit Button */}
        <div className="text-right mr-4">
          <Button type="submit">Save Product</Button>
        </div>
      </form>
    </div>
  )
}
