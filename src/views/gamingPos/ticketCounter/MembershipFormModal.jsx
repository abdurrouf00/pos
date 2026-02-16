'use client'

import React, { useState, useEffect } from 'react'
import HrModal from '@/components/common/HrModal'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'
import { useAddMembershipMutation, useUpdateMembershipMutation } from '@/views/gamingPos/membership/store'
import toast from 'react-hot-toast'

const packageForOptions = [
  { label: '1st Child', value: '1st_child' },
  { label: '2nd Child', value: '2nd_child' },
  { label: '3rd Child', value: '3rd_child' },
  { label: 'Monthly', value: 'Monthly' },
  { label: 'Quarterly', value: 'Quarterly' },
  { label: 'Yearly', value: 'Yearly' },
]

const emptyForm = {
  guardian_phone: '',
  guardian_name: '',
  guardian_phone_secondary: '',
  guardian_email: '',
  child_name: '',
  dob: '',
  address: '',
  child_class: '',
  school_name: '',
  package_for: '',
}

export default function MembershipFormModal({ open, onClose, mode = 'add', initialData = {}, onSuccess }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [addMembership, { isLoading: addLoading }] = useAddMembershipMutation()
  const [updateMembership, { isLoading: updateLoading }] = useUpdateMembershipMutation()

  useEffect(() => {
    if (open) {
      setForm({ ...emptyForm, ...initialData })
      setErrors({})
    }
  }, [open, initialData])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  const validate = () => {
    const err = {}
    if (!form.guardian_phone?.trim()) err.guardian_phone = 'Guardian phone is required'
    if (!form.child_name?.trim()) err.child_name = "Child's name is required"
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validate()) return

    const payload = {
      guardian_phone: form.guardian_phone.trim(),
      child_name: form.child_name.trim(),
      dob: form.dob || null,
      guardian_name: form.guardian_name?.trim() || null,
      guardian_phone_secondary: form.guardian_phone_secondary?.trim() || null,
      guardian_email: form.guardian_email?.trim() || null,
      address: form.address?.trim() || null,
      child_class: form.child_class?.trim() || null,
      school_name: form.school_name?.trim() || null,
      package_for: form.package_for || null,
    }

    try {
      let res
      if (mode === 'edit' && initialData.id) {
        res = await updateMembership({ id: initialData.id, ...payload })
      } else {
        res = await addMembership(payload)
      }
      if (res?.data?.success) {
        toast.success(res?.data?.message || (mode === 'edit' ? 'Member updated!' : 'Membership saved!'))
        onSuccess?.(res?.data?.data)
        onClose?.()
      } else {
        toast.error(res?.data?.message || 'Failed to save')
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save membership')
    }
  }

  return (
    <HrModal
      toggle={open}
      setToggle={onClose}
      onClose={onClose}
      title={mode === 'edit' ? 'Edit Membership' : 'Add Membership'}
      size="sm:max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HrInput label="Guardian Phone" name="guardian_phone" placeholder="01XXXXXXXXX" value={form.guardian_phone} onChange={handleChange} required error={!!errors.guardian_phone} errorText={errors.guardian_phone} />
          <HrInput label="Guardian Name" name="guardian_name" placeholder="Guardian name" value={form.guardian_name} onChange={handleChange} />
          <HrInput label="Secondary Phone" name="guardian_phone_secondary" placeholder="01XXXXXXXXX" value={form.guardian_phone_secondary} onChange={handleChange} />
          <HrInput label="Email" name="guardian_email" type="email" placeholder="email@example.com" value={form.guardian_email} onChange={handleChange} />
          <HrInput label="Child's Name" name="child_name" placeholder="Child name" value={form.child_name} onChange={handleChange} required error={!!errors.child_name} errorText={errors.child_name} />
          <HrInput label="DOB" name="dob" type="date" value={form.dob} onChange={handleChange} />
          <HrInput label="Child Class" name="child_class" placeholder="e.g. Class 5" value={form.child_class} onChange={handleChange} />
          <HrInput label="School" name="school_name" placeholder="School name" value={form.school_name} onChange={handleChange} />
          <HrSelect label="Package For" name="package_for" value={form.package_for} onChange={handleChange} options={packageForOptions} placeholder="Select" />
          <div className="md:col-span-2">
            <HrInput label="Address" name="address" type="textarea" value={form.address} onChange={handleChange} placeholder="Full address" rows={2} />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={addLoading || updateLoading}>
            {addLoading || updateLoading ? 'Saving...' : mode === 'edit' ? 'Update' : 'Save'}
          </Button>
        </div>
      </form>
    </HrModal>
  )
}
