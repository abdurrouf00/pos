'use client'

import { useState } from 'react'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'
import { GoPersonFill } from 'react-icons/go'

export default function LeadCreateForm() {
  const today = new Date().toISOString().split('T')[0]
  // For image preview
  const [preview, setPreview] = useState(null)

  const [formData, setFormData] = useState({
    leadOwner: '',
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    phone: '',
    mobile: '',
    email: '',
    secondaryEmail: '',
    fax: '',
    website: '',
    skype: '',
    twitter: '',
    leadSource: '',
    leadStatus: '',
    industry: '',
    rating: '',
    employees: '',
    revenue: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Lead Data:', formData)
    alert('Lead Created Successfully ✅')
    setFormData({
      leadOwner: '',
      firstName: '',
      lastName: '',
      title: '',
      company: '',
      phone: '',
      mobile: '',
      email: '',
      secondaryEmail: '',
      fax: '',
      website: '',
      skype: '',
      twitter: '',
      leadSource: '',
      leadStatus: '',
      industry: '',
      rating: '',
      employees: '',
      revenue: '',
      street: '',
      city: '',
      state: '',
      country: '',
      zip: '',
      description: '',
    })
  }

  return (
     <div className="bg-white p-6 rounded min-h-screen space-y-8">
      <h2 className='text-2xl text-blue-500 '> Create New Leads</h2>

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
                    <GoPersonFill className="h-15  w-15 mt-4 "/>
                  </div>
                )}
              </label>
            </div>
          </div>

        {/* Lead Information */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <HrInput
            label="Lead Owner"
            name="leadOwner"
            value={formData.leadOwner}
            onChange={handleChange}
            placeholder="Enter Lead Owner"
            required
          />
          <HrInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter First Name"
            required
          />
          <HrInput
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            label="Last Name"
            placeholder="Enter Last Name"
          />
          <HrInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <HrInput
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
          <HrInput
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            label="Phone"
          />
          <HrInput
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          <HrInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
          <HrInput
            label="Secondary Email"
            name="secondaryEmail"
            value={formData.secondaryEmail}
            onChange={handleChange}
            type="email"
          />
          <HrInput
            label="Fax"
            name="fax"
            value={formData.fax}
            onChange={handleChange}
          />
          <HrInput
            name="website"
            value={formData.website}
            onChange={handleChange}
            label="Website"
          />
          <HrInput
            label="Skype ID"
            name="skype"
            value={formData.skype}
            onChange={handleChange}
          />
          <HrInput
            label="Twitter"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="@"
          />
          <HrSelect
            label="Lead Source*"
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            options={[
              { value: '', label: '--None--' },
              { value: 'Sales Email Alias', label: 'Sales Email Alias' },
              { value: 'Employee Referral', label: 'Employee Referral' },
              { value: 'External Referral', label: 'External Referral' },
              { value: 'Public Relations', label: 'Public Relations' },
              { value: 'Internal Seminar', label: 'Internal Seminar' },
              { value: 'Seminar Partner', label: 'Seminar Partner' },
              { value: 'Advertisement', label: 'Advertisement' },
              { value: 'Online Store', label: 'Online Store' },
              { value: 'Web Download', label: 'Web Download' },
              { value: 'Web Research', label: 'Web Research' },
              { value: 'X (Twitter)', label: 'X (Twitter)' },
              { value: 'Trade Show', label: 'Trade Show' },
              { value: 'Cold Call', label: 'Cold Call' },
              { value: 'Facebook', label: 'Facebook' },
              { value: 'Partner', label: 'Partner' },
              { value: 'Chat', label: 'Chat' },
            ]}
          />
          <HrSelect
            label="Lead Status*"
            name="leadStatus"
            value={formData.leadStatus}
            onChange={handleChange}
            options={[
              { value: '', label: '--None--' },
              { value: 'Attempted to Contact', label: 'Attempted to Contact' },
              { value: 'Contact in Future', label: 'Contact in Future' },
              { value: 'Not Contacted', label: 'Not Contacted' },
              { value: 'Pre-Qualified', label: 'Pre-Qualified' },
              { value: 'Not Qualified', label: 'Not Qualified' },
              { value: 'Contacted', label: 'Contacted' },
              { value: 'Junk Lead', label: 'Junk Lead' },
              { value: 'Lost Lead', label: 'Lost Lead' },
            ]}
          />
          <HrSelect
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            options={[
              { value: '', label: '--None--' },
              {
                value: 'ASP (Application Service Provider)',
                label: 'ASP (Application Service Provider)',
              },
              {
                value: 'ERP (Enterprise Resource Planning)',
                label: 'ERP (Enterprise Resource Planning)',
              },
              {
                value: 'MSP (Management Service Provider)',
                label: 'MSP (Management Service Provider)',
              },
              {
                value: 'Network Equipment Enterprise',
                label: 'Network Equipment Enterprise',
              },
              {
                value: 'Storage Service Provider',
                label: 'Storage Service Provider',
              },
              {
                value: 'Small/Medium Enterprise',
                label: 'Small/Medium Enterprise',
              },
              { value: 'Government/Military', label: 'Government/Military' },
              { value: 'Large Enterprise', label: 'Large Enterprise' },
              { value: 'Service Provider', label: 'Service Provider' },
            ]}
          />
          <HrSelect
            label="Rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            options={[
              { value: '', label: '--None--' },
              { value: 'Project Cancelled', label: 'Project Cancelled' },
              { value: 'Market Failed', label: 'Market Failed' },
              { value: 'Shut Down', label: 'Shut Down' },
              { value: 'Acquired', label: 'Acquired' },
              { value: 'Active', label: 'Active' },
            ]}
          />
          <HrInput
            label="No. of Employees"
            name="employees"
            value={formData.employees}
            onChange={handleChange}
            type="number"
          />
          <HrInput
            label="Annual Revenue"
            name="revenue"
            value={formData.revenue}
            onChange={handleChange}
            placeholder="$"
          />
        </div>

        {/* Address Information */}
        <h3 className="text-xl font-semibold mt-5">Address Information</h3>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <HrInput
            label="Street"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
          <HrInput
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <HrInput
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          <HrInput
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          <HrInput
            label="Zip Code"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            placeholder="Enter description"
            className="w-full border rounded p-2"
          />
        </div>

        {/* Submit */}
        <div className="text-right">
          <Button type="submit">Save Lead</Button>
        </div>
      </form>
    </div>
  )
}
