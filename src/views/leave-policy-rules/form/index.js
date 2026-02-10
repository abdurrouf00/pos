'use client';
import HrInput from '@/components/common/HrInput';
import HrSelect, { mapOptions } from '@/components/common/HrSelect';
import HrSwitch from '@/components/common/HrSwitch';
import { Button } from '@/components/ui/button';
import { useGetLeavePoliciesQuery } from '@/views/leave-policy/store';
import { getAllLeaveType } from '@/views/leave-type/store';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAddLeavePolicyRuleMutation, useGetLeavePolicyRuleByIdQuery, useUpdateLeavePolicyRuleMutation } from '../store';
import toast from 'react-hot-toast';
import HrModal from '@/components/common/HrModal';
import UILoading from '@/components/ui/UILoading';

const eligibleGendersOptions = [
  { label: 'Male', value: 1 },
  { label: 'Female', value: 2 },
  { label: 'Other', value: 3 },
]

export default function FormModal({ open, setOpen, editId, setEditId }) {
  const [form, setForm] = useState(
    {
      leave_policy_group_id: '',
      leave_type_id: '',
      allocation: '',
      is_carry_forward: '',
      carry_forward_limit: '',
      is_encashment: '',
      encashment_limit: '',
      eligible_genders: '',
      min_service_days: '',
      max_consecutive_days: '',
      is_active: 1
    }
  )

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeaveType());
  }, []);

  const { data: leavePolicyRuleData, isLoading: leavePolicyRuleDataLoading } = useGetLeavePolicyRuleByIdQuery(editId, { skip: !editId });

  useEffect(() => {
    if (leavePolicyRuleData) {
      setForm(leavePolicyRuleData?.data);
    }
  }, [leavePolicyRuleData]);



  const [addLeavePolicyRule, { isLoading: addLeavePolicyRuleLoading }] = useAddLeavePolicyRuleMutation();
  const [updateLeavePolicyRule, { isLoading: updateLeavePolicyRuleLoading }] = useUpdateLeavePolicyRuleMutation();

  const { data: leavePolicyGroups, isLoading } = useGetLeavePoliciesQuery();
  const leavePolicyGroupOptions = mapOptions(leavePolicyGroups?.data?.data);


  const { data: leaveTypeData, fetchingAllData } = useSelector((state) => state.leaveType);
  const leaveTypeOptions = mapOptions(leaveTypeData?.data);


  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      leave_policy_group_id: form.leave_policy_group_id,
      leave_type_id: form.leave_type_id,
      allocation: +form.allocation,
      is_carry_forward: form.is_carry_forward ? 1 : 0,
      carry_forward_limit: +form.carry_forward_limit,
      is_encashment: form.is_encashment ? 1 : 0,
      encashment_limit: +form.encashment_limit,
      eligible_genders: +form.eligible_genders,
      min_service_days: +form.min_service_days,
      max_consecutive_days: +form.max_consecutive_days,
      is_active: form.is_active ? 1 : 0,
      ...(editId ? { id: editId } : {}),
    }
    const action = editId ? updateLeavePolicyRule({ id: editId, ...submitData }) : addLeavePolicyRule(submitData);
    action.unwrap().then((res) => {
      if (res.success) {
        setOpen(false);
        setEditId(null);
        toast.success('Leave policy rule created!');
      }
    })
  }


  return (
    <HrModal
      title={editId ? 'Edit Leave Policy Rule' : 'Add Leave Policy Rule'}
      toggle={open}
      setToggle={setOpen}
      onClose={() => setOpen(false)}
    >
      <UILoading loading={isLoading || fetchingAllData}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <HrSelect
            name="leave_policy_group_id"
            label="Leave Policy Group"
            options={leavePolicyGroupOptions}
            value={form.leave_policy_group_id}
            onChange={(e) => setForm({ ...form, leave_policy_group_id: e.target.value })}
          />
          <HrSelect
            name="leave_type_id"
            label="Leave Type"
            options={leaveTypeOptions}
            value={form.leave_type_id}
            onChange={(e) => setForm({ ...form, leave_type_id: e.target.value })}
          />
          <HrInput
            name="allocation"
            label="Allocation"
            value={form.allocation}
            type="number"
            onChange={(e) => setForm({ ...form, allocation: e.target.value })}
          />
          <HrSwitch
            name="is_carry_forward"
            label="Is Carry Forward"
            checked={form.is_carry_forward === 1 ? true : false}
            onChange={(checked) => setForm({ ...form, is_carry_forward: checked ? 1 : 0 })}
          />
          <HrInput
            name="carry_forward_limit"
            label="Carry Forward Limit"
            value={form.carry_forward_limit}
            type="number"
            onChange={(e) => setForm({ ...form, carry_forward_limit: e.target.value })}
          />
          <HrSwitch
            name="is_encashment"
            label="Is Encashment"
            checked={form.is_encashment === 1 ? true : false}
            onChange={(checked) => setForm({ ...form, is_encashment: checked ? 1 : 0 })}
          />
          <HrInput
            name="encashment_limit"
            label="Encashment Limit"
            type="number"
            value={form.encashment_limit}
            onChange={(e) => setForm({ ...form, encashment_limit: e.target.value })}
          />
          <HrSelect
            name="eligible_genders"
            label="Eligible Genders"
            options={eligibleGendersOptions}
            value={form.eligible_genders}
            onChange={(e) => setForm({ ...form, eligible_genders: e.target.value })}
          />
          <HrInput
            name="min_service_days"
            label="Min Service Days"
            value={form.min_service_days}
            onChange={(e) => setForm({ ...form, min_service_days: e.target.value })}
          />
          <HrInput
            name="max_consecutive_days"
            label="Max Consecutive Days"
            value={form.max_consecutive_days}
            onChange={(e) => setForm({ ...form, max_consecutive_days: e.target.value })}
          />
          <HrSwitch
            name="is_active"
            label="Is Active"
            checked={form.is_active}
            onCheckedChange={(checked) => setForm({ ...form, is_active: checked ? 1 : 0 })}
          />
          <Button
            variant="primary"
            type="submit"
            className='w-full'
            disabled={addLeavePolicyRuleLoading || updateLeavePolicyRuleLoading}
          >
            {addLeavePolicyRuleLoading || updateLeavePolicyRuleLoading ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </UILoading>
    </HrModal>
  )
}