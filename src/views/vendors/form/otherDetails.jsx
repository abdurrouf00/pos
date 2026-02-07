'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { FormField } from '@/components/FormField'
import { useGetAllCountryQuery, useGetAllCurrencyQuery } from '@/views/inventory/currencies/store'
import { useGetTaxRatesQuery } from '@/views/inventory/tax-rates/store'
import UILoading from '@/components/ui/UILoading'

export default function CompanyInfoForm({ form }) {
  const [formData, setFormData] = useState({
    tax_rate: '',
    currency: '',
    opening_balance: '',
    payment_terms: '',
    enable_portal: '',
    portal_language: '',
    documents: null,
    website_url: '',
    department: '',
    designation: '',
    skype: '',
    facebook: '',
  })

  const [errorMsg, setErrorMsg] = useState('')
  const [showMore, setShowMore] = useState(false)

  const { data: currency, isLoading: currencyLoading } = useGetAllCurrencyQuery()
  const { data: tax_rates, isLoading: taxRatesLoading } = useGetTaxRatesQuery()
  const { data: countries, isLoading: countriesLoading } = useGetAllCountryQuery()

  const taxRateOptions = useMemo(() => {
    return tax_rates?.data?.data?.map(tax_rate => ({
      value: tax_rate.id,
      label: tax_rate.name,
    }))
  }, [tax_rates?.data])

  const currencyOptions = useMemo(() => {
    return currency?.data?.data?.map(currency => ({
      value: currency.id,
      label: currency.name,
    }))
  }, [currency?.data])

  return (
    <UILoading loading={currencyLoading || taxRatesLoading}>
      <div>
        <div className="w-full text-sm   pb-20">
          <div className=" w-full">
            {errorMsg && <p className="text-red-500 font-medium">{errorMsg}</p>}

            <div className="space-y-6 ">
              <h2 className="text-lg font-semibold">Company Information</h2>

              {/* Always visible fields */}
              <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                <FormField
                  form={form}
                  name="details.tax_id"
                  label="Tax"
                  type="select"
                  options={taxRateOptions}
                />

                <FormField
                  form={form}
                  name="details.registration_number"
                  label="Registration Number"
                  type="text"
                />
                <FormField form={form} name="details.website" label="Website" type="text" />
                <FormField
                  form={form}
                  name="details.payment_terms"
                  label="Payment Terms"
                  type="text"
                />
                <FormField
                  form={form}
                  name="details.credit_limit"
                  label="Credit Limit"
                  type="number"
                />
                <FormField
                  form={form}
                  name="details.currency_id"
                  label="Currency"
                  type="select"
                  options={currencyOptions}
                />
                <FormField form={form} name="details.bank_name" label="Bank Name" type="text" />
                <FormField
                  form={form}
                  name="details.bank_account_number"
                  label="Bank Account Number"
                  type="text"
                />
                <FormField
                  form={form}
                  name="details.bank_routing_number"
                  label="Bank Routing Number"
                  type="text"
                />
                <FormField
                  form={form}
                  name="details.bank_swift_code"
                  label="Bank Swift Code"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UILoading>
  )
}
