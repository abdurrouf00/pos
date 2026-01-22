"use client";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { values } from "lodash";
import { useState } from "react";

export default function Page() {
  const [account, setAccount] = useState("");
  const [contact, setContact] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {
      account,
      contact,
      dateFrom,
      dateTo,
      amountMin,
      amountMax,
    };
    console.log("Filter Applied:", filters);
    alert(JSON.stringify(filters, null, 2));
  };

  return (
    <main className="p-6 bg-white rounded mx-auto">
      <h1 className="text-2xl font-bold mb-4">Filter Transactions</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md space-y-4"
      >
        {/* Account */}
        <div className="flex">
          <label className="w-40">Account</label>
          <HrSelect
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full"
            options={[
              { value: "Cash", label: "Cash" },
              { value: "Bank", label: "Bank" },
              { value: "Mobile Banking", label: "Mobile Banking" }
            ]}
          />
        </div>

        {/* Contact */}
        <div className="flex">
          <label className="w-40">Contact</label>
          <HrInput
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter contact name"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Date Range */}
        <div className="flex items-center">
          <label className="w-32">Date Range</label>
          <div className="flex gap-2">

            <HrInput
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full "
            />
            <label htmlFor="">to </label>
            <HrInput
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Amount Range */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Min Amount</label>
            <HrInput
              type="number"
              value={amountMin}
              onChange={(e) => setAmountMin(e.target.value)}
              placeholder="500"

            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Amount</label>
            <HrInput
              type="number"
              value={amountMax}
              onChange={(e) => setAmountMax(e.target.value)}
              placeholder="10000"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Apply Filter
          </button>
          <button
            type="reset"
            onClick={() => {
              setAccount("");
              setContact("");
              setDateFrom("");
              setDateTo("");
              setAmountMin("");
              setAmountMax("");
            }}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </main>
  );
}
