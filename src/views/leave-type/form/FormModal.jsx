import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeaveType,
  bindLeaveTypeData,
  getAllLeaveType,
  getLeaveType,
  updateLeaveType,
} from "../store";
import toast from "react-hot-toast";

import React, { useEffect, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import HrInput from "@/components/common/HrInput";

export default function FormModal({ open, setOpen, editId }) {
  const { leaveTypeFormData, mutationLoading, fetchingSingleData } =
    useSelector((state) => state.leaveType);

  const { name, short_name, serial_no } = leaveTypeFormData;
  const dispatch = useDispatch();
  const onOpenChange = () => {
    setOpen(!open);
  };
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    short_name: z.string().min(2, {
      message: "Short name must be at least 2 characters.",
    }),
    serial_no: z.string().min(1, {
      message: "Serial number is required.",
    }),
  });
  // const form = useForm({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     ...leaveTypeFormData,
  //   },
  // });
  useEffect(() => {
    if (editId) {
      dispatch(getLeaveType(editId));
    } else {
      dispatch(bindLeaveTypeData());
    }
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindLeaveTypeData({ ...leaveTypeFormData, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in leaveTypeFormData) {
        formData.append(key, leaveTypeFormData[key]);
      }
      if (editId) {
        formData.append("_method", "PUT");
      }
      const action = editId
        ? dispatch(updateLeaveType({ formData, editId }))
        : dispatch(addLeaveType(formData));
      const res = await action.unwrap();
      if (res) {
        const toastMessage = editId
          ? "Leave Type updated successfully"
          : "Leave Type created successfully";
        toast.success(toastMessage);
        onOpenChange();
        dispatch(getAllLeaveType());
      }
    } catch (error) {
      console.log("Error in onSubmit:", error);
    }
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalTitle>Add Leave Type</ModalTitle>
        <form onSubmit={handleSubmit} className="py-2 flex flex-col gap-3">
          <HrInput
            name="name"
            label="Name"
            placeholder="Leave type name"
            value={name}
            onChange={handleChange}
            required
            disabled={fetchingSingleData}
          />
          <HrInput
            name="short_name"
            label="Short Name"
            placeholder="Short name"
            value={short_name}
            onChange={handleChange}
            required
            disabled={fetchingSingleData}
          />
          <HrInput
            name="serial_no"
            label="Serial No"
            placeholder="Serial number"
            value={serial_no}
            onChange={handleChange}
            required
            disabled={fetchingSingleData}
          />
          {/* <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leave type</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="short_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serial_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial No.</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
          <Button
            disabled={mutationLoading || fetchingSingleData}
            variant={"primary"}
            type="submit"
            className={"mt-4"}
          >
            {mutationLoading ? "Saving..." : "Save"}
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
}
