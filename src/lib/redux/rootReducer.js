import user from '@/lib/redux/userSlice'

import attendanceType from '@/views/attendanceType/store'
import branch from '@/views/branch/store'
import company from '@/views/company/store'
import department from '@/views/department/store'
import designation from '@/views/designation/store'
import division from '@/views/division/store'
import dutyRoster from '@/views/duty-roster/store'
import employeeCategory from '@/views/employee-category/store'
import employee from '@/views/employee/store'
import jobType from '@/views/job-type/store'
import leaveApplication from '@/views/leave-application/store'
import leaveType from '@/views/leave-type/store'
import organization from '@/views/organization/store'
import payScale from '@/views/pay-scale/store'
import paymentType from '@/views/payment-type/store'
import project from '@/views/project/store'
import providentFund from '@/views/provident-found/store'
import role from '@/views/role/store'
import salaryDesign from '@/views/salary-design/store'
import salaryHead from '@/views/salary-head/store'
import salarySheet from '@/views/salary-sheet/store'
import section from '@/views/section/store'
import workingShift from '@/views/working-shift/store'
import attendance from '@/views/attendance/store'
import attendanceReport from '@/views/attendance-report/store'
import loan from '@/views/loan/store'
import loanInstallments from '@/views/loan-installments/store'
import manualAttendance from '@/views/manual-attendance/store'

const rootReducer = {
  user,
  employee,
  role,
  department,
  payScale,
  project,
  section,
  paymentType,
  workingShift,
  organization,
  designation,
  branch,
  company,
  project,
  section,
  employeeCategory,
  jobType,
  division,
  attendanceType,
  attendance,
  attendanceReport,
  leaveType,
  leaveApplication,
  salaryHead,
  salaryDesign,
  salarySheet,
  providentFund,
  loan,
  loanInstallments,
  manualAttendance,
  dutyRoster,
}

export default rootReducer
