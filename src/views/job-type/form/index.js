"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import { addJobType, bindJobTypeData, getAllJobTypes, initialJobTypeData, updateJobType } from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const JobTypeForm = (props) => {
  const { setOpenForm, toggle } = props;
  const { basicJobTypeData } = useSelector(({ jobType }) => jobType);
  const dispatch = useDispatch();
  const { id, name } = basicJobTypeData;

  const handleSubmit = (e) => {
    const action = id ? updateJobType(basicJobTypeData) : addJobType(basicJobTypeData);
    dispatch(action).then((res) => {
      setOpenForm(false);
      dispatch(getAllJobTypes());
      toast.success("Job Type Created successfully");
      dispatch(bindJobTypeData(initialJobTypeData));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindJobTypeData({ ...basicJobTypeData, [name]: value }));
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Job Type" : "Add Job Type"}
    >
      <div className="space-y-4">
        <div>
          <HrInput
            name="name"
            label="Name"
            placeholder="Enter job type name"
            value={name}
            onChange={(e) => { handleChange(e) }}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={() => { handleSubmit() }}>Submit</Button>
        </div>
      </div>
    </HrModal>
  );
}

export default JobTypeForm;