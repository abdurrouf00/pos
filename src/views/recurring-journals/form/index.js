'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormField } from '@/components/FormField'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGetTaxSettingsQuery } from '@/views/tax-setting/store'
import { useGetAccountHeadsByQueryQuery } from '@/views/account-head/store'
import { useGetAllCurrencyQuery } from '@/views/inventory/currencies/store'
import HrSelect, { mapOptions } from '@/components/common/HrSelect'
import HrInput from '@/components/common/HrInput'

const repeatationPeriodOptions = [
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
  { value: '2 Months', label: '2 Months' },
  { value: '3 Months', label: '3 Months' },
  { value: '2 weeks', label: '2 weeks' },
  { value: 'Custom', label: 'Custom' },
]
const customRecurringPeriodOptions = [
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
  { label: 'Weeks', value: 'week' },
  { label: 'Days', value: 'day' },
]

const reportingMethodOptions = [
  { value: 'accrual', label: 'Accrual' },
  { value: 'cash', label: 'Cash' },
  { value: 'cash & accrual', label: 'Cash & Accrual' },
]

const initialRow = {
  account_head_id: '',
  tax_setting_id: null,
  contactable_type: null,
  contactable_id: null,
  tax_amount: 0,
  notes: '',
  project_id: null,
  dr_amount: 0,
  cr_amount: 0,
  tags: [
    // {
    //   reporting_tags: 'Office-Rent',
    // },
  ],
}

const initialState = {
  profile_name: '',
  start_date: '',
  repeatation_period: '', //values => month,year,2 Months,3 Months, 2 weeks, Custom
  custom_recurring_number: null, // logic => if repeatation_period == Custom then make visible the field
  custom_recurring_period: null, // values => Month,Year,Week,Day, logic => if repeatation_period == Custom then make visible the field
  end_date: '',
  is_never_ended: false,
  reference: '',
  notes: '',
  currency: '',
  status: '',
  reporting_method: null, //accrual,cash,cash & accrual
  subtotal_dr: 0,
  subtotal_cr: 0,
  total_dr: 0,
  total_cr: 0,
  totaltax_dr: 0,
  totaltax_cr: 0,
  metadata: null,
}

export default function RecurringJournalForm() {
  const [rows, setRows] = useState([initialRow, initialRow])
  const form = useForm({
    defaultValues: initialState,
  })

  const { data: taxSettings } = useGetTaxSettingsQuery()
  const { data: accountHeads } = useGetAccountHeadsByQueryQuery()
  const { data: currencies } = useGetAllCurrencyQuery()
  const taxSettingOptions = taxSettings?.data?.data?.map(tax => ({
    value: tax.id,
    label: tax.name,
  }))
  const accountHeadOptions = mapOptions(accountHeads?.data?.data || [], 'account_name', 'id')
  const currenciesOptions = mapOptions(currencies?.data?.data || [], 'name', 'id')
  const subtotal_dr = rows.reduce((sum, row) => sum + parseFloat(row?.dr_amount), 0) || 0
  const subtotal_cr = rows.reduce((sum, row) => sum + parseFloat(row?.cr_amount), 0) || 0

  const totaltax_dr =
    rows
      .filter(row => row?.dr_amount > 0)
      .reduce((sum, row) => sum + parseFloat(row?.tax_amount), 0) || 0
  const totaltax_cr =
    rows
      .filter(row => row?.cr_amount > 0)
      .reduce((sum, row) => sum + parseFloat(row?.tax_amount), 0) || 0

  const total_dr = subtotal_dr + totaltax_dr
  const total_cr = subtotal_cr + totaltax_cr

  const addRow = () => setRows(r => [...r, initialRow])
  const removeRow = id => {
    if (rows.length <= 2) return
    setRows(r => r.filter(row => row.id !== id))
  }
  const handleListItemChange = (e, idx) => {
    const { name, value } = e.target
    if (name === 'dr_amount' || name === 'cr_amount') {
      if (name === 'dr_amount') {
        setRows(r => r.map((row, i) => (i === idx ? { ...row, [name]: value, cr_amount: 0 } : row)))
      } else if (name === 'cr_amount') {
        setRows(r => r.map((row, i) => (i === idx ? { ...row, [name]: value, dr_amount: 0 } : row)))
      }
      return
    } else {
      setRows(r => r.map((row, i) => (i === idx ? { ...row, [name]: value } : row)))
    }
  }
  return (
    <div className="p-5 bg-white rounded mb-30">
      {/* <h1>Recurring Journal Form</h1> */}

      <div className="grid xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-2">
        <FormField
          form={form}
          name="profile_name"
          label="Profile Name"
          placeholder="Enter Profile Name"
        />
        <FormField
          form={form}
          name="start_date"
          label="Start Date"
          placeholder="Enter Start Date"
        />
        <FormField
          form={form}
          name="repeatation_period"
          label="Repeatation Period"
          type="select"
          placeholder="Enter Repeatation Period"
          options={repeatationPeriodOptions}
        />
        <FormField
          form={form}
          name="custom_recurring_number"
          label="Custom Recurring Number"
          placeholder="Enter Custom Recurring Number"
        />
        <FormField
          form={form}
          name="custom_recurring_period"
          label="Custom Recurring Period"
          placeholder="Enter Custom Recurring Period"
          options={customRecurringPeriodOptions}
          type="select"
        />
        <FormField form={form} name="end_date" label="End Date" placeholder="Enter End Date" />
        <FormField form={form} name="is_never_ended" label="Is Never Ended" type="switch" />
        <FormField form={form} name="reference" label="Reference" placeholder="Enter Reference" />
        <FormField form={form} name="notes" label="Notes" placeholder="Enter Notes" />
        <FormField
          form={form}
          name="currency"
          label="Currency"
          placeholder="Enter Currency"
          options={currenciesOptions}
          type="select"
        />
        <FormField form={form} name="status" label="Status" placeholder="Enter Status" />
        <FormField
          form={form}
          name="reporting_method"
          label="Reporting Method"
          placeholder="Enter Reporting Method"
          options={reportingMethodOptions}
          type="select"
        />
      </div>

      <div>
        <table className="w-full border-collapse border mt-4">
          <thead>
            <tr className="text-center text-gray-800  text-sm bg-gray-100 h-8">
              <th>Account Head</th>
              <th>Tax Setting</th>
              <th>Contactable Type</th>
              <th>Contactable ID</th>
              <th>Tax Amount</th>
              <th>Notes</th>
              <th>Project</th>
              <th>DR Amount</th>
              <th>CR Amount</th>
              <th>Tags</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <HrSelect
                    name="account_head_id"
                    placeholder="Select Account"
                    options={accountHeadOptions}
                    value={row.account_head_id}
                    onChange={e => handleListItemChange(e, idx)}
                  />
                </td>
                <td>
                  <HrSelect
                    name="tax_setting_id"
                    options={taxSettingOptions}
                    value={row.tax_setting_id}
                    onChange={e => handleListItemChange(e, idx)}
                  />
                </td>
                <td>{row.contactable_type}</td>
                <td>{row.contactable_id}</td>
                <td>
                  <HrInput
                    name="tax_amount"
                    placeholder="Tax Amount"
                    type="number"
                    value={row.tax_amount}
                    onChange={e => handleListItemChange(e, idx)}
                  />
                </td>
                <td>{row.notes}</td>
                <td>{row.project_id}</td>
                <td>{row.dr_amount}</td>
                <td>{row.cr_amount}</td>
                <td>{/* {row.tags} */}</td>
                <td>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500"
                    onClick={() => removeRow(row.id)}
                  >
                    <Trash2 />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
