"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";



import EmployeeTabs from "./EmployeeTabs";
import NewCustomReport from "./selectReport"
import GeneralInfo from "./genarel"
import SelectQuote from "./columnShow";
import ReportLayout from "./reportLayout";
import ReportPreferences from "./reportPreferences";

const tabs = [
  "New Custom Report",
  "General",
  "Select Quote",
  "Report Layout",
  "Report Preferences",
  

];

const formErrorsTabNumber = {
  name: 0,
  department_id: 1,
  designation_id: 1,
  nid_no: 0,
  basic_salary: 1,
  role_id: 5,
  email: 0,
  password: 5,
};

const EmployeeForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [basicEmployeeData, setBasicEmployeeData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitClicked, setSubmitClicked] = useState(false);

  // fild change handle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBasicEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  // tab nevigation
  const handleNextMove = () => setActiveTab((prev) => prev + 1);
  const handlePreviousMove = () => setActiveTab((prev) => prev - 1);

  // form submit 
  const onSubmit = async (data) => {
    try {
      setSubmitClicked(true);
      setLoading(true);
      
      toast.success("Form Submitted!");
    } catch (error) {
      toast.error("Failed to submit form!");
    } finally {
      setLoading(false);
      setSubmitClicked(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 overflow-y-auto py-6 bg-white  rounded">
      {/* Tabs */}
      <EmployeeTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      {/* Tab Content */}
      <div>
        {activeTab === 0 && (
          <NewCustomReport
            basicEmployeeData={basicEmployeeData}
            handleChange={handleChange}
            loading={loading}
            errors={errors}
          />
        )}
       
        {activeTab === 1 && (
          <GeneralInfo
            basicEmployeeData={basicEmployeeData}
            handleChange={handleChange}
            loading={loading}
            errors={errors}
          />
        )} {activeTab === 2 && (
          <SelectQuote
            basicEmployeeData={basicEmployeeData}
            handleChange={handleChange}
            loading={loading}
            errors={errors}
          />
        )} {activeTab === 3 && (
          <ReportLayout
            basicEmployeeData={basicEmployeeData}
            handleChange={handleChange}
            loading={loading}
            errors={errors}
          />
        )}
      
        {activeTab === 4 && (
          <ReportPreferences
            basicEmployeeData={basicEmployeeData}
            handleChange={handleChange}
            loading={loading}
            errors={errors}
          />
        )}
      
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-start gap-2 fixed bottom-0 bg-gray-200 p-2 w-full ">
        {activeTab > 0 && (
          <Button
            variant="outline"
            onClick={handlePreviousMove}
            disabled={loading || submitClicked}
          >
            Previous
          </Button>
        )}
        {activeTab === tabs.length - 1 && (
          <Button onClick={() => onSubmit(basicEmployeeData)} disabled={loading || submitClicked}>
            {loading || submitClicked ? "Submitting..." : "Save"}
          </Button>
        )}
        {activeTab < tabs.length - 1 && (
          <Button onClick={handleNextMove} disabled={loading || submitClicked}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmployeeForm;
 