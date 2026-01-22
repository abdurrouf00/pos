'use client'
import { UserPlus } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'

export default function SalesTopSection({
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
  // New Props
  totalQty,
  total,
  handleHoldSale,
  setopenPayment
}) {
  // search
  const [searchText, setSearchText] = useState('')
  const [showList, setShowList] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const clickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowList(false)
      }
    }
    document.addEventListener('mousedown', clickOutside)
    return () => document.removeEventListener('mousedown', clickOutside)
  }, [])

  return (
    <>
      {/* ========= HEADER ========= */}
      <div className="flex justify-between items-center">
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

        <button
          onClick={() => setShowHoldList(true)}
          className="relative bg-yellow-300 text-white px-3 py-2 rounded text-sm"
        >
          Hold List
          {holdSales.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {holdSales.length}
            </span>
          )}
        </button>
      </div>

      {/* ========= SEARCH ========= */}
      <div className="mb-3 relative" ref={searchRef}>
        <HrInput
          placeholder="Search item & press Enter"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
            setShowList(true)
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
          <div className="absolute left-0 top-full w-full bg-sky-200 border z-10">
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

      {/* ========= ITEMS TABLE ========= */}
      <div className="border rounded overflow-x-auto h-[400px]">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="border p-2">Item</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Tax</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2 text-center">
                  <button onClick={() => decreaseQty(i)}>➖</button>
                  <span className="mx-2">{item.qty}</span>
                  <button onClick={() => increaseQty(i)}>➕</button>
                </td>
                <td className="border p-2">
                  <HrSelect
                    value={item.tax}
                    onChange={(e) =>
                      handleItemChange(i, 'tax', e.target.value)
                    }
                    options={[
                      { value: 0, label: '0%' },
                      { value: 5, label: '5%' },
                      { value: 10, label: '10%' },
                    ]}
                  />
                </td>
                <td className="border p-2 text-center">
                  {item.amount.toFixed(2)}
                </td>
                <td className="border p-2 text-center">{item.rate}</td>
                <td className="border p-2 text-center">{item.stock}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => removeItem(i)}
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

      {/* ========= SUMMARY (Moved from Right Section) ========= */}
      <div className="flex justify-around bg-gray-200 p-4 mt-4 rounded">
        <div>
          <p>Quantity</p>
          <p>{totalQty}</p>
          <Button onClick={handleHoldSale}>Hold</Button>
        </div>

        <div>
           <p>Total Amount</p>
           <p>{total.toFixed(2)}</p>
           <Button onClick={() => setopenPayment(true)}>Cash</Button>
        </div>

        <div>
           <p>Grand Total</p>
           <p>{total.toFixed(2)}</p>
           <Button onClick={() => setopenPayment(true)}>Pay All</Button>
        </div>
      </div>
    </>
  )
}
