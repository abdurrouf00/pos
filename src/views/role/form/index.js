"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import { addRole, bindRoleData, getAllRole, initialRoleData, updateRole } from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const RoleForm = (props) => {
  const { setOpenForm, toggle } = props;
  const { basicRoleData, mutationLoading } = useSelector(({ role }) => role);
  const dispatch = useDispatch();
  const { id, name } = basicRoleData;

  const handleSubmit = (e) => {
    console.log("Form submitted:", basicRoleData);
    const action = id ? updateRole(basicRoleData) : addRole(basicRoleData);
    dispatch(action).then((res) => {
      setOpenForm(false);
      dispatch(getAllRole());
      toast.success("Role Created successfully");
      dispatch(bindRoleData(initialRoleData));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindRoleData({ ...basicRoleData, [name]: value }));
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Role" : "Add Role"}
    >
      <div className="space-y-4">
        <div>
          <HrInput
            name="name"
            label="Name"
            placeholder="Enter role name"
            value={name}
            onChange={(e) => { handleChange(e) }}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button disabled={mutationLoading} className={'w-full'} onClick={() => { handleSubmit() }}>{mutationLoading ? 'Saving...' : "Save"}</Button>
        </div>
      </div>
    </HrModal>
  );
}

export default RoleForm;