"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import { addSection, bindSectionData, getAllSections, initialSectionData, updateSection } from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";


const SectionForm = (props) => {
  const { setOpenForm, toggle } = props;
  const {basicSectionData} = useSelector(({section}) => section);
  const dispatch = useDispatch();
  const {id, name} = basicSectionData;

//   useEffect(() => {
//     return () => {
//         dispatch(bindSectionData(initialSectionData));
//     }
//   }, [])

  const handleSubmit = (e) => {
    console.log("Form submitted:", basicSectionData);
    const action = id ? updateSection(basicSectionData) : addSection(basicSectionData);
    dispatch(action).then((res) => {
      setOpenForm(false);
      dispatch(getAllSections());
      toast.success("Section Created successfully");
      dispatch(bindSectionData(initialSectionData));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindSectionData({...basicSectionData, [name]: value}));
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Section" : "Add Section"}
    >
      <div className="space-y-4">
        <div>
          <HrInput
            name="name"
            label="Name"
            placeholder="Enter your full name"
            value={name}
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

export default SectionForm;
