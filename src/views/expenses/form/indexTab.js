"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import RecordExpense from "./recordExpense";
import RecordMileage from "./recordMileage";
import AddBulk from "./addExpense";

const tabs = [
  "Rcord Expense",
  "Record Mileage",
  "Bulk Add Expenses",
];

const PurchasesForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [submitClicked, setSubmitClicked] = useState(false);

  const {
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (data) => {
    setSubmitClicked(true);

    setTimeout(() => {
      setSubmitClicked(false);
      alert("Purchase saved successfully!");

      // 🔹 Save to localStorage under "purchases"
      const existing = JSON.parse(localStorage.getItem("purchases") || "[]");
      localStorage.setItem("purchases", JSON.stringify([...existing, data]));

      // Reset form & tab
      reset();
      setActiveTab(0);
    }, 1000);
  };

  return (
    <div className="flex flex-col space-y-6 mb-40 bg-white px-10 py-12">


      <div className="flex space-x-6  border-b    top-0  z-10">
        {tabs.map((tab, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveTab(index)}
            className={`px-3 py-2 text-sm font-medium transition
                ${activeTab === index
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-500"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="pt-0">
        {activeTab === 0 && <RecordExpense />}



        {activeTab === 1 && <RecordMileage />}
        {activeTab === 2 && <AddBulk />}
      </div>



    </div>
  );
};

export default PurchasesForm;
