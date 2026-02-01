'use client'

export default function SalesVoucherPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Sales Voucher</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* FOOD CASH */}
          <div className="border rounded">
            <div className="bg-teal-600 text-white px-4 py-2 font-semibold">
              FOOD | Cash
            </div>

            <div className="p-4 space-y-2 text-sm">
              {[
                [1000, 6, 6000],
                [500, 5, 2500],
                [200, 6, 1200],
                [100, 20, 2000],
                [50, 12, 600],
                [20, 2, 40],
                [10, 2, 20],
                [5, 0, 0],
                [2, 1, 2],
                [1, 22, 22],
              ].map((item, i) => (
                <div key={i} className="grid grid-cols-3 gap-2">
                  <input
                    className="border p-1 rounded"
                    value={`${item[0]} x`}
                    readOnly
                  />
                  <input
                    className="border p-1 rounded"
                    value={item[1]}
                    readOnly
                  />
                  <input
                    className="border p-1 rounded bg-gray-50"
                    value={item[2]}
                    readOnly
                  />
                </div>
              ))}

              <div className="text-right font-semibold pt-2">
                Sub-Total of Cash : <span className="ml-2">12384</span>
              </div>
            </div>
          </div>

          {/* FOOD NON CASH */}
          <div className="border rounded">
            <div className="bg-orange-500 text-white px-4 py-2 font-semibold">
              FOOD | Non-Cash
            </div>

            <div className="p-4 space-y-3 text-sm">
              {['UCBL', 'DBBL', 'CITY', 'PUBALI'].map((bank, i) => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <input
                    className="border p-1 rounded"
                    value={bank}
                    readOnly
                  />
                  <button className="border rounded px-2 py-1 text-left bg-gray-50">
                    {bank} File
                  </button>
                </div>
              ))}

              <div className="grid grid-cols-2 gap-2">
                <input className="border p-1 rounded" value="EBL" readOnly />
                <input className="border p-1 rounded" value="200" readOnly />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input className="border p-1 rounded" value="Card Sales" readOnly />
                <input className="border p-1 rounded" value="200" readOnly />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input className="border p-1 rounded" value="Food Bkash" readOnly />
                <input className="border p-1 rounded" value="399" readOnly />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input className="border p-1 rounded" value="Food Nagad" readOnly />
                <input className="border p-1 rounded" />
              </div>

              <div className="font-semibold">
                Sub Total (B): <span className="ml-2">12983</span>
              </div>

              <label className="flex items-center gap-2">
                <input type="checkbox" checked readOnly />
                Confirm Settlement?
              </label>

              <input
                className="border p-2 rounded w-full"
                value="rabi + jhumur"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="flex justify-between mt-6">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Close
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  )
}
