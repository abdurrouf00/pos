"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import { addPayScale, bindPayScaleData, getAllPayScale, initialPayScaleData, updatePayScale } from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";


const PayScaleForm = (props) => {
  const { setOpenForm, toggle } = props;
  const { basicPayScaleData, mutationLoading } = useSelector(({ payScale }) => payScale);
  const dispatch = useDispatch();
  const { id, name, salary_from, salary_to } = basicPayScaleData;

  //   useEffect(() => {
  //     return () => {
  //         dispatch(bindPayScaleData(initialPayScaleData));
  //     }
  //   }, [])

  const handleSubmit = (e) => {
    console.log("Form submitted:", basicPayScaleData);
    const action = id ? updatePayScale(basicPayScaleData) : addPayScale(basicPayScaleData);
    dispatch(action).then((res) => {
      setOpenForm(false);
      dispatch(getAllPayScale());
      toast.success("Created successfully");
      dispatch(bindPayScaleData(initialPayScaleData));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindPayScaleData({ ...basicPayScaleData, [name]: value }));
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Pay Scale" : "Add Pay scale"}
    >
      <div className="space-y-4">
        <div>
          <HrInput
            name="name"
            label="Name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => { handleChange(e) }}
            required
          />
        </div>
        <div>
          <HrInput
            name="salary_from"
            label="Salary From"
            placeholder="Enter your full name"
            value={salary_from}
            type="number"
            onChange={(e) => { handleChange(e) }}
            required
          />
        </div>
        <div>
          <HrInput
            name="salary_to"
            label="Salary To"
            placeholder="Enter your full name"
            value={salary_to}
            type="number"
            onChange={(e) => { handleChange(e) }}
            required
          />
        </div>
        <div className="flex ">
          <Button disabled={mutationLoading} className={'w-full'} onClick={() => { handleSubmit() }}>{mutationLoading ? 'Saving...' : "Save"}</Button>
        </div>
      </div>
    </HrModal>
  );
}

export default PayScaleForm;
