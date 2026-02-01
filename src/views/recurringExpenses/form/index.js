"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";


const paidThroughOptions = ["Cash", "Bank", "bKash"]; // Example options
const amountIsOptions = ["Tax Inclusive", "Tax Exclusive"];

export default function ExpenseForm() {
  const [formData, setFormData] = useState({
    profileName: "",
    repeatEvery: "",
    startDate: "",
    endsOn: "",
    expenseAccount: "",
    amount: "",
    amountIs: "",
    tax: "",
    paidThrough: "",
    vendor: "",
    notes: "",
    customerName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.profileName || !formData.amount || !formData.expenseAccount) {
      return;
    }

    // Save to localStorage
    const existingExpenses = JSON.parse(localStorage.getItem("submittedExpenses") || "[]");
    const updatedExpenses = [...existingExpenses, formData];
    localStorage.setItem("submittedExpenses", JSON.stringify(updatedExpenses));


    // Clear form
    setFormData({
      profileName: "",
      repeatEvery: "",
      startDate: "",
      endsOn: "",
      expenseAccount: "",
      amount: "",
      amountIs: "",
      tax: "",
      paidThrough: "",
      vendor: "",
      notes: "",
      customerName: "",
    });
  };

  return (
    <div className="p-5 bg-white rounded mb-30">
      <h2 className="text-lg font-bold mb-4">New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
          <HrInput
            name="profileName"
            value={formData.profileName}
            onChange={handleChange}
            label="Profile Name"
          />

          <HrInput
            name="repeatEvery"
            value={formData.repeatEvery}
            onChange={handleChange}
            label="Repeat Every"
          />

          <HrInput
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}

            label="Start Date"

          />

          <HrInput
            type="date"
            name="endsOn"
            value={formData.endsOn}
            onChange={handleChange}
            label="Ends On"
          />

          <HrInput
            name="expenseAccount"
            value={formData.expenseAccount}
            onChange={handleChange}
            label="Expense Account"
          />

          <HrInput
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            label="Amount"
          />

          <HrSelect
            name="amountIs"
            value={formData.amountIs}
            onChange={handleChange}
            options={amountIsOptions}
            label="Amount Is"
          />

          <HrInput
            name="tax"
            value={formData.tax}
            onChange={handleChange}
            label="Tax"
          />
          <HrSelect
            name="paidThrough"
            value={formData.paidThrough}
            onChange={handleChange}
            options={paidThroughOptions}
            label="Paid Through"
          />
          <HrInput
            name="vendor"
            value={formData.vendor}
            onChange={handleChange}
            label="Vendor"
          />
          <HrInput
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            label="Notes"
          />
          <HrInput
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            label="Customer Name"
          />
        </div>

        <div className="flex fixed right-4  bottom-4 items-center    rounded sm:px-4 md:px-6 z-50">
          <Button type="submit">Save Expenses</Button>
        </div>
      </form>

    </div>
  );
}
