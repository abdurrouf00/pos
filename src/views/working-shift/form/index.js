"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import { addWorkingShift, bindWorkingShiftData, getAllWorkingShifts, initialWorkingShiftData, updateWorkingShift } from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const WorkingShiftForm = (props) => {
  const { setOpenForm, toggle } = props;
  const {basicWorkingShiftData} = useSelector(({workingShift}) => workingShift);
  const dispatch = useDispatch();
  const {id, name, start_time, end_time, before_allowed_minutes, late_allowed_minutes, early_allowed_minutes, after_allowed_minutes} = basicWorkingShiftData;

  const handleSubmit = (e) => {
    console.log("Form submitted:", basicWorkingShiftData);
    const action = id ? updateWorkingShift(basicWorkingShiftData) : addWorkingShift(basicWorkingShiftData);
    dispatch(action).then((res) => {
      setOpenForm(false);
      dispatch(getAllWorkingShifts());
      toast.success("Working Shift Created successfully");
      dispatch(bindWorkingShiftData(initialWorkingShiftData));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindWorkingShiftData({...basicWorkingShiftData, [name]: value}));
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Working Shift" : "Add Working Shift"}
    >
      <div className="space-y-4">
        <div>
          <HrInput
            name="name"
            label="Shift Name"
            placeholder="Enter shift name"
            value={name}
            onChange={(e) => {handleChange(e)}}
            required
          />
        </div>
        <div>
          <HrInput
            name="start_time"
            label="Start Time"
            placeholder="Enter start time"
            type="time"
            value={start_time}
            onChange={(e) => {handleChange(e)}}
            required
          />
        </div>
        <div>
          <HrInput
            name="end_time"
            label="End Time"
            placeholder="Enter end time"
            type="time"
            value={end_time}
            onChange={(e) => {handleChange(e)}}
            required
          />
        </div>
        <div>
          <HrInput
            name="before_allowed_minutes"
            label="Allowed Before"
            placeholder="Enter time"
            type="number"
            value={before_allowed_minutes}
            onChange={(e) => {handleChange(e)}}
            required
          />
        </div>
        <div>
          <HrInput
            name="after_allowed_minutes"
            label="Allowed After"
            placeholder="Enter time"
            type="number"
            value={after_allowed_minutes}
            onChange={(e) => {handleChange(e)}}
            required
          />
        </div>
        <div>
          <HrInput
            name="early_allowed_minutes"
            label="Early Allowed"
            placeholder="Enter time"
            type="number"
            value={early_allowed_minutes}
            onChange={(e) => {handleChange(e)}}
            required
          />
        </div>
        <div>
          <HrInput
            name="late_allowed_minutes"
            label="Late Allowed"
            placeholder="Enter time"
            type="number"
            value={late_allowed_minutes}
            onChange={(e) => {handleChange(e)}}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={() => {handleSubmit()}}>Submit</Button>
        </div>
      </div>
    </HrModal>
  );
}

export default WorkingShiftForm; 