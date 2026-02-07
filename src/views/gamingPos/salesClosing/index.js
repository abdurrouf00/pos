'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import HrInput from '@/components/common/HrInput'
import { Button } from '@/components/ui/button'

function SalesVoucherContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'food'
  const displayType = type.toUpperCase()

  const denominations = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]

  const [cash, setCash] = useState(
    denominations.reduce((a, d) => ({ ...a, [d]: '' }), {})
  )

  const [nonCash, setNonCash] = useState({
    UCBL: '',
    DBBL: '',
    CITY: '',
    PUBALI: '',
    EBL: '',
    card: '',
    bkash: '',
    nagad: '',
    remarks: ''
  })

  const [isConfirmed, setIsConfirmed] = useState(false)

  /* ---------------- CALCULATIONS ---------------- */

  const cashSubtotal = denominations.reduce(
    (sum, d) => sum + d * (Number(cash[d]) || 0),
    0
  )

  const nonCashSubtotal = Object.values(nonCash).reduce(
    (a, b) => typeof b === 'number' || !isNaN(Number(b)) ? a + Number(b || 0) : a,
    0
  )

  const grandTotal = cashSubtotal + nonCashSubtotal

  /* ---------------- HANDLERS ---------------- */

  const handleCashChange = (e) => {
    const { name, value } = e.target
    setCash(prev => ({ 
      ...prev, 
      [name]: value
    }))
  }

  const handleNonCashChange = (e) => {
    const { name, value } = e.target
    setNonCash(prev => ({ 
      ...prev, 
      [name]: value
    }))
  }

  const handleUpdate = () => {
    console.log(`Saving ${displayType} settlement data...`, { cash, nonCash, grandTotal })
    alert(`${displayType} Settlement updated successfully!`)
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">{displayType} Sales Voucher</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CASH SECTION (TEAL DESIGN) */}
          <div className="border rounded h-fit">
            <div className="bg-teal-600 text-white px-4 py-2 font-semibold">
              {displayType} | Cash
            </div>

            <div className="p-4 space-y-2 text-sm">
              <div className="grid grid-cols-12 gap-2 text-[10px] uppercase font-bold text-gray-400 mb-1 px-1">
                <div className="col-span-3">Note</div>
                <div className="col-span-4 text-center">Count</div>
                <div className="col-span-1"></div>
                <div className="col-span-4 text-right">Amount</div>
              </div>
              
              {denominations.map((d) => (
                <div key={d} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-3">
                    <div className="border p-1 rounded text-center font-medium bg-gray-50">{d} x</div>
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
                Sub-Total of Cash : {cashSubtotal.toLocaleString()}
              </div>
            </div>
          </div>

          {/* NON CASH SECTION (ORANGE DESIGN) */}
          <div className="border rounded flex flex-col">
            <div className="bg-orange-500 text-white px-4 py-2 font-semibold">
              {displayType} | Non-Cash
            </div>

            <div className="p-4 text-sm flex-grow">
              
              <div className="grid grid-cols-2 gap-2">
                {['DBBL', 'CITY', 'PUBALI', 'EBL'].map((bank) => (
                  <HrInput
                    key={bank}
                    label={bank}
                    name={bank}
                    type="number"
                    placeholder="0.00"
                    value={nonCash[bank]}
                    onChange={handleNonCashChange}
                    onFocus={(e) => e.target.select()}
                  />
                ))}
              </div>

              <div className="space-y-4 pt-2 border-t border-dashed">
                <HrInput
                  label="Card Sales"
                  name="card"
                  type="number"
                  placeholder="0.00"
                  value={nonCash.card}
                  onChange={handleNonCashChange}
                  onFocus={(e) => e.target.select()}
                />

                <div className="grid grid-cols-2 gap-4">
                  <HrInput
                    label="Bkash"
                    name="bkash"
                    type="number"
                    placeholder="0.00"
                    value={nonCash.bkash}
                    onChange={handleNonCashChange}
                    onFocus={(e) => e.target.select()}
                  />
                  <HrInput
                    label="Nagad"
                    name="nagad"
                    type="number"
                    placeholder="0.00"
                    value={nonCash.nagad}
                    onChange={handleNonCashChange}
                    onFocus={(e) => e.target.select()}
                  />
                </div>
              </div>

              <div className="text-right font-bold py-2 text-orange-600 border-b mb-4">
                Sub Total : {nonCashSubtotal.toLocaleString()}
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
                  name="remarks"
                  type="textarea"
                  placeholder="Enter remarks..."
                  rows={2}
                  value={nonCash.remarks}
                  onChange={handleNonCashChange}
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
              disabled={!isConfirmed}
              variant="primary"
              onClick={handleUpdate}
              className={`px-8 h-10 font-bold transition-all ${
                isConfirmed ? 'bg-green-600 hover:bg-green-700 shadow-md' : 'bg-gray-400 cursor-not-allowed opacity-60'
              }`}
            >
              Update
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
