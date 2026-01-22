"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";

export default function AccountCreateForm() {
  const [formData, setFormData] = useState({
    accountOwner: "",
    accountName: "",
    accountSite: "",
    parentAccount: "",
    accountNumber: "",
    accountType: "",
    industry: "",
    annualRevenue: "",
    rating: "",
    phone: "",
    fax: "",
    website: "",
    tickerSymbol: "",
    ownership: "",
    employees: "",
    sicCode: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingCode: "",
    billingCountry: "",
    shippingStreet: "",
    shippingCity: "",
    shippingState: "",
    shippingCode: "",
    shippingCountry: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Account Data:", formData);
    alert("Account Created Successfully ✅");
  };

  return (
    <div className="bg-white rounded-md p-6 space-y-6 min-h-screen">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6">
        Create New Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Account Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Account Information
          </h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <HrInput
              label="Account Owner"
              name="accountOwner"
              value={formData.accountOwner}
              onChange={handleChange}
            />
            <HrInput
              label="Account Name"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
            />
            <HrInput
              label="Account Site"
              name="accountSite"
              value={formData.accountSite}
              onChange={handleChange}
            />
            <HrInput
              label="Parent Account"
              name="parentAccount"
              value={formData.parentAccount}
              onChange={handleChange}
            />
            <HrInput
              label="Account Number"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
            />
            <HrSelect
              label="Account Type"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              options={[
                { value: "", label: "--None--" },
                { value: "Customer", label: "Customer" },
                { value: "Partner", label: "Partner" },
                { value: "Prospect", label: "Prospect" },
              ]}
            />
            <HrSelect
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              options={[
                { value: "", label: "--None--" },
                { value: "IT", label: "IT" },
                { value: "Finance", label: "Finance" },
              ]}
            />
            <HrInput
              label="Annual Revenue ($)"
              name="annualRevenue"
              type="number"
              value={formData.annualRevenue}
              onChange={handleChange}
            />
            <HrSelect
              label="Rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              options={[
                { value: "", label: "--None--" },
                { value: "Hot", label: "Hot" },
                { value: "Warm", label: "Warm" },
                { value: "Cold", label: "Cold" },
              ]}
            />
            <HrInput
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <HrInput
              label="Fax"
              name="fax"
              value={formData.fax}
              onChange={handleChange}
            />
            <HrInput
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
            <HrInput
              label="Ticker Symbol"
              name="tickerSymbol"
              value={formData.tickerSymbol}
              onChange={handleChange}
            />
            <HrSelect
              label="Ownership"
              name="ownership"
              value={formData.ownership}
              onChange={handleChange}
              options={[
                { value: "", label: "--None--" },
                { value: "Private", label: "Private" },
                { value: "Public", label: "Public" },
              ]}
            />
            <HrInput
              label="Employees"
              name="employees"
              type="number"
              value={formData.employees}
              onChange={handleChange}
            />
            <HrInput
              label="SIC Code"
              name="sicCode"
              value={formData.sicCode}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Address Information
          </h3>

          <h4 className="text-md font-medium text-gray-600 mb-2">
            Billing Address
          </h4>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <HrInput
              label="Street"
              name="billingStreet"
              value={formData.billingStreet}
              onChange={handleChange}
            />
            <HrInput
              label="City"
              name="billingCity"
              value={formData.billingCity}
              onChange={handleChange}
            />
            <HrInput
              label="State"
              name="billingState"
              value={formData.billingState}
              onChange={handleChange}
            />
            <HrInput
              label="Postal Code"
              name="billingCode"
              value={formData.billingCode}
              onChange={handleChange}
            />
            <HrInput
              label="Country"
              name="billingCountry"
              value={formData.billingCountry}
              onChange={handleChange}
            />
          </div>

          <h4 className="text-md font-medium text-gray-600 mt-4 mb-2">
            Shipping Address
          </h4>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <HrInput
              label="Street"
              name="shippingStreet"
              value={formData.shippingStreet}
              onChange={handleChange}
            />
            <HrInput
              label="City"
              name="shippingCity"
              value={formData.shippingCity}
              onChange={handleChange}
            />
            <HrInput
              label="State"
              name="shippingState"
              value={formData.shippingState}
              onChange={handleChange}
            />
            <HrInput
              label="Postal Code"
              name="shippingCode"
              value={formData.shippingCode}
              onChange={handleChange}
            />
            <HrInput
              label="Country"
              name="shippingCountry"
              value={formData.shippingCountry}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Description Information
          </h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter description..."
            className="w-full border border-gray-300 rounded-md p-3"
          />
        </div>

        {/* Submit */}
        <div className="text-right mt-6">
          <Button type="submit">Save Account</Button>
        </div>
      </form>
    </div>
  );
}
