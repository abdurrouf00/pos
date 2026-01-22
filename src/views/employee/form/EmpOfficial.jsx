"use client";
import HrInput from "@/components/common/HrInput";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OfficialInfo = ({ basicEmployeeData, handleChange, loading, errors }) => {
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);

  const { workingShiftData } = useSelector((state) => state.workingShift);
  const { designationData } = useSelector((state) => state.designation);
  const { departmentData } = useSelector((state) => state.department);
  const { employeeCategoryData } = useSelector(
    (state) => state.employeeCategory
  );
  const { jobTypeData } = useSelector((state) => state.jobType);
  const { divisionData } = useSelector((state) => state.division);
  const { sectionData } = useSelector((state) => state.section);
  const { payScaleData } = useSelector((state) => state.payScale);
  const { paymentTypeData } = useSelector((state) => state.paymentType);
  const { projectData } = useSelector((state) => state.project);

  return (
    <>
      <div className="relative items-center block   rounded-lg  dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 w-full rounded-md p-2">
          <HrSelect
            label="Working Shift"
            name="working_shift"
            value={basicEmployeeData?.working_shift ?? ""}
            onChange={handleChange}
            placeholder="Select working shift"
            options={mapOptions(workingShiftData)}
          />
          <HrInput
            label="Device ID"
            name="device_id"
            value={basicEmployeeData?.device_id ?? ""}
            onChange={handleChange}
            type="number"
            placeholder="Enter device ID"
          />
          <HrInput
            label="Device EMP ID"
            name="device_emp_id"
            value={basicEmployeeData?.device_emp_id ?? ""}
            onChange={handleChange}
            type="number"
            placeholder="Enter device EMP ID"
          />
          <HrInput
            label="Serial Number"
            name="serial_number"
            value={basicEmployeeData?.serial_number ?? ""}
            onChange={handleChange}
            type="number"
            placeholder="Enter serial number"
          />
          <HrSelect
            label="Current Status"
            name="current_status"
            value={basicEmployeeData?.current_status ?? ""}
            onChange={handleChange}
            placeholder="Select current status"
            options={[
              { value: "0", label: "Inactive" },
              { value: "1", label: "Active" },
              { value: "2", label: "Resigned" },
            ]}
          />
          <HrSelect
            label="Designation"
            name="designation_id"
            value={basicEmployeeData?.designation_id ?? ""}
            onChange={handleChange}
            placeholder="Select designation"
            options={mapOptions(designationData)}
            aria-invalid={
              errors?.designation_id && !basicEmployeeData?.designation_id
            }
          />
          <HrSelect
            label="Department"
            name="department_id"
            value={basicEmployeeData?.department_id ?? ""}
            onChange={handleChange}
            placeholder="Select department"
            options={mapOptions(departmentData)}
            aria-invalid={
              errors?.department_id && !basicEmployeeData?.department_id
            }
          />
          <HrSelect
            label="Employee Category"
            name="employee_category"
            value={basicEmployeeData?.employee_category ?? ""}
            onChange={handleChange}
            placeholder="Select employee category"
            options={mapOptions(employeeCategoryData)}
          />
          <HrSelect
            label="Job Type"
            name="job_type"
            value={basicEmployeeData?.job_type ?? ""}
            onChange={handleChange}
            placeholder="Select job type"
            options={mapOptions(jobTypeData)}
          />
          <HrInput
            label="Proximity Card Number"
            name="proximit_card_number"
            value={basicEmployeeData?.proximit_card_number ?? ""}
            onChange={handleChange}
            type="number"
            placeholder="Enter proximit card number"
          />
          <HrSelect
            label="Bonous Activation"
            name="bonous_activation"
            value={basicEmployeeData?.bonous_activation ?? ""}
            onChange={handleChange}
            placeholder="Enter bonnous activation"
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
          />
          <HrSelect
            label="PF Status"
            name="pf_status"
            value={basicEmployeeData?.pf_status ?? ""}
            onChange={handleChange}
            placeholder="Select pf status"
            options={[
              { value: 0, label: "Active" },
              { value: 1, label: "Inactive" },
            ]}
          />
          <HrSelect
            label="Project"
            name="project_id"
            value={basicEmployeeData?.project_id ?? ""}
            onChange={handleChange}
            placeholder="Select project"
            options={mapOptions(projectData)}
          />
          <HrSelect
            label="Division"
            name="division_id"
            value={basicEmployeeData?.division_id ?? ""}
            onChange={handleChange}
            placeholder="Select division"
            options={mapOptions(divisionData)}
          />
          <HrSelect
            label="Section"
            name="section"
            value={basicEmployeeData?.section ?? ""}
            onChange={handleChange}
            placeholder="Select section"
            options={mapOptions(sectionData)}
          />
          <HrInput
            label="Location"
            name="location"
            value={basicEmployeeData?.location ?? ""}
            onChange={handleChange}
            placeholder="Enter location"
          />

          <HrInput
            label="Cost Center"
            name="cost_center"
            value={basicEmployeeData?.cost_center ?? ""}
            onChange={handleChange}
            placeholder="Enter cost center"
            type="number"
          />
          <HrInput
            label="Previous Company"
            name="previous_company"
            value={basicEmployeeData?.previous_company ?? ""}
            onChange={handleChange}
            placeholder="Enter previous company"
          />
          <HrInput
            label="Investment Amount"
            name="investment_amount"
            value={basicEmployeeData?.investment_amount ?? ""}
            onChange={handleChange}
            type="number"
            placeholder="Enter investment amount"
          />
          <HrInput
            label="Other TDS"
            name="others_tds"
            value={basicEmployeeData?.others_tds ?? ""}
            onChange={handleChange}
            type="number"
            placeholder="Enter other tds"
          />
          <HrInput
            label="Ait Car"
            name="ait_car"
            value={basicEmployeeData?.ait_car ?? ""}
            onChange={handleChange}
            type="number"
            placeholder="Enter ait card number"
          />
          <HrInput
            label="Joinning Date"
            name="joining_date"
            value={basicEmployeeData?.joining_date ?? ""}
            onChange={handleChange}
            type="date"
            placeholder="Enter joining date"
          />
          <HrSelect
            label="Pay Scale"
            name="pay_scale"
            value={basicEmployeeData?.pay_scale ?? ""}
            onChange={handleChange}
            placeholder="Select pay scale"
          >
            {payScaleData?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </HrSelect>
          <HrInput
            label="Basic Salary"
            name="basic_salary"
            value={basicEmployeeData?.basic_salary ?? ""}
            onChange={handleChange}
            placeholder="Enter basic salary"
            type="number"
            aria-invalid={
              errors?.basic_salary && !basicEmployeeData?.basic_salary
            }
          />
          <HrSelect
            label="Payment Type"
            name="payment_type_id"
            value={basicEmployeeData?.payment_type_id ?? ""}
            onChange={handleChange}
            placeholder="Select payment type"
            options={mapOptions(paymentTypeData)}
          />
          <HrSelect
            label="Over Time Limit"
            name="has_overtime"
            value={basicEmployeeData?.has_overtime ?? ""}
            onChange={handleChange}
            placeholder="Select over time limit"
            options={[
              { value: "1", label: "Yes" },
              { value: "0", label: "No" },
            ]}
          />
          <HrInput
            label="Overtime Rate"
            name="overtime_rate"
            value={basicEmployeeData?.overtime_rate ?? ""}
            onChange={handleChange}
            type="number"
            placeholder="Enter overtime rate"
          />
          <HrInput
            label="Minimum Overtime Minutes"
            name="min_overtime_minutes"
            value={basicEmployeeData?.min_overtime_minutes ?? ""}
            onChange={handleChange}
            type="number"
            placeholder="Enter minimum overtime minutes"
          />
        </div>
        {formLoading && (
          <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default OfficialInfo;
