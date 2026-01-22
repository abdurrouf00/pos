'use client';

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";

export default function CaseForm() {
  const [formData, setFormData] = useState({
    caseNumber: "",
    productName: "",
    type: "",
    caseOrigin: "",
    relatedTo: "",
    accountName: "",
    dealName: "",
    phone: "",
    caseOwner: "",
    status: "",
    priority: "",
    caseReason: "",
    subject: "",
    reportedBy: "",
    email: "",
    description: "",
    internalComments: "",
    solution: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.caseNumber || !formData.productName || !formData.subject) {
      setErrorMsg("Please fill all required (*) fields.");
      return;
    }

    setErrorMsg("");

    const caseToSave = { ...formData };
    const existingCases = JSON.parse(localStorage.getItem("submittedCases") || "[]");
    const updatedCases = [...existingCases, caseToSave];
    localStorage.setItem("submittedCases", JSON.stringify(updatedCases));

    // reset form
    setFormData({
      caseNumber: "",
      productName: "",
      type: "",
      caseOrigin: "",
      relatedTo: "",
      accountName: "",
      dealName: "",
      phone: "",
      caseOwner: "",
      status: "",
      priority: "",
      caseReason: "",
      subject: "",
      reportedBy: "",
      email: "",
      description: "",
      internalComments: "",
      solution: "",
    });

    alert("✅ Case Created Successfully!");
  };

  return (
    <div className="bg-white p-6 rounded min-h-screen space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errorMsg && <p className="text-red-500 font-medium">{errorMsg}</p>}

        {/* Case Information */}
        <div className=" p-4 space-y-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800  pb-2">
            Case Information
          </h3>
          <div className="grid md:grid-cols-2 grid-cols-2 gap-2">
            <HrInput
              name="caseNumber"
              value={formData.caseNumber}
              onChange={handleChange}
              placeholder="Case Number"
              label="Case Number"
            />
            <HrInput
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Product Name"
              label="Product Name"
            />
            <HrSelect
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="Type"
              options={[
                { value: "none", label: "-None-" },
                { value: "problem", label: "Problem" },
                { value: "question", label: "Question" },
                { value: "feature_request", label: "Feature Request" },
              ]}
            />
            <HrSelect
              name="caseOrigin"
              value={formData.caseOrigin}
              onChange={handleChange}
              label="Case Origin"
              options={[
                { value: "none", label: "-None-" },
                { value: "email", label: "Email" },
                { value: "phone", label: "Phone" },
                { value: "web", label: "Web" },
              ]}
            />
            <HrInput
              name="relatedTo"
              value={formData.relatedTo}
              onChange={handleChange}
              placeholder="Related To"
              label="Related To"
            />
            <HrInput
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              placeholder="Account Name"
              label="Account Name"
            />
            <HrInput
              name="dealName"
              value={formData.dealName}
              onChange={handleChange}
              placeholder="Deal Name"
              label="Deal Name"
            />
            <HrInput
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              label="Phone"
            />
            <HrInput
              name="caseOwner"
              value={formData.caseOwner}
              onChange={handleChange}
              placeholder="Case Owner"
              label="Case Owner"
            />
            <HrSelect
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
              options={[
                { value: "new", label: "New" },
                { value: "in_progress", label: "In Progress" },
                { value: "on_hold", label: "On Hold" },
                { value: "closed", label: "Closed" },
              ]}
            />
            <HrSelect
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              label="Priority"
              options={[
                { value: "none", label: "-None-" },
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
              ]}
            />
            <HrSelect
              name="caseReason"
              value={formData.caseReason}
              onChange={handleChange}
              label="Case Reason"
              options={[
                { value: "none", label: "-None-" },
                { value: "installation", label: "Installation" },
                { value: "billing", label: "Billing" },
                { value: "software_bug", label: "Software Bug" },
                { value: "other", label: "Other" },
              ]}
            />
            <HrInput
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              label="Subject"
            />
            <HrInput
              name="reportedBy"
              value={formData.reportedBy}
              onChange={handleChange}
              placeholder="Reported By"
              label="Reported By"
            />
            <HrInput
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              label="Email"
            />
          </div>
        </div>

        {/* Description Information */}
        <div className=" p-4 space-y-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 pb-2">
            Description Information
          </h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            row="2"
            placeholder="Description"
            className="w-full  border rounded p-2"
          />
          <textarea
            name="internalComments"
            value={formData.internalComments}
            onChange={handleChange}
            row="2"
            placeholder="Internal Comments"
            className="w-full  border rounded p-2"
          />
        </div>

        {/* Solution Information */}
        <div className=" p-4 space-y-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800  pb-2">
            Solution Information
          </h3>
          <textarea
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            row="2"
            placeholder="Solution"
            className="w-full  border rounded p-2"
          />
        </div>

        {/* Submit Button */}
        <div className="text-right mr-4">
          <Button type="submit">Save Case</Button>
        </div>
      </form>
    </div>
  );
}
