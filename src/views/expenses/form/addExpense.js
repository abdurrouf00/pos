"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";


import Table from "../list/addBulkTable"

export default function RecurringBillsForm() {
  const today = new Date().toISOString().split("T")[0];

  const [rows, setRows] = useState([
    {
      date: today,
      expenseAccount: "",
      amount: 0,
      paidThrough: "",
      vendor: "",
      tax: "0%",
      customerName: "",
      project: "",
      billable: "Yes",
    },
  ]);

  const paidThroughOptions = [
    "Cash",
    "Petty Cash",
    "Undeposited Funds",
    "Other Current Asset",
    "Advance Tax",
    "Employee Advance",
    "Prepaid Expenses",
    "Fixed Asset",
    "Furniture and Equipment",
    "Other Current Liability",
    "Employee Reimbursements",
    "Equity",
    "Drawings",
    "Opening Balance Offset",
    "Owner's Equity",
  ];

  const handleChange = (index, name, value) => {
    const updated = [...rows];
    updated[index][name] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        date: today,
        expenseAccount: "",
        amount: 0,
        paidThrough: "",
        vendor: "",
        tax: "0%",
        customerName: "",
        project: "",
        billable: "Yes",
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated.length ? updated : [
      {
        date: today,
        expenseAccount: "",
        amount: 0,
        paidThrough: "",
        vendor: "",
        tax: "0%",
        customerName: "",
        project: "",
        billable: "Yes",
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingBills = JSON.parse(localStorage.getItem("recurringBills") || "[]");
    const updatedBills = [...existingBills, ...rows];
    localStorage.setItem("recurringBills", JSON.stringify(updatedBills));

    // Reset rows
    setRows([
      {
        date: today,
        expenseAccount: "",
        amount: 0,
        paidThrough: "",
        vendor: "",
        tax: "0%",
        customerName: "",
        project: "",
        billable: "Yes",
      },
    ]);
  };

  return (
    <div className="  min-h-screen">
      <h2 className="text-xl font-bold mb-4">Add Recurring Bills</h2>

      <form onSubmit={handleSubmit} className=" overflow-x-auto   rounded border p-4">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Expense Account</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Paid Through</th>
              <th className="p-2 border">Vendor</th>
              <th className="p-2 border">Tax</th>
              <th className="p-2 border">Customer Name</th>
              <th className="p-2 border">Project</th>
              <th className="p-2 border">Billable</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border p-1">
                  <HrInput
                    type="date"
                    value={row.date}
                    onChange={(e) => handleChange(index, "date", e.target.value)}
                  />
                </td>
                <td className="border p-1">
                  <HrInput
                    type="text"
                    value={row.expenseAccount}
                    onChange={(e) => handleChange(index, "expenseAccount", e.target.value)}
                  />
                </td>
                <td className="border p-1">
                  <HrInput
                    type="number"
                    value={row.amount}
                    onChange={(e) => handleChange(index, "amount", e.target.value)}
                    className="text-right"
                  />
                </td>
                <td className="border p-1">
                  <HrSelect
                    value={row.paidThrough}
                    onChange={(e) => handleChange(index, "paidThrough", e.target.value)}
                    options={paidThroughOptions.map((opt) => ({ value: opt, label: opt }))}
                  />
                </td>
                <td className="border p-1">
                  <HrInput
                    type="text"
                    value={row.vendor}
                    onChange={(e) => handleChange(index, "vendor", e.target.value)}
                  />
                </td>
                <td className="border p-1">
                  <HrSelect
                    value={row.tax}
                    onChange={(e) => handleChange(index, "tax", e.target.value)}
                    className="p-100"
                    options={[
                      { value: "0%", label: "0%" },
                      { value: "5%", label: "5%" },
                      { value: "10%", label: "10%" },
                      { value: "15%", label: "15%" },
                    ]}
                  />
                </td>
                <td className="border p-1">
                  <HrInput
                    type="text"
                    value={row.customerName}
                    onChange={(e) => handleChange(index, "customerName", e.target.value)}
                  />
                </td>
                <td className="border p-1">
                  <HrInput
                    type="text"
                    value={row.project}
                    onChange={(e) => handleChange(index, "project", e.target.value)}
                  />
                </td>
                <td className="border p4">
                  <HrSelect
                    value={row.billable}
                    onChange={(e) => handleChange(index, "billable", e.target.value)}
                    className="p-8"
                    options={[
                      { value: "Yes", label: "Yes" },
                      { value: "No", label: "No" },

                    ]}
                  />
                </td>
                <td className="border p-4 text-center">
                  <button
                    type="button"
                    className="text-red-600 font-bold"
                    onClick={() => removeRow(index)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="text-blue-600 font-semibold"
            onClick={addRow}
          >
            + Add Row
          </button>


        </div>
        <div className="flex fixed bottom-0 w-full items-center shadow-lg md:h-12 gap-8 bg-gray-200 rounded sm:px-4 md:px-6 z-50">
          <Button type="submit">Save Expenses</Button>
        </div>
      </form>

      <Table />

    </div>
  );
}
