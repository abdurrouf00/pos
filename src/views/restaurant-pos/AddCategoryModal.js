'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddCategoryModal = ({ isOpen, onClose, onAdd }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    
    if (onAdd) {
      onAdd(categoryName.trim());
    }
    setCategoryName('');
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
              <h2 className="text-xl font-bold text-white">Add New Category</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSave} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Category Name *</label>
                  <input 
                    type="text" 
                    placeholder="Enter Category Name" 
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                    autoFocus
                    className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" 
                  />
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-end gap-3 mt-6">
                  <button 
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-2 rounded-lg text-sm font-semibold text-white bg-[#109df9] hover:bg-[#0e8ad9] shadow-md transition-all active:scale-95"
                  >
                    Save Category
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

export default AddCategoryModal;
