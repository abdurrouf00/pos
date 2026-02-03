'use client'
import { useState } from 'react'

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
    DENOMS.reduce((t, d) => t + d * data[s].cash[d], 0)

  const nonCashTotal = (s) =>
    Object.values(data[s].banks).reduce((a, b) => a + Number(b), 0) +
    Number(data[s].card) +
    Number(data[s].bkash) +
    Number(data[s].nagad)

  const sectionTotal = (s) => cashTotal(s) + nonCashTotal(s)

  const bicTotals = {
    cash: SECTIONS.reduce((t, s) => t + cashTotal(s), 0),
    card: SECTIONS.reduce((t, s) => t + Number(data[s].card), 0),
    bkash: SECTIONS.reduce((t, s) => t + Number(data[s].bkash), 0),
    nagad: SECTIONS.reduce((t, s) => t + Number(data[s].nagad), 0),
  }

  /* ---------------- UPDATE HELPERS ---------------- */

  const update = (s, key, val) =>
    setData(prev => ({ ...prev, [s]: { ...prev[s], [key]: val } }))

  const updateCash = (s, d, val) =>
    setData(prev => ({
      ...prev,
      [s]: { ...prev[s], cash: { ...prev[s].cash, [d]: Number(val) } }
    }))

  const updateBank = (s, b, val) =>
    setData(prev => ({
      ...prev,
      [s]: { ...prev[s], banks: { ...prev[s].banks, [b]: Number(val) } }
    }))

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-semibold mb-4">Voucher Input</h1>

      {/* ===== SECTIONS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {SECTIONS.map(s => (
          <div key={s} className="bg-white border rounded">
            <div className="bg-cyan-600 text-white px-3 py-1 font-semibold">
              {s}
            </div>

            <div className="p-3 text-sm space-y-2">

              {/* CASH */}
              {DENOMS.map(d => (
                <div key={d} className="grid grid-cols-3 gap-1">
                  <div>{d} x</div>
                  <input
                    type="number"
                    className="border p-1"
                    value={data[s].cash[d]}
                    onChange={e => updateCash(s, d, e.target.value)}
                  />
                  <input
                    readOnly
                    className="border p-1 bg-gray-50"
                    value={data[s].cash[d] * d}
                  />
                </div>
              ))}

              <div className="font-semibold">
                Sub-Total of Cash: {cashTotal(s)}
              </div>

              {/* BANKS */}
              <div className="grid grid-cols-2 gap-1">
                {Object.keys(data[s].banks).map(b => (
                  <input
                    key={b}
                    type="number"
                    className="border p-1"
                    placeholder={b}
                    value={data[s].banks[b]}
                    onChange={e => updateBank(s, b, e.target.value)}
                  />
                ))}
              </div>

              {/* OTHERS */}
              <input
                className="border p-1 w-full"
                placeholder="Card Sales"
                type="number"
                value={data[s].card}
                onChange={e => update(s, 'card', e.target.value)}
              />
              <input
                className="border p-1 w-full"
                placeholder="Bkash"
                type="number"
                value={data[s].bkash}
                onChange={e => update(s, 'bkash', e.target.value)}
              />
              <input
                className="border p-1 w-full"
                placeholder="Nagad"
                type="number"
                value={data[s].nagad}
                onChange={e => update(s, 'nagad', e.target.value)}
              />

              <div className="font-semibold">
                Sub Total ({s}): {sectionTotal(s)}
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data[s].confirm}
                  onChange={e => update(s, 'confirm', e.target.checked)}
                />
                Confirm?
              </label>

              <input
                className="border p-1 w-full"
                placeholder="Username"
                value={data[s].username}
                onChange={e => update(s, 'username', e.target.value)}
              />
              <input
                className="border p-1 w-full"
                placeholder="Remarks"
                value={data[s].remarks}
                onChange={e => update(s, 'remarks', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ===== BIC TOTAL ===== */}
      <div className="mt-6 bg-yellow-400 p-3 font-semibold">
        BIC TOTAL
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white p-3 border">
        <div>Cash: {bicTotals.cash}</div>
        <div>Card: {bicTotals.card}</div>
        <div>Bkash: {bicTotals.bkash}</div>
        <div>Nagad: {bicTotals.nagad}</div>
      </div>
    </div>
  )
}
