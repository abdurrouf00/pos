"use client";

import { useState, useEffect } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";



const today = new Date().toISOString().split("T")[0];

export default function ExpenseForm() {
  const [formData, setFormData] = useState({
    date: today,
    expenseAccount: "",
    amount: "",
    amountIs: "Tax Inclusive",
    paidThrough: "",
    tax: "",
    vendor: "",
    reference: "",
    notes: "",
    customerName: "",
  });

  const [savedData, setSavedData] = useState([]);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("expenses") || "[]");
    setSavedData(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = [...savedData, formData];
    setSavedData(updatedData);
    localStorage.setItem("expenses", JSON.stringify(updatedData));


    setFormData({
      date: today,
      expenseAccount: "",
      amount: "",
      amountIs: "Tax Inclusive",
      paidThrough: "",
      tax: "",
      vendor: "",
      reference: "",
      notes: "",
      customerName: "",
    });
  };

  return (
    <div className="">

      <form onSubmit={handleSubmit} className="">
        <h2 className="text-lg font-bold ">Expense Entry</h2>

        <div className="flex gap-6">
          {/* Left Column: Form Inputs */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-4 w-full">
              <label className="w-36 text-sm">Date</label>
              <HrInput
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-75"
              />
            </div>

            <div className="flex items-center gap-4 w-full">
              <label className="w-36 text-sm">Expense Account</label>
              <HrInput
                name="expenseAccount"
                value={formData.expenseAccount}
                onChange={handleChange}
                className="w-75"
              />
            </div>

            <div className="flex items-center gap-4 w-full">
              <label className="w-36 text-sm">Amount</label>
              <HrInput
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-75"
              />
            </div>

            <div className="flex items-center gap-4 w-full">
              <label className="w-36 text-sm">Amount Is</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="amountIs"
                    value="Tax Inclusive"
                    checked={formData.amountIs === "Tax Inclusive"}
                    onChange={handleChange}

                  />
                  Tax Inclusive
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="amountIs"
                    value="Tax Exclusive"
                    checked={formData.amountIs === "Tax Exclusive"}
                    onChange={handleChange}

                  />
                  Tax Exclusive
                </label>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full">
              <label className="w-36 text-sm">Paid Through</label>
              <HrSelect
                name="paidThrough"
                value={formData.paidThrough}
                onChange={handleChange}
                className="!w-75"
                options={[
                  { label: "Select", value: "" },
                  { label: "Cash", value: "Cash" },
                  { label: "Petty Cash", value: "Petty Cash" },
                  { label: "Undeposited Funds", value: "Undeposited Funds" },
                  { label: "Other Current Asset", value: "Other Current Asset" },
                  { label: "Advance Tax", value: "Advance Tax" },
                  { label: "Employee Advance", value: "Employee Advance" },
                  { label: "Prepaid Expenses", value: "Prepaid Expenses" },
                  { label: "Fixed Asset", value: "Fixed Asset" },
                  { label: "Furniture and Equipment", value: "Furniture and Equipment" },
                  { label: "Other Current Liability", value: "Other Current Liability" },
                  { label: "Employee Reimbursements", value: "Employee Reimbursements" },
                  { label: "Equity", value: "Equity" },
                  { label: "Drawings", value: "Drawings" },
                  { label: "Opening Balance Offset", value: "Opening Balance Offset" },
                  { label: "Owner's Equity", value: "Owner's Equity" },
                ]}
              />
            </div>

            <div className="flex items-center gap-4 w-full">
              <label className="w-36 text-sm">Tax</label>
              <HrInput
                name="tax"
                value={formData.tax}
                onChange={handleChange}
                className="w-75"
              />
            </div>

            <div className="flex items-center gap-4 w-full">
              <label className="w-36 text-sm">Vendor</label>
              <HrInput
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className="w-75"
              />
            </div>

            <div className="flex items-center gap-4 w-full">
              <label className="w-36 text-sm">Reference#</label>
              <HrInput
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                className="w-75"
              />
            </div>

            <div className="flex items-center gap-4 w-full">
              <label className="w-36 text-sm">Notes</label>
              <HrInput
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-75"
              />
            </div>

            <div className="flex items-center gap-4 w-full">
              <label className="w-36 text-sm">Customer Name</label>
              <HrInput
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="w-75"
              />
            </div>
          </div>

          {/* Right Drag & Drop */}
          <div className="flex flex-col h-80 items-center justify-center mr-20 bg-white border space-y-3 pt-10 pb-10 p-5 md:hover:bg-gray-50 md:hover:border-blue-300">
            <img src="/moon.png"
              alt="moon"
              className="h-15 w-15 rounded-xl object-cover" />
            <p className="text-sm">Drag or Drop your Receipts</p>
            <p className="text-xs">Maximum file size allowed is 10MB</p>
            <input type="file" className="border p-2 rounded bg-white text-sm" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex fixed bottom-0 w-[82%] items-center shadow-lg md:h-12 gap-8 bg-gray-200 rounded sm:px-4 md:px-6 z-50">
          <Button type="submit">Save Expenses</Button>
        </div>
      </form>


    </div>
  );
}
