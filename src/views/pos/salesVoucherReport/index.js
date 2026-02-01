'use client'
import { useState, useEffect } from 'react'

export default function SalesVoucherPage() {

  const denominations = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]

  const [cash, setCash] = useState(
    denominations.reduce((a, d) => ({ ...a, [d]: 0 }), {})
  )

  const [nonCash, setNonCash] = useState({
    UCBL: 0,
    DBBL: 0,
    CITY: 0,
    PUBALI: 0,
    EBL: 0,
    card: 0,
    bkash: 0,
    nagad: 0,
  })

  const cashSubtotal = denominations.reduce(
    (sum, d) => sum + d * (cash[d] || 0),
    0
  )

  const nonCashSubtotal = Object.values(nonCash).reduce(
    (a, b) => a + Number(b || 0),
    0
  )

  const [isConfirmed, setIsConfirmed] = useState(false)

  const grandTotal = cashSubtotal + nonCashSubtotal

  const handleUpdate = () => {
    // Here you would normally save the data to a database or API
    console.log('Saving settlement data...', { cash, nonCash, grandTotal })
    alert('Settlement updated successfully!')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Sales Voucher</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CASH */}
          <div className="border rounded">
            <div className="bg-teal-600 text-white px-4 py-2 font-semibold">
              FOOD | Cash
            </div>

            <div className="p-4 space-y-2 text-sm">
              {denominations.map((d) => (
                <div key={d} className="grid grid-cols-3 gap-2 items-center">
                  <div className="border p-1 rounded" >{d}  x</div>

                  <input
                    type="number"
                    className="border p-1 rounded"
                    value={cash[d] === 0 ? '' : cash[d]}
                    placeholder="0"
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      setCash({ ...cash, [d]: e.target.value === '' ? 0 : Number(e.target.value) })
                    }
                  />

                  <input
                    className="border p-1 rounded bg-gray-50"
                    value={d * cash[d]}
                    readOnly
                  />
                </div>
              ))}

              <div className="text-right font-semibold pt-2">
                Sub-Total of Cash : {cashSubtotal}
              </div>
            </div>
          </div>

          {/* NON CASH */}
          <div className="border rounded">
            <div className="bg-orange-500 text-white px-4 py-2 font-semibold">
              FOOD | Non-Cash
            </div>

            <div className="p-4 space-y-3 text-sm ">

              {[
                ['UCBL', 'UCBL'],
                ['DBBL', 'DBBL'],
                ['CITY', 'CITY'],
                ['PUBALI', 'PUBALI'],
                ['EBL', 'EBL'],
              ].map(([key, label]) => (
                <div key={key} className="grid grid-cols-2 gap-2">
                  <div className="border p-1 rounded">{label}</div>
                  <input
                    type="number"
                    className="border p-1 rounded"
                    value={nonCash[key] === 0 ? '' : nonCash[key]}
                    placeholder="0"
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      setNonCash({ ...nonCash, [key]: e.target.value === '' ? 0 : Number(e.target.value) })
                    }
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-2">
                <div>Card Sales</div>
                <input
                  type="number"
                  className="border p-1 rounded"
                  value={nonCash.card === 0 ? '' : nonCash.card}
                  placeholder="0"
                  onFocus={(e) => e.target.select()}
                  onChange={(e) =>
                    setNonCash({ ...nonCash, card: e.target.value === '' ? 0 : Number(e.target.value) })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>Food Bkash</div>
                <input
                  type="number"
                  className="border p-1 rounded"
                  value={nonCash.bkash === 0 ? '' : nonCash.bkash}
                  placeholder="0"
                  onFocus={(e) => e.target.select()}
                  onChange={(e) =>
                    setNonCash({ ...nonCash, bkash: e.target.value === '' ? 0 : Number(e.target.value) })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>Food Nagad</div>
                <input
                  type="number"
                  className="border p-1 rounded"
                  value={nonCash.nagad === 0 ? '' : nonCash.nagad}
                  placeholder="0"
                  onFocus={(e) => e.target.select()}
                  onChange={(e) =>
                    setNonCash({ ...nonCash, nagad: e.target.value === '' ? 0 : Number(e.target.value) })
                  }
                />
              </div>

              <div className="font-semibold">
                Sub Total (B): {nonCashSubtotal}
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                />
                Confirm Settlement?
              </label>

              <input
                className="border p-2 rounded w-full"
                placeholder="Remarks"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6 font-semibold">
          <div>Total Amount : {grandTotal}</div>

          <div className="space-x-3">
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Close
            </button>
            <button 
              disabled={!isConfirmed}
              onClick={handleUpdate}
              className={`px-4 py-2 rounded text-white transition-colors ${
                isConfirmed ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
