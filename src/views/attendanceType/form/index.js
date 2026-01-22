"use client";
import { Button } from "@/components/ui/button";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import {
  addAttendanceType,
  bindAttendanceTypeData,
  getAllAttendanceType,
  initialAttendanceTypeData,
  updateAttendanceType,
} from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const AttendanceTypeForm = (props) => {
  const userDataStr = Cookies.get("user_data");
  const userData = userDataStr ? JSON.parse(userDataStr) : null;
  // console.log("User data:", userData);

  const { setOpenForm, toggle } = props;
  const { basicAttendanceTypeData, mutationLoading } = useSelector(
    ({ attendanceType }) => attendanceType
  );
  const dispatch = useDispatch();
  const { id, name, short_name, color, serial_no } = basicAttendanceTypeData;

  const handleSubmit = (e) => {
    const submittedData = {
      ...basicAttendanceTypeData,
      organization_id: userData?.organization_id,
      company_id: userData?.company_id,
    };
    const action = id
      ? updateAttendanceType(submittedData)
      : addAttendanceType(submittedData);
    dispatch(action).then((res) => {
      setOpenForm(false);
      dispatch(getAllAttendanceType());
      toast.success("Attendance Type Created successfully");
      dispatch(bindAttendanceTypeData(initialAttendanceTypeData));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      bindAttendanceTypeData({ ...basicAttendanceTypeData, [name]: value })
    );
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Attendance Type" : "Add Attendance Type"}
    >
      <div className=" grid grid-cols-2 gap-2">
        <div>
          <HrInput
            name="name"
            label="Attendance Type Name"
            placeholder="Enter attendance type name"
            value={name}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        <div>
          <HrInput
            name="short_name"
            label="Short Name"
            type="text"
            placeholder="Enter Short Name"
            value={short_name}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        <div>
          <HrInput
            name="color"
            label="Color"
            type="color"
            placeholder="Select Color"
            value={color}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <HrInput
            name="serial_no"
            label="Serial No"
            type="number"
            placeholder="Enter Serial No"
            value={serial_no}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="flex justify-center col-span-2 mt-2">
          <Button
            className="w-full"
            onClick={() => {
              handleSubmit();
            }}
            disabled={mutationLoading}
          >
            {mutationLoading ? 'Saving...' : "Save"}
          </Button>
        </div>
      </div>
    </HrModal>
  );
};

export default AttendanceTypeForm;
