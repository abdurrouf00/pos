import EmployeeManagement from '@/views/employee/list'
import React from 'react'

const page = ({ employee }) => {
  return <EmployeeManagement employee={employee} />;
};

export default page