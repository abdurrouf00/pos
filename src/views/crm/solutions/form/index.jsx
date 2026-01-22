'use client';

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";

export default function SolutionForm() {
  const [formData, setFormData] = useState({
    solutionNumber: "",
    solutionTitle: "",
    status: "",
    solutionOwner: "admin",
    productName: "",
    question: "",
    answer: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.solutionNumber || !formData.solutionTitle || !formData.answer) {
      setErrorMsg("Please fill all required (*) fields.");
      return;
    }

    setErrorMsg("");

    const solutionToSave = { ...formData };
    const existingSolutions = JSON.parse(localStorage.getItem("submittedSolutions") || "[]");
    const updatedSolutions = [...existingSolutions, solutionToSave];
    localStorage.setItem("submittedSolutions", JSON.stringify(updatedSolutions));

    // reset
    setFormData({
      solutionNumber: "",
      solutionTitle: "",
      status: "",
      solutionOwner: "admin",
      productName: "",
      question: "",
      answer: "",
    });

    alert("✅ Solution Created Successfully!");
  };

  return (
    <div className="bg-white p-6 rounded min-h-screen space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errorMsg && <p className="text-red-500 font-medium">{errorMsg}</p>}

        {/* Solution Information */}
        <div className=" p-4 space-y-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800  pb-2">
            Solution Information
          </h3>

          <div className="grid md:grid-cols-2 grid-cols-2 gap-2">
            <HrInput
              name="solutionNumber"
              value={formData.solutionNumber}
              onChange={handleChange}
              placeholder="Solution Number"
              label="Solution Number"
            />

            <HrInput
              name="solutionTitle"
              value={formData.solutionTitle}
              onChange={handleChange}
              placeholder="Solution Title"
              label="Solution Title"
            />

            <HrSelect
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
              placeholder="Select Status"
              options={[
                { value: "draft", label: "Draft" },
                { value: "published", label: "Published" },
                { value: "review", label: "Under Review" },
              ]}
            />

            <HrInput
              name="solutionOwner"
              value={formData.solutionOwner}
              onChange={handleChange}
              placeholder="Solution Owner"
              label="Solution Owner"
              readOnly
            />

            <HrInput
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Product Name"
              label="Product Name"
            />
          </div>
        </div>

        {/* Description Information */}
        <div className=" p-4 space-y-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800  pb-2">
            Description Information
          </h3>

          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            row="2"
            placeholder="Write the question here..."
            className="w-full  border rounded p-2"
          />

          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            row="2"
            placeholder="Write the answer or solution here..."
            className="w-full  border rounded p-2"
          />
        </div>

        {/* Submit Button */}
        <div className="text-right mr-4">
          <Button type="submit">Save Solution</Button>
        </div>
      </form>
    </div>
  );
}
