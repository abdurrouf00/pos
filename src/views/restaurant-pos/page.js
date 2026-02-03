'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import menuData from './menu.json';
import AddItemModal from './AddItemModal';
import OrderSummary from './OrderSummary';
import TableSelection from './TableSelection';
import waitersData from './waiters.json';
import categoriesData from './categories.json';
import AddCategoryModal from './AddCategoryModal';
import PaymentModal from './PaymentModal';

const RestaurantPOS = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Appetizer');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showPOS, setShowPOS] = useState(false);
  const [selectedWaiter, setSelectedWaiter] = useState(waitersData[0]?.id || '');
  
  // Store orders for each table - { tableId: { items: [], status: 'pending'/'confirmed' } }
  const [tableOrders, setTableOrders] = useState({});
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [dynamicCategories, setDynamicCategories] = useState([]);

  // Combine initial categories with dynamic ones
  // We prefer using the names for the UI selection state
  const categories = [...new Set([...categoriesData.map(cat => cat.name), ...dynamicCategories])];

  const handleAddCategory = (newCat) => {
    if (!dynamicCategories.includes(newCat)) {
      setDynamicCategories(prev => [...prev, newCat]);
      setSelectedCategory(newCat);
    }
  };

  // Filter items based on category and search query
  const filteredItems = menuData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category_name === selectedCategory;
    const matchesSearch = item.Item.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get current table's cart items
  const cartItems = selectedTable && tableOrders[selectedTable.id] 
    ? tableOrders[selectedTable.id].items 
    : [];

  // Cart Functions
  const addToCart = (item) => {
    if (!selectedTable) return;

    setTableOrders(prev => {
      const currentOrder = prev[selectedTable.id] || { 
        items: [], 
        status: 'pending',
        createdAt: Date.now() 
      };
      const existingItem = currentOrder.items.find(i => i.Code === item.Code);
      
      let updatedItems;
      if (existingItem) {
        updatedItems = currentOrder.items.map(i => 
          i.Code === item.Code ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        updatedItems = [...currentOrder.items, { 
          Code: item.Code, 
          Item: item.Item, 
          Price: parseFloat(item["Sales Rate"]) || 0, 
          VatRate: parseFloat(item["Vat Rate"]) || 0,
          DiscountRate: parseFloat(item["Discount Rate"]) || 0,
          ServiceRate: parseFloat(item["Service Charge Rate"]) || 0,
          qty: 1 
        }];
      }

      return {
        ...prev,
        [selectedTable.id]: {
          ...currentOrder,
          items: updatedItems
        }
      };
    });
  };

  // Modified updateQty to handle direct input and increments, min 1
  const updateQty = (code, changeOrValue, isDirectInput = false) => {
    if (!selectedTable) return;

    setTableOrders(prev => {
      const currentOrder = prev[selectedTable.id];
      if (!currentOrder) return prev;

      const updatedItems = currentOrder.items.map(item => {
        if (item.Code === code) {
          let newQty;
          if (isDirectInput) {
            newQty = parseFloat(changeOrValue);
            if (isNaN(newQty)) newQty = 1; 
          } else {
             newQty = item.qty + changeOrValue;
          }
          // Enforce minimum of 1 as requested
          return { ...item, qty: Math.max(1, newQty) };
        }
        return item;
      });

      return {
        ...prev,
        [selectedTable.id]: {
          ...currentOrder,
          items: updatedItems
        }
      };
    });
  };

  const removeFromCart = (code) => {
    if (!selectedTable) return;

    setTableOrders(prev => {
      const currentOrder = prev[selectedTable.id];
      if (!currentOrder) return prev;

      return {
        ...prev,
        [selectedTable.id]: {
          ...currentOrder,
          items: currentOrder.items.filter(item => item.Code !== code)
        }
      };
    });
  };

  // Calculation Helper
  const calculateTotals = () => {
    return cartItems.reduce((acc, item) => {
      const price = item.Price || 0;
      const qty = item.qty || 0;
      const vatRate = item.VatRate || 0;
      const discountRate = item.DiscountRate || 0;
      const serviceRate = item.ServiceRate || 0;

      const itemTotal = price * qty;
      const itemVat = itemTotal * (vatRate / 100);
      const itemDiscount = itemTotal * (discountRate / 100);
      const itemService = itemTotal * (serviceRate / 100);

      return {
        subTotal: acc.subTotal + itemTotal,
        totalVat: acc.totalVat + itemVat,
        totalDiscount: acc.totalDiscount + itemDiscount,
        totalService: acc.totalService + itemService,
      };
    }, { subTotal: 0, totalVat: 0, totalDiscount: 0, totalService: 0 });
  };

  const totals = calculateTotals();
  const totalPayable = totals.subTotal + totals.totalVat + totals.totalService - totals.totalDiscount;

  // Table selection handlers
  const handleTableSelect = (tableOrTables) => {
    if (Array.isArray(tableOrTables)) {
      // Format names concisely: "Table 1, 2, 3" instead of "Table 1, Table 2, Table 3"
      const names = tableOrTables.map(t => t.name);
      let formattedName = names[0];
      if (names.length > 1) {
        const firstPrefix = names[0].match(/^[a-zA-Z\s-]+/)?.[0] || "";
        const rest = names.slice(1).map(n => n.replace(firstPrefix, "").trim());
        formattedName = `${names[0]}, ${rest.join(', ')}`;
      }

      // Create a virtual group table
      const groupTable = {
        id: tableOrTables.map(t => t.id).join('_'),
        name: formattedName,
        isGroup: true,
        tables: tableOrTables
      };
      setSelectedTable(groupTable);
    } else {
      // If single table is selected, check if it's already part of an active group order
      let existingGroup = null;
      Object.keys(tableOrders).forEach(orderId => {
        if (orderId.includes('_') && orderId.split('_').includes(tableOrTables.id.toString())) {
          // Find if this is a group ID that includes our table
          const ids = orderId.split('_');
          const groupTables = ids.map(id => {
            // We need to find the table name from our tableData or similar
            // For now, reconstruct a minimal table object or use info from tableOrders if available
            return { id: id, name: `Table ${id}` }; // Minimal reconstructions
          });
          
          existingGroup = {
            id: orderId,
            name: ids.map((id, index) => index === 0 ? `Table ${id}` : id).join(', '),
            isGroup: true,
            tables: groupTables
          };
        }
      });

      if (existingGroup) {
        setSelectedTable(existingGroup);
      } else {
        setSelectedTable(tableOrTables);
      }
    }
    setShowPOS(true);
  };

  const handleBackToTables = () => {
    setShowPOS(false);
    setSelectedTable(null);
  };

  // Confirm Order - Mark table as having an order and open invoice
  // Open Payment Modal instead of direct confirm
  const handleConfirmOrder = () => {
    if (cartItems.length === 0) return;
    setIsPaymentModalOpen(true);
  };

  // Actual Finalize after Payment
  const handleFinalizePayment = (paymentDetails) => {
    if (!selectedTable) return;

    // Prepare invoice data
    const invoiceData = {
      table: selectedTable.name,
      waiter: waitersData.find(w => w.id === selectedWaiter)?.name || 'N/A',
      items: cartItems,
      totals: totals,
      totalPayable: totalPayable,
      paymentDetails: paymentDetails, // Store payment info
      orderDate: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    // Save to localStorage
    localStorage.setItem('currentInvoice', JSON.stringify(invoiceData));

    // Open invoice in new tab (outside dashboard layout for full-page view)
    window.open('/invoice', '_blank');

    // Clear table order - make it available again
    setTableOrders(prev => {
      const newOrders = { ...prev };
      
      if (selectedTable.isGroup && selectedTable.tables) {
        // Clear each individual table in the group
        selectedTable.tables.forEach(t => {
          delete newOrders[t.id];
        });
      }
      
      // Clear the group itself
      delete newOrders[selectedTable.id];
      return newOrders;
    });

    // Reset everything
    setCartItems([]);
    setSelectedTable(null);
    setShowPOS(false);
    setIsPaymentModalOpen(false);
  };


  const handleKOT = () => {
    if (!selectedTable || cartItems.length === 0) return;

    const waiter = waitersData.find(w => w.id === selectedWaiter)?.name || 'N/A';

    // Prepare KOT data (only Waiter, Table, Items)
    const kotData = {
      table: selectedTable.name,
      waiter: waitersData.find(w => w.id === selectedWaiter)?.name || 'N/A',
      items: cartItems.map(item => ({
        Item: item.Item,
        qty: item.qty
      })),
      orderDate: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    // Save to localStorage
    localStorage.setItem('currentKOT', JSON.stringify(kotData));

    // Open KOT in new tab (outside dashboard layout)
    window.open('/invoice/kot', '_blank');

    // Mark table as having a confirmed order (mark as red/booked)
    setTableOrders(prev => {
      const newOrders = { ...prev };
      
      // If it's a group of tables, mark each individual table as confirmed
      if (selectedTable.isGroup && selectedTable.tables) {
        selectedTable.tables.forEach(t => {
          newOrders[t.id] = {
            ...prev[t.id],
            status: 'confirmed'
          };
        });
      }
      
      // Also mark the group itself
      newOrders[selectedTable.id] = {
        ...prev[selectedTable.id],
        status: 'confirmed'
      };
      
      return newOrders;
    });
  };

  // If no table selected or showPOS is false, show table selection
  if (!showPOS) {
    return (
      <TableSelection
        selectedTable={selectedTable}
        onSelectTable={handleTableSelect}
        tableOrders={tableOrders}
        isMainPage={true}
      />
    );
  }

  // Show POS after table is selected
  return (
    <div className="flex flex-col w-full h-full md:h-[calc(100vh-138px)] bg-white gap-1 overflow-hidden">
      {/* Main Content Area: Columns (Responsive) */}
      <div className="flex flex-col md:flex-row flex-1 w-full gap-1 overflow-hidden">
        {/* Left Column - Order Summary - Responsive width */}
        <div className="w-full md:w-[40%] flex flex-col h-[50vh] md:h-auto border-b md:border-b-0 md:border-r border-gray-200">
          <OrderSummary 
            cartItems={cartItems}
            updateQty={updateQty}
            removeFromCart={removeFromCart}
            totals={totals}
            selectedTable={selectedTable}
            selectedWaiter={selectedWaiter}
            onWaiterChange={setSelectedWaiter}
            onSubTableSelect={(subTable) => {
              if (!selectedTable) return;
              
              // Get the clean base ID and Name
              const baseId = selectedTable.originalId || (selectedTable.id.toString().includes('_') ? selectedTable.id.split('_')[0] : selectedTable.id);
              const baseName = selectedTable.originalName || (selectedTable.name.includes('-') ? selectedTable.name.split('-')[0].trim() : selectedTable.name);
              
              const newId = subTable ? `${baseId}_${subTable}` : baseId;
              const newName = subTable ? `${baseName}-${subTable}` : baseName;
              
              const newTable = {
                ...selectedTable,
                id: newId,
                name: newName,
                originalId: baseId,
                originalName: baseName,
                subTable: subTable || null
              };
              
              setSelectedTable(newTable);
            }}
          />
        </div>

        {/* Right Column - Items Area - Responsive width */}
        <div className="flex-1 w-full md:w-[60%] bg-white p-2 md:p-4 overflow-auto flex flex-col min-h-0 pb-[150px] md:pb-0">
          {/* Header with Inputs - Responsive stacking */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4 md:mb-6">
            {/* Category selection and Add Button */}
            <div className="flex-[1.2] flex gap-2">
              <div className="flex-1 relative">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#109df9] focus:border-[#109df9] block w-full p-2.5 pr-8 transition-all hover:bg-gray-100 cursor-pointer outline-none"
                >
                  <option value="all">All</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              <button 
                onClick={() => setIsCategoryModalOpen(true)}
                className="bg-[#109df9] hover:bg-[#0e8ad9] text-white p-2.5 rounded-lg transition-colors shadow-sm active:scale-95 flex items-center justify-center shrink-0"
                title="Add Category"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>

            {/* Search Input and Add Menu Button - Grouped for side-by-side layout */}
            <div className="flex items-center gap-2 flex-1">
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-[#109df9] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search items..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#109df9] focus:border-[#109df9] block w-full pl-10 p-2.5 outline-none transition-all focus:bg-white"
                />
              </div>

              {/* Add Menu Item Button */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#109df9] hover:bg-[#0e8ad9] text-white p-2.5 rounded-lg transition-colors shadow-sm active:scale-95 flex items-center justify-center shrink-0"
                title="Add Menu Item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Sub-layout: Categories and Items - Responsive stacking */}
          <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-0">
            {/* Categories List - 2-column grid on mobile, vertical list on desktop */}
            <div className="w-full md:w-[30%] lg:w-[25%] grid grid-cols-2 md:flex md:flex-col gap-1.5 overflow-y-auto pb-2 md:pb-0 pr-0 md:pr-2 custom-scrollbar shrink-0">
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-2 py-2.5 md:py-2 rounded-lg text-[11px] md:text-sm font-medium transition-all border break-words leading-tight ${
                    selectedCategory === category 
                      ? 'bg-[#109df9] border-[#109df9] text-white shadow-md' 
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-[#109df9]/10 hover:border-[#109df9]/30 hover:text-[#109df9]'
                  } active:scale-[0.98]`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Items Display Area - Responsive grid with section indicator */}
            <div className="flex-1 flex flex-col gap-2 overflow-auto pr-0 md:pr-2 custom-scrollbar border-t md:border-t-0 border-gray-100 pt-2 md:pt-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Menu Items</span>
                <span className="text-[10px] font-medium text-gray-400">{filteredItems.length} found</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <button 
                      key={index}
                      onClick={() => addToCart(item)}
                      className="flex flex-col items-start justify-between p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-[#109df9] hover:shadow-md transition-all group active:scale-[0.98] min-h-[70px]"
                    >
                      <span className="text-gray-800 font-semibold group-hover:text-[#109df9] text-left text-[11px] md:text-sm leading-tight line-clamp-2 w-full">
                        {item.Item}
                      </span>
                      <span className="text-gray-500 text-xs mt-2 font-medium w-full text-left">
                         Price : {item["Sales Rate"] || 0}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-gray-400 italic">
                    No items found in this category.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Toolbar - Fixed on mobile/tablet, specific layout requested */}
      <div className="fixed md:relative bottom-0 left-0 w-full bg-white border-t border-gray-200 p-2 md:p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 md:gap-3 shadow-[0_-4px_15px_rgba(0,0,0,0.1)] md:shadow-lg z-[100] md:z-auto">
        
        {/* Mobile View: Total Price (Top Row) */}
        <div className="flex md:hidden items-center justify-between bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
          <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">Total Payable</span>
          <span className="text-xl font-black text-black">
            <span className="text-xs font-medium text-gray-800 mr-1">TK</span>
            {totalPayable.toFixed(2)}
          </span>
        </div>

        {/* Buttons Row - All 3 buttons for mobile, standard buttons + dashboard for desktop */}
        <div className="flex flex-row gap-2 w-full md:w-auto">
          {/* Settlement Button */}
          <button 
            onClick={handleConfirmOrder}
            disabled={cartItems.length === 0}
            className={`flex-1 md:flex-none bg-[#109df9] text-white px-3 md:px-6 py-3 rounded-lg text-xs md:text-sm font-bold shadow hover:bg-[#0e8ad9] transition-all active:scale-95 flex items-center justify-center gap-2 ${
              cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            Settlement
          </button>

          {/* KOT Button */}
          <button 
            onClick={handleKOT}
            disabled={cartItems.length === 0}
            className={`flex-1 md:flex-none px-3 md:px-6 py-3 rounded-lg text-xs md:text-sm font-bold shadow transition-all active:scale-95 flex items-center justify-center gap-2 ${
              cartItems.length > 0
                ? 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-100'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            KOT
          </button>

          {/* Desktop View: Total Price */}
          <div className="hidden md:flex items-center justify-between bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 gap-3 shadow-sm mx-1 w-[180px]">
            <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest leading-none">Total</span>
            <span className="text-lg font-black text-black leading-none">
              <span className="text-xs font-medium text-gray-800 mr-1">TK</span>
              {totalPayable.toFixed(2)}
            </span>
          </div>

          {/* Table Button */}
          <button 
            onClick={handleBackToTables}
            className="flex-1 md:flex-none bg-gray-100 text-gray-700 px-3 md:px-6 py-3 rounded-lg text-xs md:text-sm font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-1.5 border border-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"></path><path d="M3 9h18"></path><path d="M9 3v18"></path></svg>
            Table
          </button>
          <button 
            onClick={() => router.push('/dashboard')}
            className="hidden md:flex flex-none bg-[#109df9]/10 text-[#109df9] px-6 py-3 rounded-lg text-sm font-bold hover:bg-[#109df9]/20 transition-all items-center justify-center gap-1.5 border border-[#109df9]/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Kitchen 
          </button>

          {/* Dashboard Button - Hidden on Mobile/Tablet */}
          <button 
            onClick={() => router.push('/dashboard')}
            className="hidden md:flex flex-none bg-[#109df9]/10 text-[#109df9] px-6 py-3 rounded-lg text-sm font-bold hover:bg-[#109df9]/20 transition-all items-center justify-center gap-1.5 border border-[#109df9]/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Dashboard
          </button>
        </div>
      </div>

      {/* Add Item Modal */}
      <AddItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        categories={categories}
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onAdd={handleAddCategory}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totals={{
          ...totals,
          totalPayable
        }}
        cartItems={cartItems}
        onReceive={handleFinalizePayment}
      />
    </div>
  );
};

export default RestaurantPOS;
