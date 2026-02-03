'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddLedgerModal = ({ isOpen, onClose }) => {
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
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <h2 className="text-xl font-bold text-gray-800">Create Ledger</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Account Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Account Type *</label>
                  <select className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all cursor-pointer">
                    <option value="">--Select Account Type--</option>
                    <option value="Customer">Customer</option>
                    <option value="Supplier">Supplier</option>
                  </select>
                </div>

                {/* Account Group */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Account Group *</label>
                  <select className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all cursor-pointer">
                    <option value="">--Select Account Group--</option>
                    <option value="General">General</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>

                {/* Branch */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Branch *</label>
                  <select className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all cursor-pointer">
                    <option value="1 - Head Office">1 - Head Office</option>
                  </select>
                </div>

                {/* Ledger Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Ledger Name *</label>
                  <input type="text" placeholder="Ledger Name" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Address</label>
                  <input type="text" placeholder="Address" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Code */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Code</label>
                  <input type="text" placeholder="CODE Number" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Display Position */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Display Position</label>
                  <input type="text" placeholder="Position" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* NID Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">NID Number</label>
                  <input type="text" placeholder="NID Number" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <input type="email" placeholder="Email" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Phone</label>
                  <input type="tel" placeholder="Phone" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Credit Limit */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Credit Limit</label>
                  <input type="number" defaultValue="0" className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all" />
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Status</label>
                  <select className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#109df9] focus:border-[#109df9] outline-none text-sm transition-all cursor-pointer">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </form>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 mt-8 pb-2">
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-8 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#109df9] hover:bg-[#0e8ad9] shadow-md transition-all active:scale-95">
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddLedgerModal;
