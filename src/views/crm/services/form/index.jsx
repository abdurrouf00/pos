'use client'

import { useState } from 'react'
import Image from 'next/image'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'
import { PiBuildingApartment } from 'react-icons/pi'

export default function ContactCreateForm() {
  const [formData, setFormData] = useState({
    serviceOwner: '',
    serviceName: '',
    duration: '',
    location: '',
    member: '',
    availableDays: '',
    availableTime: '',
    price: '',
    tax: '',
    description: '',
    image: null,
  })

  //const [preview, setPreview] = useState(null)

  //  Image Preview Handler
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     setPreview(URL.createObjectURL(file))
  //     setFormData({ ...formData, image: file })
  //   }
  // }

  //  Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  //  Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault()

      // Reset Form

    setFormData({
      serviceOwner: '',
      serviceName: '',
      duration: '',
      location: '',
      member: '',
      availableDays: '',
      availableTime: '',
      price: '',
      tax: '',
      description: '',
      image: null,
    })
    //setPreview(null)

    alert('✅ Service Created Successfully!')
  }

  return (
    <div className="bg-white p-6 rounded min-h-screen space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
       

        {/* 🔹 Service Image */}
        {/* <div className=" p-4 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 pb-2">
            Service Image
          </h3>

          <div className="flex items-center gap-6">
            <input
              id="serviceImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <label
              htmlFor="serviceImage"
              className="relative w-24 h-24 cursor-pointer group"
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="Service Profile"
                  fill
                  className="object-cover rounded-full border border-gray-300 group-hover:opacity-80 transition"
                />
              ) : (
                <div className="w-15 h-15 rounded-full overflow-hidden border border-gray-400 flex items-center justify-center text-gray-400 group-hover:bg-gray-50 transition">
                  <PiBuildingApartment className="h-15 w-15 text-gray-300 hover:text-gray-400" />
                </div>
              )}
            </label>
          </div>
        </div> */}

        {/* 🔹 Service Information */}
        <div className=" p-4 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800  pb-2">
            Service Information
          </h3>

          <div className="grid md:grid-cols-2 grid-cols-2 gap-2">
            <HrInput
              name="serviceOwner"
              value={formData.serviceOwner}
              onChange={handleChange}
              placeholder="Service Owner"
              label="Service Owner"
            />
            <HrInput
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              placeholder="Service Name"
              label="Service Name"
            />
            <HrSelect
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              label="Duration"
              options={[
                { value: '30 mins', label: '30 mins' },
                { value: '1 hr', label: '1 hr' },
                { value: '1 hr 30 mins', label: '1 hr 30 mins' },
                { value: '2 hr', label: '2 hr' },
                { value: '3 hr', label: '3 hr' },
              ]}
            />
            <HrSelect
              name="location"
              value={formData.location}
              onChange={handleChange}
              label="Location"
              options={[
                { value: 'Business Address', label: 'Business Address' },
                { value: 'Client Address', label: 'Client Address' },
                { value: 'Both', label: 'Business & Client Address' },
              ]}
            />
            <HrInput
              name="member"
              value={formData.member}
              onChange={handleChange}
              placeholder="Members"
              label="Members"
            />

            <HrSelect
              name="availableDays"
              value={formData.availableDays}
              onChange={handleChange}
              label="Available Days"
              options={[
                { value: 'Every Business Days', label: 'Every Business Days' },
                { value: 'Specific Date Range', label: 'Specific Date Range' },
                { value: 'Specific Dates', label: 'Specific Dates' },
              ]}
            />

            <HrSelect
              name="availableTime"
              value={formData.availableTime}
              onChange={handleChange}
              label="Available Time"
              options={[
                { value: 'Business Time', label: 'Same as Business Time' },
                { value: 'Custom Time', label: 'Custom Time' },
              ]}
            />

            <HrInput
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              label="Price"
            />
            <HrSelect
              name="tax"
              value={formData.tax}
              onChange={handleChange}
              label="Tax"
              options={[
                { value: 'Sales Tax-0.0%', label: 'Sales Tax-0.0%' },
                { value: 'VAT-0.0%', label: 'VAT-0.0%' },
              ]}
            />

          </div>
        </div>

       

        {/* 🔹 Description Information */}
        <div className=" p-4 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800  pb-2">
            Description Information
          </h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            role='2'
            placeholder="Write service description..."
            className="w-full  border rounded p-3"
          />
        </div>

        {/* 🔹 Submit Button */}
        <div className="text-right mr-4">
          <Button type="submit">Save Service</Button>
        </div>
      </form>
    </div>
  )
}
