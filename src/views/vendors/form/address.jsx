'use client'

import { useMemo, useState } from 'react'
import HrInput from '@/components/common/HrInput'
import { FormField } from '@/components/FormField'
import { useGetAllCountryQuery } from '@/views/inventory/currencies/store'

export default function AddressForm({ form }) {
  const [billing, setBilling] = useState({
    attention: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    fax: '',
  })

  const [shipping, setShipping] = useState({
    attention: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    fax: '',
  })

  const [copyBilling, setCopyBilling] = useState(false)
  const { data: countries, isLoading: countriesLoading } = useGetAllCountryQuery()
  console.log('countries', countries)
  const countryOptions = useMemo(() => {
    return countries?.data?.map(country => ({
      value: country.id,
      label: country.name,
    }))
  }, [countries?.data])

  // Billing change
  const handleBillingChange = e => {
    const { name, value } = e.target
    setBilling({ ...billing, [name]: value })
  }

  // Shipping change
  const handleShippingChange = e => {
    const { name, value } = e.target
    setShipping({ ...shipping, [name]: value })
  }

  // Copy billing to shipping
  const handleCopyBilling = e => {
    const { checked } = e.target
    if (checked) {
      form.setValue('shipping_address', form.getValues('billing_address'))
    } else {
      form.setValue('shipping_address', {})
    }
  }

  return (
    <div className="pb-10">
      <div className="grid grid-cols-1  gap-6 ">
        {/* Billing Address */}
        <div className="flex-1 space-y-3 p-4 border rounded">
          <h3 className="font-bold mb-4">Billing Address</h3>

          <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
            <FormField form={form} name="billing_address.address_line_1" label="Address Line 1" />
            <FormField form={form} name="billing_address.address_line_2" label="Address Line 2" />
            <FormField form={form} name="billing_address.city_id" label="City" />
            <FormField form={form} name="billing_address.state_id" label="State" />
            <FormField form={form} name="billing_address.postal_code" label="Postal Code" />
            <FormField
              form={form}
              name="billing_address.country_id"
              label="Country"
              options={countryOptions}
              type="select"
            />
            <FormField form={form} name="billing_address.phone" label="Phone" />
            <FormField form={form} name="billing_address.fax" label="Fax" />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="flex-1 space-y-3 p-4 border rounded">
          <div className="flex gap-3 items-center mb-4">
            <h3 className="font-bold">Shipping Address</h3>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={copyBilling} onChange={handleCopyBilling} />
              Copy Billing Address
            </label>
          </div>

          <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
            <FormField form={form} name="shipping_address.address_line_1" label="Address Line 1" />
            <FormField form={form} name="shipping_address.address_line_2" label="Address Line 2" />
            <FormField form={form} name="shipping_address.city_id" label="City" />
            <FormField form={form} name="shipping_address.state_id" label="State" />
            <FormField form={form} name="shipping_address.postal_code" label="Postal Code" />
            <FormField
              form={form}
              name="shipping_address.country_id"
              label="Country"
              options={countryOptions}
              type="select"
            />
            <FormField form={form} name="shipping_address.phone" label="Phone" />
            <FormField form={form} name="shipping_address.fax" label="Fax" />
          </div>
        </div>
      </div>
    </div>
  )
}
