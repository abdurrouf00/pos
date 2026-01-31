'use client'
import Image from 'next/image'
import { useRef, useEffect } from 'react'

export default function SalesReturnRightSection({
  productsData,
  handleAddItem,
  itemSearch,
  setItemSearch,
  selectedCategory,
  setSelectedCategory,
}) {
  const inputRef = useRef(null)
  const categories = ['all', ...new Set(productsData.map((p) => p.category))]

  // Focus on input when component mounts (for barcode scanner)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Filter by name OR code (barcode)
  const filteredProducts = productsData.filter((p) => {
    const searchTerm = itemSearch.toLowerCase().trim()
    const matchName = p.name.toLowerCase().includes(searchTerm)
    const matchCode = p.code?.toLowerCase().includes(searchTerm)
    const matchCategory =
      selectedCategory === 'all' || p.category === selectedCategory
    return (matchName || matchCode) && matchCategory
  })

  // Handle Enter key for barcode scan
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const searchTerm = itemSearch.toLowerCase().trim()
      
      // Find exact code match first
      const exactCodeMatch = productsData.find(
        (p) => p.code?.toLowerCase() === searchTerm
      )
      
      if (exactCodeMatch) {
        handleAddItem(exactCodeMatch)
        setItemSearch('')
        return
      }

      // If no exact code match, check if there's only one filtered product
      if (filteredProducts.length === 1) {
        handleAddItem(filteredProducts[0])
        setItemSearch('')
      }
    }
  }

  return (
    <div className="flex-1 border p-4 rounded bg-white h-full">
      {/* SEARCH + CATEGORY */}
      <div className="flex gap-2 mb-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by name or scan barcode..."
          value={itemSearch}
          onChange={(e) => setItemSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCTS GRID */}
      <div className="overflow-y-auto h-[600px]">
        <div className="grid grid-cols-3 gap-3">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => handleAddItem(p)}
              className="bg-green-300 p-3 rounded cursor-pointer relative h-40 hover:bg-green-400 transition-colors"
            >
              <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 rounded">
                Stock: {p.stock}
              </span>
              
              {/* Barcode/Code Badge */}
              <span className="absolute top-1 right-1 bg-blue-600 text-white text-xs px-2 rounded">
                {p.code}
              </span>

              <Image
                src={p.image}
                alt={p.name}
                width={60}
                height={60}
                className="mx-auto mb-2 mt-4"
              />

              <p className="font-semibold text-sm">{p.name}</p>
              <p className="text-sm">৳ {p.price}</p>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <p className="col-span-3 text-center text-gray-500">
              No products found
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
