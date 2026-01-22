"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import { addOrganization, bindOrganizationData, getAllOrganizations, initialOrganizationData, updateOrganization } from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const OrganizationForm = (props) => {
  const { setOpenForm, toggle } = props;
  const {basicOrganizationData} = useSelector(({organization}) => organization);
  const dispatch = useDispatch();
  const {id, name} = basicOrganizationData;

  const handleSubmit = (e) => {
    console.log("Form submitted:", basicOrganizationData);
    const action = id ? updateOrganization(basicOrganizationData) : addOrganization(basicOrganizationData);
    dispatch(action).then((res) => {
      setOpenForm(false);
      dispatch(getAllOrganizations());
      toast.success("Organization Created successfully");
      dispatch(bindOrganizationData(initialOrganizationData));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindOrganizationData({...basicOrganizationData, [name]: value}));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(bindOrganizationData({...basicOrganizationData, logo: file}));
    }
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Organization" : "Add Organization"}
    >
      <div className="space-y-4">
        <div>
          <HrInput
            name="name"
            label="Organization Name"
            placeholder="Enter organization name"
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

export default OrganizationForm; 