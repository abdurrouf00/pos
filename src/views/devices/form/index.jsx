import HrInput from "@/components/common/HrInput";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useAddDeviceMutation,
  useGetDeviceByIdQuery,
  useUpdateDeviceMutation,
} from "../store";
import toast from "react-hot-toast";

export default function DeviceForm({ open, setOpen, editId }) {
  const [deviceFormData, setDeviceFormData] = useState({
    device_id: "",
    device_name: "",
  });
  const [updateDevice, { isLoading: isUpdatingDevice }] =
    useUpdateDeviceMutation();
  const [addDevice, { isLoading: isAddingDevice }] = useAddDeviceMutation();
  const { data: deviceData, isLoading: isLoadingDevice } =
    useGetDeviceByIdQuery(editId, { skip: !editId });

  useEffect(() => {
    if (deviceData) {
      const { device_id, device_name } = deviceData.data;
      setDeviceFormData({ device_id, device_name });
    }
  }, [deviceData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const action = editId
      ? updateDevice({ ...deviceFormData, _method: "PUT", id: editId })
      : addDevice(deviceFormData);
    const res = await action.unwrap();
    if (res) {
      const toastMessage = editId
        ? "Device updated successfully"
        : "Device added successfully";
      toast.success(toastMessage);
      onOpenChange();
    }
  };
  const onOpenChange = () => {
    setOpen(!open);
  };
  const handleChange = (e) => {
    setDeviceFormData({ ...deviceFormData, [e.target.name]: e.target.value });
  };
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalTitle>{editId ? "Edit Device" : "Add Device"}</ModalTitle>
        <form onSubmit={handleSubmit} className="py-2 flex flex-col gap-3">
          <HrInput
            name="device_id"
            label="Device ID"
            placeholder="Device ID"
            value={deviceFormData.device_id}
            onChange={handleChange}
            required
            disabled={isLoadingDevice}
          />
          <HrInput
            name="device_name"
            label="Device Name"
            placeholder="Device Name"
            value={deviceFormData.device_name}
            onChange={handleChange}
            required
            disabled={isLoadingDevice}
          />
          <Button
            type="submit"
            variant={"primary"}
            disabled={isAddingDevice || isUpdatingDevice}
          >
            {isAddingDevice || isUpdatingDevice ? "Saving..." : "Save"}
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
}
