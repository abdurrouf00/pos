'use client'
import React, { useState } from 'react'
import EntryLeftSection from './leftSection'
import PriceCalculationSection from '../priceCalculate'
import toast from 'react-hot-toast'

export default function CounterSales  ()  {
  const [items, setItems] = useState([])
  const [paidAmount, setPaidAmount] = useState(0)

  // Add Item Handler
  const handleAddItem = (product, qty = 1) => {
    const existingIndex = items.findIndex((item) => item.id === product.id)
    if (existingIndex >= 0) {
      const updatedItems = [...items]
      updatedItems[existingIndex].qty += qty
      updatedItems[existingIndex].amount =
        updatedItems[existingIndex].qty * updatedItems[existingIndex].price
      setItems(updatedItems)
    } else {
      const newItem = {
        ...product,
        qty: qty,
        tax: 0,
        amount: product.price * qty,
      }
      setItems([...items, newItem])
    }
  }

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index)
    setItems(updatedItems)
  }

  const increaseQty = (index) => {
    const updatedItems = [...items]
    updatedItems[index].qty += 1
    updatedItems[index].amount = updatedItems[index].qty * updatedItems[index].price
    setItems(updatedItems)
  }

  const decreaseQty = (index) => {
    const updatedItems = [...items]
    if (updatedItems[index].qty > 1) {
      updatedItems[index].qty -= 1
      updatedItems[index].amount = updatedItems[index].qty * updatedItems[index].price
      setItems(updatedItems)
    }
  }

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.amount, 0)
  const totalTax = items.reduce((acc, item) => acc + (item.amount * (item.tax || 0)) / 100, 0)
  const total = subtotal + totalTax 
  const changeReturn = paidAmount - total > 0 ? (paidAmount - total).toFixed(2) : 0

  // Handle Pay All / Order Save
  const handlePayAll = () => {
    if (items.length === 0) {
      toast.error('Cart is empty!')
      return
    }
    // if (paidAmount < total) {
    //   toast.error('Paid amount is less than total!')
    //   return
    // }

    const saleData = {
        date: new Date().toISOString(),
        items: items,
        total: total,
        paid: paidAmount,
        change: changeReturn
    }

    console.log("Order Submitted:", saleData)
    toast.success('Order Submitted Successfully!')
    
    // Reset Form
    setItems([])
    setPaidAmount(0)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-100px)] p-2 bg-gray-50">
      {/* Left Section */}
      <EntryLeftSection 
        items={items}
        handleAddItem={handleAddItem}
        removeItem={removeItem}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
      />
      
      {/* Right Section */}
      <div className="w-full md:w-[320px] lg:w-[350px]">
         <PriceCalculationSection 
            total={total}
            subtotal={subtotal}
            paidAmount={paidAmount}
            setPaidAmount={setPaidAmount}
            changeReturn={changeReturn}
            handlePayAll={handlePayAll}
         />
      </div>
    </div>
  )
}


