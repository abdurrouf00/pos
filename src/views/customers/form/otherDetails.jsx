"use client";

import { useState } from "react";
import Link from "next/link";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function CompanyInfoForm() {
  const [formData, setFormData] = useState({
    tax_rate: "",
    company_id: "",
    currency: "",
    opening_balance: "",
    payment_terms: "",
    enable_portal: "",
    portal_language: "",
    documents: null,
    website_url: "",
    department: "",
    designation: "",
    skype: "",
    facebook: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [showMore, setShowMore] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company_id || !formData.currency) {
      setErrorMsg("Please fill required fields.");
      return;
    }
    setErrorMsg("");
    console.log("Submitted Data:", formData);
    // toast.success("Form Submitted Successfully!");
  };

  return (
    <div>
      <div className="w-full text-sm bg-white   pb-20">
        <div onSubmit={handleSubmit} className="pt-5 w-full">
          {errorMsg && <p className="text-red-500 font-medium">{errorMsg}</p>}

          <div className="space-y-6 ">
            <h2 className="text-lg font-semibold">Company Information</h2>

            {/* Always visible fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <HrInput
                name="tax_rate"
                type="number"
                value={formData.tax_rate}
                onChange={handleChange}
                label="Tax Rate"
              />

              <HrInput
                name="company_id"
                type="text"
                value={formData.company_id}
                onChange={handleChange}
                required
                label="Company ID"
              />

              <HrInput
                name="currency"
                type="text"
                value={formData.currency}
                onChange={handleChange}
                required
                label="Currency"
              />

              <HrInput
                name="opening_balance"
                type="number"
                value={formData.opening_balance}
                onChange={handleChange}
                label="Opening Balance"
              />

              <HrInput
                name="payment_terms"
                type="text"
                value={formData.payment_terms}
                onChange={handleChange}
                label="Payment Terms"
              />

              <HrSelect
                name="enable_portal"
                value={formData.enable_portal}
                onChange={handleChange}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                placeholder="Select option"
                label="Enable Portal?"
              />

              <HrInput
                name="portal_language"
                type="text"
                value={formData.portal_language}
                onChange={handleChange}
                label="Portal Language"
              />

              <HrInput
                name="documents"
                type="file"
                onChange={handleChange}
                label="Documents"
              />
            </div>

            {/* Add More Details button (hide after click) */}
            {!showMore && (
              <button
                className="px-4 py-2  text-blue-600 hover:text-blue-800 rounded mt-4"
                onClick={() => setShowMore(true)}
              >
                Add More Details
              </button>
            )}

            {/* Hidden fields */}
            {showMore && (
              <div className="space-y-4 mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <HrInput
                  name="website_url"
                  type="url"
                  value={formData.website_url}
                  onChange={handleChange}
                  label="Website URL"
                />

                <HrInput
                  name="department"
                  type="text"
                  value={formData.department}
                  onChange={handleChange}
                  label="Department"
                />

                <HrInput
                  name="designation"
                  type="text"
                  value={formData.designation}
                  onChange={handleChange}
                  label="Designation"
                />

                <HrInput
                  name="skype"
                  type="text"
                  value={formData.skype}
                  onChange={handleChange}
                  label="Skype Name/Number"
                />

                <HrInput
                  name="facebook"
                  type="text"
                  value={formData.facebook}
                  onChange={handleChange}
                  label="Facebook"
                />
              </div>
            )}
          </div>
        </div>

        {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      </div>
    </div>
  );
}
