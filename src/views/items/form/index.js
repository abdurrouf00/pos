"use client";

import { useState } from "react";
import Link from "next/link";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
import { salesAccounts, purchaseAccounts, unitsOptions } from "./constant";


export default function ProductSalesPurchaseForm() {
  const [formData, setFormData] = useState({
    type: "goods",
    name: "",
    unit: "",
    sellingPrice: "",
    salesAccount: "",
    salesDescription: "",
    salesTax: "",
    costPrice: "",
    purchaseAccount: "",
    purchaseDescription: "",
    purchaseTax: "",
    vendor: "",
  });

  const [selectedSections, setSelectedSections] = useState({
    sales: true,
    purchase: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSectionChange = (e) => {
    const { name, checked } = e.target;
    setSelectedSections({ ...selectedSections, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!selectedSections.sales && !selectedSections.purchase) {
      setErrorMsg("Select either Sales Information or Purchase Information or both.");
      return;
    }

    if (!formData.type || !formData.name || !formData.unit) {
      setErrorMsg("Please fill all Product Information required fields.");
      return;
    }

    if (selectedSections.sales) {
      if (!formData.sellingPrice || !formData.salesAccount) {
        setErrorMsg("Please fill all required fields in Sales Information.");
        return;
      }
    }

    if (selectedSections.purchase) {
      if (!formData.costPrice || !formData.purchaseAccount) {
        setErrorMsg("Please fill all required fields in Purchase Information.");
        return;
      }
    }

    setErrorMsg(""); // clear error

    const submitData = {
      product: {
        type: formData.type,
        name: formData.name,
        unit: formData.unit,
      },
      sales: selectedSections.sales
        ? {
          sellingPrice: formData.sellingPrice,
          salesAccount: formData.salesAccount,
          salesDescription: formData.salesDescription,
          salesTax: formData.salesTax,
        }
        : null,
      purchase: selectedSections.purchase
        ? {
          costPrice: formData.costPrice,
          purchaseAccount: formData.purchaseAccount,
          purchaseDescription: formData.purchaseDescription,
          purchaseTax: formData.purchaseTax,
          vendor: formData.vendor,
        }
        : null,
    };

    // Save to localStorage
    const existingItems = JSON.parse(localStorage.getItem("submittedItems") || "[]");
    const updatedItems = [...existingItems, submitData];
    localStorage.setItem("submittedItems", JSON.stringify(updatedItems));


    // Clear form
    setFormData({
      type: "goods",
      name: "",
      unit: "",
      sellingPrice: "",
      salesAccount: "",
      salesDescription: "",
      salesTax: "",
      costPrice: "",
      purchaseAccount: "",
      purchaseDescription: "",
      purchaseTax: "",
      vendor: "",
    });

    // reset sections
    setSelectedSections({ sales: true, purchase: true });
  };

  return (
    <div>
      {/* Header */}


      {/* Form */}
      <div className="w-full text-sm bg-white  p-10 ">
        <form onSubmit={handleSubmit} className=" w-full space-y-5">
          {errorMsg && <p className="text-red-500 font-medium">{errorMsg}</p>}

          {/* Product Information */}
          <div className="space-y-6 ">
            <h2 className="text-lg font-semibold">Product Information</h2>

            <div className="flex items-center gap-4">
              <label className="w-32">
                Type <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="goods"
                    checked={formData.type === "goods"}
                    onChange={handleChange}
                  />
                  Goods
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="service"
                    checked={formData.type === "service"}
                    onChange={handleChange}
                  />
                  Service
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">

              <HrInput
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                label="Name"
              />


              <HrSelect
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="Select Unit"
                options={unitsOptions}
                label="Unit"
              />
            </div>
          </div>


          {/* Sales & Purchase Section */}
          <div className="flex flex-col md:flex-row gap-16 w-full ">
            {/* Sales Section */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  name="sales"
                  checked={selectedSections.sales}
                  onChange={handleSectionChange}
                />
                <h3 className="text-lg font-semibold">Sales Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <HrInput
                  name="sellingPrice"
                  type="number"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  label="Selling Price (BDT)"
                />

                <HrSelect
                  name="salesAccount"
                  value={formData.salesAccount}
                  onChange={handleChange}
                  placeholder="Select Account"
                  options={salesAccounts}
                  label="Account"
                />

                <HrInput
                  name="salesDescription"
                  type="text"
                  value={formData.salesDescription}
                  onChange={handleChange}
                  label="Description"
                />


                <HrSelect
                  name="salesTax"
                  value={formData.salesTax}
                  onChange={handleChange}
                  placeholder="Select Tax"
                  label="Tax"
                />
              </div>
            </div>

            {/* Purchase Section */}
            <div className="flex-1 space-y-4 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  name="purchase"
                  checked={selectedSections.purchase}
                  onChange={handleSectionChange}
                />
                <h3 className="text-lg font-semibold">Purchase Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <HrInput
                  name="costPrice"
                  type="number"
                  value={formData.costPrice}
                  onChange={handleChange}
                  label="Cost Price (BDT)"
                />

                <HrSelect
                  name="purchaseAccount"
                  value={formData.purchaseAccount}
                  onChange={handleChange}
                  placeholder="Select Account"
                  options={purchaseAccounts}
                  label="Account"
                />


                <HrInput
                  name="purchaseDescription"
                  type="text"
                  value={formData.purchaseDescription}
                  onChange={handleChange}
                  label="Description"
                />

                <HrSelect
                  name="purchaseTax"
                  value={formData.purchaseTax}
                  onChange={handleChange}
                  placeholder="Select Tax"
                  label="Tax"
                />


                <HrInput
                  name="vendor"
                  type="text"
                  value={formData.vendor}
                  onChange={handleChange}
                  label="Preferred Vendor"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex fixed  right-4  items-center  gap-8  rounded sm:px-4 md:px-6 z-50">
            <Button type="submit">Save Information</Button>
          </div>
        </form>
        <div className="my-8 border-t border-gray-300"></div>

        <p className="text-xs text-gray-600 pl-10 pb-30 pt-10">
          Do you want to keep track of this item? Enable Inventory to view its stock based on the sales
          and purchase transactions you record for it. Go to <strong>Settings ➡ Preferences ➡ Items</strong> and enable inventory.
        </p>

      </div>
    </div>
  );
}
