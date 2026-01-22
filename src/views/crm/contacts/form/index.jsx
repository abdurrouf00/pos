"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";

export default function ContactCreateForm() {
  const [formData, setFormData] = useState({
    contactOwner: "",
    firstName: "",
    lastName: "",
    title: "",
    accountName: "",
    company: "",
    phone: "",
    otherPhone: "",
    mobile: "",
    assistant: "",
    leadSource: "",
    department: "",
    homePhone: "",
    fax: "",
    dob: "",
    asstPhone: "",
    skype: "",
    secondaryEmail: "",
    twitter: "",
    reportingTo: "",
    mailingStreet: "",
    mailingCity: "",
    mailingState: "",
    mailingZip: "",
    mailingCountry: "",
    otherStreet: "",
    otherCity: "",
    otherState: "",
    otherZip: "",
    otherCountry: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Data:", formData);
    alert("Contact Created Successfully ✅");
    setFormData({
      contactOwner: "",
      firstName: "",
      lastName: "",
      title: "",
      accountName: "",
      company: "",
      phone: "",
      otherPhone: "",
      mobile: "",
      assistant: "",
      leadSource: "",
      department: "",
      homePhone: "",
      fax: "",
      dob: "",
      asstPhone: "",
      skype: "",
      secondaryEmail: "",
      twitter: "",
      reportingTo: "",
      mailingStreet: "",
      mailingCity: "",
      mailingState: "",
      mailingZip: "",
      mailingCountry: "",
      otherStreet: "",
      otherCity: "",
      otherState: "",
      otherZip: "",
      otherCountry: "",
      description: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded min-h-screen space-y-4">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6">Create New Contact</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Contact Information */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <HrInput
            name="contactOwner"
            value={formData.contactOwner}
            onChange={handleChange}
            label="Contact Owner"
          />
          <HrInput
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            label="First Name"
          />
          <HrInput
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            label="Last Name"
          />
          <HrInput
            name="title"
            value={formData.title}
            onChange={handleChange}
            label="Title"
          />
          <HrInput
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            label="Account Name"
          />
          <HrInput
            name="company"
            value={formData.company}
            onChange={handleChange}
            label="Company"
          />
          <HrInput
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            label="Phone"
          />
          <HrInput
            name="otherPhone"
            value={formData.otherPhone}
            onChange={handleChange}
            label="Other Phone"
          />
          <HrInput
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            label="Mobile"
          />
          <HrInput
            name="assistant"
            value={formData.assistant}
            onChange={handleChange}
            label="Assistant"
          />
          <HrInput
            name="department"
            value={formData.department}
            onChange={handleChange}
            label="Department"
          />
          <HrInput
            name="homePhone"
            value={formData.homePhone}
            onChange={handleChange}
            label="Home Phone"
          />
          <HrInput
            name="fax"
            value={formData.fax}
            onChange={handleChange}
            label="Fax"
          />
          <HrInput
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            label="Date of Birth"
            type="date"
          />
          <HrInput
            name="asstPhone"
            value={formData.asstPhone}
            onChange={handleChange}
            label="Assistant Phone"
          />
          <HrInput
            name="skype"
            value={formData.skype}
            onChange={handleChange}
            label="Skype ID"
          />
          <HrInput
            name="secondaryEmail"
            value={formData.secondaryEmail}
            onChange={handleChange}
            label="Secondary Email"
            type="email"
          />
          <HrInput
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            label="Twitter"
            placeholder="@"
          />
          <HrInput
            name="reportingTo"
            value={formData.reportingTo}
            onChange={handleChange}
            label="Reporting To"
          />
          <HrSelect
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            label="Lead Source"
            options={[
              { value: "", label: "--None--" },
              { value: "Advertisement", label: "Advertisement" },
              { value: "Partner", label: "Partner" },
              { value: "Chat", label: "Chat" },
              { value: "Facebook", label: "Facebook" },
              { value: "Cold Call", label: "Cold Call" },
            ]}
          />
        </div>

        {/* Mailing Address */}
        <h3 className="text-xl font-semibold mt-5">Mailing Address</h3>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <HrInput
            name="mailingStreet"
            value={formData.mailingStreet}
            onChange={handleChange}
            label="Street"
          />
          <HrInput
            name="mailingCity"
            value={formData.mailingCity}
            onChange={handleChange}
            label="City"
          />
          <HrInput
            name="mailingState"
            value={formData.mailingState}
            onChange={handleChange}
            label="State"
          />
          <HrInput
            name="mailingZip"
            value={formData.mailingZip}
            onChange={handleChange}
            label="Zip"
          />
          <HrInput
            name="mailingCountry"
            value={formData.mailingCountry}
            onChange={handleChange}
            label="Country"
          />
        </div>

        {/* Other Address */}
        <h3 className="text-xl font-semibold mt-5">Other Address</h3>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <HrInput
            name="otherStreet"
            value={formData.otherStreet}
            onChange={handleChange}
            label="Street"
          />
          <HrInput
            name="otherCity"
            value={formData.otherCity}
            onChange={handleChange}
            label="City"
          />
          <HrInput
            name="otherState"
            value={formData.otherState}
            onChange={handleChange}
            label="State"
          />
          <HrInput
            name="otherZip"
            value={formData.otherZip}
            onChange={handleChange}
            label="Zip"
          />
          <HrInput
            name="otherCountry"
            value={formData.otherCountry}
            onChange={handleChange}
            label="Country"
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
          <Button type="submit">Save Contact</Button>
        </div>
      </form>
    </div>
  );
}
