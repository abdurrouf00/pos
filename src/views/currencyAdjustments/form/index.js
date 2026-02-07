'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function BaseCurrencyAdjustmentForm() {
  const currencyRates = {
    AED: 120,
    USD: 105,
    EUR: 115,
    CAD: 95,
    GBP: 130,
    JPY: 0.8,
    AUD: 90,
  }

  const currencies = [
    { code: 'AED', name: 'UAE Dirham' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' },
  ]

  const [form, setForm] = useState({
    currency: 'AED',
    date: '',
    rate: currencyRates['AED'], // AED default rate
    notes: '',
  })

  const handleChange = e => {
    const { name, value } = e.target

    // যদি currency পরিবর্তন হয়, তাহলে rate update কর
    if (name === 'currency') {
      setForm({
        ...form,
        currency: value,
        rate: currencyRates[value] || '', // নতুন currency অনুযায়ী rate
      })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    alert('Base Currency Adjustment Saved!')
  }

  const handleCancel = () => {
    setForm({
      currency: 'AED',
      date: '',
      rate: currencyRates['AED'],
      notes: '',
    })
  }

  return (
    <div className="p-8 flex justify-center items-center bg-white">
      <form onSubmit={handleSubmit} className="w-full   rounded-lg  space-y-4">
        <h2 className="text-xl font-semibold mb-4">Base Currency Adjustment</h2>

        {/* Currency */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Currency <span className="text-red-500">*</span>
          </label>
          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {currencies.map(cur => (
              <option key={cur.code} value={cur.code}>
                {cur.code} - {cur.name}
              </option>
            ))}
          </select>
        </div>

        {/* Exchange Rate */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Exchange Rate <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <span className="px-2">1 {form.currency} =</span>
            <input
              type="text"
              name="rate"
              value={form.rate}
              readOnly
              className="flex-1 border rounded-md p-2 bg-gray-100 cursor-not-allowed"
            />
            <span className="px-2">BDT</span>
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Date of Adjustment <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Notes <span className="text-red-500">*</span>
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Max. 500 characters"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Continue
          </button>
          <Link href="/dashboard/bulkUpdate">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}
