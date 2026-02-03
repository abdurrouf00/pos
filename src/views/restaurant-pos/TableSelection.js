'use client';

import React from 'react';
import tableData from './table.json';
import AddTableModal from './AddTableModal';

const TableSelection = ({ onSelectTable, selectedTable, tableOrders = {}, isMainPage = false }) => {
  const [isMultiMode, setIsMultiMode] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState([]);
  const [tables, setTables] = React.useState(tableData);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAddTable = (newTable) => {
    setTables(prev => [...prev, newTable]);
  };

  const handleTableClick = (table) => {
    // Prevent selection ONLY in multi-mode if table already has a confirmed order
    if (isMultiMode && tableOrders[table.id]?.status === 'confirmed') return;

    if (isMultiMode) {
      setSelectedIds(prev => 
        prev.includes(table.id) 
          ? prev.filter(id => id !== table.id)
          : [...prev, table.id]
      );
    } else {
      onSelectTable(table);
    }
  };

  const handleProceed = () => {
    const selectedTables = tables.filter(t => selectedIds.includes(t.id));
    if (selectedTables.length > 0) {
      onSelectTable(selectedTables);
    }
  };

  return (
    <div className="w-full h-full md:h-[calc(100vh-138px)] bg-gray-50 overflow-hidden flex flex-col p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col flex-1 min-h-0">
        {/* Header with Multi-Select Toggle */}
        <div className="flex flex-row items-center justify-between gap-2 mb-6 md:mb-8 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2    ">
              <input 
                type="checkbox" 
                id="multi-mode"
                checked={isMultiMode}
                onChange={(e) => {
                  setIsMultiMode(e.target.checked);
                  setSelectedIds([]);
                }}
                className="w-4 h-4 text-[#109df9]  focus:ring-[#109df9] cursor-pointer"
              />
            </div>
            <label htmlFor="multi-mode" className="text-lg md:text-2xl font-bold text-gray-800 cursor-pointer select-none transition-colors whitespace-nowrap">
              Select Table
            </label>
          </div>
          
          <div className="sm:ml-auto">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#109df9] hover:bg-[#0e8ad9] text-white px-4 py-2 rounded-lg font-bold shadow transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Create Table
            </button>
          </div>
        </div>

        {/* Table Grid - Responsive Columns while keeping design */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 overflow-auto pb-8 custom-scrollbar flex-1 content-start">
          {(() => {
            // Pre-calculate group labels based on creation time
            const groupEntries = Object.entries(tableOrders)
              .filter(([id, order]) => id.includes('_') && order.id?.toString().split('_').length > 1 && order.status === 'confirmed' || (id.includes('_') && id.split('_').length > 1 && order.status === 'confirmed'))
              .sort((a, b) => (a[1].createdAt || 0) - (b[1].createdAt || 0));
            
            // Clean up group labels - a group ID consists of multiple table IDs joined by '_'
            // Actually, we should only consider real groups (multiple tables)
            const realGroupEntries = groupEntries.filter(([id]) => {
                const parts = id.split('_');
                // Ensure it's a group of tables (parts are all numbers/table IDs) and not a sub-table (parts[1] is 'A', 'B', etc)
                return parts.length > 1 && !isNaN(parts[1]);
            });

            const groupLabelMap = {};
            realGroupEntries.forEach(([id], index) => {
              const letter = String.fromCharCode(65 + index); // 65 is 'A'
              groupLabelMap[id] = `Group-${letter}`;
            });

            return tables.map((table) => {
              // Check for direct order or sub-table orders
              let hasOrder = tableOrders[table.id]?.status === 'confirmed';
              let activeSubTables = [];

              // Pattern match for sub-tables or group-tables
              Object.keys(tableOrders).forEach(orderId => {
                // 1. Check for sub-tables (e.g. "1_A")
                if (orderId.startsWith(`${table.id}_`) && !orderId.includes('_', orderId.indexOf('_') + 1) && isNaN(orderId.split('_')[1]) && tableOrders[orderId]?.status === 'confirmed') {
                  hasOrder = true;
                  const subTable = orderId.split('_')[1];
                  const shortName = table.name.replace(/Table\s*/i, '');
                  activeSubTables.push(`${shortName}-${subTable}`);
                }
                
                // 2. Check for group-tables (e.g. "1_2_3")
                if (orderId.includes('_') && orderId.split('_').includes(table.id.toString()) && tableOrders[orderId]?.status === 'confirmed') {
                  const parts = orderId.split('_');
                  if (!isNaN(parts[1])) { // It's a group of tables
                    hasOrder = true;
                    // Use the pre-calculated group label
                    const label = groupLabelMap[orderId];
                    if (label && !activeSubTables.includes(label)) {
                      activeSubTables.push(label);
                    }
                  }
                }
              });

            // If main table has order, add it to active list if it's not a subtable order 
            // (though main table usually doesn't have suffix if base, but just in case)
            if (tableOrders[table.id]?.status === 'confirmed') {
               // Usually for main table we might not show text unless needed, 
               // but user asked for 1-A, 1-B etc. to show up.
            }

            const isSelected = isMultiMode 
              ? selectedIds.includes(table.id)
              : selectedTable?.id === table.id;
            
            return (
              <button
                key={table.id}
                onClick={() => handleTableClick(table)}
                className={`relative bg-white border-2 rounded-xl p-3 md:p-4 transition-all duration-200 active:scale-95 flex flex-col items-center justify-center ${
                  hasOrder
                    ? isMultiMode 
                      ? 'border-red-500 bg-red-500! shadow-md cursor-not-allowed opacity-80'
                      : 'border-red-500 bg-red-500! shadow-md cursor-pointer'
                    : isSelected
                    ? 'border-[#109df9] bg-[#109df9]/5 shadow-md'
                    : 'border-gray-200 hover:border-[#109df9]/40'
                }`}
              >
                {/* Active Sub-tables Indicators (Top-Left) */}
                {activeSubTables.length > 0 && (
                   <div className="absolute top-2 left-2 grid grid-cols-2 gap-1 items-start w-auto">
                     {activeSubTables.map(sub => (
                       <span key={sub} className="bg-white/20 text-white text-[10px] font-bold px-1 py-0.5 rounded shadow-sm backdrop-blur-sm text-center truncate min-w-[24px]">
                         {sub}
                       </span>
                     ))}
                   </div>
                )}

                {/* Table Name */}
                <div className="text-center">
                  <h3 className={`text-lg md:text-xl font-bold transition-colors ${
                    hasOrder
                      ? 'text-white'
                      : isSelected
                      ? 'text-[#109df9]'
                      : 'text-gray-800'
                  }`}>
                    {table.name}
                  </h3>
                </div>

                {/* Multi-Select Checkbox Indicator - Only if NOT ordered */}
                {isMultiMode && !hasOrder && (
                  <div className="absolute top-2 left-2">
                    <input 
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="w-4 h-4 text-[#109df9] border-gray-300 rounded focus:ring-[#109df9] cursor-pointer pointer-events-none"
                    />
                  </div>
                )}


              </button>
            );
            })})()}
        </div>

        {/* Action Bar - Responsive */}
        {isMultiMode && selectedIds.length > 0 && (
          <div className="p-3 md:p-4 bg-white border border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 mb-4 rounded-xl shadow-lg">
            <div className="flex flex-col">
              <span className="text-[10px] md:text-sm font-semibold text-gray-500 uppercase tracking-wider">Selected Tables</span>
              <span className="text-sm md:text-lg font-bold text-gray-800">
                {(() => {
                  const selectedTables = tables.filter(t => selectedIds.includes(t.id));
                  if (selectedTables.length === 0) return '';
                  const names = selectedTables.map(t => t.name);
                  const firstPrefix = names[0].match(/^[a-zA-Z\s-]+/)?.[0] || "";
                  const rest = names.slice(1).map(n => n.replace(firstPrefix, "").trim());
                  return rest.length > 0 ? `${names[0]}, ${rest.join(', ')}` : names[0];
                })()}
              </span>
            </div>
            <button 
              onClick={handleProceed}
              className="bg-[#109df9] hover:bg-[#0e8ad9] text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              Proceed to POS
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        )}
      </div>

      <AddTableModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddTable}
      />
    </div>
  );
};

export default TableSelection;
