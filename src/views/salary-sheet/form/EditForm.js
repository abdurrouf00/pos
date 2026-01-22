"use client";

import HrInput from '@/components/common/HrInput';
import { Button } from '@/components/ui/button';
import UILoading from '@/components/ui/UILoading';
import { cn, formatBDnumber } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaySlip, getSalarySheetById, updateSalarySheetDetails } from '../store';
import PaySlip from './PaySlip';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Eye } from 'lucide-react';

export default function EditForm({ id }) {
  const [fetching, setFetching] = useState(false);
  const [formData, setFormData] = useState(null);
  const { mutationLoading } = useSelector(state => state.salarySheet)
  const [openPaySlip, setOpenPaySlip] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const getData = () => {
    setFetching(true);
    dispatch(getSalarySheetById(id)).then((res) => {
      const data = res.payload;
      setFormData(data);
      setFetching(false);
    }).catch((err) => {
      setFetching(false);
    });
  }
  useEffect(() => {
    getData();
  }, [id]);

  const handleChange = (e, id) => {
    const updatedDetails = formData.salary_sheet_details.map((detail) => {
      if (detail.id === id) {
        return {
          ...detail,
          employee: {
            ...detail.employee,
            salary_sheet_head_details: detail.employee.salary_sheet_head_details.map((head) => {
              if (head.head_name === e.target.name) {
                return { ...head, amount: e.target.value };
              }
              return head;
            })
          },
          total_payable: detail.employee.salary_sheet_head_details.filter((head) => head.head_name !== e.target.name).reduce((acc, head) => acc + +head.amount, 0) + +e.target.value
        };
      }
      return detail;
    });
    setFormData({ ...formData, salary_sheet_details: updatedDetails });
  }

  const handlePaySlip = (employeeId) => {
    dispatch(getPaySlip({
      id: formData.id,
      emp_id: employeeId
    }));
    setOpenPaySlip(true);
  }
  const columns = formData && formData.salary_sheet_details.length > 0 ? [
    {
      name: "SL",
      field: "sl",
      cell: (detail, index) => <div className='text-center'>{index + 1}</div>,
    },
    // {
    //   name: "Id",
    //   field: "id",
    // },
    {
      name: "Employee",
      field: "employee.name",
      cell: (detail) => <div>{detail.employee.name}</div>,
    },
    {
      name: "Dept/Designation",
      field: "dept_designation",
      className: "max-w-[80px]",
      cell: (detail) => <div>{detail.employee.designation?.name}</div>,
    },
    ...formData.salary_sheet_details[0].employee.salary_sheet_head_details.map((head) => ({
      name: head.head_name,
      field: head.head_name,
      className: "text-end max-w-[60px]",
      cell: (detail) => {
        const value = detail.employee.salary_sheet_head_details.find((dt) => dt.head_name === head.head_name)?.amount;
        return <div>
          <HrInput
            value={value}
            name={head.head_name}
            onChange={(e) => handleChange(e, detail.id)}
            className='text-end'
            type='number'
          />
        </div>
      },
    })),
    {
      name: "Total",
      field: "total_payable",
      className: "text-end max-w-[60px]",
      cell: (detail) => <div className='text-end'>{formatBDnumber(detail.total_payable)}</div>,
    },
    {
      name: "Action",
      field: "action",
      className: "text-end max-w-[60px]",
      cell: (detail) => <div className='text-end'>
        <Button variant='outline' onClick={() => handlePaySlip(detail.employee.id)}>
          <Eye className='w-4 h-4 text-blue-600' /> Pay Slip</Button>
      </div>,

    }
  ] : [];
  const handleUpdate = () => {
    const employees_salary = formData.salary_sheet_details.map(detail => {
      return {
        employee_id: detail.employee.id,
        total_payable: detail.total_payable,
        employees_head_wise_salary: detail.employee.salary_sheet_head_details.map(head => {
          return {
            head_name: head.head_name,
            head_id: head.head_id,
            amount: head.amount,
          }
        })
      }
    })
    const data = {
      salary_sheet_id: formData.id,
      employees_salary
    }
    dispatch(updateSalarySheetDetails(data)).then((res) => {
      if (res.payload.success) {
        toast.success('Salary Sheet Updated');
        router.push('/dashboard/salary-sheet');
      }
    }).catch((err) => {
      toast.error('Salary Sheet Updated failed');
    })
  }
  return (
    <div className='px-10 py-8 bg-white rounded'>
      <div className='flex justify-between items-center py-4'>
        <h3 className='text-lg font-semibold'>Salary Sheet Details</h3>
        <Button onClick={handleUpdate} disabled={mutationLoading}>{mutationLoading ? 'Updating...' : 'Update'}</Button>
      </div>
      <UILoading loading={fetching}>
        <div className='overflow-x-auto mt-4'>
          {formData && formData.salary_sheet_details.length > 0 && <table className='table-auto min-w-full border-collapse custom_datatable'>
            <thead>
              <tr className='bg-gray-100 '>
                {
                  columns.map((column) => (
                    <th key={column.field} className='min-w-[30px] font-semibold py-2'>{column.name}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                formData.salary_sheet_details.map((detail, index) => (
                  <tr key={detail.id}>
                    {
                      columns.map((column) => (
                        <td
                          key={column.field}
                          className={
                            cn(
                              "min-w-[30px] p-1 border border-gray-100",
                              column.className ? column.className : ""
                            )
                          }>
                          {column.cell ? column.cell(detail, index) : detail[column.field]}
                        </td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>}
        </div>
      </UILoading>
      {openPaySlip && <PaySlip open={openPaySlip} setOpen={setOpenPaySlip} />}
    </div>
  )
}
