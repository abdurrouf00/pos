'use client'
import HrInput from '@/components/common/HrInput'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

import HrSelect, { mapOptions } from '@/components/common/HrSelect'
import Loading from '@/components/ui/loading'
import { getAllDepartment } from '@/views/department/store'
import { getAllEmployee } from '@/views/employee/store'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
  attendaceEmployeeReport,
  bindAttendanceReportData,
  getAttendanceReportByDateRange,
  getContinuousLateReport,
  getDailyAttendanceReport,
  getJobCardLateDetailsReport,
  getMonthlyPresentAndAbsentReport,
  getOvertimeReport,
} from '../store'
import { useRouter } from 'nextjs-toploader/app'

const AttendanceReportForm = props => {
  const userDataStr = Cookies.get('user_data')
  const userData = userDataStr ? JSON.parse(userDataStr) : null
  const [formLoading, setFormLoading] = useState(false)
  const router = useRouter()

  const { setOpenForm, toggle } = props
  const { basicAttendanceReportData } = useSelector(({ attendanceReport }) => attendanceReport)
  const { departmentData } = useSelector(state => state.department)
  const { employeeData } = useSelector(state => state.employee)
  const { reportData } = useSelector(state => state.attendanceReport)

  const dispatch = useDispatch()
  const {
    report_type = 1,
    report_name,
    date,
    department,
    year,
    month,
    employee,
    from_date,
    to_date,
  } = basicAttendanceReportData

  useEffect(() => {
    return () => {
      dispatch(bindAttendanceReportData())
    }
  }, [])
  useEffect(() => {
    const loadAllData = async () => {
      setFormLoading(true)
      const employeeParams = {
        department_id: department,
        page: 1,
        per_page: 1000,
      }
      try {
        await Promise.all([dispatch(getAllDepartment()), dispatch(getAllEmployee(employeeParams))])
      } finally {
        setFormLoading(false)
      }
    }

    loadAllData()
  }, [dispatch, department])

  const handleSubmit = () => {
    switch (report_type) {
      case '1':
        // dispatch(attendaceEmployeeReport(dailyData));
        router.push(
          `/dashboard/attendance-reports/details?report_type=1&date=${date}&department=${department}`
        )
        break
      case '2':
        router.push(
          `/dashboard/attendance-reports/details?report_type=2&year=${year}&month=${month}`
        )
        break
      case '3':
        const data = {
          from_date: from_date,
          to_date: to_date,
          employee_id: employee,
          department_id: null,
        }
        dispatch(attendaceEmployeeReport(data))
        router.push(
          `/dashboard/attendance-reports/details?report_type=3&from_date=${from_date}&to_date=${to_date}&employee_id=${employee}`
        )
        break
      case '4':
        const continuousLateData = {
          from_date: from_date,
          to_date: to_date,
          employee_id: employee,
          department_id: null,
        }
        dispatch(attendaceEmployeeReport(continuousLateData))
        router.push(
          `/dashboard/attendance-reports/details?report_type=4&from_date=${from_date}&to_date=${to_date}&employee_id=${employee}`
        )
        break
      case '5': {
        const data = {
          from_date: from_date,
          to_date: to_date,
        }
        router.push(
          `/dashboard/attendance-reports/details?report_type=5&from_date=${from_date}&to_date=${to_date}`
        )
        dispatch(getAttendanceReportByDateRange(data))
        break
      }
      default:
        toast.error('Please select a valid report type.')
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    dispatch(bindAttendanceReportData({ [name]: value }))
  }

  return (
    <form>
      <div className="col-span-2 text-center mb-3 py-4 px-2">
        <h1 className=" font-semibold ">{'Attendance Report'}</h1>
      </div>
      <div className="px-8">
        <div className="space-y-4 grid md:grid-cols-3 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
          <div className=" w-full">
            <HrSelect
              label="Report Type"
              name="report_type"
              value={report_type}
              onChange={handleChange}
              placeholder="Select Report Type"
              options={[
                { value: '1', label: 'Daily Attendance Report' },
                { value: '2', label: 'Monthly Present & Absent Report' },
                { value: '3', label: 'Job Card Late Detail' },
                { value: '4', label: 'Continuous Late Report' },
                { value: '5', label: 'Overtime Report' },
              ]}
            />
          </div>

          {formLoading && <Loading />}
        </div>
        {/* Report type: 1 - Daily Attendance Report */}
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-2  my-4 py-4">
          {report_type == 1 && (
            <>
              <div className="">
                <HrInput
                  label="Date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <HrSelect
                  label="Department"
                  name="department"
                  value={department}
                  placeholder="Select Department"
                  onChange={handleChange}
                  options={mapOptions(departmentData)}
                />
              </div>
            </>
          )}

          {/* Report type: 2 - Monthly Present & Absent */}
          {report_type == 2 && (
            <>
              <div>
                <HrSelect
                  label="Year"
                  name="year"
                  value={year}
                  onChange={handleChange}
                  placeholder="Select Year"
                  options={mapOptions([
                    { value: '2010', name: '2010' },
                    { value: '2011', name: '2011' },
                    { value: '2012', name: '2012' },
                    { value: '2013', name: '2013' },
                    { value: '2014', name: '2014' },
                    { value: '2015', name: '2015' },
                    { value: '2016', name: '2016' },
                    { value: '2017', name: '2017' },
                    { value: '2018', name: '2018' },
                    { value: '2019', name: '2019' },
                    { value: '2020', name: '2020' },
                    { value: '2021', name: '2021' },
                    { value: '2022', name: '2022' },
                    { value: '2023', name: '2023' },
                    { value: '2024', name: '2024' },
                    { value: '2025', name: '2025' },
                    { value: '2026', name: '2026' },
                    { value: '2027', name: '2027' },
                    { value: '2028', name: '2028' },
                    { value: '2029', name: '2029' },
                    { value: '2030', name: '2030' },
                  ])}
                />
              </div>
              <div>
                <HrSelect
                  label="Month"
                  name="month"
                  value={month}
                  onChange={handleChange}
                  placeholder="Select Month"
                  options={[
                    { value: '1', label: 'January' },
                    { value: '2', label: 'February' },
                    { value: '3', label: 'March' },
                    { value: '4', label: 'April' },
                    { value: '5', label: 'May' },
                    { value: '6', label: 'June' },
                    { value: '7', label: 'July' },
                    { value: '8', label: 'August' },
                    { value: '9', label: 'September' },
                    { value: '10', label: 'October' },
                    { value: '11', label: 'November' },
                    { value: '12', label: 'December' },
                  ]}
                />
              </div>
            </>
          )}

          {/* Report type: 3 - Job Card Late Details */}
          {report_type == 3 && (
            <>
              <div>
                <HrSelect
                  label="Employee"
                  name="employee"
                  value={employee}
                  onChange={handleChange}
                  placeholder="Select Employee"
                  options={mapOptions(employeeData)}
                />
              </div>
              <div>
                <HrInput
                  label="From Date"
                  name="from_date"
                  type="date"
                  value={from_date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <HrInput
                  label="To Date"
                  name="to_date"
                  type="date"
                  value={to_date}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* Report type: 4 - Continuous Late Report */}
          {report_type == 4 && (
            <>
              <div>
                <HrSelect
                  label="Employee"
                  name="employee"
                  value={employee}
                  onChange={handleChange}
                  placeholder="Select Employee"
                  options={mapOptions(employeeData)}
                />
              </div>
              <div>
                <HrInput
                  label="From Date"
                  name="from_date"
                  type="date"
                  value={from_date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <HrInput
                  label="To Date"
                  name="to_date"
                  type="date"
                  value={to_date}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* Report type: 5 - Overtime Report */}
          {report_type == 5 && (
            <>
              <div>
                <HrInput
                  label="From Date"
                  name="from_date"
                  type="date"
                  value={from_date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <HrInput
                  label="To Date"
                  name="to_date"
                  type="date"
                  value={to_date}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="flex  items-end">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!report_type}
              className={'cursor-pointer'}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AttendanceReportForm
