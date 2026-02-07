import HrModal from '@/components/common/HrModal'
import React, { useEffect, useState } from 'react'
import { useAddEmployeeLeavePolicyMutation, useGetEmployeeLeavePolicyByIdQuery, useUpdateEmployeeLeavePolicyMutation } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import UILoading from '@/components/ui/UILoading';
import HrSelect, { mapOptions } from '@/components/common/HrSelect';
import { useGetLeavePoliciesQuery } from '@/views/leave-policy/store';
import { Button } from '@/components/ui/button';
import HrInput from '@/components/common/HrInput';
import { getAllEmployee } from '@/views/employee/store';
import toast from 'react-hot-toast';
export default function EmployeeLeavePolicyForm({ open, setOpen, editId, setEditId }) {
  const [form, setForm] = useState(
    {
      employee_id: '',
      leave_policy_group_id: '',
      effective_from: '',
      expired_at: '',
      assigned_at: ''
    }
  )
  const dispatch = useDispatch();
  useEffect(() => {
    const params = {
      page: 1,
      per_page: 1000,
    }
    dispatch(getAllEmployee(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { employeeData, loading } = useSelector(({ employee }) => employee);
  const [addEmployeeLeavePolicy, { isLoading: addEmployeeLeavePolicyLoading }] = useAddEmployeeLeavePolicyMutation();
  const [updateEmployeeLeavePolicy, { isLoading: updateEmployeeLeavePolicyLoading }] = useUpdateEmployeeLeavePolicyMutation();
  const { data: employeeLeavePolicyData, isLoading: employeeLeavePolicyDataLoading } = useGetEmployeeLeavePolicyByIdQuery(editId, { skip: !editId });

  const { data: leavePolicyGroupData, isLoading: leavePolicyGroupDataLoading } = useGetLeavePoliciesQuery();
  const leavePolicyGroupOptions = mapOptions(leavePolicyGroupData?.data?.data);
  const employeeOptions = mapOptions(employeeData);

  useEffect(() => {
    if (employeeLeavePolicyData) {
      setForm({
        employee_id: employeeLeavePolicyData?.data?.employee_id,
        leave_policy_group_id: employeeLeavePolicyData?.data?.leave_policy_group_id,
        effective_from: employeeLeavePolicyData?.data?.effective_from,
        expired_at: employeeLeavePolicyData?.data?.expired_at,
        assigned_at: employeeLeavePolicyData?.data?.assigned_at
      });
    }
  }, [employeeLeavePolicyData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...form,
      ...(editId ? { id: editId } : {}),
    }
    const action = editId ? updateEmployeeLeavePolicy(submitData) : addEmployeeLeavePolicy(submitData);
    action.unwrap().then(res => {
      console.log('res', res);
      if (res.success) {
        toast.success(editId ? 'Employee leave policy updated!' : 'Employee leave policy saved!');
        setOpen(false);
        setEditId(null);
      }
    })
      .catch(err => {
        console.log('err', err);
      })
  }

  const handleClose = () => {
    setOpen(false);
    setEditId(null);

  }
  return (
    <HrModal
      title="Employee Leave Policy"
      toggle={open}
      setToggle={setOpen}
      onClose={handleClose}
    >
      <UILoading loading={loading || leavePolicyGroupDataLoading}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <HrSelect
            name="employee_id"
            label="Employee"
            options={employeeOptions}
            value={form.employee_id}
            onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
          />
          <HrSelect
            name="leave_policy_group_id"
            label="Leave Policy Group"
            options={leavePolicyGroupOptions}
            value={form.leave_policy_group_id}
            onChange={(e) => setForm({ ...form, leave_policy_group_id: e.target.value })}
          />
          <HrInput
            name="effective_from"
            label="Starts From"
            value={form.effective_from}
            onChange={(e) => setForm({ ...form, effective_from: e.target.value })}
            type="date"
          />
          <HrInput
            name="expired_at"
            label="Expired At"
            value={form.expired_at}
            type="date"
            onChange={(e) => setForm({ ...form, expired_at: e.target.value })}
          />
          <HrInput
            name="assigned_at"
            label="Assigned At"
            type="date"
            value={form.assigned_at}
            onChange={(e) => setForm({ ...form, assigned_at: e.target.value })}
          />
          <Button
            type="submit"
            className='w-full'
            disabled={addEmployeeLeavePolicyLoading || updateEmployeeLeavePolicyLoading}
          >
            {addEmployeeLeavePolicyLoading || updateEmployeeLeavePolicyLoading ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </UILoading>
    </HrModal>
  )
}