import React from 'react'

import PaymentsReceivedForm from '@/views/paymentsReacived/list/index'
import PaymentsTable from '@/views/paymentsReacived/list/table'


export default function PaymentReceivePage() {
  return (
    <div className='p-6 bg-white rounded min-h-screen'>
      <PaymentsReceivedForm />
      <PaymentsTable />
    </div>
  )
}