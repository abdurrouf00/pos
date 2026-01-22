"use client";
import { Button } from "@/components/ui/button";
import HrInput from "@/components/common/HrInput";
import {
  bindManualAttendanceData,
  initialManualAttendanceData,
  submitAttendance,
} from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import { useEffect, useState } from "react";
import { getAllEmployee } from "@/views/employee/store";
import { getAllAttendanceType } from "@/views/attendanceType/store";
import { cloneDeep } from "lodash";

const ManualAttendanceForm = (props) => {
  const userDataStr = Cookies.get("user_data");
  const userData = userDataStr ? JSON.parse(userDataStr) : null;
  // console.log("User data:", userData);
  const [formLoading, setFormLoading] = useState(false);

  const { setOpenForm, toggle } = props;
  const { attendanceData, loading } = useSelector(
    ({ manualAttendance }) => manualAttendance
  );

  const { employeeData, attendanceTypeData } = useSelector(
    ({ employee, attendanceType }) => ({
      employeeData: employee.employeeData,
      attendanceTypeData: attendanceType.attendanceTypeData,
    })
  );
  const dispatch = useDispatch();
  const { attendance_date, attendance_count, attendance } = attendanceData;

  const handleSubmit = (e) => {
    setFormLoading(true);
    const submittedData = {
      ...attendanceData,
      organization_id: userData?.organization_id,
      company_id: userData?.company_id,
    };
    // console.log("Form submitted:", submittedData);
    const action = id
      ? submitAttendance(submittedData)
      : submitAttendance(submittedData);
    dispatch(submitAttendance(submittedData)).then((res) => {
      setOpenForm(false);
      dispatch(submitAttendance());
      toast.success("Manual Attendance Submitted successfully");
      dispatch(bindManualAttendanceData(initialManualAttendanceData));
      setFormLoading(false);
    });
  };

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     dispatch(bindManualAttendanceData({ ...attendanceData, [name]: value }));
  //   };

  useEffect(() => {
    dispatch(getAllEmployee());
    dispatch(getAllAttendanceType());
  }, []);

  const handleChange = (index, field, value) => {
    const updatedDetails = cloneDeep(attendance);
    updatedDetails[index][field] = value;

    dispatch(
      bindManualAttendanceData({
        ...attendanceData,
        attendance: updatedDetails,
      })
    );
  };
  console.log("Employee data:", employeeData);
  return (
    <div className="flex gap-3">
      <div className="w-full">
        <div className="p-2 bg-white shadow-lg w-full h-full  rounded-md">
          <div className="space-y-4 ">
            <div className="grid grid-cols-2 gap-2 items-center">
              <div className="col-span-1">
                <label className="text-sm font-semibold">Attendance Date</label>
                <HrInput
                  name="attendance_date"
                  placeholder="Enter attendance date"
                  value={new Date().toISOString().split("T")[0]}
                  disabled={formLoading}
                  type="date"
                  onChange={(e) =>
                    dispatch(
                      bindManualAttendanceData({
                        ...attendanceData,
                        attendance_date: e.target.value,
                      })
                    )
                  }
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="text-sm font-semibold">
                  Attendance Count
                </label>
                <div>
                  <HrInput
                    name="attendance_count"
                    placeholder="Enter attendance count"
                    value={attendance_count}
                    disabled={formLoading}
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 font-semibold border-b pb-2">
              <div className="col-span-1">SL</div>
              <div className="col-span-2">Employee</div>
              <div className="col-span-2">In Time</div>
              <div className="col-span-2">Out Time</div>
              <div className="col-span-2">Attendance Type</div>
              <div className="col-span-2">Remark</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {employeeData.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-1">{index + 1}</div>

                {/* Head Field */}
                <div className="col-span-2">
                  <HrSelect
                    placeholder="Select Employee"
                    options={mapOptions(employeeData, "name", "id")}
                    value={item.employee_id}
                    onChange={(e) =>
                      handleChange(index, "employee_id", e.target.value)
                    }
                  />
                </div>

                {/* Calc Type */}
                <div className="col-span-2">
                  <HrSelect
                    placeholder="Select Attendance Type"
                    options={mapOptions(attendanceTypeData, "name", "id")}
                    value={item.attendance_type_id}
                    onChange={(e) =>
                      handleChange(index, "attendance_type_id", e.target.value)
                    }
                  />
                </div>

                {/* In Time */}
                <div className="col-span-2">
                  <HrInput
                    type="time"
                    disabled={formLoading}
                    placeholder="Enter In Time"
                    value={item.in_time}
                    onChange={(e) =>
                      handleChange(index, "in_time", e.target.value)
                    }
                  />
                </div>

                {/* Out Time */}
                <div className="col-span-2">
                  <HrInput
                    type="time"
                    disabled={formLoading}
                    placeholder="Enter Out Time"
                    value={item.out_time}
                    onChange={(e) =>
                      handleChange(index, "out_time", e.target.value)
                    }
                  />
                </div>

                {/* Remark */}
                <div className="col-span-2">
                  <HrInput
                    type="text"
                    disabled={formLoading}
                    placeholder="Enter Remark"
                    value={item.remark}
                    onChange={(e) =>
                      handleChange(index, "remark", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <div className="text-center mt-4">
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualAttendanceForm;
