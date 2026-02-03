'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentModal = ({ isOpen, onClose, totals, cartItems, onReceive }) => {
  const [paymentRows, setPaymentRows] = useState([
    { id: 1, amount: '', method: 'Cash', note: '' }
  ]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPaymentRows([{ id: 1, amount: totals.totalPayable.toFixed(2), method: 'Cash', note: '' }]);
    }
  }, [isOpen, totals]);

  const handleAmountChange = (id, value) => {
    setPaymentRows(prev => prev.map(row => 
      row.id === id ? { ...row, amount: value } : row
    ));
  };

  const handleMethodChange = (id, value) => {
    setPaymentRows(prev => prev.map(row => 
      row.id === id ? { ...row, method: value } : row
    ));
  };

  const handleNoteChange = (id, value) => {
    setPaymentRows(prev => prev.map(row => 
      row.id === id ? { ...row, note: value } : row
    ));
  };

  const addPaymentRow = () => {
    setPaymentRows(prev => [
      ...prev,
      { id: Date.now(), amount: '', method: 'Cash', note: '' }
    ]);
  };

  const removePaymentRow = (id) => {
    if (paymentRows.length > 1) {
      setPaymentRows(prev => prev.filter(row => row.id !== id));
    }
  };

  // Calculations
  const totalPaying = paymentRows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);
  const totalPayable = totals.totalPayable || 0;
  // If paying less than total, balance is positive. If paying more, balance is 0.
  const balance = Math.max(0, totalPayable - totalPaying);
  // If paying more than total, change is positive.
  const changeReturn = Math.max(0, totalPaying - totalPayable);

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col relative z-10 max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-[#109df9] px-6 py-4 flex justify-between items-center text-white shadow-md">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                Final Settlement
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Left Column: Payment Inputs */}
              <div className="flex-1 p-6 overflow-y-auto bg-gray-50 border-r border-gray-100">
                <div className="space-y-6">
                  {paymentRows.map((row, index) => (
                    <div key={row.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3 relative group">
                      {paymentRows.length > 1 && (
                        <button 
                          onClick={() => removePaymentRow(row.id)}
                          className="absolute -top-2 -right-2 bg-red-100 text-red-500 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-gray-500 uppercase">Amount</label>
                          <div className="relative">
                            <input 
                              type="number" 
                              value={row.amount}
                              onChange={(e) => handleAmountChange(row.id, e.target.value)}
                              className="w-full p-2.5 pl-8 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-bold focus:ring-[#109df9] focus:border-[#109df9] outline-none transition-all"
                              placeholder="0.00"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">Tk</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-gray-500 uppercase">Method</label>
                          <div className="relative">
                            <select 
                              value={row.method}
                              onChange={(e) => handleMethodChange(row.id, e.target.value)}
                              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium focus:ring-[#109df9] focus:border-[#109df9] outline-none transition-all cursor-pointer appearance-none pr-10"
                            >
                              <option value="Cash">Cash</option>
                              
                              <option value="Mobile Banking">Mobile Banking</option>
                              
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">Payment Note</label>
                        <input 
                          type="text" 
                          value={row.note}
                          onChange={(e) => handleNoteChange(row.id, e.target.value)}
                          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:ring-[#109df9] focus:border-[#109df9] outline-none transition-all"
                          placeholder="Transaction ID, remarks, etc."
                        />
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={addPaymentRow}
                    className="flex items-center gap-2 text-[#109df9] font-bold text-sm px-4 py-2 hover:bg-[#109df9]/10 rounded-lg transition-colors border border-dashed border-[#109df9]/30 w-full justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add Another Payment Row
                  </button>
                </div>
              </div>

              {/* Right Column: Summary Box */}
              <div className="w-full md:w-[350px] p-6 bg-white border-l border-gray-200 h-full flex flex-col">
                <div className="bg-[#109df9]/5 border border-[#109df9]/20 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#109df9]/10">
                    <span className="text-gray-600 font-bold">Total Items:</span>
                    <span className="text-xl font-bold text-gray-800">{totalItems}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-bold">Total</span>
                      <span className="font-bold text-gray-800">{(totals.subTotal + totals.totalVat + totals.totalService).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-red-500">
                      <span className="font-bold">Discount(-)</span>
                      <span className="font-bold">{totals.totalDiscount.toFixed(2)}</span>
                    </div>
                    
                    <div className="pt-2 border-t border-dashed border-gray-300">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-lg font-bold text-[#109df9]">Total Payable</span>
                        <span className="text-2xl font-black text-[#109df9]">{totalPayable.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-bold">Total Paying</span>
                      <span className="font-bold text-gray-800">{totalPaying.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-bold">Balance</span>
                      <span className="font-bold text-gray-800">{balance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200">
                      <span className="text-gray-600 font-bold">Change Return</span>
                      <span className="font-bold text-gray-800">{changeReturn.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors border border-gray-300"
              >
                Close
              </button>
              <button 
                onClick={() => onReceive(paymentRows)}
                className="px-8 py-2.5 rounded-xl font-bold text-white bg-[#109df9] hover:bg-[#0e8ad9] shadow-lg transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={balance > 0 && totalPaying < totalPayable} 
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Receive
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
