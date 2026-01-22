"use client";

import HrInput from "@/components/common/HrInput";
import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const allColumns = [
  "Notes",
  "Terms and Conditions",
  "Currency",
  "Accepted Date",
  "Declined Date",
  "Approved By",
  "Billing Street 2",
  "Billing City",
  "Billing State",
  "Billing Code",
  "Billing Country",
  "Billing Fax",
  "Shipping Address Attention",
  "Shipping Street 1",
  "Shipping Street 2",
  "Shipping State",
];

export default function ColumnSelector() {
  const [available, setAvailable] = useState(allColumns);
  const [selected, setSelected] = useState([
    "Status",
    "Quote Date",
    "Expiry Date",
    "Quote#",
    "Reference#",
    "Customer Name",
    "Shipping Country",
    "Shipping City",
    "Shipping Fax",
    "Shipping Code",
    "Billing Street 1",
    "Billing Address Attention",
  ]);
  const [search, setSearch] = useState("");

  // সার্চ ফিল্টার
  const filteredAvailable = available.filter((col) =>
    col.toLowerCase().includes(search.toLowerCase())
  );

  // Add
  const addColumn = (col) => {
    setAvailable(available.filter((c) => c !== col));
    setSelected([...selected, col]);
  };

  // Remove
  const removeColumn = (col) => {
    setSelected(selected.filter((c) => c !== col));
    setAvailable([...available, col]);
  };

  return (
    <div className="flex gap-8 p-6 mb-30">
      {/* Available Columns */}
      <div className="w-64 border rounded-md p-3">
        <h3 className="font-semibold mb-2">AVAILABLE COLUMNS</h3>
        <HrInput
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 mb-2 w-full"
        />
        <ul className="h-80 overflow-y-auto text-sm">
          {filteredAvailable.map((col, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between px-2 py-1 hover:bg-gray-100 rounded group"
            >
              <span>{col}</span>
              <button
                onClick={() => addColumn(col)}
                className="text-green-600 hover:text-green-800 opacity-0 group-hover:opacity-100 transition"
              >
                <FaPlus />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Selected Columns */}
      <div className="w-64 border rounded-md p-3">
        <h3 className="font-semibold mb-2">SELECTED COLUMNS</h3>
        <ul className="h-80 overflow-y-auto text-sm">
          {selected.map((col, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between px-2 py-1 hover:bg-gray-100 rounded group"
            >
              <span>
                {col} <span className="text-gray-500">(Quote)</span>
              </span>
              <button
                onClick={() => removeColumn(col)}
                className="text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition"
              >
                <FaTimes />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
