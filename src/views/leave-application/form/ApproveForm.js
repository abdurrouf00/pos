import { Modal, ModalContent, ModalTitle } from '@/components/ui/modal'
import React, { useEffect, useState } from 'react'
import { approveApplication, bindLeaveApplicationData, forwardApplication, getAllLeaveApplications, getLeaveApplication } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import HrSelect from '@/components/common/HrSelect';
import HrInput from '@/components/common/HrInput';
import { getAllLeaveType } from '@/views/leave-type/store';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import { getAllEmployee } from '@/views/employee/store';
import { getAllDepartment } from '@/views/department/store';

const getReadableDate = (date) => {
  return moment(date).format('MMMM Do YYYY');
}
const ApproveForm = ({ form, setForm, data }) => {
  const [leaveTypeOptions, setLeaveTypeOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const handleLeaveTypeFocus = async () => {
    const res = await dispatch(getAllLeaveType()).unwrap();
    if (res.data) {
      setLeaveTypeOptions(res.data.map(item => ({ label: item.name, value: item.id })));
    }
  }

  const handleApproveDatesChange = (checked, value, isAll = false) => {
    if (isAll) {
      setForm({ ...form, approve_dates: checked ? data.leave_dates.map(item => item.date) : [] });
      return;
    } else {
      const currentDates = new Set(form.approve_dates);
      if (checked) {
        currentDates.add(value);
      } else {
        currentDates.delete(value);
      }

      setForm({ ...form, approve_dates: Array.from(currentDates) });
    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.approve_dates.length === 0) {
      toast.error('Please select at least one date')
      return;
    }
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    try {
      setLoading(true);
      const res = await dispatch(approveApplication({ id: data.id, data: formData })).unwrap();
      if (res) {
        toast.success('Application approved ');
        dispatch(getAllLeaveApplications());
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false);
    }

  }
  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <HrSelect
        label='Leave Type'
        options={leaveTypeOptions}
        name='leave_type_id'
        value={form.leave_type_id}
        onFocus={handleLeaveTypeFocus}
        onChange={handleChange}
        required
      />
      <div className='space-y-2'>
        <Label htmlFor="approveDates" >Approve Dates</Label>
        <div className='flex items-center gap-2'>
          <Checkbox
            id="approveDates"
            checked={form.approve_dates.length === data.leave_dates.length}
            onCheckedChange={(checked) => handleApproveDatesChange(checked, null, true)}
          />
          <Label htmlFor="approveDates">All</Label>
        </div>
        <div className='flex flex-wrap gap-2 mt-2'>
          {
            data.leave_dates.map(item => (
              <div key={item.id} className='flex items-center gap-2 max-w-32  w-full'>
                <Checkbox
                  id={item.id}
                  checked={form.approve_dates.includes(item.date)}
                  onCheckedChange={(checked) => handleApproveDatesChange(checked, item.date)}
                />
                <Label htmlFor={item.id}
                  className={'text-neutral-700'}>
                  {item.date}
                </Label>
              </div>
            ))
          }
        </div>
      </div>

      <HrInput
        label='Remarks'
        name='remarks'
        type='textarea'
        value={form.remarks}
        onChange={handleChange}
      />
      <div className='flex justify-end mt-4'>
        <Button
          variant='primary'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Approving...' : 'Approve Application'}
        </Button>
      </div>
    </form>
  )
}
const ForwardForm = ({ form, setForm, data }) => {
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('employee_id', form.employee_id);

    try {
      setLoading(true);
      const res = await dispatch(forwardApplication({ id: data.id, data: formData })).unwrap();
      if (res) {
        toast.success('Application forwarded ');
        dispatch(getAllLeaveApplications());
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false);
    }

  }
  const handleEmployeeFocus = async () => {
    const res = await dispatch(getAllEmployee(form.department_id)).unwrap();
    if (res) {
      setEmployeeOptions(res.map(item => ({ label: item.name, value: item.id })));
    }
  }
  const handleDepartmentFocus = async () => {
    const res = await dispatch(getAllDepartment()).unwrap();
    if (res) {
      setDepartmentOptions(res.map(item => ({ label: item.name, value: item.id })));
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex gap-2 '>
        <HrSelect
          label='Department'
          options={departmentOptions}
          name='department_id'
          value={form.department_id}
          onChange={handleChange}
          onFocus={handleDepartmentFocus}
          className='w-full'
          required
        />
        <HrSelect
          label='Employee'
          options={employeeOptions}
          name='employee_id'
          value={form.employee_id}
          onChange={handleChange}
          onFocus={handleEmployeeFocus}
          className='w-full'
          required={form.department_id}
          disabled={!form.department_id}
        />
      </div>
      <div className='flex justify-end mt-4'>
        <Button
          variant='primary'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Forwarding...' : 'Forward Application'}
        </Button>
      </div>

    </form>
  )
}
export default function ApproveForModal({ open, setOpen, id, data }) {
  const [formState, setFormState] = useState('approve');
  const [approveForm, setApproveForm] = useState({
    approve_dates: [],
    leave_type_id: '',
    remarks: ''
  });
  const [forwardForm, setForwardForm] = useState({
    employee_id: '',
    department_id: ''
  });


  const dispatch = useDispatch();

  // const getData = async () => {
  //   const res = await dispatch(getLeaveApplication(id)).unwrap();
  //   setLeaveApplication(res);
  // }

  // useEffect(() => {
  //   if (id) {
  //     getData()
  //   } else {
  //     dispatch(bindLeaveApplicationData());
  //   }
  // }, [id]);


  const onOpenChange = () => {
    setOpen(!open);
  };

  const handleFormState = (state) => {
    setFormState(state);
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className='max-w-3xl w-full max-h-[80vh] overflow-y-auto text-sm' >
        <ModalTitle>Leave Application</ModalTitle>
        <div>
          {/* title */}
          <div className='text-center flex flex-col gap-2'>
            <div>
              <h2>Muktodhara Technology Ltd.</h2>
              <p className='text-xs text-neutral-600'>No compromise with quality</p>
            </div>

          </div>
          {/* application details */}
          <div className='flex flex-col gap-4  text-neutral-700 mt-4'>
            {/* to */}
            <div>
              <p>To</p>
              <p>HR</p>
              <p><b>Subject:</b> Leave Application</p>
            </div>
            <div>
              <p>Dear Sir,</p>
              <p className='mt-1'>I'm writing to request you for a leave of <b>{data.leave_dates.length}</b> days from <b>{getReadableDate(data.leave_dates[0].date)}</b> <span> to </span><b>{getReadableDate(data.leave_dates[data.leave_dates.length - 1].date)}</b> because of <b>{data.leave_cause}</b>.</p>
            </div>
            <div>
              <p>Yours sincerely,</p>
              <p className='mt-1 font-medium text-neutral-900'>{data.employee.name}</p>
              <p className='mt-0.5 text-neutral-900'>{data.employee.designation.name}</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 mt-6'>
          {/* action */}
          <div className='flex gap-2'>
            <Button
              variant={formState === 'approve' ? 'success' : 'outline-success'}
              onClick={() =>
                handleFormState('approve')}>
              Approve
            </Button>
            <Button
              variant={formState === 'forward' ? 'success' : 'outline-success'}
              onClick={() => handleFormState('forward')}>
              Forward
            </Button>
          </div>
        </div>
        <div>
          {formState === 'approve' ? <ApproveForm
            form={approveForm}
            setForm={setApproveForm}
            data={data}
          /> : <ForwardForm form={forwardForm} setForm={setForwardForm} data={data} />}
          {/* <div className='flex justify-end mt-4'>
            {formState === 'approve' ? <Button
              variant='primary'
              onClick={handleApproveApplication}>
              Approve Application
            </Button> : <Button>Forward</Button>}
          </div> */}
        </div>
      </ModalContent>
    </Modal>
  )
}
