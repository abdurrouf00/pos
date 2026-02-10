"use client";


import ContinuousLateReport from '@/views/attendance-report/report/ContinuousLateReport';
import DailyAttendanceReport from '@/views/attendance-report/report/DailyAttendanceReport';
import EmployeeJobCard from '@/views/attendance-report/report/EmployeeJobCard';
import OverTime from '@/views/attendance-report/report/OverTime';
import PresentAbsentReport from '@/views/attendance-report/report/PresentAbsentReport';
import { bindReportData } from '@/views/attendance-report/store';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function ReportDetails() {
  const searchParams = useSearchParams();
  const report_type = searchParams.get('report_type');
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(bindReportData([]))
    }
  }, [])


  const components = {
    "3": <EmployeeJobCard />,
    "5": <OverTime />,
    "1": <DailyAttendanceReport />,
    "4": <ContinuousLateReport />,
    "2": <PresentAbsentReport />
  };

  return components[report_type] ?? null;
}
