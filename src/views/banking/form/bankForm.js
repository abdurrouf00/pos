"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function BankForm() {
  const [form, setForm] = useState({
    accountType: "Bank",
    accountName: "",
    accountCode: "",
    currency: "",
    accountNumber: "",
    bankName: "",
    bankIdentifierCode: "",
    description: "",
    primary: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.accountName || !form.accountCode) {
      return;
    }

    const newAccount = { ...form, id: Date.now() };
    const stored = JSON.parse(localStorage.getItem("accounts") || "[]");
    localStorage.setItem("accounts", JSON.stringify([...stored, newAccount]));


    // Reset form
    setForm({
      accountType: "Bank",
      accountName: "",
      accountCode: "",
      currency: "",
      accountNumber: "",
      bankName: "",
      bankIdentifierCode: "",
      description: "",
      primary: false,
    });
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-20">
      <h2 className="text-xl font-bold mb-4">Add Bank / Credit Card</h2>

      {/* Select Account Type */}
      <div className="mb-6 flex gap-6">
        <h1>Select Account type</h1>
        <label>
          <input
            type="radio"
            name="accountType"
            value="Bank"
            checked={form.accountType === "Bank"}
            onChange={handleChange}
            className="mr-2"
          />
          Bank
        </label>
        <label>
          <input
            type="radio"
            name="accountType"
            value="Credit Card"
            checked={form.accountType === "Credit Card"}
            onChange={handleChange}
            className="mr-2"
          />
          Credit Card
        </label>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="pt-5 w-full space-y-4 pl-8">
        <div className="flex items-center gap-4">
          <label className="w-36 text-sm">Account *</label>
          <HrInput
            type="text"
            name="accountName"
            value={form.accountName}
            onChange={handleChange}
            placeholder="Enter Account Name"
            className="w-75"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-36 text-sm">Account Code *</label>
          <HrInput
            type="text"
            name="accountCode"
            value={form.accountCode}
            onChange={handleChange}
            placeholder="Enter Account Code"
            className="w-75"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-36 text-sm">Currency</label>
          <HrInput
            type="text"
            name="currency"
            value={form.currency}
            onChange={handleChange}
            placeholder="Enter Currency"
            className="w-75"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-36 text-sm">Bank Name</label>
          <HrInput
            type="text"
            name="bankName"
            value={form.bankName}
            onChange={handleChange}
            placeholder="Enter Bank Name"
            className="w-75"
          />
        </div>


        {/* Only show for Bank */}
        {form.accountType === "Bank" && (
          <>
            <div className="flex items-center gap-4">
              <label className="w-36 text-sm">Account Number</label>
              <HrInput
                type="text"
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                placeholder="Enter Account Number"
                className="w-75"
              />
            </div>


            <div className="flex items-center gap-4">
              <label className="w-36 text-sm">Bank Identifier Code</label>
              <HrInput
                type="text"
                name="bankIdentifierCode"
                value={form.bankIdentifierCode}
                onChange={handleChange}
                placeholder="Enter BIC / SWIFT"
                className="w-75"
              />
            </div>
          </>
        )}

        <div className="flex items-center gap-4">
          <label className="w-36 text-sm">Description</label>
          <HrInput
            type="textarea"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter Description"
            className="w-[70%] h-1"
          />
        </div>

        {/* Make Primary */}
        <div>
          <label className="flex items-center gap-2 pt-6 pb-8 border-b-1">
            <input
              type="checkbox"
              name="primary"
              checked={form.primary}
              onChange={handleChange}
            />
            Make this Primary
          </label>
        </div>

        <div className="flex gap-4 mt-8">
          <Button type="submit" className="text-white">
            Save Account
          </Button>
          <Link href="/dashboard/banking">
            <Button className="bg-red-400 text-white">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
