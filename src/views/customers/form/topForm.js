'use client'

import { useState } from 'react'
import HrInput from '@/components/common/HrInput'
import { Label } from '@/components/ui/label'
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function CustomerForm() {
  const [formData, setFormData] = useState({
    customer_type: 'Business',
    name: '',
    company_name: '',
    display_name: '',
    email: '',
    phone: '',
    mobile: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email) {
      setErrorMsg('Please fill required fields.')
      return
    }

    setErrorMsg('')
    // toast.success("Customer Form Submitted!");
  }

  return (
    <div className="  ">
      <h2 className="text-xl font-semibold mb-4">Customer Form</h2>

      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

      <div onSubmit={handleSubmit} className="space-y-6 ">
        <div className="flex items-center gap-4">
          <Label>Customer Type: </Label>
          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-2 ">
              <input
                type="radio"
                name="customer_type"
                value="Business"
                checked={formData.customer_type === 'Business'}
                onChange={handleChange}
              />
              Business
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="customer_type"
                value="Individual"
                checked={formData.customer_type === 'Individual'}
                onChange={handleChange}
              />
              Individual
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Customer Type */}

          <HrInput
            name="full_name"
            label="Primary Contact"
            value={formData.full_name}
            onChange={handleChange}
          />
          <HrInput
            name="company_name"
            label="Company Name"
            value={formData.company_name}
            onChange={handleChange}
          />
          <HrInput
            name="display_name"
            label="Display Name"
            value={formData.display_name}
            onChange={handleChange}
          />
          <HrInput
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <HrInput
            name="phone"
            label="Phone / Mobile"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </div>
  )
}
