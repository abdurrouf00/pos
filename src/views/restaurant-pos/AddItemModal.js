'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddItemModal = ({ isOpen, onClose, categories }) => {
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
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#109df9]/10 flex items-center justify-between bg-[#109df9] sticky top-0 z-10">
              <h2 className="text-xl font-bold text-white">Add New Menu Item</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Category</label>
                  <select className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all cursor-pointer">
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Item Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Item Name</label>
                  <input type="text" placeholder="e.g. Grilled Chicken" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Code */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Item Code</label>
                  <input type="text" placeholder="e.g. 1029" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Unit */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Unit</label>
                  <select className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all cursor-pointer">
                    {["1", "2", "3", "4", "5", "6", "7", "8"].map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Model</label>
                  <input type="text" placeholder="e.g. Standard" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Purchase Rate */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Purchase Rate</label>
                  <input type="number" placeholder="0.00" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Sales Rate */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Sales Rate</label>
                  <input type="number" placeholder="0.00" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Vat Rate */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Vat Rate (%)</label>
                  <input type="number" placeholder="5" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Discount Rate */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Discount Rate (%)</label>
                  <input type="number" placeholder="0" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Service Charge Rate */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Service Charge Rate (%)</label>
                  <input type="number" placeholder="5" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Manufacture Company & Kitchen/Production Item Row */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Manufacture Company</label>
                  <input type="text" placeholder="e.g. Kitchen" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Kitchen/Production Item ?</label>
                  <select className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all cursor-pointer">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Dropdowns Group */}
                <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">Use Unique Barcode ?</label>
                    <select className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all cursor-pointer">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">Status</label>
                    <select className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all cursor-pointer">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </form>

              {/* Modal Actions (pushed inside scrollable area) */}
              <div className="flex items-center justify-end gap-3 mt-8 pb-2">
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-8 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#109df9] hover:bg-[#0e8ad9] shadow-md transition-all active:scale-95">
                  Save Item
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddItemModal;
