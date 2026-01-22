"use client";
import { Button } from "@/components/ui/button";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import { addDepartment, bindDepartmentData, getAllDepartment, getDepartmentById, initialDepartmentData, updateDepartment } from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import UILoading from "@/components/ui/UILoading";

const DepartmentForm = (props) => {
  const userDataStr = Cookies.get("user_data");
  const userData = userDataStr ? JSON.parse(userDataStr) : null;

  const { setOpenForm, toggle } = props;
  const { basicDepartmentData, fetching, isSubmitting } = useSelector(({ department }) => department);
  const dispatch = useDispatch();
  const { id, name, has_overtime, overtime_rate, min_overtime_minutes } =
    basicDepartmentData;

  useEffect(() => {
    return () => {
      dispatch(bindDepartmentData(initialDepartmentData));
    }
  }, [])
  useEffect(() => {
    if (id) {
      dispatch(getDepartmentById(id));
    }
  }, [id])
  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, ...rest } = basicDepartmentData; // remove id
    const submittedData = {
      ...rest,
      ...(id ? { id } : {})
    };

    const action = id ? updateDepartment(submittedData) : addDepartment(submittedData);
    dispatch(action).then((res) => {
      if (res.payload) {
        setOpenForm(false);
        dispatch(getAllDepartment());
        const toastMsg = id ? "Department Updated " : "Department Created ";
        toast.success(toastMsg);
        dispatch(bindDepartmentData(initialDepartmentData));
      }

    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindDepartmentData({ ...basicDepartmentData, [name]: value }));
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Department" : "Add Department"}
    >
      <UILoading loading={fetching}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <HrInput
              name="name"
              label="Department Name"
              placeholder="Enter department name"
              value={name}
              onChange={(e) => { handleChange(e) }}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="has-overtime"
              name="has_overtime"
              checked={has_overtime === 1}
              onCheckedChange={(checked) => {
                dispatch(bindDepartmentData({
                  ...basicDepartmentData,
                  has_overtime: checked ? 1 : 0
                }));
              }}
            />
            <Label htmlFor="has-overtime">Has Overtime</Label>
          </div>
          <div>
            <HrInput
              name="overtime_rate"
              label="Overtime Rate"
              type="number"
              placeholder="Enter Rate"
              value={overtime_rate}
              onChange={(e) => { handleChange(e) }}
              required
            />
          </div>
          <div>
            <HrInput
              name="min_overtime_minutes"
              label="Min Over Tme Muniutes"
              type="number"
              placeholder="Enter Number"
              value={min_overtime_minutes}
              onChange={(e) => { handleChange(e) }}
            />
          </div>
          <div className="flex justify-end">
            <Button className={'w-full'} type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</Button>
          </div>
        </form>
      </UILoading>
    </HrModal>
  );
}

export default DepartmentForm;
