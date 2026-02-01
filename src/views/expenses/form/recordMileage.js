"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import MileageTable from "../list/MTable"; // Table component import

export default function MileagePreferencesForm() {
  const [associateEmployees, setAssociateEmployees] = useState(false);
  const [defaultUnit, setDefaultUnit] = useState("Km");
  const [defaultCategory, setDefaultCategory] = useState("");
  const [mileageRates, setMileageRates] = useState([{ startDate: "", rate: "" }]);
  const [savedData, setSavedData] = useState([]); // saved data for table

  const unitOptions = ["Km", "Mile"];
  const categoryOptions = [
    "office supplies",
    "advertising and marketing",
    "bank fees and charges",
    "credit card charges",
    "travel expense",
    "telephone expense",
    "automobile expense",
    "it and internet expenses",
    "rent expense",
    "janitorial expense",
    "postage",
    "bad debt",
    "printing and stationery",
    "salaries and employee wages",
    "meals and entertainment",
    "depreciation expense",
    "consultant expense",
    "repairs and maintenance",
    "other expenses",
    "lodging",
    "purchase discounts",
    "fuel/mileage expenses",
  ];

  const handleRateChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...mileageRates];
    updated[index][name] = value;
    setMileageRates(updated);
  };

  const addRate = () => setMileageRates([...mileageRates, { startDate: "", rate: "" }]);
  const removeRate = (index) => {
    const updated = [...mileageRates];
    updated.splice(index, 1);
    setMileageRates(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      associateEmployees,
      defaultUnit,
      defaultCategory,
      mileageRates,
    };
    setSavedData([...savedData, dataToSave]);
    setMileageRates([{ startDate: "", rate: "" }]); // reset rates
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="">
        <div className="  space-y-6 container max-w-[760px]">
          <div className="border-b-2 pb-4 mb-4">
            <h2 className="text-lg font-semibold mb-4 text-red-500">Set your mileage preferences</h2>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={associateEmployees}
                onChange={() => setAssociateEmployees(!associateEmployees)}
                className="h-4 w-4"
              />
              <span>Associate employees to expenses</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="w-60">Default Mileage Category</span>
            <HrSelect
              name="defaultCategory"
              value={defaultCategory}
              onChange={(e) => setDefaultCategory(e.target.value)}
              placeholder="Select Account"
              className="flex-1"
              options={categoryOptions.map((opt) => ({ label: opt, value: opt }))}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="w-60">Default Unit</span>
            <div className="flex gap-6">
              {unitOptions.map((unit) => (
                <label key={unit} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="defaultUnit"
                    value={unit}
                    checked={defaultUnit === unit}
                    onChange={(e) => setDefaultUnit(e.target.value)}
                  />
                  {unit}
                </label>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-700">
            <p>Mileage Rates</p>
            <p>Any mileage expense recorded on or after the start date will have the corresponding mileage rate.</p>
          </div>

          <div className="flex gap-4 border-b border-gray-300 p-2 font-semibold">
            <div className="w-[500px]">Start Date</div>
            <div className="w-[500px]">Mileage Rate (BDT)</div>
            <div className="flex-1 text-center">Action</div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            {mileageRates.map((row, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-[500px]">
                  <HrInput
                    type="date"
                    name="startDate"
                    value={row.startDate}
                    onChange={(e) => handleRateChange(index, e)}
                  />
                </div>
                <div className="w-[500px]">
                  <HrInput
                    type="number"
                    name="rate"
                    value={row.rate}
                    onChange={(e) => handleRateChange(index, e)}
                  />
                </div>
                <div className="flex-1 text-center">
                  <Button onClick={() => removeRate(index)} className="bg-white hover:bg-white cursor-pointer">
                    <Trash2 className="text-red-700" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex mt-4">
            <p onClick={addRate} className="text-blue-600 cursor-pointer">
              Add Mileage Rate ↴
            </p>
          </div>
        </div>

        <div className="flex fixed right-4  bottom-4 items-center    rounded sm:px-4 md:px-6 z-50">
          <Button type="submit">Save Expenses</Button>
        </div>

      </form>

      {/* Show saved data table */}
      {savedData.length > 0 && <MileageTable data={savedData} />}
    </div>
  );
}
