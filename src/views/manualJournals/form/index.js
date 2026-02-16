'use client'

import { Button } from '@/components/ui/button'
import { useState, useMemo, useEffect } from 'react'
import { currencies, accountOptions } from './constant'
import HrSelect, { mapOptions } from '@/components/common/HrSelect'
import HrInput from '@/components/common/HrInput'
import { useForm } from 'react-hook-form'
import { FormField } from '@/components/FormField'
import { Trash2 } from 'lucide-react'
import { useGetTaxSettingsQuery } from '@/views/tax-setting/store'
import { useGetAccountHeadsByQueryQuery } from '@/views/account-head/store'
import { toast } from 'react-hot-toast'
import {
  useCreateManualJournalMutation,
  useGetManualJournalByIdQuery,
  useUpdateManualJournalMutation,
} from '../store'
import { useRouter, useSearchParams } from 'next/navigation'
import UILoading from '@/components/ui/UILoading'
import { useGetAllCurrencyQuery } from '@/views/inventory/currencies/store'
const initialRow = {
  account_head_id: '',
  tax_setting_id: '',
  tax_amount: 0,
  notes: '',
  project_id: '',
  dr_amount: '',
  cr_amount: '',
  tags: [],
}
const initialData = {
  journal_no: '',
  date: new Date().toISOString().slice(0, 10),
  reference: '',
  notes: '',
  currency: '',
  status: '',
  reporting_method: '',
  metadata: null,
}

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'posted', label: 'Posted' },
  { value: 'cancelled', label: 'Cancelled' },
]
const reportingMethodOptions = [
  { value: 'accrual', label: 'Accrual' },
  { value: 'cash', label: 'Cash' },
  { value: 'cash & accrual', label: 'Accrual and Cash' },
]
export default function JournalFormPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()
  const [rows, setRows] = useState([initialRow, initialRow])

  const form = useForm({
    defaultValues: initialData,
  })
  const { data: journalData, isLoading: journalDataLoading } = useGetManualJournalByIdQuery(id, {
    skip: !id,
  })
  const [updateManualJournal, { isLoading: updateManualJournalLoading }] =
    useUpdateManualJournalMutation()
  useEffect(() => {
    if (journalData?.data) {
      const data = journalData?.data
      form.reset({
        ...data,
        subtotal_dr: +data.subtotal_dr,
        subtotal_cr: +data.subtotal_cr,
        total_dr: +data.total_dr,
        total_cr: +data.total_cr,
        difference: +data.difference,
        totaltax_dr: +data.totaltax_dr,
        totaltax_cr: +data.totaltax_cr,
      })
      const updatedLines = data.lines.map(line => ({
        ...line,
        tax_amount: +line.tax_amount,
        dr_amount: +line.dr_amount,
        cr_amount: +line.cr_amount,
      }))
      setRows(updatedLines)
    }
  }, [journalData])
  const { data: taxSettings } = useGetTaxSettingsQuery()
  const { data: accountHeads } = useGetAccountHeadsByQueryQuery()
  const [createManualJournal, { isLoading: createManualJournalLoading }] =
    useCreateManualJournalMutation()
  const { data: currencies } = useGetAllCurrencyQuery()

  const taxSettingOptions = taxSettings?.data?.data?.map(tax => ({
    value: tax.id,
    label: tax.name,
  }))
  const accountHeadOptions = mapOptions(accountHeads?.data?.data || [], 'account_name', 'id')
  const currenciesOptions = mapOptions(currencies?.data?.data || [], 'name', 'id')
  const projectOptions = []

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

  // const [form, setForm] = useState({
  //   date: new Date().toISOString().slice(0, 10),
  //   journalNo: "",
  //   reference: "",
  //   notes: "",
  //   reportingMethod: "Accrual and Cash",
  //   currency: "BDT",
  // });

  const addRow = () => setRows(r => [...r, initialRow])
  const removeRow = id => {
    if (rows.length <= 2) return
    setRows(r => r.filter(row => row.id !== id))
  }

  const { subtotalDebits, subtotalCredits, totalDebits, totalCredits, difference } = useMemo(() => {
    let sDeb = 0,
      sCred = 0
    rows.forEach(row => {
      const d = parseFloat(row.debits) || 0
      const c = parseFloat(row.credits) || 0
      sDeb += d
      sCred += c
    })
    const diff = sDeb - sCred
    return {
      subtotalDebits: sDeb.toFixed(2),
      subtotalCredits: sCred.toFixed(2),
      totalDebits: sDeb.toFixed(2),
      totalCredits: sCred.toFixed(2),
      difference: diff.toFixed(2),
    }
  }, [rows])

  const handleSubmit = async data => {
    if (total_dr !== total_cr) {
      toast.error('Total Debit and Credit must be equal')
      return
    }
    const payload = {
      ...data,
      total_dr,
      total_cr,
      subtotal_dr,
      subtotal_cr,
      totaltax_dr,
      totaltax_cr,
      lines: rows,
    }

    try {
      const action = id
        ? updateManualJournal({ id, ...payload, _method: 'PUT' })
        : createManualJournal(payload)
      const res = await action.unwrap()
      console.log('res', res)
      if (res.success) {
        router.push(`/dashboard/manual-journals`)
        toast.success('Manual Journal created successfully')
      } else {
        toast.error(res.data.message || 'Failed to create manual journal')
      }
    } catch (error) {
      toast.error(error.data.message || 'Failed to create manual journal')
    }
    console.log('payload', JSON.stringify(payload, null, 2))
  }

  const handleListItemChange = (e, idx) => {
    const { name, value } = e.target
    console.log('e', name, value)
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
  console.log('rows', rows)

  return (
    <UILoading loading={journalDataLoading}>
      <main className="min-h-screen bg-white px-10 mb-36 pt-10">
        <div className=" bg-white">
          <form>
            <div className=" ">
              {/* Header */}
              <div className="grid xl:grid-cols-5 gap-4">
                <FormField
                  form={form}
                  placeholder="Journal No"
                  name="journal_no"
                  label="Journal No"
                />
                <FormField form={form} placeholder="Date" name="date" label="Date" />
                <FormField form={form} placeholder="Reference" name="reference" label="Reference" />
                <FormField form={form} placeholder="Notes" name="notes" label="Notes" />
                <FormField
                  form={form}
                  placeholder="Currency"
                  name="currency"
                  label="Currency"
                  type="select"
                  options={currenciesOptions}
                />
                <FormField
                  form={form}
                  placeholder="Status"
                  name="status"
                  label="Status"
                  type="select"
                  options={statusOptions}
                />
                <FormField
                  form={form}
                  placeholder="Reporting Method"
                  name="reporting_method"
                  label="Reporting Method"
                  type="select"
                  options={reportingMethodOptions}
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto mt-10">
                <table className="w-full table-fixed border-collapse">
                  <thead>
                    <tr className="text-xs bg-gray-100 uppercase  text-neutral-800">
                      <th className="p-1 border w-16">Actions</th>
                      <th className="p-1 border w-44">Account Head</th>
                      <th className="p-1 border w-40">Tax Setting</th>
                      <th className="p-1 border w-32">Tax Amount</th>
                      <th className="p-1 border w-32">Notes</th>
                      <th className="p-1 border w-32">Project</th>
                      {/* <th className="p-1 border w-32">Tags</th> */}
                      <th className="p-1 border w-24">Debit</th>
                      <th className="p-1 border w-24">Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="border p-2 flex justify-center items-center">
                          <Button size="icon" type="button" onClick={() => removeRow(row.id)}>
                            <Trash2 size={16} />
                          </Button>
                        </td>
                        <td className="border p-2">
                          <HrSelect
                            name="account_head_id"
                            placeholder="Select Account"
                            options={accountHeadOptions}
                            value={row.account_head_id}
                            onChange={e => handleListItemChange(e, idx)}
                          />
                        </td>
                        <td className="border p-2">
                          <HrSelect
                            name="tax_setting_id"
                            options={taxSettingOptions}
                            onChange={e => handleListItemChange(e, idx)}
                            value={row.tax_setting_id}
                          />
                        </td>
                        <td className="border p-2">
                          <HrInput
                            name="tax_amount"
                            placeholder="Tax Amount"
                            type="number"
                            value={row.tax_amount}
                            onChange={e => handleListItemChange(e, idx)}
                          />
                        </td>
                        <td className="border p-2">
                          <HrInput
                            name="notes"
                            placeholder="Notes"
                            type="text"
                            value={row.notes}
                            onChange={e => handleListItemChange(e, idx)}
                          />
                        </td>
                        <td className="border p-2">
                          <HrSelect
                            name="project_id"
                            placeholder="Select Project"
                            options={projectOptions}
                            value={row.project_id}
                            onChange={e => handleListItemChange(e, idx)}
                          />
                        </td>

                        <td className="border p-2">
                          <HrInput
                            name="dr_amount"
                            placeholder="Debit"
                            type="number"
                            value={row.dr_amount}
                            onChange={e => handleListItemChange(e, idx)}
                          />
                        </td>
                        <td className="border p-2">
                          <HrInput
                            name="cr_amount"
                            placeholder="Credit"
                            type="number"
                            value={row.cr_amount}
                            onChange={e => handleListItemChange(e, idx)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-2 mt-2">
                <Button type="button" onClick={addRow}>
                  + Add Row
                </Button>
              </div>

              {/* Totals */}
              <div className="flex justify-between gap-4 border rounded-2xl p-4 bg-gray-50 max-w-2xl ml-auto">
                <div className="flex flex-col justify-between text-sm text-gray-600">
                  <p>Sub Total</p>
                  <p>Total ({form.currency})</p>
                  <p>Difference</p>
                </div>

                <div className="flex mr-20 gap-10">
                  <div className="text-lg font-medium">
                    <p>{subtotal_dr}</p>
                    <p>{total_dr}</p>
                  </div>

                  <div className="text-lg font-medium">
                    <p>{subtotal_cr}</p>
                    <p>{total_cr}</p>
                    <div
                      className={`${
                        difference !== '0.00' ? 'text-red-600' : 'text-green-600'
                      } font-bold`}
                    >
                      {total_dr - total_cr}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex fixed bottom-0 w-[82%] items-center shadow-lg h-16 bg-gray-200 rounded sm:px-4 z-50">
              <Button
                onClick={form.handleSubmit(handleSubmit)}
                type="submit"
                disabled={createManualJournalLoading || updateManualJournalLoading}
              >
                {createManualJournalLoading || updateManualJournalLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </UILoading>
  )
}
