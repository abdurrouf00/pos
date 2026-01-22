"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindSearchValue } from "../store";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import HrInput from "@/components/common/HrInput";
import { Button } from "@/components/ui/button";
import { getAllDepartment } from "@/views/department/store";
import { FaArrowCircleRight } from "react-icons/fa";
import Link from "next/link";

function AttendanceList() {
  const dispatch = useDispatch();
  const [showSearchResult, setShowSearchResult] = useState(false);
  const { basicAttendanceData, searchValue } = useSelector(
    (state) => state.attendance
  );
  const { departmentData } = useSelector(({ department }) => department);
  const { dat } = basicAttendanceData;
  const { date, department_id } = searchValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindSearchValue({ ...searchValue, [name]: value }));
  };

  useEffect(() => {
    dispatch(getAllDepartment());
  }, []);
  return (
    <div className="flex gap-3">
      <div className="w-full">
        <div className="p-2 bg-white shadow-lg w-full h-full  rounded-md">
          <div className="space-y-4 grid grid-cols-2 gap-x-4 border-2 border-gray-200 p-4">
            <div className="col-span-2 text-center">
              <h4 className="text-2xl font-bold text-red-400">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h4>
              <Link
                href="/dashboard/manual-attendance"
                className={
                  "float-right bg-emerald-600 text-white px-4 py-2 rounded-md flex items-center gap-1"
                }
              >
                Take Attendance Manually <FaArrowCircleRight />
              </Link>
            </div>
            <div>
              <HrInput
                name="date"
                label="Date"
                placeholder="Enter date"
                value={date}
                type="date"
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
            </div>
            <div>
              <HrSelect
                name="department_id"
                label="Department"
                type="text"
                placeholder="Enter Department"
                value={department_id}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
                options={mapOptions(departmentData, "name", "id")}
              />
            </div>
            <div className="col-span-2 mt-[-5px]">
              <Button
                onClick={() => {
                  handleSubmit();
                }}
                className="bg-red-400 text-white"
              >
                Save Absent
              </Button>
            </div>
            <div>
              <HrInput
                name="file"
                label="File"
                placeholder="Select file"
                value={date}
                type="file"
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
            </div>
            <div className="flex justify-center col-span-2">
              <Button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceList;
