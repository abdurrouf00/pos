import { Modal, ModalContent, ModalTitle } from '@/components/ui/modal'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addLeaveApplication, bindLeaveApplicationData, getAllLeaveApplications, getLeaveApplication, updateLeaveApplication } from '../store';
import toast from 'react-hot-toast';
import HrInput from '@/components/common/HrInput';
import { Button } from '@/components/ui/button';

export default function FormModal({ open, setOpen, editId }) {
  const { leaveApplicationFormData, mutationLoading, fetchingSingleData } =
    useSelector((state) => state.leaveApplication);
  const { from_date, to_date, leave_cause } = leaveApplicationFormData;

  const dispatch = useDispatch();
  const onOpenChange = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (editId) {
      dispatch(getLeaveApplication(editId));
    } else {
      dispatch(bindLeaveApplicationData());
    }
  }, [editId]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in leaveApplicationFormData) {
        formData.append(key, leaveApplicationFormData[key]);
      }
      if (editId) {
        formData.append("_method", "PUT");
      }
      const action = editId
        ? dispatch(updateLeaveApplication({ editId, formData })) : dispatch(addLeaveApplication(formData))
      const res = await action.unwrap();
      if (res.success) {
        const toastMessage = editId ? "Leave Application updated successfully" : "Leave Application created successfully";
        toast.success(toastMessage);
        onOpenChange();
        dispatch(getAllLeaveApplications())
        dispatch(bindLeaveApplicationData());
      } else {
        toast.error(res.msg || "Something went wrong");
      }
    } catch (error) {
      console.log("Error in onSubmit:", error);
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindLeaveApplicationData({ ...leaveApplicationFormData, [name]: value }));
  };


  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className='max-w-xl'>
        <ModalTitle>{editId ? 'Edit Leave Application' : 'Add Leave Application'}</ModalTitle>
        <form onSubmit={handleSubmit} className="py-2 flex flex-col gap-3">
          <div className='flex gap-2'>
            <HrInput
              name="from_date"
              label="From Date"
              placeholder="From date"
              value={from_date}
              onChange={handleChange}
              required
              type='date'
              disabled={fetchingSingleData}
            />
            <HrInput
              name="to_date"
              label="To Date"
              placeholder="To date"
              value={to_date}
              onChange={handleChange}
              required
              type='date'
              disabled={fetchingSingleData}
            />
          </div>
          <HrInput
            name="leave_cause"
            label="Leave Cause"
            placeholder="Leave cause"
            value={leave_cause}
            onChange={handleChange}
            required
            type='textarea'
            disabled={fetchingSingleData}
          />
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
  )
}
