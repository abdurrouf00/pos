"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import TopForm from "./topForm"; // ধরলাম একই ফর্ম ফিল্ড ব্যবহার হবে
import OtherDetails from "./otherDetails";
import Address from "./address";
import ContactPerson from "./ContactPerson";
import ReaportingTags from "./reaportingTags";
import CustomerFields from "./customerFields";
import Remarks from "./remarks";

const tabs = [
  "Other Details",
  "Address",
  "Contact Persons",
  "Custom Fields",
  "Reporting Tags",
  "Remarks",
];

const PurchasesForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [submitClicked, setSubmitClicked] = useState(false);

  const {
    handleSubmit,
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
    <div className="bg-white p-4 rounded space-y-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 overflow-y-auto py-6  px-4 rounded relative"
      >
        <TopForm register={register} errors={errors} />

        <div className="flex space-x-6 border-b pb-2 mb-4 sticky top-0 mt-4  z-10">
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

        <div className="">
          {activeTab === 0 && <OtherDetails register={register} errors={errors} />}
          {activeTab === 1 && <Address register={register} errors={errors} />}
          {activeTab === 2 && <ContactPerson register={register} errors={errors} />}
          {activeTab === 3 && <CustomerFields register={register} errors={errors} />}
          {activeTab === 4 && <ReaportingTags register={register} errors={errors} />}
          {activeTab === 5 && <Remarks register={register} errors={errors} />}
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t flex justify-end z-20">
          <Button type="submit" disabled={submitClicked}>
            {submitClicked ? "Submitting..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PurchasesForm;