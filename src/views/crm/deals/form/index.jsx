"use client";

import { useState } from "react";
import Image from "next/image";
import { GoPersonFill } from "react-icons/go";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";

export default function ContactCreateForm() {
  const [formData, setFormData] = useState({
    dealOwner: "",
    dealName: "",
    accountName: "",
    type: "",
    nextStep: "",
    leadSource: "",
    contactName: "",
    amount: "",
    closingDate: "",
    pipeline: "",
    stage: "",
    probability: "",
    expectedRevenue: "",
    campaignSource: "",
    forecastCategory: "",
    description: "",
  });

  const [preview, setPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Handle Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Select Change
  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    alert("✅ Contact Created Successfully!");

    // Reset
    setFormData({
      dealOwner: "",
      dealName: "",
      accountName: "",
      type: "",
      nextStep: "",
      leadSource: "",
      contactName: "",
      amount: "",
      closingDate: "",
      pipeline: "",
      stage: "",
      probability: "",
      expectedRevenue: "",
      campaignSource: "",
      forecastCategory: "",
      description: "",
    });
    setPreview(null);
  };

  return (
    <div className="bg-white p-6 rounded min-h-screen space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
       
        {/* Contact Image */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            Contact Image
          </h3>
          <div className="flex items-center gap-6 overflow-hidden">
            <input
              id="contactImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
               <label
                htmlFor="dealprofile"
                className="relative w-15 h-15 cursor-pointer group"
              >
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile"
                  fill
                  className="object-cover rounded-full border border-gray-300 group-hover:opacity-80 transition"
                />
              ) : (
                 <div className="w-15 h-15 rounded-full overflow-hidden border  border-gray-400 flex items-center justify-center text-gray-400 text-sm group-hover:bg-gray-50 transition">
                    <GoPersonFill className="h-72 w-40 pt-5 " />
                  </div>
              )}
            </label>
          </div>
        </div>

        

        {/* Deal Information */}
        <h3 className="text-lg font-semibold text-gray-700">Deal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <HrInput
            label="Deal Owner"
            name="dealOwner"
            value={formData.dealOwner}
            onChange={handleChange}
            required
            placeholder="Enter deal owner"
          />
          <HrInput
            label="Deal Name"
            name="dealName"
            value={formData.dealName}
            onChange={handleChange}
            required
            placeholder="Enter deal name"
          />
          <HrInput
            label="Account Name "
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            required
            placeholder="Account name"
          />
          <HrSelect
            label="Type"
            name="type"
            value={formData.type}
            onChange={(e) => handleSelectChange("type", e.target.value)}
            placeholder="Select Type"
            options={[
              { value: "Existing Business", label: "Existing Business" },
              { value: "New Business", label: "New Business" },
            ]}
          />
          <HrInput
            label="Next Step"
            name="nextStep"
            value={formData.nextStep}
            onChange={handleChange}
            placeholder="Next step"
          />
          <HrSelect
            label="Lead Source"
            name="leadSource"
            value={formData.leadSource}
            onChange={(e) => handleSelectChange("leadSource", e.target.value)}
            placeholder="Select Source"
            options={[
              { value: "Sales Email Alias", label: "Sales Email Alias" },
              { value: "Employee Referral", label: "Employee Referral" },
              { value: "Web Research", label: "Web Research" },
              { value: "Cold Call", label: "Cold Call" },
              { value: "Partner", label: "Partner" },
              { value: "Advertisement", label: "Advertisement" },
            ]}
          />
          <HrInput
          label="Contact Name"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            placeholder="Enter contact name"
          />
          <HrInput
            label="Amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="e.g. 5000"
          />
          <HrInput
            label="Closing Date"
            name="closingDate"
            type="date"
            value={formData.closingDate}
            onChange={handleChange}
          />
          <HrInput
            label="Pipeline"
            name="pipeline"
            value={formData.pipeline}
            onChange={handleChange}
            placeholder="Pipeline name"
          />
          <HrSelect
            label="Stage"
            name="stage"
            value={formData.stage}
            onChange={(e) => handleSelectChange("stage", e.target.value)}
            options={[
              { value: "Qualification", label: "Qualification" },
              { value: "Needs Analysis", label: "Needs Analysis" },
              { value: "Proposal/Quote", label: "Proposal/Quote" },
              { value: "Negotiation/Review", label: "Negotiation/Review" },
              { value: "Closed Won", label: "Closed Won" },
              { value: "Closed Lost", label: "Closed Lost" },
            ]}
          />
          <HrInput
            label="Probability (%)"
            name="probability"
            value={formData.probability}
            onChange={handleChange}
            placeholder="0-100"
          />
          <HrInput
            label="Expected Revenue"
            name="expectedRevenue"
            value={formData.expectedRevenue}
            onChange={handleChange}
            placeholder="e.g. 12000"
          />
          <HrInput
            label="Campaign Source"
            name="campaignSource"
            value={formData.campaignSource}
            onChange={handleChange}
            placeholder="Campaign name"
          />
          <HrInput
            label="Forecast Category"
            name="forecastCategory"
            value={formData.forecastCategory}
            onChange={handleChange}
            placeholder="Forecast category"
          />
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Description</h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full border rounded-lg p-3 mt-2 h-24"
          />
        </div>
         {errorMsg && <p className="text-red-500 font-medium ">{errorMsg}</p>}


        {/* Submit */}
        <div className="text-right mt-6">
          <Button type="submit">Save Deal</Button>
        </div>
        
      </form>
    </div>
  );
}
