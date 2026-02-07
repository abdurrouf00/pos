import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import DataTable from '@/components/common/DataTable'
import { Input } from '@/components/ui/input'
import { Filter } from 'lucide-react'

// add columns with date,account,transaction-details,type,debit,credit, transaction-type, reference, notes, amount
const columns = [
  {
    header: 'Date',
    field: 'date',
  },
  {
    header: 'Account',
    field: 'account',
  },
  {
    header: 'Transaction Details',
    field: 'transaction_details',
  },
  {
    header: 'Type',
    field: 'type',
  },
  {
    header: 'Debit',
    field: 'debit',
  },
  {
    header: 'Credit',
    field: 'credit',
  },
  {
    header: 'Transaction Type',
    field: 'transaction_type',
  },
  {
    header: 'Reference',
    field: 'reference',
  },
  {
    header: 'Notes',
    field: 'notes',
  },
  {
    header: 'Amount',
    field: 'amount',
  },
]

// add some relevant transactions data here
const transactions = [
  {
    date: '2026-01-25',
    account: '1001',
    transaction_details: 'Purchase of goods',
    type: 'Debit',
    debit: '1000',
    credit: '0',
    transaction_type: 'Purchase',
    reference: '123456',
    notes: 'Purchase of goods',
    amount: '1000',
  },
  {
    date: '2026-01-25',
    account: '1001',
    transaction_details: 'Sale of goods',
    type: 'Credit',
    debit: '0',
    credit: '1000',
    transaction_type: 'Sale',
    reference: '123456',
    notes: 'Sale of goods',
    amount: '1000',
  },
]
export default function MoreDetails({open, setOpen, data}) {
  return (
    <Sheet open={open} onOpenChange={setOpen} >
      <SheetContent side='top'>
        <SheetHeader>
          <SheetTitle>{data?.account_name} ({data?.account_code})</SheetTitle>
        </SheetHeader>
        <div>
          <div className='flex flex-col justify-center items-center mb-8'>
            <p>Aimun Nahar</p>
            <h5 className=' font-semibold '>Account Transactions</h5>
            <p className='text-sm text-gray-500'>Basis: Accrual</p>
            <p className='text-sm text-gray-500'>From: 2026-01-01 to 2026-01-31</p>
          </div>
          <div>
            {/* add some relevant filters here */}
            <div className='flex flex-col gap-2  py-6 px-8'>
              <div className='flex flex-row gap-2 xl:max-w-xl'>
<span className='flex flex-row gap-2 items-center'><Filter className='w-4 h-4 text-gray-500'/>Filter:</span>
                <Input type='date' />
                <Input type='text' placeholder='Search' />
              </div>
            </div>
          </div>
          <div className='px-8 pb-20'>
              <DataTable
            data={transactions}
            columns={columns}
          />
        </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
