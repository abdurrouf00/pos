import HrModal from '@/components/common/HrModal'
import HrSwitch from '@/components/common/HrSwitch'
import React, { useEffect, useState } from 'react'
import { useAddLeavePolicyMutation, useGetLeavePolicyByIdQuery, useUpdateLeavePolicyMutation } from '../store';
import HrInput from '@/components/common/HrInput';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import UILoading from '@/components/ui/UILoading';
export default function FormModal({ open, setOpen, editId = null, setEditId }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    is_active: 1
  })
  const [addLeavePolicy, { isLoading: addLeavePolicyLoading }] = useAddLeavePolicyMutation();
  const { data: leavePolicyData, isLoading: leavePolicyDataLoading } = useGetLeavePolicyByIdQuery(editId, { skip: !editId });
  const [updateLeavePolicy, { isLoading: updateLeavePolicyLoading }] = useUpdateLeavePolicyMutation();


  useEffect(() => {
    const data = leavePolicyData?.data;
    if (editId || data) {
      setForm({
        name: data.name,
        description: data.description,
        is_active: data.is_active
      })
    }
  }, [leavePolicyData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editId ? updateLeavePolicy({ id: editId, ...form }) : addLeavePolicy(form);
    action.unwrap().then((res) => {
      console.log('res', res);
      if (res.success) {
        setOpen(false);
        setEditId(null);
        const toastMessage = editId ? 'Leave policy updated!' : 'Leave policy created!';
        toast.success(toastMessage);
      }
    })
  }
  const handleClose = () => {
    setOpen(false);
    setEditId(null);
  }
  return (
    <HrModal
      title={editId ? 'Edit Leave Policy' : 'Add Leave Policy'}
      toggle={open}
      setToggle={setOpen}
      onClose={handleClose}
    >
      <UILoading loading={leavePolicyDataLoading}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <HrInput
            name="name"
            label="Name"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <HrInput
            name="description"
            label="Description"
            placeholder="Enter description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}

            required
          />
          <HrSwitch
            name="is_active"
            label="Is Active?"
            checked={form.is_active === 1}
            onCheckedChange={(checked) => setForm({ ...form, is_active: checked ? 1 : 0 })}
          />
          <Button
            type="submit"
            className='w-full'
            disabled={addLeavePolicyLoading || updateLeavePolicyLoading}
          >
            {addLeavePolicyLoading || updateLeavePolicyLoading ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </UILoading>
    </HrModal>
  )
}