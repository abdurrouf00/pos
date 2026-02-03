'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import OrderItem from './OrderItem';
import waitersData from './waiters.json';
import AddCustomerModal from './AddCustomerModal';
import AddWaiterModal from './AddWaiterModal';

const OrderSummary = ({ cartItems, updateQty, removeFromCart, totals, selectedTable, selectedWaiter, onWaiterChange, onSubTableSelect }) => {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isWaiterModalOpen, setIsWaiterModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('Walking Customer');
  const [isSubTableOpen, setIsSubTableOpen] = useState(false);
  const subTableRef = useRef(null);
  
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subTableRef.current && !subTableRef.current.contains(event.target)) {
        setIsSubTableOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Use state to manage waiters so we can add new ones dynamically
  const [waiters, setWaiters] = useState(waitersData);

  const handleAddWaiter = (newWaiter) => {
    setWaiters(prev => [...prev, newWaiter]);
  };

  const handleAddCustomer = (customer) => {
    setCustomerName(customer.name);
  };
  return (
    <div className="w-full h-full bg-white flex flex-col min-h-0 overflow-hidden">
      {/* Header Section */}
      <div className="p-2 md:p-3 border-b border-gray-100 bg-gray-50/50 flex flex-col gap-2">
        {/* Row 1: Customer and Waiter */}
        <div className="flex flex-row items-center gap-2 w-full">
          {/* Walking Customer */}
          <div className="flex flex-col gap-0.5 flex-[1.2] min-w-0">
            <label className="text-[9px] font-bold text-gray-500 uppercase px-1">Customer</label>
            <div className="flex items-center gap-1 w-full">
              <div className="relative flex-1 group min-w-0">
                <div className="absolute inset-y-0 left-0 hidden sm:flex items-center pl-2 pointer-events-none text-gray-500 group-focus-within:text-[#109df9] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Customer"
                  className="bg-white border border-gray-200 text-gray-900 text-[10px] sm:text-xs rounded-lg focus:ring-4 focus:ring-[#109df9]/10 focus:border-[#109df9] block w-full pl-2 sm:pl-6 p-1.5 outline-none transition-all placeholder:text-gray-400 shadow-sm font-medium h-[32px]"
                />
              </div>

              {/* Add Customer Button */}
              <button 
                onClick={() => setIsCustomerModalOpen(true)}
                className="bg-[#109df9] hover:bg-[#0e8ad9] text-white h-[32px] w-[32px] flex items-center justify-center rounded-lg transition-all shadow-sm active:scale-95 flex-shrink-0" 
                title="Add Customer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="17" y1="11" x2="23" y2="11"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Steward/Waiter */}
          <div className="flex flex-col gap-0.5 flex-[0.9] min-w-0">
            <label className="text-[9px] font-bold text-gray-500 uppercase px-1">Waiter</label>
            <div className="flex items-center gap-1 w-full">
              <div className="relative flex-1">
                <select 
                  value={selectedWaiter}
                  onChange={(e) => onWaiterChange(e.target.value)}
                  className="bg-white border border-gray-200 text-gray-800 text-[10px] sm:text-xs rounded-lg focus:ring-2 focus:ring-[#109df9]/10 focus:border-[#109df9] block w-full pl-1.5 pr-6 p-1.5 outline-none transition-all shadow-sm font-medium h-[32px] appearance-none cursor-pointer"
                >
                  {waiters.map((waiter) => (
                    <option key={waiter.id} value={waiter.id}>{waiter.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
                  <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <button 
                onClick={() => setIsWaiterModalOpen(true)}
                className="bg-[#109df9] hover:bg-[#0e8ad9] text-white h-[32px] w-[32px] flex items-center justify-center rounded-lg transition-all shadow-sm active:scale-95 flex-shrink-0"
                title="Add Waiter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Table No with Sub-Table Selector */}
          <div className="flex flex-col gap-0.5 flex-[0.8] min-w-0 relative" ref={subTableRef}>
            <label className="text-[9px] font-bold text-gray-500 uppercase px-1">Table</label>
            {selectedTable?.isGroup ? (
              <div 
                title={selectedTable ? selectedTable.name : ''}
                className={`bg-white border rounded-lg px-2 text-[11px] sm:text-sm font-bold transition-all shadow-sm h-[32px] flex items-center justify-center w-full ${
                  selectedTable 
                    ? 'border-[#109df9] text-[#109df9]' 
                    : 'border-gray-200 text-gray-400'
                }`}
              >
                <span className="truncate">
                  {selectedTable ? selectedTable.name.replace(/Table\s*/i, '') : 'None'}
                </span>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setIsSubTableOpen(!isSubTableOpen);
                }}
                title={selectedTable ? selectedTable.name : ''}
                className={`bg-white border rounded-lg px-2 text-[11px] sm:text-sm font-bold transition-all shadow-sm h-[32px] flex items-center justify-between w-full ${
                  selectedTable 
                    ? 'border-[#109df9] text-[#109df9]' 
                    : 'border-gray-200 text-gray-400'
                } ${isSubTableOpen ? 'ring-2 ring-[#109df9]/10' : ''}`}
              >
                <span className="truncate">
                  {selectedTable ? selectedTable.name.replace(/Table\s*/i, '') : 'None'}
                </span>
                <svg className={`w-3 h-3 flex-shrink-0 transition-transform ${isSubTableOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            
            {/* Dropdown Menu */}
            {isSubTableOpen && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="py-1">
                  {[null, 'A', 'B', 'C'].map((sub) => {
                     // Get the basic table number (e.g., "1" from "Table 1" or "1-A")
                     const rawName = selectedTable?.originalName || selectedTable?.name || '';
                     const tableNum = rawName.split('-')[0].replace(/Table\s*/i, '').trim();
                     
                     const label = sub ? `Table ${tableNum}-${sub}` : `Table ${tableNum}`;
                     const isSelected = sub ? selectedTable?.subTable === sub : !selectedTable?.subTable;

                    return (
                      <button
                        key={sub || 'main'}
                        onClick={() => {
                          onSubTableSelect?.(sub);
                          setIsSubTableOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-[10px] sm:text-xs hover:bg-[#109df9]/10 hover:text-[#109df9] transition-colors flex items-center justify-between group ${
                          isSelected ? 'bg-[#109df9]/5 text-[#109df9] font-bold' : 'text-gray-700 font-medium'
                        }`}
                      >
                        <span>{label}</span>
                        {isSelected && (
                          <svg className="w-3 h-3 text-[#109df9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Table Display - Full width on all screens */}
      <div className="flex-1 overflow-auto bg-white custom-scrollbar w-full">
        <div className="w-full">
          <table className="w-full text-left border-collapse border-spacing-0 table-fixed">
            <thead className="sticky top-0 z-20 bg-gray-100">
              <tr>
                <th className="px-2 md:px-3 py-2 text-[9px] md:text-[10px] font-bold text-gray-800 uppercase tracking-wider text-left border-b border-r border-gray-300 w-[38%] md:w-[40%]">Item</th>
                <th className="px-1 md:px-2 py-2 text-[9px] md:text-[10px] font-bold text-gray-800 uppercase tracking-wider text-center border-b border-r border-gray-300 w-[28%] md:w-[22%]">Qty</th>
                <th className="px-1 md:px-2 py-2 text-[9px] md:text-[10px] font-bold text-gray-800 uppercase tracking-wider text-center border-b border-r border-gray-300 w-[14%] md:w-[11%]">Price</th>
                <th className="px-1 md:px-2 py-2 text-[9px] md:text-[10px] font-bold text-gray-800 uppercase tracking-wider text-right border-b border-r border-gray-300 w-[15%]">Total</th>
                <th className="px-1 md:px-2 py-2 text-[9px] md:text-[10px] font-bold text-gray-800 uppercase tracking-wider text-center border-b border-gray-300 w-[8%]">X</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <OrderItem 
                    key={item.Code} 
                    item={item} 
                    updateQty={updateQty} 
                    removeFromCart={removeFromCart} 
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 md:py-20 text-center text-gray-400 italic text-xs md:text-sm">
                    No items added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculation Footer - Responsive spacing */}
      <div className="border-t border-gray-200 bg-gray-50/80 p-2 md:p-4 space-y-1 md:space-y-2">
        {/* Sub Total */}
        <div className="flex justify-between items-center px-1">
          <span className="text-xs md:text-sm font-semibold text-gray-600">Sub Total</span>
          <span className="text-xs md:text-sm font-bold text-gray-800">
            {totals.subTotal.toFixed(2)}
          </span>
        </div>

        {/* VAT Total */}
        <div className="flex justify-between items-center group cursor-pointer hover:bg-white/50 px-1 rounded-md transition-all">
          <span className="text-xs md:text-sm font-semibold text-gray-600">VAT Total</span>
          <span className="text-xs md:text-sm font-bold text-gray-800">
            {totals.totalVat.toFixed(2)}
          </span>
        </div>

        {/* Service Charge */}
        <div className="flex justify-between items-center group cursor-pointer hover:bg-white/50 px-1 rounded-md transition-all">
          <span className="text-xs md:text-sm font-semibold text-gray-600">Service</span>
          <span className="text-xs md:text-sm font-bold text-gray-800">
            {totals.totalService.toFixed(2)}
          </span>
        </div>

        {/* Invoice Discount */}
        <div className="flex justify-between items-center group cursor-pointer hover:bg-white/50 px-1 rounded-md transition-all">
          <span className="text-xs md:text-sm font-semibold text-gray-600">Discount</span>
          <span className="text-xs md:text-sm font-bold text-gray-800">
            {totals.totalDiscount.toFixed(2)}
          </span>
        </div>
      </div>
      
      {/* Add Customer Modal */}
      <AddCustomerModal 
        isOpen={isCustomerModalOpen} 
        onClose={() => setIsCustomerModalOpen(false)} 
        onAdd={handleAddCustomer}
      />

      {/* Add Waiter Modal */}
      <AddWaiterModal 
        isOpen={isWaiterModalOpen} 
        onClose={() => setIsWaiterModalOpen(false)}
        onAdd={handleAddWaiter}
      />
    </div>
  );
};

export default OrderSummary;
