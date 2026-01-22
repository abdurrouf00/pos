"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";

export default function CampaignCreateForm() {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    campaignOwner: "",
    campaignName: "",
    startDate: today,
    endDate: "",
    type: "",
    status: "",
    expectedRevenue: "",
    actualCost: "",
    numbersSent: "",
    budgetedCost: "",
    expectedResponse: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Campaign Data:", formData);
    alert("Campaign Created Successfully ✅");
    // reset
    setFormData({
      campaignOwner: "",
      campaignName: "",
      startDate: today,
      endDate: "",
      type: "",
      status: "",
      expectedRevenue: "",
      actualCost: "",
      numbersSent: "",
      budgetedCost: "",
      expectedResponse: "",
      description: "",
    });
  };

  return (
    <div className=" bg-white p-6 rounded min-h-screen space-y-4">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campaign Info */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <HrInput
            name="campaignOwner"
            value={formData.campaignOwner}
            onChange={handleChange}
            label="Campaign Owner"
            placeholder="Enter Campaign Owner"
            required
          />
          <HrInput
            name="campaignName"
            value={formData.campaignName}
            onChange={handleChange}
            label="Campaign Name"
            placeholder="Enter Campaign Name"
            required
          />
          <HrInput
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            label="Start Date"
          />
          <HrInput
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            label="End Date"
          />
          <HrSelect
            name="type"
            value={formData.type}
            onChange={handleChange}
            label="Type"
            options={[
              { value: "", label: "-None-" },
              { value: "Public Relations", label: "Public Relations" },
              { value: "Referral Program", label: "Referral Program" },
              { value: "Advertisement", label: "Advertisement" },
              { value: "Telemarketing", label: "Telemarketing" },
              { value: "Direct Mail", label: "Direct Mail" },
              { value: "Conference", label: "Conference" },
              { value: "Banner Ads", label: "Banner Ads" },
              { value: "Trade Show", label: "Trade Show" },
              { value: "Partners", label: "Partners" },
              { value: "Webinar", label: "Webinar" },
              { value: "Email", label: "Email" },
              { value: "Other", label: "Other" },
            ]}
          />
          <HrSelect
            name="status"
            value={formData.status}
            onChange={handleChange}
            label="Status"
            options={[
              { value: "", label: "-None-" },
              { value: "Planning", label: "Planning" },
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
              { value: "Completed", label: "Completed" },
            ]}
          />
          <HrInput
            name="expectedRevenue"
            value={formData.expectedRevenue}
            onChange={handleChange}
            label="Expected Revenue"
            placeholder="$"
          />
          <HrInput
            name="actualCost"
            value={formData.actualCost}
            onChange={handleChange}
            label="Actual Cost"
            placeholder="$"
          />
          <HrInput
            name="numbersSent"
            value={formData.numbersSent}
            onChange={handleChange}
            label="Numbers Sent"
          />
          <HrInput
            name="budgetedCost"
            value={formData.budgetedCost}
            onChange={handleChange}
            label="Budgeted Cost"
            placeholder="$"
          />
          <HrInput
            name="expectedResponse"
            value={formData.expectedResponse}
            onChange={handleChange}
            label="Expected Response"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter description"
            className="w-full border rounded p-2"
          />
        </div>

        {/* Submit */}
        <div className="text-right">
          <Button type="submit">Save Campaign</Button>
        </div>
      </form>
    </div>
  );
}
