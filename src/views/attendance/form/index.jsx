"use client";

import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
import { convertTo12hourFormatWithAmPm } from "@/lib/utils";
import { getAllAttendanceType } from "@/views/attendanceType/store";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  bindAttendanceFormData,
  saveAttendanceInTime,
  saveAttendanceOutTime,
} from "../store";

export default function AttendanceForm() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const { attendanceTypeData } = useSelector(
    ({ attendanceType }) => attendanceType
  );
  const { attendanceFormType, attendanceFormData, mutationLoading } =
    useSelector((state) => state.attendance);

  const dispatch = useDispatch();

  useEffect(() => {
    if (attendanceFormData.length > 0) {
      const firstData = attendanceFormData[0];
      const inputDate = firstData.date ?? "";
      setDate(inputDate);
    }
  }, [attendanceFormData]);

  useEffect(() => {
    dispatch(getAllAttendanceType());
  }, []);
  const attendanceTypeOptions = attendanceTypeData?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleChange = (e, item) => {
    const { name, value } = e.target;
    const newData = attendanceFormData.map((data) =>
      data.emp_id === item.emp_id ? { ...data, [name]: value } : data
    );
    dispatch(bindAttendanceFormData(newData));
  };

  const isInType = attendanceFormType === "in";
  const handleSubmit = async () => {
    const formData = isInType
      ? attendanceFormData.map((itm) => {
          return {
            emp_id: itm.emp_id,
            attendance_type_id: itm.attendance_type_id,
            in_time: `${itm.date} ${convertTo12hourFormatWithAmPm(itm.time)}`,
          };
        })
      : attendanceFormData.map((itm) => {
          return {
            emp_id: itm.emp_id,
            out_time: `${itm.date} ${convertTo12hourFormatWithAmPm(itm.time)}`,
          };
        });
    const submitData = {
      date: date,
      ...(isInType ? { attendance_method: "2" } : {}),
      attendance_data: formData,
    };
    try {
      const action = isInType
        ? await dispatch(saveAttendanceInTime(submitData)).unwrap()
        : await dispatch(saveAttendanceOutTime(submitData)).unwrap();
      const res = action;
      if (res.success) {
        router.push("/dashboard/attendance-list");
        toast.success("Attendance saved successfully");
      }
    } catch (error) {
      toast.error(error.message || "Attendance save failed");
    }
  };
  return (
    <div className="p-4 bg-white rounded-md">
      <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-2 mb-4">
        <HrInput
          label="Date"
          value={date}
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 font-semibold ">
            <th className="p-1">Employee</th>
            <th>Date</th>
            <th>{isInType ? "In Time" : "Out Time"}</th>
            {isInType ? <th>Types</th> : null}
            <th>Device</th>
          </tr>
        </thead>
        <tbody>
          {attendanceFormData.map((item) => (
            <tr key={item.emp_id} className="border-b border-gray-100">
              <td className="p-1 text-center">{item.emp_id}</td>
              <td className="p-1 text-center">
                <HrInput
                  type="date"
                  value={item.date}
                  className=""
                  name="date"
                  onChange={(e) => handleChange(e, item)}
                />
              </td>
              <td className="p-1 text-center">
                <HrInput
                  type="time"
                  value={item.time}
                  className=""
                  name="time"
                  onChange={(e) => handleChange(e, item)}
                />
              </td>
              {attendanceFormType === "in" ? (
                <td className="p-1 text-center">
                  <HrSelect
                    name="attendance_type_id"
                    options={attendanceTypeOptions}
                    value={item.attendance_type_id}
                    placeholder="Select Type"
                    onChange={(e) => handleChange(e, item)}
                  />
                </td>
              ) : null}
              <td className="p-1 text-center">{item.device_id}</td>
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
  );
}
