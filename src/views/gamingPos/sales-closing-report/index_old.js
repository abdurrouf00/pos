'use client'
import { useState } from 'react'

const DENOMS = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]
const SECTIONS = ['ENTRY', 'FOOD', 'ELC']

const emptySection = () => ({
  cash: Object.fromEntries(DENOMS.map(d => [d, ''])),
  banks: { UCBL: '', DBBL: '', CITY: '', PUBALI: '', EBL: '' },
  card: '',
  bkash: '',
  nagad: '',
  confirm: false,
  username: '',
  remarks: '',
  softwareTotal: '',
  bicRemarks: '',
  bicFile: null
})

const DataBox = ({ label, value, onChange, placeholder = '0', type = 'number', className = '', readonly = false }) => (
  <div className={`border border-gray-400 bg-white p-1 rounded-sm flex flex-col h-12 ${className}`}>
    <span className="text-[10px] text-gray-500 font-medium leading-tight">{label}</span>
    {readonly ? (
      <div className="text-sm font-bold flex-1 flex items-center">{Number(value || 0).toLocaleString()}</div>
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-full bg-transparent focus:outline-none text-sm font-bold"
      />
    )}
  </div>
)

const SummaryTotalBox = ({ label, value }) => (
  <div className="border border-gray-500 bg-white p-1 rounded-sm flex flex-col h-14 w-full">
    <span className="text-[10px] text-gray-500 font-bold uppercase">{label}</span>
    <div className="text-right text-lg font-bold pr-2 flex-1 flex items-end justify-end">
      {Number(value || 0).toLocaleString()}
    </div>
  </div>
)

export default function VoucherInputPage() {
  const [data, setData] = useState({
    ENTRY: emptySection(),
    FOOD: emptySection(),
    ELC: emptySection(),
  })

  // Calculations
  const cashTotal = (s) => DENOMS.reduce((t, d) => t + d * (Number(data[s].cash[d]) || 0), 0)
  
  const sectionTotal = (s) => 
    cashTotal(s) + 
    Object.values(data[s].banks).reduce((a, b) => a + Number(b || 0), 0) +
    Number(data[s].card || 0) +
    Number(data[s].bkash || 0) +
    Number(data[s].nagad || 0)

  const bicTotals = {
    cash: SECTIONS.reduce((t, s) => t + cashTotal(s), 0),
    card: SECTIONS.reduce((t, s) => t + (Number(data[s].card) || 0), 0),
    bkash: SECTIONS.reduce((t, s) => t + (Number(data[s].bkash) || 0), 0),
    nagad: SECTIONS.reduce((t, s) => t + (Number(data[s].nagad) || 0), 0),
  }

  // Update helpers
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

  return (
    <div className="bg-white min-h-screen p-2 text-gray-800 space-y-4 pb-10">
      <div className="flex justify-between items-center px-1">
        <h1 className="text-sm font-bold text-gray-800">Voucher Report</h1>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      {/* ===== MAIN SECTION (Image 1) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {SECTIONS.map(s => (
          <div key={s} className="space-y-2 border border-gray-200 p-1">
            <div className="bg-sky-300  px-3 py-1.5 font-bold text-lg uppercase leading-none">
              {s}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {DENOMS.map(d => (
                <div key={d} className="contents">
                  <DataBox label={`${d} X`} value={data[s].cash[d]} onChange={e => updateCash(s, d, e.target.value)} />
                  <DataBox label="Amount" value={Number(data[s].cash[d]) * d} readonly={true} />
                </div>
              ))}
            </div>

            <DataBox label="Sub-Total of Cash" value={cashTotal(s)} readonly={true} className="w-full" />

            <div className="grid grid-cols-4 gap-2">
              {Object.keys(data[s].banks).map(b => (
                <DataBox key={b} label={b} value={data[s].banks[b]} onChange={e => updateBank(s, b, e.target.value)} />
              ))}
            </div>

            <div className="grid grid-cols-4 gap-2">
              <DataBox label="Card Sales" value={data[s].card} onChange={e => update(s, 'card', e.target.value)} />
              <DataBox label={`${s} Bkash`} value={data[s].bkash} onChange={e => update(s, 'bkash', e.target.value)} />
              <DataBox label={`${s} Nagad`} value={data[s].nagad} onChange={e => update(s, 'nagad', e.target.value)} />
              <DataBox label="Other" value={0} readonly={true} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <DataBox label={`Sub Total (${s.charAt(0)})`} value={sectionTotal(s)} readonly={true} />
              <DataBox label="Software Total" value={data[s].softwareTotal} onChange={e => update(s, 'softwareTotal', e.target.value)} />
            </div>

            <div className="grid grid-cols-12 gap-1 items-end">
              <div className="col-span-3 flex items-center gap-1 pb-2">
                <input type="checkbox" checked={data[s].confirm} onChange={e => update(s, 'confirm', e.target.checked)} className="w-4 h-4 border-gray-300 rounded" />
                <span className="text-[10px] text-gray-500 font-bold whitespace-nowrap uppercase">Confirm?</span>
              </div>
              <div className="col-span-3">
                <DataBox label="Username" value={data[s].username} onChange={e => update(s, 'username', e.target.value)} type="text" />
              </div>
              <div className="col-span-3">
                <div className="bg-[#FFCDD2] border border-gray-400 p-1 h-12 rounded-sm">
                  <span className="text-[10px] text-gray-500 font-medium">(Short)/Excess</span>
                  <div className="text-sm font-bold leading-tight">{ (sectionTotal(s) - Number(data[s].softwareTotal || 0)).toLocaleString() }</div>
                </div>
              </div>
              <div className="col-span-3">
                <DataBox label="Remarks" value={data[s].remarks} onChange={e => update(s, 'remarks', e.target.value)} type="text" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== BIC REASON SECTION (Image 2) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {SECTIONS.map(s => (
          <div key={`bic-${s}`} className="space-y-1">
            <div className="bg-[#8BC34A] text-white px-3 py-1 font-bold text-lg uppercase leading-none">
              BIC {s} Reason
            </div>
            <div className="border border-gray-300 p-1 bg-white space-y-1">
              <input type="file" onChange={(e) => update(s, 'bicFile', e.target.files[0])} 
              className="w-full border border-gray-400 "
              />
              <textarea 
                value={data[s].bicRemarks}
                onChange={(e) => update(s, 'bicRemarks', e.target.value)}
                placeholder={`${s === 'FOOD' ? 'Food' : 'BIC'} Remarks`}
                className="w-full border border-gray-400 p-1.5 text-xs text-gray-700 focus:outline-none min-h-[45px] bg-white italic"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ===== BIC TOTAL SUMMARY (Image 2 Footer) ===== */}
      <div className="space-y-1 mt-6">
        <div className="bg-[#FFC107] text-gray-900 px-3 py-1.5 font-bold text-xl uppercase leading-none">
          BIC Total
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <SummaryTotalBox label="Cash Total" value={bicTotals.cash} />
          <SummaryTotalBox label="Card Total" value={bicTotals.card} />
          <SummaryTotalBox label="Bkash Total" value={bicTotals.bkash} />
          <SummaryTotalBox label="Nagad Total" value={bicTotals.nagad} />
        </div>
      </div>
    </div>
  )
}

