'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddTableModal = ({ isOpen, onClose, onAdd }) => {
  const [tableName, setTableName] = useState('');
  const [capacity, setCapacity] = useState('4');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tableName) return;
    
    onAdd({
      id: Date.now(),
      name: tableName,
      capacity: capacity,
      status: 'available'
    });
    setTableName('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200,
              duration: 0.5 
            }}
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#109df9]/10 flex items-center justify-between bg-[#109df9] sticky top-0 z-10">
              <h2 className="text-xl font-bold text-white">Create New Table</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Table Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Table Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Table 101" 
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all"
                    required
                  />
                </div>

                {/* Capacity */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Capacity</label>
                  <select 
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all cursor-pointer"
                  >
                    {[2, 4, 6, 8, 10, 12].map(num => (
                      <option key={num} value={num}>{num} Persons</option>
                    ))}
                  </select>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-end gap-3 mt-6">
                  <button 
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#109df9] hover:bg-[#0e8ad9] shadow-md transition-all active:scale-95"
                  >
                    Create Table
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddTableModal;
