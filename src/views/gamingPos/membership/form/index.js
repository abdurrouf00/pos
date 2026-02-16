'use client'

import React, { useState } from 'react'
import HrSelect from '@/components/common/HrSelect'
import HrInput from '@/components/common/HrInput'
import { Button } from '@/components/ui/button'
import { useAddMembershipMutation } from '../store'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const packageForOptions = [
  { label: '1st Child', value: '1st_child' },
  { label: '2nd Child', value: '2nd_child' },
  { label: '3rd Child', value: '3rd_child' },
  { label: 'Monthly', value: 'Monthly' },
  { label: 'Quarterly', value: 'Quarterly' },
  { label: 'Yearly', value: 'Yearly' },
]

export default function MembershipForm() {
  const router = useRouter()
  const [addMembership, { isLoading }] = useAddMembershipMutation()
  const [membershipData, setMembershipData] = useState({
    guardian_phone: '',
    child_name: '',
    dob: '',
    guardian_name: '',
    guardian_phone_secondary: '',
    guardian_email: '',
    address: '',
    child_class: '',
    school_name: '',
    package_for: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setMembershipData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  const validate = () => {
    const err = {}
    if (!membershipData.guardian_phone?.trim()) err.guardian_phone = 'Guardian phone is required'
    if (!membershipData.child_name?.trim()) err.child_name = "Child's name is required"
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (!validate()) return

    const payload = {
      guardian_phone: membershipData.guardian_phone.trim(),
      child_name: membershipData.child_name.trim(),
      dob: membershipData.dob || null,
      guardian_name: membershipData.guardian_name?.trim() || null,
      guardian_phone_secondary: membershipData.guardian_phone_secondary?.trim() || null,
      guardian_email: membershipData.guardian_email?.trim() || null,
      address: membershipData.address?.trim() || null,
      child_class: membershipData.child_class?.trim() || null,
      school_name: membershipData.school_name?.trim() || null,
      package_for: membershipData.package_for || null,
    }

    try {
      const res = await addMembership(payload)
      if (res?.data?.success) {
        toast.success(res?.data?.message || 'Membership created successfully')
        router.push('/dashboard/membership')
      } else {
        const msg = res?.data?.message || res?.data?.msg || 'Failed to create membership'
        toast.error(typeof msg === 'object' ? JSON.stringify(msg) : msg)
      }
    } catch (err) {
      const msg = err?.data?.message || err?.message || 'Failed to create membership'
      toast.error(msg)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Membership Registration
      </h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HrInput
            label="Guardian Phone"
            name="guardian_phone"
            placeholder="01xxxxxxxxx"
            value={membershipData.guardian_phone}
            onChange={handleChange}
            required
            error={!!errors.guardian_phone}
            errorText={errors.guardian_phone}
          />

          <HrInput
            label="Guardian Name"
            name="guardian_name"
            placeholder="Enter guardian's name"
            value={membershipData.guardian_name}
            onChange={handleChange}
            error={!!errors.guardian_name}
            errorText={errors.guardian_name}
          />

          <HrInput
            label="Secondary Phone"
            name="guardian_phone_secondary"
            placeholder="Secondary phone number"
            value={membershipData.guardian_phone_secondary}
            onChange={handleChange}
          />

          <HrInput
            label="Email"
            name="guardian_email"
            type="email"
            placeholder="example@mail.com"
            value={membershipData.guardian_email}
            onChange={handleChange}
          />

          <HrInput
            label="Name of Child"
            name="child_name"
            placeholder="Enter child's name"
            value={membershipData.child_name}
            onChange={handleChange}
            required
            error={!!errors.child_name}
            errorText={errors.child_name}
          />

          <HrInput
            label="Date of Birth"
            name="dob"
            type="date"
            value={membershipData.dob}
            onChange={handleChange}
          />

          <HrInput
            label="Child Class"
            name="child_class"
            placeholder="e.g. Class 5"
            value={membershipData.child_class}
            onChange={handleChange}
          />

          <HrInput
            label="School Name"
            name="school_name"
            placeholder="Enter school name"
            value={membershipData.school_name}
            onChange={handleChange}
          />

          <HrSelect
            label="Package For"
            name="package_for"
            value={membershipData.package_for}
            onChange={handleChange}
            options={packageForOptions}
            placeholder="Select"
          />

          <HrInput
            label="Address"
            name="address"
            type="textarea"
            placeholder="Enter full address"
            value={membershipData.address}
            onChange={handleChange}
            rows={2}
            wrapperClassName="md:col-span-2 lg:col-span-3"
          />
        </div>

        <div className="flex justify-end gap-3 mt-8 border-t pt-5">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Membership'}
          </Button>
        </div>
      </form>
    </div>
  )
}
