const EmployeeTabs = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="flex gap-2 border-b space-x-2 overflow-x-auto">
      {tabs.map((tab, i) => (
        <button
          key={i}
          className={`px-4 py-2 text-sm font-medium border-b-2  ${
            activeTab === i ? 'border-blue-600 text-blue-600' : 'border-transparent'
          } cursor-pointer`}
          onClick={() => setActiveTab(i)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default EmployeeTabs
