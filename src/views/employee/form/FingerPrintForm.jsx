import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";
import axios from "@/helpers/axios";
import React, { useEffect, useState } from "react";
import { addUserToDevice, enrollUserToDevice } from "../store";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const HAND_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];
const FINGER_OPTIONS = [
  { value: "thumb", label: "Thumb" },
  { value: "index", label: "Index" },
  { value: "middle", label: "Middle" },
  { value: "ring", label: "Ring" },
  { value: "pinky", label: "Pinky" },
];

export default function FingerPrintForm({ open, setOpen, empId }) {
  const [deviceList, setDeviceList] = useState([]);
  const [formData, setFormData] = useState({
    device_id: "",
    hand: "",
    finger: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onOpenChange = () => {
    setOpen(false);
  };
  const getDeviceList = async () => {
    const res = await axios.get(`settings/attendance-devices`);
    console.log('res', res)
    const options = mapOptions(res.data.data?.data, "device_name");
    setDeviceList(options);
  };

  useEffect(() => {
    getDeviceList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { device_id } = formData;
    setLoading(true);
    try {
      const response = await dispatch(
        addUserToDevice({ device_id, employee_id: empId })
      ).unwrap();
      if (response) {
        const enrollResponse = await dispatch(
          enrollUserToDevice({ ...formData, employee_id: empId })
        ).unwrap();
        console.log("enrollResponse", enrollResponse);
        if (!enrollResponse.success) {
          toast.error(enrollResponse.message);
        } else {
          await sleep(5 * 1000); //sleep for 5 seconds
          toast.success("Fingerprint enrolled successfully");
          onOpenChange();
        }
      }

      // console.log("resp", response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalTitle>Add Finger Print</ModalTitle>
        <form onSubmit={handleSubmit} className="py-2 flex flex-col gap-3">
          <HrSelect
            label="Device"
            options={deviceList}
            name="device_id"
            value={formData.device_id}
            onChange={handleChange}
            placeholder="Select Device"
            required
          />
          <HrSelect
            label="Hand"
            options={HAND_OPTIONS}
            name="hand"
            value={formData.hand}
            onChange={handleChange}
            placeholder="Select Hand"
            required
          />
          <HrSelect
            label="Finger"
            options={FINGER_OPTIONS}
            name="finger"
            value={formData.finger}
            onChange={handleChange}
            placeholder="Select Finger"
            required
          />
          <Button disabled={loading} type="submit">
            {loading ? "Saving..." : "Save"}
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
}
