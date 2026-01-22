"use client";
import HrInput from '@/components/common/HrInput';
import HrSelect, { mapOptions } from '@/components/common/HrSelect';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getAllDepartment } from '@/views/department/store';
import { getAllEmployee } from '@/views/employee/store';
import moment from 'moment';
import { useRouter } from 'nextjs-toploader/app';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createDutyRoster } from '../store';

const initialColumns = [
  {
    label: 'Employee',
    data: []
  },
  {
    label: 'Shifts'
  }
]

function generateDateStringsFromToday(numberOfDays, fromDate) {
  const dates = [];
  const today = moment(fromDate);

  for (let i = 0; i < numberOfDays; i++) {
    const date = moment(today).add(i, 'days');

    dates.push({
      value: date.format('YYYY-MM-DD'),
      name: date.format('ddd, MMM DD') // e.g., "Mon, Jan 15"
    });
  }

  return dates;
}

export default function DutyRosterForm() {
  const [columns, setColumns] = useState(initialColumns);
  const [columnsData, setColumnsData] = useState({
    department: '',
    days: 0,
    fromDate: '',
  });
  const [selectedDates, setSelectedDates] = useState({});
  const [dateColumns, setDateColumns] = useState([]);
  const [createTableLoading, setCreateTableLoading] = useState(false);
  const [formData, setFormData] = useState([]);

  //global
  const { departmentData } = useSelector(({ department }) => department);
  const { employeeData } = useSelector((state) => state.employee);
  const { mutationLoading } = useSelector((state) => state.dutyRoster);
  const dispatch = useDispatch();

  const router = useRouter();


  //functions
  const handleDepartmentOnFocus = () => {
    dispatch(getAllDepartment());
  };

  const getNonNullShiftsConcise = (employee) => {
    const shiftKeys = [
      'working_shift1',
      'working_shift2',
      'working_shift3',
      'working_shift4',
      'working_shift5',
      'working_shift6'
    ];

    return shiftKeys
      .filter(key => employee[key] !== null && employee[key] !== undefined)
      .map(key => ({
        ...employee[key],
        type: key
      }));
  };
  const handleCreateTable = async (e) => {
    e.preventDefault();
    try {
      setCreateTableLoading(true);

      const dates = generateDateStringsFromToday(columnsData.days, columnsData.fromDate);

      const newDateColumns = dates.map(date => ({
        label: date.name,
        value: date.value
      }));
      let form = []
      const response = await dispatch(getAllEmployee(columnsData.department)).unwrap();
      response.data.forEach((employee) => {
        // Assuming employee has an array of shifts like employee.working_shifts
        const shifts = getNonNullShiftsConcise(employee);

        dates.forEach((date) => {
          shifts.forEach((shift) => {
            form.push({
              employee_id: employee.id,
              shift_id: shift.id,
              date: date.value,
              start_time: shift.start_time,
              end_time: shift.end_time,
              shift_type: shift.type,
              checked: false
            });
          });
        });
      });
      setFormData(form);

      setDateColumns(newDateColumns);
      setColumns([...initialColumns, ...newDateColumns]);

      // Initialize selected dates state
      const initialSelectedDates = {};
      dates.forEach(date => {
        initialSelectedDates[date.value] = {};
      });
      setSelectedDates(initialSelectedDates);
    } catch (error) {
      console.error('Failed to create table:', error);
    } finally {
      setCreateTableLoading(false);

    }
  };

  const handleColumnsData = (e) => {
    const { name, value } = e.target;

    setColumnsData({
      ...columnsData,
      [name]: value
    })
  }

  const handleCheckboxChange = (employeeId, dateValue, shift, checked) => {
    const otherData = formData.filter(data => !(
      data.employee_id === employeeId &&
      data.date === dateValue &&
      data.shift_type === shift.type
    ));
    const selectedData = {
      employee_id: employeeId,
      date: dateValue,
      shift_type: shift.type,
      checked: checked,
      start_time: shift.start_time,
      end_time: shift.end_time,
      shift_id: shift.id
    }
    setFormData([...otherData, { ...selectedData }]);
  };

  const handleSelectAll = () => {
    setFormData(formData.map(data => ({ ...data, checked: !data.checked })));
  };




  const updatedEmployeeData = employeeData.length > 0 ? employeeData.map(employee => {
    return {
      ...employee,
      shifts: getNonNullShiftsConcise(employee),
      dates: dateColumns
    }
  }) : [];

  const handleSave = async () => {
    const submittedData = formData.filter(data => data.checked).map(data => {
      const { checked, ...rest } = data;
      return rest;
    })
    if (submittedData.length > 0) {
      const res = await dispatch(createDutyRoster(submittedData)).unwrap();
      if (res) {
        router.push('/dashboard/duty-roster');
      }
    } else {
      toast.error('Please select at least one employee');
    }
  }

  return (
    <div className='mt-4'>
      <form onSubmit={handleCreateTable} className='grid 2xl:grid-cols-6 md:grid-cols-3  gap-4'>
        <HrSelect
          placeholder='Select Department'
          label='Department'
          onChange={handleColumnsData}
          name='department'
          value={columnsData.department}
          onFocus={handleDepartmentOnFocus}
          options={mapOptions(departmentData)}
          required
        />
        <HrInput
          placeholder='Days'
          label='Days'
          type='number'
          min={1}
          max={31}
          onChange={handleColumnsData}
          name='days'
          value={columnsData.days}
          required
        />
        <HrInput
          placeholder='From Date'
          label='From Date'
          type='date'
          onChange={handleColumnsData}
          name='fromDate'
          value={columnsData.fromDate}
          required
        />
        <div className='flex items-end'>
          <Button variant='primary'
          >Create Table</Button>
        </div>
      </form>
      <div className='mt-4'>

        <div className=''>

          {createTableLoading ? <div className='flex items-center justify-center'>
            <p>Generating Table...</p>
          </div> : !createTableLoading && columns.length && updatedEmployeeData.length > 0 ? <><div className='flex items-center justify-end mb-4'>
            <Button variant={'outline'} onClick={handleSelectAll}>
              {
                formData.every(data => data.checked === true) ? 'Deselect all' : 'Select all'
              }
            </Button>
            <Button disabled={mutationLoading} className='ml-3' onClick={handleSave}>
              {mutationLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
            <div className=' overflow-x-auto'>
              <table className='text-[0.8rem] w-full border-collapse border border-gray-200 '>
                <thead>
                  <tr className='relative'>
                    {columns.map((column, index) => (
                      <th key={index} className={cn('font-light text-left px-6 py-2 min-w-max w-max bg-neutral-50 text-neutral-600  border border-gray-200 text-nowrap', {
                        // 'sticky left-0 ': index === 0
                      })}>
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {updatedEmployeeData.map((employee, employeeIndex) => {
                    const shifts = employee.shifts && employee.shifts.length > 0
                      ? employee.shifts
                      : [{ id: 'No Shift' }];
                    return (
                      <React.Fragment key={employee.id || employeeIndex}>
                        {shifts.map((shift, shiftIndex) => (
                          <tr key={shiftIndex} className='border-b border-gray-200 hover:bg-blue-50/50 relative'>
                            {/* Only render the employee name on the first row, with rowspan */}
                            {shiftIndex === 0 && (
                              <td
                                rowSpan={shifts.length}
                                className='px-6 py-3 border border-gray-200 align-top bg-white'
                              >
                                <div className='font-medium text-gray-900 text-nowrap'>
                                  {employee.name || 'N/A'}
                                </div>
                              </td>
                            )}

                            {/* Shift label */}
                            <td className='px-6 py-3 border border-gray-200'>
                              <span className='px-2 py-1 bg-blue-100 text-blue-800  rounded text-nowrap'>
                                {shift.id === 'No Shift' ? 'No shifts' : `Shift ${shift.id}`}
                              </span>
                            </td>

                            {/* Checkboxes for each date */}
                            {employee.dates.map((date) => (
                              <td
                                key={date.value}
                                className=' py-3 border border-gray-200 text-center'
                              >
                                <input
                                  type='checkbox'
                                  checked={formData.length > 0 ? formData.some(data => data.employee_id === employee.id && data.date === date.value && data.shift_type === shift.type && data.checked === true) : false}
                                  onChange={(e) =>
                                    handleCheckboxChange(employee.id, date.value, shift, e.target.checked)
                                  }
                                  className='size-3 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 focus:ring-2 accent-blue-500 outline-none'
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>

              </table>

            </div></> : null}

        </div>
      </div>
    </div >
  )
}
