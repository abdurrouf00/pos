"use client";
import { useDispatch, useSelector } from "react-redux";

import HrInput from "@/components/common/HrInput";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
import UILoading from "@/components/ui/UILoading";
import { convertTo12hourFormatWithAmPm } from "@/lib/utils";
import { getAllAttendanceType } from "@/views/attendanceType/store";
import { getAllDepartment } from "@/views/department/store";
import { getAllEmployee } from "@/views/employee/store";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { bindManualAttendanceData, saveAttendanceManually } from "../store";

export default function ManualForm() {
  const [date, setDate] = useState("");
  const router = useRouter();
  const { manualAttendanceData, mutationLoading } = useSelector(
    (state) => state.attendance
  );

  const dispatch = useDispatch();
  const { departmentData } = useSelector(({ department }) => department);
  const params = {
    department_id: manualAttendanceData.department_id,
    page: 1,
    per_page: 1000,
  };
  const { attendanceTypeData } = useSelector(
    ({ attendanceType }) => attendanceType
  );
  const { loading: employeeLoading } = useSelector(({ employee }) => employee);

  const getEmployees = async (params) => {
    const res = await dispatch(getAllEmployee(params)).unwrap();
    const data = res.data.map((itm) => {
      return {
        ...itm,
        in_time: "",
        out_time: "",
        attendance_type_id: "",
        remarks: "",
      };
    });
    dispatch(
      bindManualAttendanceData({
        ...manualAttendanceData,
        data: data,
      })
    );
  };

  useEffect(() => {
    getEmployees(params);
    dispatch(getAllDepartment());
    dispatch(getAllAttendanceType());
  }, []);

  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      bindManualAttendanceData({
        ...manualAttendanceData,
        [name]: value,
      })
    );
    const paramsObj = {
      ...params,
      department_id: value,
    };
    getEmployees(paramsObj);
  };

  const deptOptions = mapOptions(departmentData);
  const attendanceTypeOptions = attendanceTypeData?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleSubmit = async () => {
    const filteredData = manualAttendanceData.data.filter(
      (itm) => itm.in_time && itm.out_time && itm.attendance_type_id
    );
    if (date === "") {
      toast.error("Please select a date");
      return;
    }
    if (filteredData.length === 0) {
      toast.error("Please fill at least one employee's attendance");
      return;
    }

    const data = filteredData.map((itm) => {
      return {
        employee_id: itm.id,
        remarks: itm.remarks,
        attendance_type_id: itm.attendance_type_id,
        in_time: `${convertTo12hourFormatWithAmPm(itm.in_time)}`,
        out_time: `${convertTo12hourFormatWithAmPm(itm.out_time)}`,
      };
    });
    const submitData = {
      date: date,
      attendance_data: data,
    };
    const res = await dispatch(saveAttendanceManually(submitData)).unwrap();
    if (res.success) {
      toast.success("Attendance saved successfully");
      router.push("/dashboard/attendance");
    }
  };

  const handleChange = (e, item) => {
    const { name, value } = e.target;
    const newData = manualAttendanceData.data.map((data) =>
      data.id === item.id ? { ...data, [name]: value } : data
    );
    dispatch(
      bindManualAttendanceData({
        ...manualAttendanceData,
        data: newData,
      })
    );
  };

  return (
    <UILoading loading={employeeLoading}>
      <div className="p-4 bg-white rounded-md">
        <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-2 mb-4">
          <HrInput
            label="Date"
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <HrSelect
            label="Department"
            value={manualAttendanceData.department_id}
            type="text"
            onChange={handleDepartmentChange}
            options={deptOptions}
          />
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 font-semibold ">
              <th className="p-1">Employee</th>
              <th>In Time</th>
              <th>Out Time</th>
              <th>Attendance Type</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {manualAttendanceData.data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>

                <td>
                  <HrInput
                    type="time"
                    value={item.in_time}
                    className=""
                    name="in_time"
                    onChange={(e) => handleChange(e, item)}
                  />
                </td>
                <td>
                  <HrInput
                    type="time"
                    value={item.out_time}
                    className=""
                    name="out_time"
                    onChange={(e) => handleChange(e, item)}
                  />
                </td>
                <td>
                  <HrSelect
                    name="attendance_type_id"
                    options={attendanceTypeOptions}
                    value={item.attendance_type_id}
                    placeholder="Select Attendance Type"
                    onChange={(e) => handleChange(e, item)}
                  />
                </td>
                <td>
                  <HrInput
                    type="text"
                    value={item.remarks}
                    className=""
                    name="remarks"
                    onChange={(e) => handleChange(e, item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-3">
          <Button disabled={mutationLoading} onClick={handleSubmit}>
            {mutationLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </UILoading>
  );
}
