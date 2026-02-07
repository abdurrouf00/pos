import { Button } from '@/components/ui/button';
import UILoading from '@/components/ui/UILoading';
import { calculateTotalTime } from '@/lib/utils';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { usePDF } from 'react-to-pdf';
import Header from './Header';
import { attendaceEmployeeReport } from '../store';
import { useSearchParams } from 'next/navigation';

export default function DailyAttendanceReport() {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const department = searchParams.get('department');
  const { reportData, loading } = useSelector((state) => state.attendanceReport);
  const details = reportData[0]?.attendance_details ?? [];
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  const dispatch = useDispatch();

  useEffect(() => {
    const dailyData = {
      from_date: date,
      department_id: department,
      to_date: null,
      employee_id: null,
    }
    dispatch(attendaceEmployeeReport(dailyData));
  }, [date, department])
  return (
    <UILoading loading={loading}>
      {details.length === 0 ? <div className='bg-white flex justify-center items-center h-full'>
        <p className='text-xl '>No data found</p>
      </div> : <div className='bg-white shadow-md px-4 py-8 rounded-lg'>
        <div ref={targetRef} className=''>
          <Header title="Daily Attendance Report" date={reportData[0]?.date ?? ''} />
          <div className='px-4 py-8 mb-4'>
            {/* <Header title="Daily Attendance Report" date={data ? data?.date : ''} /> */}


            <div>
              <table className='w-full'>
                <thead>
                  <tr className='bg-gray-100 text-sm text-left '>
                    <th className='px-2 py-1 '>Emp Id</th>
                    <th className='px-2 py-1 '>Name</th>
                    <th className='px-2 py-1 '>Department</th>
                    <th className='px-2 py-1 '>Shift</th>
                    <th className='px-2 py-1 '>Duration</th>
                    <th className='px-2 py-1 '>In Time</th>
                    <th className='px-2 py-1 '>Out Time</th>
                    <th>Overtime hours</th>
                    {/* <th className='px-2 '>Total</th> */}
                    <th className='px-2 '>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((detail) => (
                    <tr key={detail.id} className='text-sm border border-gray-50'>
                      <td className='px-2 py-1 '>{detail.employee.emp_id}</td>
                      <td className='px-2 py-1 '>{detail.employee.name}</td>
                      <td className='px-2 py-1 '>{detail.employee.department?.name}</td>
                      <td className='px-2 py-1 '>{detail.working_shift?.name}</td>
                      <td className='px-2 py-1 '>
                        {detail.in_time && detail.out_time &&
                          calculateTotalTime(detail.in_time, detail.out_time)
                        }
                      </td>
                      <td className='px-2 py-1 '>{detail.in_time}</td>
                      <td className='px-2 py-1 '>{detail.out_time}</td>
                      <td className='px-2 py-1 '>{detail.overtime_hourly}</td>
                      <td className='px-2 py-1 '>{detail.attendance_type.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='flex justify-end  text-sm py-4' >
          <Button variant='secondary' onClick={toPDF}>Save as pdf</Button>
        </div>
      </div>}
    </UILoading>
  )
}
