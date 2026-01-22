import UILoading from '@/components/ui/UILoading'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { usePDF } from 'react-to-pdf';
import Header from './Header';
import { useSearchParams } from 'next/navigation';
import { getMonthlyPresentAndAbsentReport } from '../store';
import { Button } from '@/components/ui/button';

export default function PresentAbsentReport() {
  const searchParams = useSearchParams();
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const { reportData, loading } = useSelector((state) => state.attendanceReport);
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  const dispatch = useDispatch();
  useEffect(() => {
    const monthlyData = {
      year: year,
      month: month,
    }
    dispatch(getMonthlyPresentAndAbsentReport(monthlyData));
  }, [year, month])
  return (
    <UILoading loading={loading}>
      <div className='bg-white shadow-md px-4 py-8 rounded-lg'>
        <div ref={targetRef} className='  px-4 py-8 mb-4'>
          <Header title="Monthly Present and Absent Report" date={''} />
          <div className='flex justify-center gap-4 py-4'>
            <h1 className='text-sm text-gray-500'>Year: {year}</h1>
            <h1 className='text-sm text-gray-500'>Month: {month}</h1>
          </div>
          {
            reportData.length > 0 ? (
              <div>
                <table className='w-full'>
                  <thead>
                    <tr className='bg-gray-100 text-sm text-left '>
                      <th className='px-2 '>Date</th>
                      <th className='px-2 '>Present</th>
                      <th className='px-2 '>Absent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((detail, index) => (
                      <tr key={index} className='text-sm border border-gray-50'>
                        <td className='px-2 py-1 '>{detail.date ?? ''}</td>
                        <td className='px-2 py-1 '>{detail.total_presents}</td>
                        <td className='px-2 py-1 '>{detail.total_absents}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>No data found</div>
            )
          }
        </div>
        <div className='flex justify-end  text-sm py-4' >
          <Button variant='secondary' onClick={toPDF}>Save as pdf</Button>
        </div>
      </div>
    </UILoading>
  )
}
