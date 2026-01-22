'use client'
import { Button } from '@/components/ui/button'
import HrInput from '@/components/common/HrInput'

export default function SalesModals({
  openCustomer,
  setOpenCustomer,
  customerForm,
  handleCustomerChange,

  openPayment,
  setopenPayment,
  paidAmount,
  setPaidAmount,
  paymentNote,
  setPaymentNote,
  total,
  balance,
  changeReturn,
  
  // Hold List Props
  showHoldList,
  setShowHoldList,
  holdSales,
  handleResumeSale,
}) {
  return (
    <>
      {/* ========= ADD CUSTOMER ========= */}
      {openCustomer && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start z-50">
          <div className="bg-white w-[900px] rounded-b-xl">
            <div className="relative border-b">
              <h3 className="text-center font-semibold p-2 bg-amber-100">
                Add New Customer
              </h3>
              <span
                onClick={() => setOpenCustomer(false)}
                className="absolute right-3 top-2 cursor-pointer"
              >
                ✕
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 p-6">
              {Object.keys(customerForm).map((key) => (
                <HrInput
                  key={key}
                  name={key}
                  label={key}
                  value={customerForm[key]}
                  onChange={handleCustomerChange}
                />
              ))}
            </div>

            <div className="flex gap-2 p-6">
              <Button onClick={() => setOpenCustomer(false)}>Save</Button>
              <Button
                variant="outline"
                onClick={() => setOpenCustomer(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========= PAYMENT ========= */}
      {openPayment && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start z-50">
          <div className="bg-white w-xl rounded-b-xl">
            <div className="relative border-b">
              <h3 className="text-center font-semibold p-2 bg-amber-100">
                Payment
              </h3>
              <span
                onClick={() => setopenPayment(false)}
                className="absolute right-3 top-2 cursor-pointer"
              >
                ✕
              </span>
            </div>

            <div className="flex justify-around p-6">
              <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded">
                <HrInput
                  label="Paid Amount"
                  type="number"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(+e.target.value)}
                />

                <HrInput
                  label="Note"
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="p-2 bg-blue-500">Total: {total}</p>
                <p className="bg-amber-600 p-2">Payable: {balance}</p>
                <p className="bg-orange-300 p-2">Change: {changeReturn}</p>
              </div>
            </div>

            <div className="flex gap-2 p-6">
              <Button
                variant="outline"
                onClick={() => setopenPayment(false)}
              >
                Close
              </Button>
              <Button onClick={() => setopenPayment(false)}>Save</Button>
              <Button onClick={() => setopenPayment(false)}>
                Save & Print
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========= HOLD LIST MODAL ========= */}
      {showHoldList && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-96 rounded p-4">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold">🕒 Hold Sales</h3>
              <button
                onClick={() => setShowHoldList(false)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>

            {holdSales.length === 0 && (
              <p className="text-center text-gray-500 text-sm">
                No hold sales
              </p>
            )}

            {holdSales.map((h) => (
              <div
                key={h.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p className="text-sm font-semibold">{h.customer}</p>
                  <p className="text-xs text-gray-600">
                    Items: {h.items.length} | ৳ {h.total}
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleResumeSale(h.id)
                    setShowHoldList(false)
                  }}
                  className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                >
                  Resume
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
