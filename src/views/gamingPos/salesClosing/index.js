'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import HrInput from '@/components/common/HrInput'
import { Button } from '@/components/ui/button'
import { useGetAllPaymentMethodQuery } from '@/views/payment-method/store'
import {
  useCreateDenominationCountMutation,
  METHOD_TYPE_CASH,
} from './store'
import toast from 'react-hot-toast'

const DENOMINATIONS = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]

const CLOSING_TYPE_MAP = {
  food: 1,
  ticket: 2,
  membership: 3,
}

function SalesVoucherContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'food'
  const displayType = type.toUpperCase()
  const closingType = CLOSING_TYPE_MAP[type] ?? 1

  const { data: paymentMethodsRes } = useGetAllPaymentMethodQuery({ per_page: 'all' })
  const [createDenominationCount, { isLoading: isSubmitting }] = useCreateDenominationCountMutation()

  const { cashPaymentMethods, bankPaymentMethods } = useMemo(() => {
    const raw = paymentMethodsRes?.data
    let list = []
    if (Array.isArray(raw)) {
      list = raw
    } else if (raw?.data) {
      list = Array.isArray(raw.data) ? raw.data : raw.data?.data ?? []
    } else if (paymentMethodsRes?.output) {
      const out = paymentMethodsRes.output
      list = Array.isArray(out) ? out : out?.data ?? []
    }
    const cash = list.filter((pm) => pm && Number(pm.method_type) === METHOD_TYPE_CASH)
    const bank = list.filter((pm) => pm && Number(pm.method_type) !== METHOD_TYPE_CASH)
    return { cashPaymentMethods: cash, bankPaymentMethods: bank }
  }, [paymentMethodsRes])

  const cashMethod = cashPaymentMethods[0]

  const [closingDate, setClosingDate] = useState(() => {
    const d = new Date()
    return d.toISOString().slice(0, 10)
  })
  const [cash, setCash] = useState(() =>
    DENOMINATIONS.reduce((a, d) => ({ ...a, [d]: '' }), {})
  )
  const [bankAmounts, setBankAmounts] = useState({})
  const [remarks, setRemarks] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)

  const cashSubtotal = DENOMINATIONS.reduce(
    (sum, d) => sum + d * (Number(cash[d]) || 0),
    0
  )

  const nonCashSubtotal = useMemo(() => {
    return Object.entries(bankAmounts).reduce(
      (sum, [, amt]) => sum + (Number(amt) || 0),
      0
    )
  }, [bankAmounts])

  const grandTotal = cashSubtotal + nonCashSubtotal

  const handleCashChange = (e) => {
    const { name, value } = e.target
    setCash((prev) => ({ ...prev, [name]: value }))
  }

  const handleBankChange = (paymentMethodId, value) => {
    setBankAmounts((prev) => ({ ...prev, [paymentMethodId]: value }))
  }

  const buildDetails = () => {
    const details = []

    if (cashMethod?.id) {
      DENOMINATIONS.forEach((d) => {
        const count = Number(cash[d]) || 0
        if (count > 0) {
          details.push({
            payment_method_id: cashMethod.id,
            denomination: d,
            count,
            amount: d * count,
          })
        }
      })
    }

    bankPaymentMethods.forEach((pm) => {
      const amount = Number(bankAmounts[pm.id]) || 0
      if (amount > 0) {
        details.push({
          payment_method_id: pm.id,
          amount,
        })
      }
    })

    return details
  }

  const handleSubmit = async () => {
    const details = buildDetails()
    if (details.length === 0) {
      toast.error('Please add at least one cash denomination or bank amount.')
      return
    }

    const payload = {
      closing_type: closingType,
      closing_date: closingDate,
      status: 1,
      remarks: remarks || undefined,
      details,
    }

    const toastId = toast.loading('Saving...')
    try {
      const res = await createDenominationCount(payload)
      toast.dismiss(toastId)
      if (res?.error) {
        const errMsg = res.error?.data?.msg || res.error?.data?.message || res.error?.data?.errors ? JSON.stringify(res.error.data.errors) : 'Failed to save.'
        toast.error(errMsg)
      } else if (res?.data?.success) {
        toast.success(res?.data?.message || 'Sales closing saved successfully.')
        setCash(DENOMINATIONS.reduce((a, d) => ({ ...a, [d]: '' }), {}))
        setBankAmounts({})
        setRemarks('')
        setIsConfirmed(false)
      } else {
        toast.error(res?.data?.msg || 'Failed to save.')
      }
    } catch (err) {
      toast.dismiss(toastId)
      toast.error(err?.data?.msg || err?.message || 'Failed to save.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded shadow p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {displayType} Sales Voucher
          </h2>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">Closing Date</label>
            <input
              type="date"
              value={closingDate}
              onChange={(e) => setClosingDate(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CASH SECTION */}
          <div className="border rounded h-fit">
            <div className="bg-teal-600 text-white px-4 py-2 font-semibold">
              {displayType} | Cash
              {cashMethod && (
                <span className="ml-2 text-teal-100 text-sm font-normal">
                  ({cashMethod.method_name || 'Cash'})
                </span>
              )}
            </div>

            <div className="p-4 space-y-2 text-sm">
              {!cashMethod ? (
                <p className="text-amber-600 text-sm py-4">
                  No cash payment method found. Add one in Settings → Payment Methods.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-12 gap-2 text-[10px] uppercase font-bold text-gray-400 mb-1 px-1">
                    <div className="col-span-3">Note</div>
                    <div className="col-span-4 text-center">Count</div>
                    <div className="col-span-1" />
                    <div className="col-span-4 text-right">Amount</div>
                  </div>

                  {DENOMINATIONS.map((d) => (
                    <div key={d} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-3">
                        <div className="border p-1 rounded text-center font-medium bg-gray-50">
                          {d} x
                        </div>
                      </div>
                      <div className="col-span-4">
                        <HrInput
                          name={d.toString()}
                          type="number"
                          className="h-8 text-center"
                          value={cash[d]}
                          placeholder="0"
                          onChange={handleCashChange}
                          onFocus={(e) => e.target.select()}
                          fullWidth={true}
                        />
                      </div>
                      <div className="col-span-1 text-center text-gray-300">=</div>
                      <div className="col-span-4">
                        <HrInput
                          readOnly
                          className="h-8 rounded bg-gray-50 text-right font-bold text-gray-700"
                          value={d * (Number(cash[d]) || 0)}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="text-right font-bold pt-4 text-teal-600 border-t mt-4">
                    Sub-Total of Cash : ৳ {cashSubtotal.toLocaleString()}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* NON CASH / BANK SECTION */}
          <div className="border rounded flex flex-col">
            <div className="bg-orange-500 text-white px-4 py-2 font-semibold">
              {displayType} | Non-Cash (Banks & Payment Methods)
            </div>

            <div className="p-4 text-sm flex-grow space-y-3">
              {bankPaymentMethods.length === 0 ? (
                <p className="text-amber-600 text-sm py-4">
                  No bank/payment methods found. Add in Settings → Payment Methods.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {bankPaymentMethods.map((pm) => (
                    <HrInput
                      key={pm.id}
                      label={pm.method_name || pm.account_head?.account_name || 'Bank'}
                      type="number"
                      placeholder="0.00"
                      value={bankAmounts[pm.id] ?? ''}
                      onChange={(e) => handleBankChange(pm.id, e.target.value)}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>
              )}

              <div className="text-right font-bold py-2 text-orange-600 border-b">
                Sub Total : ৳ {nonCashSubtotal.toLocaleString()}
              </div>

              <div className="space-y-4 bg-gray-50 p-3 rounded">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-500 text-xs uppercase">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                    checked={isConfirmed}
                    onChange={(e) => setIsConfirmed(e.target.checked)}
                  />
                  Confirm Settlement?
                </label>

                <HrInput
                  label="Remarks (if any)"
                  type="textarea"
                  placeholder="Enter remarks..."
                  rows={2}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-8 p-4 bg-blue-50 rounded border border-blue-100 items-center gap-4">
          <div className="text-xl font-black text-blue-700">
            Total Amount : ৳ {grandTotal.toLocaleString()}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="px-6 h-10 border-red-200 text-red-600 hover:bg-red-50"
              onClick={() => window.history.back()}
            >
              Close
            </Button>
            <Button
              disabled={!isConfirmed || isSubmitting}
              variant="primary"
              onClick={handleSubmit}
              className={`px-8 h-10 font-bold transition-all ${
                isConfirmed && !isSubmitting
                  ? 'bg-green-600 hover:bg-green-700 shadow-md'
                  : 'bg-gray-400 cursor-not-allowed opacity-60'
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SalesVoucherPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-bold">Loading...</div>}>
      <SalesVoucherContent />
    </Suspense>
  )
}
