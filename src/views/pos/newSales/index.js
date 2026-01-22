'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const productsData = [
  { id: 1, name: 'POTATO', price: 120, stock: 111 },
  { id: 2, name: 'EGG1', price: 110, stock: 41 },
  { id: 3, name: 'SYMPHONY', price: 300, stock: 8 },
  { id: 4, name: 'FRESH WATER', price: 120, stock: 9 },
  { id: 5, name: 'POTATO', price: 120, stock: 111 },
  { id: 6, name: 'EGG1', price: 110, stock: 41 },
  { id: 7, name: 'SYMPHONY', price: 300, stock: 8 },
  { id: 8, name: 'FRESH WATER', price: 120, stock: 9 },
  { id: 9, name: 'POTATO', price: 120, stock: 111 },
  { id: 10, name: 'EGG1', price: 110, stock: 41 },
  { id: 11, name: 'SYMPHONY', price: 300, stock: 8 },
  { id: 12, name: 'FRESH WATER', price: 120, stock: 9 },
]

export default function SalesInvoice() {
  const [cartItems, setCartItems] = useState([])

  // add item from right side
  const handleAddItem = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((i) => i.id === product.id)

      if (exist) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }

      return [
        ...prev,
        {
          ...product,
          qty: 1,
          discount: 0,
          tax: 0,
        },
      ]
    })
  }

  const updateQty = (id, type) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: type === 'inc' ? item.qty + 1 : Math.max(1, item.qty - 1),
            }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems((items) => items.filter((i) => i.id !== id))
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  )

  const totalQty = cartItems.reduce((q, i) => q + i.qty, 0)

  return (
    <div>
      {/* top bar hold customer select, and items list  */}
      <Button> Hold</Button>
      <div style={{ display: 'flex', gap: 16, padding: 16 }}>
        {/* LEFT SIDE */}
        <div style={{ flex: 2, border: '1px solid #ccc', padding: 12 }}>
          <h3>🧾 Sales Invoice</h3>

          <table width="100%" border="1" cellPadding="6">
            <thead style={{ background: '#2f75b5', color: '#fff' }}>
              <tr>
                <th>Item</th>
                <th>Stock</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>X</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.stock}</td>
                  <td>
                    <button onClick={() => updateQty(item.id, 'dec')}>−</button>
                    <span style={{ margin: '0 8px' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 'inc')}>+</button>
                  </td>
                  <td>{item.price}</td>
                  <td>{item.qty * item.price}</td>
                  <td>
                    <button onClick={() => removeItem(item.id)}>🗑</button>
                  </td>
                </tr>
              ))}

              {cartItems.length === 0 && (
                <tr>
                  <td colSpan="6" align="center">
                    No item added
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ marginTop: 16, fontWeight: 'bold' }}>
            Quantity: {totalQty} <br />
            Total Amount: ৳ {totalAmount}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: 12 }}>
          <h3>🛒 Items</h3>

          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
          >
            {productsData.map((p) => (
              <div
                key={p.id}
                onClick={() => handleAddItem(p)}
                style={{
                  background: '#9fdc6f',
                  padding: 10,
                  cursor: 'pointer',
                  borderRadius: 6,
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 4,
                    left: 4,
                    background: 'red',
                    color: '#fff',
                    fontSize: 12,
                    padding: '2px 6px',
                    borderRadius: 4,
                  }}
                >
                  Qty: {p.stock}
                </span>

                <div
                  style={{
                    height: 80,
                    background: '#eee',
                    marginBottom: 6,
                  }}
                />

                <strong>{p.name}</strong>
                <p>৳ {p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}



