const ProductTabs = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="flex gap-2 border-b overflow-x-auto">
      {tabs.map((tab, i) => (
        <button
          key={i}
          type="button"
          className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition ${
            activeTab === i ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab(i)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default ProductTabs
