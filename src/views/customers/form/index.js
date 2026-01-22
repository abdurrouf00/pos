"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import TopForm from "./topForm";
import OtherDetails from "./otherDetails";
import Address from "./address";
import ContactPerson from "./ContactPerson";
import ReaportingTags from "./reaportingTags";
import CustomerFields from "./customerFields";
import Remarks from "./remarks";
import CustomerTable from "../list/table.jsx"; // 🔹 Import Table

const tabs = [
  "Other Details",
  "Address",
  "Contact Persons",
  "Custom Fields",
  "Reporting Tags",
  "Remarks",
];

const CustomerForm = () => {
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
      alert("Form submitted successfully!");

      // 🔹 Save to localStorage
      const existing = JSON.parse(localStorage.getItem("customers") || "[]");
      localStorage.setItem("customers", JSON.stringify([...existing, data]));

      // Reset form & tab
      reset();
      setActiveTab(0);
    }, 1000);
  };

  return (
    <div className="flex flex-col ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 overflow-y-auto  bg-white  p-6 rounded relative"
      >
        <TopForm register={register} errors={errors} />

        <div className="flex space-x-6 border-b pb-2 mb-1 sticky top-0 bg-white z-10">
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

        <div className=" pb-24">
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

export default CustomerForm;
