'use client'

import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import { Button } from '@/components/ui/button'
import { usePDF } from 'react-to-pdf'
import UILoading from '@/components/ui/UILoading'
import { calculateTotalTime } from '@/lib/utils'
import { attendaceEmployeeReport } from '../store'
import { useSearchParams } from 'next/navigation'

export default function EmployeeJobCard() {
  const searchParams = useSearchParams()
  const from_date = searchParams.get('from_date')
  const to_date = searchParams.get('to_date')
  const employee_id = searchParams.get('employee_id')
  const { reportData, loading } = useSelector(state => state.attendanceReport)
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' })
  const data = reportData?.length > 0 ? reportData[0] : null
  const details = data?.attendance_details ?? []
  const dispatch = useDispatch()

  useEffect(() => {
    const employeeJobCardData = {
      from_date: from_date,
      to_date: to_date,
      employee_id: employee_id,
    }
    dispatch(attendaceEmployeeReport(employeeJobCardData))
  }, [from_date, to_date, employee_id])

  return (
    <UILoading loading={loading}>
      {details.length === 0 ? (
        <div className="bg-white flex justify-center items-center h-full">
          <p className="text-xl ">No data found</p>
        </div>
      ) : (
        <div className="bg-white shadow-md px-4 py-8 rounded-lg">
          {/* report */}
          <div ref={targetRef} className="  px-4 py-8 mb-4">
            <Header title="Employee Job Card" date={data ? data?.date : ''} />
            <div className="grid grid-cols-2 gap-4 my-4 text-sm">
              <div>
                <div className="flex  gap-2">
                  <h4 className=" font-bold">Employee ID & Name:</h4>
                  <p>
                    {details[0]?.employee?.emp_id} - {details[0]?.employee?.name}
                  </p>
                </div>
                <div className="flex  gap-2">
                  <h4 className=" font-bold">Designation & Grade:</h4>
                  <p>{details[0]?.employee?.designation?.name}</p>
                </div>
                <div className="flex  gap-2">
                  <h4 className=" font-bold">Department:</h4>
                  <p>{details[0]?.employee?.department?.name}</p>
                </div>
                <div className="flex  gap-2">
                  <h4 className=" font-bold">Project:</h4>
                  <p>{details[0]?.employee?.project}</p>
                </div>
              </div>
              <div>
                <div className="flex  gap-2">
                  <h4 className=" font-bold">DOB:</h4>
                </div>
                <div className="flex  gap-2">
                  <h4 className=" font-bold">Division:</h4>
                  <p>{details[0]?.employee?.division}</p>
                </div>
                <div className="flex  gap-2">
                  <h4 className=" font-bold">Section:</h4>
                  <p>{details[0]?.employee?.section}</p>
                </div>
                <div className="flex  gap-2">
                  <h4 className=" font-bold">Location:</h4>
                  <p>{details[0]?.employee?.location}</p>
                </div>
              </div>
            </div>
            <div>
              <div>
                {/* <h2 className='mb-2 text-sm '>Date: {item.date}</h2> */}
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 text-sm text-left ">
                      <th className="px-2 py-1 ">Date</th>
                      <th className="px-2 py-1 ">In time</th>
                      <th className="px-2 py-1 ">Out time</th>
                      <th className="px-2 py-1 ">Total</th>
                      <th className="px-2 py-1 ">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((item, index) => {
                      return (
                        <Fragment key={index}>
                          {item?.attendance_details?.map(detail => (
                            <tr key={detail.id} className="text-sm border border-gray-50">
                              <td className="px-2 py-1 ">{item.date}</td>
                              <td className="px-2 py-1 ">{detail.in_time || '-'}</td>
                              <td className="px-2 py-1 ">{detail.out_time || '-'}</td>
                              <td className="px-2 py-1 ">{detail.total_time}</td>
                              <td className="px-2 py-1 ">{detail.attendance_type?.name}</td>
                            </tr>
                          ))}
                        </Fragment>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex justify-end  text-sm py-4">
            <Button variant="secondary" onClick={toPDF}>
              Save as pdf
            </Button>
          </div>
        </div>
      )}
    </UILoading>
  )
}
