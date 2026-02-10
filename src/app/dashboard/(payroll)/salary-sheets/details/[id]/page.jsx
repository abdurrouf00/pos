import EditForm from '@/views/salary-sheet/form/EditForm'
import React, { use } from 'react'

export default function SalarySheetDetails({ params }) {
  const { id } = use(params)
  return <EditForm id={id} />
}
