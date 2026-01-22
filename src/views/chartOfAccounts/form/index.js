"use client";

import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";

import { useState } from "react";

export default function AccountForm() {
  const [formData, setFormData] = useState({
    accountType: "Other Current Asset",
    accountName: "",
    isSubAccount: false,
    parentAccount: "",
    accountCode: "",
    description: "",
    watchlist: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.accountName || !formData.accountCode) {
      alert("Account Name and Account Code are required");
      return;
    }
    // Save to localStorage
    const stored = JSON.parse(localStorage.getItem("accounts") || "[]");
    localStorage.setItem("accounts", JSON.stringify([...stored, formData]));

    // Reset form
    setFormData({
      accountType: "Other Current Asset",
      accountName: "",
      isSubAccount: false,
      parentAccount: "",
      accountCode: "",
      description: "",
      watchlist: false,
    });

    alert("Account added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className=" space-y-4 max-w-xl ">
      <h2 className="text-xl font-bold">Create Account</h2>


      <div className=" flex">
        <HrSelect
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          label="Account Type"
          options={[
            { value: "Cash", label: "Cash" },
            { value: "Other Asset", label: "Other Asset" },
            { value: "Other Current Asset ", label: "Other Current Asset" },
            { value: " Accounts Receivable", label: "Accounts Receivable" },
          ]}
        />
      </div>


      <div className=" flex">
        <HrInput
          name="accountName"
          value={formData.accountName}
          onChange={handleChange}
          label="Account Name"
        />
      </div>



      <label className="block ">
        <input
          type="checkbox"
          name="isSubAccount"
          checked={formData.isSubAccount}
          onChange={handleChange}
        />{" "}
        Make this a sub-account
      </label>

      {formData.isSubAccount && (
        <div className="flex">
          <HrInput
            name="parentAccount"
            value={formData.parentAccount}
            onChange={handleChange}
            label="Parent Account"
          />
        </div>
      )}
      <div className="flex">
        <HrInput
          name="accountCode"
          value={formData.accountCode}
          onChange={handleChange}
          label="Account Code"
        />

      </div>
      <div className="flex">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-1 rounded"
          label="Description"
        />
      </div>

      <label className="block">
        <input
          type="checkbox"
          name="watchlist"
          checked={formData.watchlist}
          onChange={handleChange}
          label="Add to the watchlist on my dashboard"
        />{" "}
        Add to the watchlist on my dashboard
      </label>

      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Add Account
      </button>
    </form>
  );
}
