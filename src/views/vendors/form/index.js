'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import TopForm from './topForm' // ধরলাম একই ফর্ম ফিল্ড ব্যবহার হবে
import OtherDetails from './otherDetails'
import Address from './address'
import ContactPerson from './ContactPerson'
import ReaportingTags from './reaportingTags'
import CustomerFields from './customerFields'
import Remarks from './remarks'
import { FormField } from '@/components/FormField'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useCreateVendorMutation, useUpdateVendorMutation } from '../store'
import UILoading from '@/components/ui/UILoading'

const tabs = [
  'Other Details',
  'Address',
  'Contact Persons',
  // 'Custom Fields',
  // 'Reporting Tags',
  // 'Remarks',
]
export const initialContactPerson = {
  first_name: '',
  last_name: '',
  email: '',
  work_phone: '',
  designation: '',
  department: '',
  is_primary: true,
}
const initialData = {
  full_name: '',
  company_name: '',
  display_name: '',
  email: '',
  phone: '',
  remarks: '',
  is_active: true,

  details: {
    tax_id: '',
    registration_number: '',
    website: '',
    payment_terms: '',
    credit_limit: 50000.0,
    currency_id: '',
    bank_name: '',
    bank_account_number: '',
    bank_routing_number: '',
    bank_swift_code: '',
  },

  billing_address: {
    address_line_1: '',
    address_line_2: '',
    city_id: '',
    state_id: '',
    postal_code: '',
    country_id: '',
    phone: '',
    fax: '',
    is_primary: true,
    is_default: true,
  },

  shipping_address: {
    address_line_1: '',
    address_line_2: '',
    city_id: '',
    state_id: '',
    postal_code: '',
    country_id: '',
    phone: '',
    fax: '',
    is_primary: true,
    is_default: true,
  },

  // contacts: [
  //   {
  //     first_name: '',
  //     last_name: '',
  //     email: '',
  //     work_phone: '',
  //     designation: '',
  //     department: '',
  //     is_primary: true,
  //   },
  // ],
}

const PurchasesForm = () => {
  const id = useSearchParams().get('id')
  const [activeTab, setActiveTab] = useState(0)
  const [contactPersons, setContactPersons] = useState([{ ...initialContactPerson }])
  const [createVendor, { isLoading: createLoading }] = useCreateVendorMutation()
  const [updateVendor, { isLoading: updateLoading }] = useUpdateVendorMutation()

  const form = useForm({
    defaultValues: initialData,
    mode: 'onSubmit',
  })

  const onSubmit = async data => {
    data.contacts = contactPersons
    const action = id ? updateVendor({ id, data }) : createVendor(data)
    console.log('payload', JSON.stringify(data, null, 2))
    try {
      const res = await action.unwrap()
      console.log('res', res)
      if (res.success) {
        toast.success('Vendor saved successfully')
        // handleClose()
      } else {
        toast.error('Failed to save vendor')
      }
    } catch (error) {}
  }

  return (
    <div className="bg-white p-4 rounded space-y-6">
      <UILoading loading={false}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 overflow-y-auto py-6  px-4 rounded relative"
        >
          <div className="grid grid-cols-4 gap-4">
            <FormField form={form} name="full_name" label="Full Name" />
            <FormField form={form} name="company_name" label="Company Name" />
            <FormField form={form} name="display_name" label="Display Name" />
            <FormField form={form} name="email" label="Email" />
            <FormField form={form} name="phone" label="Phone" />
            <FormField form={form} name="remarks" label="Remarks" type="textarea" />
            <FormField form={form} name="is_active" label="Is Active" type="switch" />
          </div>

          <div className="flex space-x-6 border-b pb-2 mb-4 sticky top-0 mt-4  z-10">
            {tabs.map((tab, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`px-3 py-2 text-sm font-medium transition
                ${
                  activeTab === index
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-blue-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="">
            {activeTab === 0 && <OtherDetails form={form} />}
            {activeTab === 1 && <Address form={form} />}
            {activeTab === 2 && (
              <ContactPerson
                contactPersons={contactPersons}
                setContactPersons={setContactPersons}
              />
            )}
            {activeTab === 3 && <CustomerFields form={form} />}
            {activeTab === 4 && <ReaportingTags form={form} />}
            {activeTab === 5 && <Remarks form={form} />}
          </div>

          <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t flex justify-end z-20">
            <Button type="submit" disabled={createLoading || updateLoading}>
              {createLoading || updateLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </UILoading>
    </div>
  )
}

export default PurchasesForm
