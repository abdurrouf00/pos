'use client'
import { useState, useEffect } from 'react'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'

export default function SalesReturnModals({
  openCustomer,
  setOpenCustomer,
  customerForm,
  handleCustomerChange,
  // payment 
  openPayment,
  setopenPayment,
  paidAmount,
  setPaidAmount,
  paymentNote,
  setPaymentNote,
  total,
  balance,
  changeReturn,
  // mulip
  openMulitplePayment,
  setopenMulitplePayment,
  // Hold List Props
  showHoldList,
  setShowHoldList,
  holdSales,
  handleResumeSale,
  // Multiple Payment Props
  payments,
  addPaymentRow,
  removePaymentRow,
  updatePayment,
  totalPaid,
  // Save Handlers
  handleSinglePaymentSave,
  handleMultiplePaymentSave,
  // Discount Props
  openDiscount,
  setOpenDiscount,
  discountType,
  setDiscountType,
  discountValue,
  setDiscountValue,
  setDescount,
  subtotal,
}) {
  const [localType, setLocalType] = useState(discountType)
  const [localValue, setLocalValue] = useState(discountValue)

  // Sync with current applied settings whenever modal opens
  useEffect(() => {
    if (openDiscount) {
      setLocalType(discountType)
      setLocalValue(discountValue)
    }
  }, [openDiscount, discountType, discountValue])

  return (
    <>
      {/* ================= POPUP for Discount ================= */}
      {openDiscount && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-96 rounded-xl shadow-2xl">
            <div className="relative flex items-center border-b p-4 bg-sky-50 rounded-t-xl">
              <h3 className="w-full text-center font-bold text-lg text-sky-900 uppercase">
                Apply Discount
              </h3>
              <span
                onClick={() => setOpenDiscount(false)}
                className="absolute right-4 cursor-pointer hover:bg-gray-200 rounded-full px-2 py-1 transition-colors"
              >
                ✕
              </span>
            </div>

            <div className="p-6 space-y-4">
              <HrSelect
                label="Discount Type"
                value={localType}
                onChange={(e) => setLocalType(e.target.value)}
                options={[
                  { value: 'fixed', label: 'Fixed Amount (৳)' },
                  { value: 'percent', label: 'Percentage (%)' },
                ]}
              />

              <HrInput
                label={localType === 'fixed' ? 'Discount Amount' : 'Discount Percentage'}
                type="number"
                value={localValue}
                onChange={(e) => setLocalValue(Number(e.target.value))}
                placeholder="Enter value"
              />

              <div className="bg-gray-100 p-3 rounded text-sm ">               
                <p className="flex justify-between text-blue-600 font-bold  pt-2">
                  <span>Calculated Discount:</span>
                  <span>
                    ৳{' '}
                    {(localType === 'fixed' 
                      ? localValue 
                      : (subtotal * localValue) / 100).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 border-t bg-gray-50 rounded-b-xl justify-end">
              <Button variant="outline" onClick={() => setOpenDiscount(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setDiscountType(localType);
                  setDiscountValue(localValue);
                  setOpenDiscount(false);
                }}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                Apply Discount
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* ================= POPUP 1 for Add New Customer ================= */}
      {openCustomer && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start z-50">
          <div className="bg-white w-[900px] rounded-b-xl ">
            <div className="relative flex items-center border-b">
              <h3 className="w-full text-center font-semibold p-2 bg-amber-100">
                Add New Customer
              </h3>
              <span
                onClick={() => setOpenCustomer(false)}
                className="absolute right-3 cursor-pointer hover:bg-red-500 rounded-full p-1 px-3 hover:text-white"
              >
                X
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 p-6">
              <HrInput
                name="name"
                label="Name"
                value={customerForm.name}
                onChange={handleCustomerChange}
              />

              <HrInput
                name="mobile"
                label="Mobile"
                value={customerForm.mobile}
                onChange={handleCustomerChange}
              />

              <HrInput
                name="email"
                label="Email"
                value={customerForm.email}
                onChange={handleCustomerChange}
              />

              <HrInput
                name="city"
                label="City"
                value={customerForm.city}
                onChange={handleCustomerChange}
              />

              <HrInput
                name="state"
                label="State"
                value={customerForm.state}
                onChange={handleCustomerChange}
              />

              <HrInput
                name="zip"
                label="Zip"
                value={customerForm.zip}
                onChange={handleCustomerChange}
              />

              <HrInput
                name="address"
                label="Address"
                value={customerForm.address}
                onChange={handleCustomerChange}
              />
            </div>

            <div className="flex gap-2 mt-4 p-6">
              <Button onClick={() => setOpenCustomer(false)}>Save</Button>
              <Button variant="outline" onClick={() => setOpenCustomer(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= POPUP 2 for payment form ================= */}
      {openPayment && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start z-50">
          <div className="bg-white w-4xl rounded-b-xl ">
            <div className="relative flex items-center border-b">
              <h3 className="w-full text-center font-semibold p-2 bg-amber-100">
                Payment
              </h3>
              <span
                onClick={() => setopenPayment(false)}
                className="absolute right-3 cursor-pointer hover:bg-red-500 rounded-full p-1 px-3 hover:text-white"
              >
                X
              </span>
            </div>

            <div className="flex justify-around p-6">
              <div className="flex flex-col gap-4 h-60 bg-gray-100 p-4 rounded">
                <HrInput
                  label="Paid Amount"
                  type="number"
                  value={paidAmount}
                  className="bg-white"
                  onChange={(e) => setPaidAmount(+e.target.value)}
                />

                <HrInput
                  label="Note"
                  value={paymentNote}
                  className="bg-white"
                  onChange={(e) => setPaymentNote(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="p-2 bg-blue-500">Total Items: {''} </p>
                <p className="p-2 bg-blue-500"> Total: {total.toFixed(2)}</p>
                <p className="p-2 bg-blue-500">Descount: {''} </p>
                <p className="p-2 bg-blue-500">Balance</p>
                <p className="bg-amber-600 p-2"> Total Payable: {balance}</p>
                <p className="bg-orange-300 p-2">Change : {changeReturn}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4 p-6 justify-end ">
              <Button variant="outline" onClick={() => setopenPayment(false)}>
                Close
              </Button>

              <Button onClick={() => handleSinglePaymentSave(false)}>Save</Button>

              <Button onClick={() => handleSinglePaymentSave(true)}>
                Save & Print
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= HOLD LIST MODAL ================= */}

      {/* ================= MULTIPLE PAYMENT MODAL ================= */}
      {openMulitplePayment && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start z-50">
          <div className="bg-white w-4xl rounded-b-xl">
            {/* HEADER */}
            <div className="relative flex items-center border-b">
              <h3 className="w-full text-center font-semibold p-2 bg-amber-100">
                Multiple Payment
              </h3>
              <span
                onClick={() => setopenMulitplePayment(false)}
                className="absolute right-3 cursor-pointer hover:bg-red-500 rounded-full p-1 px-3 hover:text-white"
              >
                X
              </span>
            </div>

            <div className="flex justify-between p-6 gap-6">
              {/* LEFT SIDE: Payment Rows */}
              <div className="flex-1 bg-gray-50 p-4 rounded h-60 overflow-y-auto">
                <div className="space-y-3">
                  {payments.map((pay, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-12 gap-2 items-end border-b pb-2 last:border-0"
                    >
                      {/* METHOD */}
                      <div className="col-span-3">
                        <label className="text-xs font-medium text-gray-700 block mb-1">
                          Method
                        </label>
                        <select
                          value={pay.method}
                          onChange={(e) =>
                            updatePayment(idx, 'method', e.target.value)
                          }
                          className="border p-2 rounded w-full text-sm bg-white"
                        >
                          <option value="cash">Cash</option>
                          <option value="bkash">bKash</option>
                          <option value="nagad">Nagad</option>
                          <option value="bank">Bank</option>
                        </select>
                      </div>

                      {/* AMOUNT */}
                      <div className="col-span-3">
                        <HrInput
                          type="number"
                          label="Amount"
                          value={pay.amount}
                          className="bg-white"
                          onChange={(e) =>
                            updatePayment(idx, 'amount', e.target.value)
                          }
                        />
                      </div>

                      {/* NOTE */}
                      <div className="col-span-5">
                        <HrInput
                          label="Note"
                          value={pay.note}
                          className="bg-white"
                          onChange={(e) =>
                            updatePayment(idx, 'note', e.target.value)
                          }
                        />
                      </div>

                      {/* REMOVE */}
                      <div className="col-span-1 flex justify-center">
                        {payments.length > 1 && (
                          <button
                            onClick={() => removePaymentRow(idx)}
                            className="text-red-500 hover:bg-red-50 p-1 rounded"
                          >
                            ❌
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                    <Button onClick={addPaymentRow} variant="outline" className="w-full border-dashed">
                    ➕ Add Payment Method
                    </Button>
                </div>
              </div>

              {/* RIGHT SIDE: Summary */}
              <div className="w-64 flex flex-col gap-2">
                <div className="bg-blue-500 text-white p-2 rounded flex justify-between">
                    <span>Total:</span>
                    <span>{total.toFixed(2)}</span>
                </div>
                
                <div className="bg-green-600 text-white p-2 rounded flex justify-between">
                    <span>Paid:</span>
                    <span>{totalPaid.toFixed(2)}</span>
                </div>

                <div className="bg-amber-600 text-white p-2 rounded flex justify-between">
                    <span>Balance:</span>
                    <span>{(totalPaid < total ? total - totalPaid : 0).toFixed(2)}</span>
                </div>

                <div className="bg-orange-400 text-white p-2 rounded flex justify-between">
                    <span>Change:</span>
                    <span>{(totalPaid > total ? totalPaid - total : 0).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex gap-2 p-6 justify-end border-t">
              <Button variant="outline" onClick={() => setopenMulitplePayment(false)}>
                Close
              </Button>
              <Button onClick={() => handleMultiplePaymentSave(false)}>Save</Button>
              <Button onClick={() => handleMultiplePaymentSave(true)}>Save & Print</Button>
            </div>
          </div>
        </div>
      )}



      {/* ================= HOLD LIST MODAL ================= */}
      {showHoldList && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-96 rounded p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">🕒 Hold Sales</h3>
              <button
                onClick={() => setShowHoldList(false)}
                className="text-red-500 text-sm"
              >
                ✕ Close
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
                    Items: {h.items.length} | ৳ {h.total.toFixed(2)}
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
