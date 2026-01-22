"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import HrModal from "@/components/common/HrModal";

export default function SimpleBudgetForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [showExtraSections, setShowExtraSections] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    fiscalYear: "Jan 2025 - Dec 2025",
    budgetPeriod: "monthly",
  });

  const [accounts, setAccounts] = useState({
    income: [],
    expense: [],
    asset: [],
    liability: [],
    equity: [],
  });

  const accountOptions = {
    income: ["Salary", "Freelance Income", "Interest Income"],
    expense: ["Rent Expense", "Utilities", "Office Supplies"],
    asset: ["Cash", "Bank Account", "Accounts Receivable"],
    liability: ["Loan Payable", "Accounts Payable", "Accrued Expenses"],
    equity: ["Owner's Capital", "Retained Earnings", "Share Capital"],
  };

  const openModal = (type) => {
    setCurrentType(type);
    setSelectedAccounts(accounts[type]);
    setOpen(true);
  };

  const toggleSelect = (acc) => {
    setSelectedAccounts(prev =>
      prev.includes(acc) ? prev.filter(a => a !== acc) : [...prev, acc]
    );
  };

  const handleAdd = () => {
    setAccounts(prev => ({
      ...prev,
      [currentType]: [...new Set(selectedAccounts)],
    }));
    setSelectedAccounts([]);
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("budgetData", JSON.stringify({ ...formData, accounts }));
    router.push("/dashboard/budgets/budget-table");
  };

  const mainSections = [
    { type: "income", title: "Income Accounts" },
    { type: "expense", title: "Expense Accounts" },
  ];

  const extraSections = [
    { type: "asset", title: "Asset Accounts" },
    { type: "liability", title: "Liability Accounts" },
    { type: "equity", title: "Equity Accounts" },
  ];

  const renderSection = (section) => (
    <div key={section.type} className="flex mb-6 rounded">
      <h3 className="w-44 mb-2">{section.title}</h3>
      <div className="border w-75 rounded-sm">
        {accounts[section.type].length === 0 ? (
          <button type="button" onClick={() => openModal(section.type)} className="text-sm text-blue-600 p-2">
            Add Account
          </button>
        ) : (
          <>
            <div className="mb-2 p-2 border bg-gray-50 flex flex-wrap gap-2">
              {accounts[section.type].map((acc, i) => (
                <span key={i} className="inline-block px-3 py-1 bg-gray-200 rounded">{acc}</span>
              ))}
            </div>
            <button type="button" onClick={() => openModal(section.type)} className="text-blue-600 text-sm p-2">
              Add / Update
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 mb-20 bg-white rounded">
      <h2 className="text-2xl font-bold mb-4">New Budget Form</h2>
      <form onSubmit={handleSubmit}>

        <div className="flex mb-4">
          <label className="text-sm w-52 mb-1 mt-3">Name</label>
          <HrInput
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-75"
          />
        </div>

        <div className="flex mb-4">
          <label className="text-sm w-52 mb-1 mt-3">Fiscal Year</label>
          <HrSelect
            name="fiscalYear"
            value={formData.fiscalYear}
            onChange={handleChange}
            className="!w-75"
            options={[
              { label: "Jan 2023 - Dec 2023", value: "Jan 2023 - Dec 2023" },
              { label: "Jan 2024 - Dec 2024", value: "Jan 2024 - Dec 2024" },
              { label: "Jan 2025 - Dec 2025", value: "Jan 2025 - Dec 2025" },
              { label: "Jan 2026 - Dec 2026", value: "Jan 2026 - Dec 2026" },
              { label: "Jan 2027 - Dec 2027", value: "Jan 2027 - Dec 2027" },
            ]}
          />
        </div>

        <div className="flex mb-4">
          <label className="text-sm w-52 mb-1 mt-3">Budget Period</label>
          <HrSelect
            name="budgetPeriod"
            value={formData.budgetPeriod}
            onChange={handleChange}
            className="!w-75 p-2 border rounded"

            options={[
              { label: "Monthly", value: "monthly" },
              { label: "Quarterly", value: "quarterly" },
              { label: "Half-Yearly", value: "halfYearly" },
              { label: "Yearly", value: "yearly" },
            ]}
          />
        </div>

        {mainSections.map(renderSection)}

        {!showExtraSections && (
          <p onClick={() => setShowExtraSections(true)} className="  cursor-pointer mb-6">
            Include Asset, Liability, Equity Account in budget
          </p>
        )}
        {showExtraSections && extraSections.map(renderSection)}

        <Button type="submit" className="mt-6 bg-green-500 text-white">Submit</Button>
      </form>

      {/* Modal */}
      <HrModal toggle={open} setToggle={setOpen} title={`Select ${currentType.charAt(0).toUpperCase() + currentType.slice(1)} Accounts`}>
        <div className=""
        >
          <div className=""
          >

            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto mb-4">
              {(accountOptions[currentType] || []).map((acc, i) => (
                <div key={i} onClick={() => toggleSelect(acc)}
                  className={`p-2 border rounded cursor-pointer ${selectedAccounts.includes(acc) ? "bg-blue-200 border-blue-600" : "hover:bg-gray-100"}`}>
                  {acc}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button onClick={handleAdd} className="bg-green-500 text-white">Add / Update</Button>
              <Button type="button" onClick={() => setOpen(false)} className="bg-gray-200 text-black">Cancel</Button>
            </div>
          </div>
        </div>
      </HrModal>
    </div>
  );
}
