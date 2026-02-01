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
  handleItemChange,
  removeItem,
  //Summary Props
  totalQty,
  total,
  handleHoldSale,
  setopenPayment,
  setopenMulitplePayment,
  descount,
  setOpenDiscount,
  subtotal,
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
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-4 gap-3 mb-5 ">
            <HrSelect
            label="Sales Man"
            name="salesperson"
            value={formData.salesperson}
            onChange={handleChange}
            placeholder="Select Salesman"
            options={[
              { value: 'Salesman A', label: 'Salesman A' },
              { value: 'Salesman B', label: 'Salesman B' },
            ]}
          />
        
            <HrSelect
              label="Select customer"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Select customer"
              options={[
                { value: 'customer A', label: 'customer A' },
                { value: 'customer customer', label: 'customer B' },
              ]}
            />      

          <HrInput
            label="Sales Date"
            type="date"
            name="salesdate"
            value={formData.salesdate}
            onChange={handleChange}
          />

              {/* <HrInput
             label="Total Crowd"
             name="totalCrowd"
             type="number"
             value={formData.totalCrowd || ''}
             onChange={handleChange}
             placeholder="Total Crowd"
          /> */}
          </div>
         
          
          
        </div>
        <div className=' space-y-2 text-end '>
          {/* ==================== hold LoanList=================== */}

         <button
              type="button"
              onClick={() => setOpenCustomer(true)}
              className="border bg-sky-400 p-2 rounded  px-3 py-2 "
            >
             Membership 
            </button>
        {/* ==================== hold LoanList=================== */}
        <button
          onClick={() => setShowHoldList(true)}
          className="relative bg-yellow-300 text-white px-3 py-3 ml-3 w-27 mb-2 border rounded text-sm"
        >
          Hold List
          {holdSales.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {holdSales.length}
            </span>
          )}
        </button>
        </div>
      </div>

      {/* =======================search bar======================= */}
      <div className="mb-3 relative" ref={searchRef}>
        <HrInput
          placeholder="Scan barcode or search item..."
          value={searchText}
          onChange={(e) => {
            const value = e.target.value
            setSearchText(value)
            setShowList(true)

            // Auto-add when exact code match found (for barcode scanner)
            if (value.trim()) {
              const exactCodeMatch = productsData.find(
                (p) => p.code?.toLowerCase() === value.toLowerCase().trim()
              )
              if (exactCodeMatch) {
                handleAddItem(exactCodeMatch)
                setSearchText('')
                setShowList(false)
              }
            }
          }}
          onFocus={() => {
            if (searchText) {
              setShowList(true)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              const searchTerm = searchText.toLowerCase().trim()

              // First try exact code match
              const exactCodeMatch = productsData.find(
                (p) => p.code?.toLowerCase() === searchTerm
              )

              if (exactCodeMatch) {
                handleAddItem(exactCodeMatch)
                setSearchText('')
                setShowList(false)
                return
              }

              // Then try name match - add first filtered item
              const filtered = productsData.filter(
                (p) =>
                  p.name.toLowerCase().includes(searchTerm) ||
                  p.code?.toLowerCase().includes(searchTerm)
              )
              if (filtered.length > 0) {
                handleAddItem(filtered[0])
                setSearchText('')
                setShowList(false)
              }
            }
          }}
        />

        {showList && searchText && (
          <div className="absolute left-0 top-full w-full bg-white border border-gray-300 shadow-lg z-10 max-h-60 overflow-y-auto">
            {productsData
              .filter((p) => {
                const searchTerm = searchText.toLowerCase().trim()
                return (
                  p.name.toLowerCase().includes(searchTerm) ||
                  p.code?.toLowerCase().includes(searchTerm)
                )
              })
              .map((p) => (
                <div
                  key={p.id}
                  className="p-2 cursor-pointer hover:bg-sky-100 border-b border-gray-100"
                  onClick={() => {
                    handleAddItem(p)
                    setSearchText('')
                    setShowList(false)
                  }}
                >
                  <span className="text-gray-800">
                    {p.code} --{p.name}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* ======================= ITEMS TABLE ======================= */}
      <div className="border rounded overflow-x-auto h-70">
        <table className="w-full border text-sm table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 w-36">Item</th>
              <th className="border p-2 w-36">Quantity</th>
              <th className="border p-2 w-36">Price</th>
              {/* <th className="border p-2 ">Guardian Name</th>
              <th className="border p-2 ">Kids Name</th>
              <th className="border p-2 ">Age</th>  
              <th className="border p-2 ">Mobile</th>  */}
              <th className="border p-2 ">Amount</th>          
              <th className="border p-2 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.rowId || idx}>
                <td className="border p-1">
                  <p className="font-medium text-xs text-gray-700">{item.name}</p>
                </td>

                {/* <td className="border p-1">
                   <input
                    type="text"
                    value={item.guardianName}
                    onChange={(e) => handleItemChange(idx, 'guardianName', e.target.value)}
                    className="w-full border rounded p-1 text-xs focus:outline-sky-400"
                    placeholder="Guardian"
                  />
                </td>

                <td className="border p-1">
                  <input
                    type="text"
                    value={item.kidsName}
                    onChange={(e) => handleItemChange(idx, 'kidsName', e.target.value)}
                    className="w-full border rounded p-1 text-xs focus:outline-sky-400"
                    placeholder="Kid Name"
                  />
                </td>

                <td className="border p-1">
                  <input
                    type="number"
                    value={item.age}
                    onChange={(e) => handleItemChange(idx, 'age', e.target.value)}
                    className="w-full border rounded p-1 text-xs focus:outline-sky-400"
                    placeholder="Age"
                  />
                </td>

                <td className="border p-1 text-center">
                  <input
                    type="text"
                    value={item.mobile}
                    onChange={(e) => handleItemChange(idx, 'mobile', e.target.value)}
                    className="w-full border rounded p-2 text-xs focus:outline-sky-400"
                    placeholder="Mobile"
                  />
                </td> */}

                

                <td className="border p-1">
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleItemChange(idx, 'qty', e.target.value)}
                    className="w-full border rounded p-1 text-xs focus:outline-sky-400"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
                    className="w-full border rounded p-1 text-xs focus:outline-sky-400"
                  />
                </td>

                <td className="border p-1 text-right">
                  <p className="font-medium text-xs text-gray-700">
                    {Number(item.amount || 0).toFixed(2)}
                  </p>
                </td>

                <td className="border p-1 text-center">
                  <button
                    onClick={() => removeItem(idx)}
                    className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
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
      <div className="flex flex-col justify-around border-2 p-4 mt-4 rounded">
      <div className="flex justify-around  p-4 rounded">
        <div>
          <p className='border-2 p-2 rounded broder-black '>Quantity: {totalQty}</p>  
        </div>
        <div className="cursor-pointer border-2 p-1 rounded transition-colors" onClick={() => setOpenDiscount(true)}>
          <p>Edit Discount: {descount.toFixed(2)}</p>         
        </div>
        <div>
          <p className='border-2 p-2 rounded  '>Subtotal: {subtotal.toFixed(2)}</p>         
        </div>

        <div>
          <p className='border-2 p-2 rounded  '>Grand Total: {total.toFixed(2)} </p>
          </div>
      </div>




      <div  className="flex  justify-around   rounded">


        <div>
          {/* <p>Quantity</p>
          <p>{totalQty}</p> */}
          <Button onClick={handleHoldSale}>Hold</Button>
        </div>
        <div>
          {/* <p>Total Amount</p>
          <p>{total.toFixed(2)}</p> */}
          <Button onClick={() => setopenMulitplePayment(true)}>Multiple</Button>
        </div>

        <div>
          {/* <p>Discount</p>
          <p>{descount.toFixed(2)}</p> */}
          <Button onClick={() => setopenPayment(true)}>Cash</Button>
        </div>
        <div>
          {/* <p>Grand Total</p>
          <p> {total.toFixed(2)} </p> */}
          <Button onClick={handlePayAll}>Pay All</Button>
        </div>
              </div>
      </div>
    </div>
  )
}
