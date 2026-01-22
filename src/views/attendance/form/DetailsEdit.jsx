import HrInput from "@/components/common/HrInput";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";
import { getAllAttendanceType } from "@/views/attendanceType/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAttendanceDetails } from "../store";
import toast from "react-hot-toast";

export default function DetailsEdit({ open, setOpen, data, setData }) {
  const [formData, setFormData] = useState({
    attendance_type_id: "",
    in_time: "",
    out_time: "",
    remarks: "",
  });
  const dispatch = useDispatch();
  const { attendanceTypeData } = useSelector(
    ({ attendanceType }) => attendanceType
  );
  const { mutationLoading } = useSelector(({ attendance }) => attendance);
  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        attendance_type_id: data.attendance_type_id ?? "",
        in_time: data.in_time ?? "",
        out_time: data.out_time ?? "",
        remarks: data.remarks ?? "",
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
      attendance_detail_id: data.id,
      attendance_type_id: formData.attendance_type_id,
      in_time: formData.in_time,
      out_time: formData.out_time,
      remarks: formData.remarks,
    };
    const res = await dispatch(updateAttendanceDetails(params)).unwrap();
    if (res.success) {
      toast.success("Attendance updated");
      setData(null);
      onOpenChange();
    }
  };
  const handleChange = (e, item) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const attendanceTypeOptions = mapOptions(attendanceTypeData);

  useEffect(() => {
    dispatch(getAllAttendanceType());
  }, []);
  const onOpenChange = () => {
    setOpen(!open);
  };
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalTitle>Edit Attendance</ModalTitle>
        <form onSubmit={handleSubmit} className="py-2 flex flex-col gap-3">
          <HrSelect
            label="Attendance Type"
            name="attendance_type_id"
            options={attendanceTypeOptions}
            value={formData.attendance_type_id}
            placeholder="Select Attendance Type"
            onChange={(e) => handleChange(e)}
            required
          />
          <HrInput
            label="In Time"
            name="in_time"
            value={formData.in_time}
            placeholder="Enter In Time"
            onChange={(e) => handleChange(e)}
            type="time"
            required
          />
          <HrInput
            label="Out Time"
            name="out_time"
            value={formData.out_time}
            placeholder="Enter Out Time"
            onChange={(e) => handleChange(e)}
            type="time"
            required
          />
          <HrInput
            label="Remarks"
            type="textarea"
            name="remarks"
            value={formData.remarks}
            placeholder="Enter Remarks"
            onChange={(e) => handleChange(e, item)}
          />
          <Button className={"w-full"} type="submit" disabled={mutationLoading}>
            {mutationLoading ? "Saving..." : "Save"}
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
}
