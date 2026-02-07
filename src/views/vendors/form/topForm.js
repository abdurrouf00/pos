"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";


export default function CustomerForm() {
  const [formData, setFormData] = useState({
    customer_type: "Business",
    name: "",
    company_name: "",
    display_name: "",
    email: "",
    phone: "",
    mobile: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email) {
      setErrorMsg("Please fill required fields.");
      return;
    }

    setErrorMsg("");
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="  ">
      <h2 className="text-xl font-semibold mb-4">Customer Form</h2>
      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
      <div onSubmit={handleSubmit} className="space-y-6 ">

        {/* Primary Contact */}
        <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
          <HrInput
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            label='Primary Contact'
          />

          {/* Company Name */}
          <HrInput
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            label='Company Name'
          />

          {/* Display Name */}
          <HrInput
            name="display_name"
            value={formData.display_name}
            onChange={handleChange}
            label='Display Name'
          />

          {/* Email Address */}
          <HrInput
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            label='Email Address'
          />

          {/* Phone / Mobile */}

          <HrInput
            name="phone"
            placeholder="Phone / Mobile"
            value={formData.phone}
            onChange={handleChange}
            label='Phone / Mobile'
          />

        </div>



      </div>

    </div>
  );
};