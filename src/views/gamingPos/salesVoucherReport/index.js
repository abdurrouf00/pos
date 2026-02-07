'use client'
import { useState } from 'react'
import HrInput from '@/components/common/HrInput'
import { Button } from '@/components/ui/button'

const DENOMS = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]
const SECTIONS = ['ENTRY', 'FOOD', 'ELC']

const emptySection = () => ({
  cash: Object.fromEntries(DENOMS.map(d => [d, 0])),
  banks: { UCBL: 0, DBBL: 0, CITY: 0, PUBALI: 0, EBL: 0 },
  card: 0,
  bkash: 0,
  nagad: 0,
  confirm: false,
  username: '',
  remarks: '',
})

export default function VoucherInputPage() {

  const [data, setData] = useState({
    ENTRY: emptySection(),
    FOOD: emptySection(),
    ELC: emptySection(),
  })

  /* ---------------- CALCULATIONS ---------------- */

  const cashTotal = (s) =>
    DENOMS.reduce((t, d) => t + d * (Number(data[s].cash[d]) || 0), 0)

  const nonCashTotal = (s) =>
    Object.values(data[s].banks).reduce((a, b) => a + Number(b || 0), 0) +
    Number(data[s].card || 0) +
    Number(data[s].bkash || 0) +
    Number(data[s].nagad || 0)

  const sectionTotal = (s) => cashTotal(s) + nonCashTotal(s)

  const bicTotals = {
    cash: SECTIONS.reduce((t, s) => t + cashTotal(s), 0),
    card: SECTIONS.reduce((t, s) => t + Number(data[s].card || 0), 0),
    bkash: SECTIONS.reduce((t, s) => t + Number(data[s].bkash || 0), 0),
    nagad: SECTIONS.reduce((t, s) => t + Number(data[s].nagad || 0), 0),
  }

  /* ---------------- UPDATE HELPERS ---------------- */

  const update = (s, key, val) =>
    setData(prev => ({ ...prev, [s]: { ...prev[s], [key]: val } }))

  const updateCash = (s, d, val) =>
    setData(prev => ({
      ...prev,
      [s]: { ...prev[s], cash: { ...prev[s].cash, [d]: val } }
    }))

  const updateBank = (s, b, val) =>
    setData(prev => ({
      ...prev,
      [s]: { ...prev[s], banks: { ...prev[s].banks, [b]: val } }
    }))

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Voucher Input</h1>
        <Button onClick={() => console.log('Saving...', data)}>Save Voucher</Button>
      </div>

      {/* ===== SECTIONS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SECTIONS.map(s => (
          <div key={s} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-cyan-700 text-white px-4 py-2 font-bold uppercase tracking-wider text-sm flex justify-between items-center">
              <span>{s} SECTION</span>
              <span className="bg-cyan-800 px-2 py-0.5 rounded text-xs">৳ {sectionTotal(s).toLocaleString()}</span>
            </div>

            <div className="p-4 space-y-4">

              {/* CASH SECTION */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Cash Denominations</h3>
                <div className="space-y-1.5 bg-gray-50 p-3 rounded border border-gray-100">
                  {DENOMS.map(d => (
                    <div key={d} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-3 text-sm font-medium text-gray-600">{d} x</div>
                      <div className="col-span-4">
                        <HrInput
                          type="number"
                          value={data[s].cash[d]}
                          onChange={e => updateCash(s, d, e.target.value)}
                          className="h-8 text-center"
                          fullWidth={true}
                        />
                      </div>
                      <div className="col-span-5 text-right font-bold text-gray-700 text-sm">
                        {(Number(data[s].cash[d]) * d).toLocaleString()}
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-cyan-700 font-bold text-sm">
                    <span>Cash Sub-Total</span>
                    <span>৳ {cashTotal(s).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* BANKS SECTION */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Bank Deposits</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(data[s].banks).map(b => (
                    <HrInput
                      key={b}
                      label={b}
                      type="number"
                      placeholder="0.00"
                      value={data[s].banks[b]}
                      onChange={e => updateBank(s, b, e.target.value)}
                      className="h-9"
                    />
                  ))}
                </div>
              </div>

              {/* OTHERS SECTION */}
              <div className="space-y-3">
                <HrInput
                  label="Card Sales"
                  placeholder="0.00"
                  type="number"
                  value={data[s].card}
                  onChange={e => update(s, 'card', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <HrInput
                    label="Bkash"
                    placeholder="0.00"
                    type="number"
                    value={data[s].bkash}
                    onChange={e => update(s, 'bkash', e.target.value)}
                  />
                  <HrInput
                    label="Nagad"
                    placeholder="0.00"
                    type="number"
                    value={data[s].nagad}
                    onChange={e => update(s, 'nagad', e.target.value)}
                  />
                </div>
              </div>

              {/* CONFIRM & USER INFO */}
              <div className="bg-gray-50 p-3 rounded space-y-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`confirm-${s}`}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                    checked={data[s].confirm}
                    onChange={e => update(s, 'confirm', e.target.checked)}
                  />
                  <label htmlFor={`confirm-${s}`} className="text-xs font-bold text-gray-500 cursor-pointer">
                    CONFIRM ENTRY
                  </label>
                </div>

                <HrInput
                  label="Username"
                  placeholder="Entered by"
                  value={data[s].username}
                  onChange={e => update(s, 'username', e.target.value)}
                  className="bg-white"
                />
                <HrInput
                  label="Remarks"
                  placeholder="Additional notes..."
                  value={data[s].remarks}
                  onChange={e => update(s, 'remarks', e.target.value)}
                  className="bg-white"
                  type="textarea"
                  rows={2}
                />
              </div>

              {/* SECTION TOTAL FOOTER */}
              <div className="bg-gray-800 text-white p-3 rounded flex justify-between items-center shadow-md">
                 <span className="text-xs font-bold uppercase text-gray-400">Section Total</span>
                 <span className="text-xl font-black">৳ {sectionTotal(s).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== BIC TOTAL FOOTER ===== */}
      <div className="mt-8 bg-white border border-yellow-200 rounded-lg overflow-hidden shadow-sm">
        <div className="bg-yellow-400 p-2 text-center text-xs font-black uppercase tracking-widest text-yellow-900 leading-none">
          BIC TOTAL SUMMARY
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 p-4">
          <div className="text-center p-2">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Cash</p>
            <p className="text-xl font-bold text-gray-700">৳ {bicTotals.cash.toLocaleString()}</p>
          </div>
          <div className="text-center p-2">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Card</p>
            <p className="text-xl font-bold text-gray-700">৳ {bicTotals.card.toLocaleString()}</p>
          </div>
          <div className="text-center p-2">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Bkash</p>
            <p className="text-xl font-bold text-gray-700">৳ {bicTotals.bkash.toLocaleString()}</p>
          </div>
          <div className="text-center p-2">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Nagad</p>
            <p className="text-xl font-bold text-gray-700">৳ {bicTotals.nagad.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

