import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HrInput from "@/components/common/HrInput";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import { getAllRole } from "@/views/role/store";
import Loading from "@/components/ui/loading";

const LegalInfo = ({ basicEmployeeData, handleChange, loading, errors }) => {
  const dispatch = useDispatch();
  const { roleData } = useSelector(({ role }) => role);

  useEffect(() => {
    dispatch(getAllRole());
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4 w-full p-2 rounded-md">
      <HrInput
        label="User Name"
        name="username"
        value={basicEmployeeData?.username}
        onChange={handleChange}
        type="text"
        placeholder="Enter user name"
      />
      <HrSelect
        label="Role"
        name="role_id"
        value={basicEmployeeData?.role_id}
        onChange={handleChange}
        placeholder="Select role"
        options={mapOptions(roleData)}
        error={errors?.role_id && !basicEmployeeData?.role_id}
      />
      <HrInput
        label="Password"
        name="password"
        value={basicEmployeeData?.password}
        onChange={handleChange}
        type="password"
        placeholder="Enter password"
        aria-invalid={
          errors?.password && basicEmployeeData?.password.length < 5
        }
      />
      {/*
      <HrInput
        label="Confirm Password"
        name="confirm_password"
        value={basicEmployeeData?.confirm_password}
        onChange={handleChange}
        type="password"
        placeholder="Enter confirm password"
      /> */}
    </div>
  );
};

export default LegalInfo;
