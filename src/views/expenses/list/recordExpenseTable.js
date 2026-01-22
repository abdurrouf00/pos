"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { expenseColumn } from "./column";
import DataTable from "@/components/common/DataTable";
import Link from "next/link";

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [selected, setSelected] = useState([]);

  // Load Expenses on Mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("expenses") || "[]");
    setExpenses(stored);
  }, []);

  // Checkbox Select/Deselect
  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Delete Selected
  const handleDeleteSelected = () => {
    const updated = expenses.filter((_, index) => !selected.includes(index));
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
    setSelected([]);
  };

  // Delete Single
  const handleDelete = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
    setSelected(selected.filter((i) => i !== index));
  };

  return (
    <div className="p-5 bg-white  rounded shadow-lg ">
      {/* <h2 className="text-lg font-semibold mb-4">Saved Expenses</h2> */}

      {selected.length > 0 && (
        <Button onClick={handleDeleteSelected} className="mb-3 bg-red-500 text-white">
          Delete Selected
        </Button>
      )}
      <div className="mb-2 flex justify-end">
        <Link href="/dashboard/expenses/new-expenses">
          <Button>
            <span className="text-2xl">+</span> New
          </Button>
        </Link>
      </div>

      <DataTable
        data={expenses}
        columns={expenseColumn(handleDelete)}
        globalFilterFields={['name', 'date', 'expenseAccount', 'amount', 'amountIs', 'paidThrough', 'vendor', 'reference', 'customerName']}
        emptyMessage="No expenses added yet."

      />
    </div>
  );
}
