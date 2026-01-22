'use client'
import Image from 'next/image'

export default function SalesReturnRightSection({
  productsData,
  handleAddItem,
  itemSearch,
  setItemSearch,
  selectedCategory,
  setSelectedCategory,
}) {
  const categories = ['all', ...new Set(productsData.map((p) => p.category))]

  const filteredProducts = productsData.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(itemSearch.toLowerCase())
    const matchCategory =
      selectedCategory === 'all' || p.category === selectedCategory
    return matchSearch && matchCategory
  })

  return (
    <div className="flex-1 border p-4 rounded bg-white h-full">
      {/* SEARCH + CATEGORY */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search product..."
          value={itemSearch}
          onChange={(e) => setItemSearch(e.target.value)}
          className="border p-2 rounded w-full"
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
              className="bg-green-300 p-3 rounded cursor-pointer relative h-40"
            >
              <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 rounded">
                Stock: {p.stock}
              </span>

              <Image
                src={p.image}
                alt={p.name}
                width={90}
                height={60}
                className="mx-auto mb-2"
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
