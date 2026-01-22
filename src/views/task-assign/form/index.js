"use client";
import { Button } from "@/components/ui/button";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import {
  getAllTaskAssign,
} from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";

const TaskAssignForm = (props) => {
  const userDataStr = Cookies.get("user_data");
  const userData = userDataStr ? JSON.parse(userDataStr) : null;
  // console.log("User data:", userData);

  const { setOpenForm, toggle } = props;
  const { basicTaskAssignData } = useSelector(({ taskAssign }) => taskAssign);
  const { employeeData } = useSelector(({ employee }) => employee);
  const dispatch = useDispatch();
  const {
    id,
    name,
    priority,
    status,
    assign_to,
    assign_by,
    assign_date,
    due_date,
    description,
  } = basicTaskAssignData;

  const handleSubmit = (e) => {
    const submittedData = {
      ...basicTaskAssignData,
      organization_id: userData?.organization_id,
      company_id: userData?.company_id,
    };
    // console.log("Form submitted:", submittedData);
    const action = id ? updateTaskAssign(submittedData) : addTaskAssign(submittedData);
    dispatch(action).then((res) => {
      setOpenForm(false);
      dispatch(getAllTaskAssign());
      toast.success("Loan Created successfully");
      dispatch(bindTaskAssignData(initialTaskAssignData));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindTaskAssignData({ ...basicTaskAssignData, [name]: value }));
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Loan" : "Add Loan"}
    >
      <div className="space-y-4 grid grid-cols-2 gap-4">
        <div>
          <HrSelect
            name="name"
            label="Name"
            placeholder="Select Name"
            value={name}
            onChange={(e) => {
              handleChange(e);
            }}
            required
            options={mapOptions(employeeData, "name", "id")}
          />
        </div>
        {/* <div>
          <HrSelect
            name="department_id"
            label="Department"
            placeholder="Select Department"
            value={department_id}
            onChange={(e) => {
              handleChange(e);
            }}
            options={mapOptions(salaryDesignData, "name", "id")}
          />
        </div>
        <div>
          <HrSelect
            name="designation_id"
            label="Designation"
            placeholder="Select Designation"
            value={designation_id}
            onChange={(e) => {
              handleChange(e);
            }}
            options={Array.from({ length: 40 }, (_, i) => ({
              label: 2025 + i,
              value: 2025 + i,
            }))}
          />
        </div>{" "}
        */}
        <div>
          <HrInput
            name="priority"
            label="Priority"
            placeholder="Enter Priority"
            value={priority}
            type="number"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <HrInput
            name="installment_amount"
            label="Installment Amount"
            placeholder="Select Installment Amount"
            value={installment_amount}
            type="number"
            onChange={(e) => {
              handleChange(e);
            }}
            options={Array.from({ length: 12 }, (_, i) => ({
              label: new Date(0, i).toLocaleString("default", {
                month: "long",
              }),
              value: i + 1,
            }))}
          />
        </div>
        <div>
          <HrInput
            name="installment_number"
            label="Installment Number"
            placeholder="Select Installment Number"
            value={installment_number}
            type="number"
            onChange={(e) => {
              handleChange(e);
            }}
            options={mapOptions(departmentData, "name", "id")}
          />
        </div>
        <div>
          <HrInput
            name="start_date"
            label="Start Date"
            placeholder="Select Start Date"
            value={start_date}
            type="date"
            onChange={(e) => {
              handleChange(e);
            }}
            options={mapOptions(designationData, "name", "id")}
          />
        </div>
        <div>
          <HrInput
            name="end_date"
            label="End Date"
            type="date"
            placeholder="Enter End Date"
            value={end_date}
            onChange={(e) => {
              handleChange(e);
            }}
            options={mapOptions(designationData, "name", "id")}
          />
        </div>
        <div className="flex justify-center col-span-2">
          <Button
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </HrModal>
  );
};

export default TaskAssignForm;
