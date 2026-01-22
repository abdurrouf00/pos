'use client'

import HrModal from '@/components/common/HrModal';
import { Button } from '@/components/ui/button';
import UILoading from '@/components/ui/UILoading';
import { formatBDnumber, numberToWords } from '@/lib/utils';
import { useRef } from 'react';
import { useSelector } from 'react-redux';


const LabelValue = ({ label, value }) => {
  return (
    <tr className='text-xs '>
      <td className='font-semibold w-40 p-0.5'>{label}</td>
      <td className='p-0.5'>:</td>
      <td className='p-0.5'>{value ?? '-'}</td>
    </tr>
  )
}

export default function PaySlip({ open, setOpen }) {
  const { fetchingPaySlip, paySlipData } = useSelector(({ salarySheet }) => salarySheet);
  console.log('paySlipData', paySlipData);
  const divRef = useRef(null);

  // const toggle = () => {
  //   setOpen(false);
  // }
  const columns = [

    {
      field: "head_name",
      header: "Salary Head",
      sorting: false

    },
    {
      field: "amount",
      header: "Amount",
      sorting: false,
      body: (rowData) => <div className="text-end">{formatBDnumber(rowData.amount)}</div>
    },


  ];
  const employee = paySlipData?.employee_info || null;
  const salarySheet = paySlipData?.salary_detail || null;
  const addition = paySlipData?.salary_detail?.filter(itm => itm.amount > 0)
  const deduction = paySlipData?.salary_detail?.filter(itm => itm.amount < 0)
  const totalAddition = addition?.reduce((acc, item) => acc + item.amount, 0) || 0;
  const totalDeduction = deduction?.reduce((acc, item) => acc + item.amount, 0) || 0;
  const totalSalary = totalAddition - totalDeduction;


  const handlePrint = () => {
    const printContent = divRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // refresh to restore React state
  };

  return (
    <HrModal
      toggle={open}
      setToggle={setOpen}
      title={'Pay Slip'}
      className='w-full'
      size='max-w-3xl'
    >
      <UILoading loading={fetchingPaySlip}>
        <div>
          <div className='border rounded border-gray-900 p-2 space-y-4' ref={divRef}>
            <div className=' grid grid-cols-2   mb-3'>
              <table>
                <tbody>
                  <LabelValue label='Employee Id' value={employee?.emp_id} />
                  <LabelValue label='Employee Name' value={employee?.name} />
                  <LabelValue label='DOJ' value={employee?.joinning_date} />
                  <LabelValue label='Employee Designation' value={employee?.designation?.name} />
                  <LabelValue label='Grade' value={employee?.project} />
                  <LabelValue label='Department' value={employee?.department?.name} />
                </tbody>
              </table>
              <table>
                <tbody>
                  <LabelValue label='Division' value={employee?.division?.name} />
                  <LabelValue label='Branch' value={employee?.branch?.name} />
                  <LabelValue label='Section' value={employee?.section?.name} />
                  <LabelValue label='Location' value={employee?.present_address} />
                  <LabelValue
                    label='Category'
                    value={employee?.category?.name}
                  // value={''}
                  />
                  <LabelValue label='Job Type' value={employee?.job_type?.name} />
                </tbody>
              </table>

            </div>
            <div className='grid grid-cols-2 mt-4'>
              <table className='table-auto min-w-full  custom_datatable'>
                <thead>
                  <tr>
                    <th className='border border-gray-900'>Addition</th>
                    <th className='border border-gray-900'>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {addition?.map((item, index) => (
                    <tr key={index}>
                      <td className='border p-1 border-gray-900'>{item.head_name}</td>
                      <td className='border p-1 text-end border-gray-900'>{formatBDnumber(item.amount)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className='border p-1 text-end font-semibold border-gray-900'>Total</td>
                    <td className='border p-1 text-end font-semibold border-gray-900'>{formatBDnumber(totalAddition)}</td>
                  </tr>
                </tbody>
              </table>
              <table className='table-auto min-w-full  custom_datatable'>
                <thead>
                  <tr>
                    <th className='border border-gray-900'>Deduction</th>
                    <th className='border border-gray-900'>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {deduction?.map((item, index) => (
                    <tr key={index}>
                      <td className='border p-1 border-gray-900'>{item.head_name}</td>
                      <td className='border p-1 text-end border-gray-900'>{formatBDnumber(item.amount)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className='border p-1 text-end font-semibold border-gray-900'>Total</td>
                    <td className='border p-1 text-end font-semibold border-gray-900'>{formatBDnumber(totalDeduction)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='space-y-1 text-xs'>
              <div>
                <span className='font-semibold'>Take Home Salary:{formatBDnumber(totalSalary)}</span>
              </div>
              <div>
                <span className='font-semibold'>Number in words: Taka {numberToWords(totalSalary)} Only</span>

              </div>
            </div>

          </div>
          <div className='flex justify-end mt-2'>
            <Button onClick={handlePrint}>Print</Button>
          </div>
        </div>

      </UILoading>
    </HrModal>
  )
}
