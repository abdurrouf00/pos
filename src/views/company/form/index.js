"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import {
  addCompany,
  bindCompanyData,
  getAllCompanies,
  getCompanyById,
  initialCompanyData,
  updateCompany,
} from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userData } from "@/lib/utils";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import UILoading from "@/components/ui/UILoading";

const CompanyForm = (props) => {
  const { setOpenForm, toggle } = props;
  const { basicCompanyData, isFetching, isSubmitting } = useSelector(({ company }) => company);
  const dispatch = useDispatch();
  const {
    id,
    name,
    organization_id,
    address,
    phone,
    email,
    has_overtime,
    overtime_rate,
    min_overtime_minutes,
    attendance_change_days,

  } = basicCompanyData;

  useEffect(() => {
    if (id) {
      dispatch(getCompanyById(id));
    }
  }, [id]);
  useEffect(() => {
    return () => {
      dispatch(bindCompanyData(initialCompanyData));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, ...rest } = basicCompanyData;
    const submittedData = {
      ...rest,
      organization_id: userData?.organization_id
    }
    const action = id
      ? updateCompany({ ...submittedData, id })
      : addCompany(submittedData);
    dispatch(action)
      .then((res) => {
        if (res.payload) {
          setOpenForm(false);
          dispatch(getAllCompanies());
          toast.success("Company Created successfully");
          dispatch(bindCompanyData(initialCompanyData));
        } else {
          toast.error("Something went wrong");
        }

      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    dispatch(bindCompanyData({ ...basicCompanyData, [name]: name === "has_overtime" ? (checked ? "yes" : "no") : value }));
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Company" : "Add Company"}
    >
      <UILoading loading={isFetching}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <HrInput
              name="name"
              label="Company Name"
              placeholder="Enter company name"
              value={name}
              onChange={(e) => {
                handleChange(e);
              }}
              required
            />
          </div>
          <div>
            <HrInput
              name="address"
              label="Address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <HrInput
              name="phone"
              label="Phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <HrInput
              name="email"
              label="Email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Switch
                id="has-overtime"
                name="has_overtime"
                checked={has_overtime === 1}
                onCheckedChange={(checked) => {
                  dispatch(bindCompanyData({
                    ...basicCompanyData,
                    has_overtime: checked ? 1 : 0
                  }));
                }}
              />
              <Label htmlFor="has-overtime">Has Overtime</Label>
            </div>
          </div>
          <div>
            <HrInput
              name="overtime_rate"
              label="Overtime Rate"
              placeholder="Enter overtime rate"
              value={overtime_rate}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <HrInput
              name="min_overtime_minutes"
              label="Minimum Overtime Minutes"
              placeholder="Enter minimum overtime minutes"
              value={min_overtime_minutes}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <HrInput
              name="attendance_change_days"
              label="Attendance Change Days"
              placeholder="Enter attendance change days"
              value={attendance_change_days}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={'w-full'}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </UILoading>
    </HrModal>
  );
};

export default CompanyForm;
