"use client";
import HrInput from "@/components/common/HrInput";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import Loading from "@/components/ui/loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee } from "../store";

const PersonalInfo = ({ basicEmployeeData, handleChange, loading }) => {
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const { employeeData } = useSelector((state) => state.employee);

  useEffect(() => {
    const loadAllData = async () => {
      setFormLoading(true);
      try {
        const params = {
          page: 1,
          per_page: 1000,
          department_id: basicEmployeeData?.department_id,
        };
        await Promise.all([dispatch(getAllEmployee(params))]);
      } finally {
        setFormLoading(false);
      }
    };

    loadAllData();
  }, [dispatch]);

  if (loading || formLoading) return <Loading />;

  return (
    <div className="relative items-center block   dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-3  gap-4 w-full p-2 rounded-md">
        <HrInput
          label="Bank Name"
          name="bank_name"
          value={basicEmployeeData?.bank_name ?? ""}
          onChange={handleChange}
          placeholder="Enter bank name"
        />
        <HrInput
          label="Branch Name"
          name="branch_name"
          value={basicEmployeeData?.branch_name ?? ""}
          onChange={handleChange}
          placeholder="Enter branch name"
        />
        <HrInput
          label="Account Number"
          name="account_number"
          type="number"
          value={basicEmployeeData?.account_number ?? ""}
          onChange={handleChange}
          placeholder="Enter account number"
        />
        {/* <HrInput
          label="Account Name"
          name="account_name"
          value={basicEmployeeData?.account_name ?? ""}
          onChange={handleChange}
          type="number"
          placeholder="Enter account name"
        /> */}
        <HrInput
          label="Resign Date"
          name="resign_date"
          value={basicEmployeeData?.resign_date ?? ""}
          onChange={handleChange}
          type="date"
          placeholder="Enter resign date"
        />
        <HrInput
          label="From Probition"
          name="from_probition_date"
          value={basicEmployeeData?.from_probition_date ?? ""}
          onChange={handleChange}
          type="date"
          placeholder="Enter from probition"
        />
        <HrInput
          label="To Probition"
          name="to_probition_date"
          value={basicEmployeeData?.to_probition_date ?? ""}
          onChange={handleChange}
          placeholder="Enter to probition"
          type="date"
        />

        <HrInput
          label="Confirmation Date"
          name="confirm_date"
          value={basicEmployeeData?.confirm_date ?? ""}
          onChange={handleChange}
          type="date"
          placeholder="Enter confirmation date"
        />
        <HrSelect
          label="Probition Month"
          name="probition_month"
          value={basicEmployeeData?.probition_month ?? ""}
          onChange={handleChange}
          placeholder="Select month"
          options={[
            { value: "1", label: "January" },
            { value: "2", label: "February" },
            { value: "3", label: "March" },
            { value: "4", label: "April" },
            { value: "5", label: "May" },
            { value: "6", label: "June" },
            { value: "7", label: "July" },
            { value: "8", label: "August" },
            { value: "9", label: "September" },
            { value: "10", label: "October" },
            { value: "11", label: "November" },
            { value: "12", label: "December" },
          ]}
        />
        <HrInput
          label="Retirement Date"
          name="retirement_date"
          value={basicEmployeeData?.retirement_date ?? ""}
          onChange={handleChange}
          type="date"
          placeholder="Enter retirement date"
        />

        <HrInput
          label="Card In Number"
          name="card_in_number"
          value={basicEmployeeData?.card_in_number ?? ""}
          onChange={handleChange}
          type="number"
          placeholder="Enter card in number"
        />
        <HrInput
          label="TIN Number"
          name="tin_no"
          value={basicEmployeeData?.tin_no ?? ""}
          onChange={handleChange}
          type="number"
          placeholder="Enter tin number"
        />
        <HrInput
          label="Current Salary"
          name="current_salary"
          value={basicEmployeeData?.current_salary ?? ""}
          onChange={handleChange}
          type="number"
          placeholder="Enter current salary"
        />
        <HrSelect
          label="Report To"
          name="report_to"
          value={basicEmployeeData?.report_to ?? ""}
          onChange={handleChange}
          placeholder="Select employee"
          options={mapOptions(employeeData)}
        />
        <HrSelect
          label="Recommended By"
          name="recommended_by"
          value={basicEmployeeData?.recommended_by ?? ""}
          onChange={handleChange}
          placeholder="Select employee"
          options={mapOptions(employeeData)}
        />
        <HrSelect
          label="Approved By"
          name="approved_by"
          value={basicEmployeeData?.approved_by ?? ""}
          onChange={handleChange}
          placeholder="Select employee"
        >
          {employeeData?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </HrSelect>
      </div>
    </div>
  );
};

export default PersonalInfo;
