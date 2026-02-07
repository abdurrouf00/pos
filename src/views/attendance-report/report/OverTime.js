"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { usePDF } from 'react-to-pdf';
import { Button } from '@/components/ui/button';
import UILoading from '@/components/ui/UILoading';
import { useSearchParams } from 'next/navigation';
import { getAttendanceReportByDateRange } from '../store';

export default function OverTime() {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  const { reportData, loading } = useSelector((state) => state.attendanceReport);
  const searchParams = useSearchParams();
  const from_date = searchParams.get('from_date');
  const to_date = searchParams.get('to_date');
  const dispatch = useDispatch();

  useEffect(() => {
    const overTimeData = {
      from_date: from_date,
      to_date: to_date,
    }
    dispatch(getAttendanceReportByDateRange(overTimeData));
  }, [from_date, to_date])
  return (
    <UILoading loading={loading}>
      {reportData.length === 0 ? <div className='bg-white flex justify-center items-center h-full'>
        <p className='text-xl '>No data found</p>
      </div> : <div className='bg-white shadow-md px-4 py-8 rounded-lg text-sm'>
        <div ref={targetRef} className='  px-4 py-8 mb-4'>
          <Header title="Overtime Report"
          // date={data.date}
          />
          <div className='p-4 mt-4'>
            {
              reportData?.map((item, index) => {
                return (
                  <div key={index}>
                    <h2 className='mb-2'>Date: {item.date}</h2>
                    <table className='w-full border mb-8'>
                      <thead>
                        <tr className='bg-gray-100 text-sm text-left'>
                          <th className='px-2 py-1 '>Employee </th>
                          <th className='px-2 py-1 '>Type</th>
                          <th className='px-2 py-1 '>Overtime hours</th>
                          <th className='px-2 py-1 '>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          item?.attendance_details.map((detail, index) => {
                            return (
                              <tr key={index} className='text-sm border border-gray-50'>
                                <td className='px-2 py-1 '>{detail?.employee?.name}</td>
                                <td className='px-2 py-1 '>{detail?.attendance_type?.name}</td>
                                <td className='px-2 py-1 '>{detail?.overtime_hourly}</td>
                                <td className='px-2 py-1 '>{detail?.remarks ?? "-"}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className='flex justify-end  text-sm py-4' >
          <Button variant='secondary' onClick={toPDF}>Save as pdf</Button>
        </div>
      </div>}
    </UILoading>
  )
}
