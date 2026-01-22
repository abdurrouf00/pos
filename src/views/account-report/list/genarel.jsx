"use client";

import React, { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
import { FiTrash2 } from "react-icons/fi"; // Trash icon

export default function PaymentFilter({ onApply }) {
  const [dateFrom, setDateFrom] = useState("");  
  const [groupBy, setGroupBy] = useState("none");
  const [filters, setFilters] = useState([]); // filter will not be show at first

  const FIELD_OPTIONS = [
    { value: "Customer Name", label: "Customer Name" },
    { value: "Payment Date", label: "Payment Date" },
    { value: "Payment Mode", label: "Payment Mode" },
    { value: "Payment Status", label: "Payment Status" },
    { value: "Amount", label: "Amount" },
    { value: "Reference Number", label: "Reference Number" },
  ];

  const CONDITION_OPTIONS = [
    { value: "Equals", label: "Equals" },
    { value: "Contains", label: "Contains" },
    { value: "Greater Than", label: "Greater Than" },
    { value: "Less Than", label: "Less Than" },
    { value: "Between", label: "Between" },
  ];

  function addFilter() {
    setFilters((s) => [
      ...s,
      {
        id: Date.now(),
        field: FIELD_OPTIONS[0].value,
        condition: CONDITION_OPTIONS[0].value,
        value: "",
      },
    ]);
  }

  function updateFilter(id, key, val) {
    setFilters((s) => s.map((f) => (f.id === id ? { ...f, [key]: val } : f)));
  }

  function removeFilter(id) {
    setFilters((s) => s.filter((f) => f.id !== id));
  }



  return (
    <div className=" w-full p-4 mb-30">
      {/* Date Range */}
      <div className=" w-100 grid-cols-1 md:grid-cols-3 gap-4 pb-10 ">
        <HrSelect
          label="Date From"
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          options={[
                { value: "today", label: "Today" },
                { value: "this_week", label: "This Week" },
                { value: "this_month", label: "This Month" },
                { value: "this_quarter", label: "This Quarter" },
                { value: "this_year", label: "This Year" },
                { value: "yesterday", label: "Yesterday" },
                { value: "previous_week", label: "Previous Week" },
                { value: "previous_month", label: "Previous Month" },
                { value: "previous_quarter", label: "Previous Quarter" },
                { value: "previous_year", label: "Previous Year" },
                { value: "custom", label: "Custom" },
              ]}/>

        <HrSelect
          label="Group By"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          options={[
            { value: "none", label: "None" },
            { value: "customer", label: "Customer" },
            { value: "payment_mode", label: "Payment Mode" },
            { value: "status", label: "Payment Status" },
          ]}
        />
      </div>

      {/* Advanced Filters */}
      <div className=" pt-7 border-t">
         <h4 className="text-sm font-medium">Advanced Filters</h4>
          <p className="mb-8 text-gray-700 text-sm">Use advanced filters to filter the report based on the fields of Customer Payment.</p>
       

        {/*  Add Filter  */}
        {filters.length > 0 && (
          <div className="space-y-3 ">
            {filters.map((f) => (
              <div
                key={f.id}
                className=" flex md:grid-cols-4 gap-3 items-end   rounded-md"
              >
                <HrSelect
                  value={f.field}
                  onChange={(e) => updateFilter(f.id, "field", e.target.value)}
                  options={FIELD_OPTIONS}
                />

                <HrSelect
                  value={f.condition}
                  onChange={(e) =>
                  updateFilter(f.id, "condition", e.target.value)}
                  options={CONDITION_OPTIONS}
                />
                <HrInput
                  value={f.value}
                  onChange={(e) => updateFilter(f.id, "value", e.target.value)}
                  placeholder="Enter value"
                />

                <Button
                  variant="outline"
                  onClick={() => removeFilter(f.id)}
                  className="flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600"
                >
                  <FiTrash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        )}

         <div className=" mt-3">
          <Button onClick={addFilter} >
            + Add Filter
          </Button>
        </div>
      </div>
    </div>
  );
}
