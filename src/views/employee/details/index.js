"use client";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangePasswordForm from "../change-password";
import { bindEmployeeData, getSingleEmployee, initialemployeeData } from "../store";

function EmployeeDetails({ id }) {
  const [openChangePasswordForm, setOpenChangePasswordForm] = useState(false);

  //  fetch data from api
  const { singleEmployeeData, loading, profileImage, signatureImage } = useSelector(
    (state) => state.employee
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleEmployee(id));
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(bindEmployeeData(initialemployeeData));
    }
  }, [])

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="p-2 bg-white shadow-lg">
      <div className="m-auto p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8 ">
          <div className="flex items-center gap-4 ">
            <div className="size-36 flex-shrink-0">
              <img
                src={profileImage ? profileImage : "/avatar.png"}
                alt="employee"
                width={100}
                height={100}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <div className="">
              <h1 className="text-2xl font-bold text-gray-900">
                {singleEmployeeData?.name ?? ""}
              </h1>
              <p className="text-gray-600">
                {singleEmployeeData?.department?.name ?? ""}
              </p>
            </div>
          </div>
          {/* <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                Edit Profile
              </button> */}
        </div>

        {/* Personal Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-gray-500">First Name</label>
              <p className="font-medium">{singleEmployeeData?.name ?? ""}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Short Name</label>
              <p className="font-medium">
                {singleEmployeeData?.short_name &&
                  `(${singleEmployeeData?.short_name})`}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email Address</label>
              <p className="font-medium text-wrap">
                {singleEmployeeData?.email ?? ""}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <p className="font-medium text-wrap">
                {singleEmployeeData?.phone_no ?? ""}
              </p>
            </div>
          </div>
        </div>

        {/* Employment Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Employment details</h2>
          <div className="grid grid-cols-12 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-gray-500">Job Title</label>
              <p className="font-medium">
                {singleEmployeeData?.job_title ?? ""}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Department</label>
              <p className="font-medium">
                {singleEmployeeData?.department?.name ?? ""}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Start Date</label>
              <p className="font-medium">
                {singleEmployeeData?.start_date ?? ""}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">End Date</label>
              <p className="font-medium">
                {singleEmployeeData?.end_date ?? ""}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Employment Status</label>
              <p className="font-medium text-green-600">
                {singleEmployeeData?.status ?? ""}
              </p>
            </div>
          </div>
        </div>

        {/* Primary Delivery Address Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Primary Delivery Address
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-gray-500">Address</label>
              <p className="font-medium">{singleEmployeeData?.address ?? ""}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">City/State</label>
              <p className="font-medium">{singleEmployeeData?.city ?? ""}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Postcode</label>
              <p className="font-medium">
                {singleEmployeeData?.postcode ?? ""}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Country</label>
              <p className="font-medium">{singleEmployeeData?.country ?? ""}</p>
            </div>
          </div>
        </div>
        {/* Action */}
        <div className=" p-6 rounded-lg s">
          <div className="flex justify-center text-center gap-4">
            {singleEmployeeData?.user ? <div>
              <Button
                type="button"
                variant="destructive"
                className="bg-purple-600 text-white hover:bg-purple-500 hover:text-white"
                onClick={() => setOpenChangePasswordForm(true)}
              >
                Change Password
              </Button>
            </div> : null}
            {/* <div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenChangeStatusForm( true )}
                className="bg-amber-600 text-white hover:bg-amber-500 hover:text-white"
              >
                Deactivate
              </Button>
            </div> */}
            <div>
              <Link href={`/dashboard/employees/${id}/edit`}>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-emerald-600 text-white hover:bg-emerald-500 hover:text-white"
                >
                  Edit
                </Button>
              </Link>
            </div>
            <div>
              <Button type="button" variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
      {openChangePasswordForm && <ChangePasswordForm
        open={openChangePasswordForm}
        setOpen={setOpenChangePasswordForm} empId={id} />
      }

    </div>
  );
}

export default EmployeeDetails;
