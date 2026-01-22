'use client'
import { UserPlus } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'

export default function SalesReturnTopSection({
  formData,
  handleChange,
  holdSales,
  setShowHoldList,
  setOpenCustomer,
  productsData,
  handleAddItem,
  items,
  increaseQty,
  decreaseQty,
  handleItemChange,
  removeItem,
  //Summary Props
  totalQty,
  total,
  handleHoldSale,
  setopenPayment,
  setopenMulitplePayment,
  descount,
  handlePayAll,
}) {
  // search
  const [searchText, setSearchText] = useState('')
  const [showList, setShowList] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowList(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex-[2] bg-white p-4 border rounded">
      {/* ====================TOP ====================== */}
      <div className="flex justify-between items-center ">
        <div className="grid grid-cols-4 gap-3 mb-4">
          <HrSelect
            label="Customer"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            options={[
              { value: 'Customer A', label: 'Customer A' },
              { value: 'Customer B', label: 'Customer B' },
            ]}
          />

          <div className="flex items-end gap-1">
            <HrSelect
              label="Sales Man"
              name="salesperson"
              value={formData.salesperson}
              onChange={handleChange}
              options={[
                { value: 'Salesman A', label: 'Salesman A' },
                { value: 'Salesman B', label: 'Salesman B' },
              ]}
            />
            <button
              type="button"
              onClick={() => setOpenCustomer(true)}
              className="border bg-sky-50 p-2 rounded"
            >
              <UserPlus />
            </button>
          </div>

          <HrInput
            label="Sales Date"
            type="date"
            name="salesdate"
            value={formData.salesdate}
            onChange={handleChange}
          />
        </div>
        {/* ==================== hold LoanList=================== */}
        <button
          onClick={() => setShowHoldList(true)}
          className="relative bg-yellow-300 text-white px-3 py-3 w-24  rounded text-sm"
        >
          Hold List
          {holdSales.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {holdSales.length}
            </span>
          )}
        </button>
      </div>

      {/* =======================search bar======================= */}
      <div className="mb-3 relative" ref={searchRef}>
        <HrInput
          placeholder="Search item & press Enter"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
            setShowList(true)
          }}
          onFocus={() => {
            if (searchText) {
              setShowList(true)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const found = productsData.find((p) =>
                p.name.toLowerCase().includes(searchText.toLowerCase())
              )
              if (found) {
                handleAddItem(found)
                setSearchText('')
                setShowList(false)
              }
            }
          }}
        />

        {showList && searchText && (
          <div className="absolute left-0 top-full w-full bg-sky-200 border z-10 max-h-60 overflow-y-auto">
            {productsData
              .filter((p) =>
                p.name.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((p) => (
                <div
                  key={p.id}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    handleAddItem(p)
                    setSearchText('')
                    setShowList(false)
                  }}
                >
                  {p.name}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* ======================= ITEMS TABLE ======================= */}
      <div className="border rounded overflow-x-auto h-80">
        <table className="w-full border text-sm table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 w-36">Item</th>
              <th className="border p-2 ">Qty</th>
              <th className="border p-2 w-22">Tax</th>
              <th className="border p-2 ">Amount</th>
              <th className="border p-2 ">Rate</th>
              <th className="border p-2 ">Stock</th>
              <th className="border p-2 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-1">
                  <p>{item.name}</p>
                </td>

                <td className=" p-3 flex gap-2 justify-center items-center text-center border">
                  <button
                    onClick={() => decreaseQty(idx)}
                    className="border rounded-full px-1.5 bg-sky-100"
                  >
                    -
                  </button>

                  <p>{item.qty}</p>

                  <button
                    onClick={() => increaseQty(idx)}
                    className="border rounded-full px-1.5 bg-sky-100"
                  >
                    +
                  </button>
                </td>

                <td className="border p-1">
                  <HrSelect
                    value={item.tax}
                    onChange={(e) =>
                      handleItemChange(idx, 'tax', e.target.value)
                    }
                    options={[
                      { value: 0, label: '0%' },
                      { value: 5, label: '5%' },
                      { value: 10, label: '10%' },
                    ]}
                  />
                </td>

                <td className="border p-1 text-center">
                  {item.amount.toFixed(2)}
                </td>
                <td className="border p-1 text-center">
                  <p>{item.rate}</p>
                </td>

                <td className="border p-1 text-center">
                  <p>{item.stock}</p>
                </td>

                <td className="border p-1 text-center">
                  <button
                    onClick={() => removeItem(idx)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SUMMARY */}
      <div className="flex justify-around bg-gray-200 p-4 mt-4 rounded">
        <div>
          <p>Quantity</p>
          <p>{totalQty}</p>
          <Button onClick={handleHoldSale}>Hold</Button>
        </div>
        <div>
            <p>Total Amount</p>
          <p>{total.toFixed(2)}</p>
          <Button onClick={() => setopenMulitplePayment(true)}>Multiple</Button>
        </div>
        
        <div>
          <p>Total Amount</p>
          <p>{descount.toFixed(2)}</p>
          <Button onClick={() => setopenPayment(true)}>Cash</Button>
        </div>
        <div>
          <p>Grand Total</p>
          <p> {total.toFixed(2)} </p>
          <Button onClick={handlePayAll}>Pay All</Button>
        </div>
      </div>
    </div>
  )
}
