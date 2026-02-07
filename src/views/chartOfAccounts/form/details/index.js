import React, { useState } from 'react'
import dummyData from '../../list/data.json'
import { cn } from '@/lib/utils';
import { CircleX, Ellipsis, Folder, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import DataTable from '@/components/common/DataTable';
import MoreDetails from './MoreDetails';
import { useGetChartOfAccountsByIdQuery, useGetChartOfAccountsQuery } from '../../store';
import AccountForm from '../index';
import { useRouter } from 'next/navigation';
//add columns with date, transaction-details, type, debit, credit
const columns = [
  {
    header: 'Date',
    field: 'date',
  },
  {
    header: 'Transaction Details',
    field: 'transaction_details',
    body: (rowData) => (
      <div className='py-3'>
        <h1>{rowData.transaction_details}</h1>
      </div>
    ),
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
]
// add some relevant transactions data here
const transactions = [
  {
    date: '2026-01-25',
    transaction_details: 'Purchase of goods',
    type: 'Debit',
    debit: '1000',
    credit: '0',
  },
  {
    date: '2026-01-25',
    transaction_details: 'Sale of goods',
    type: 'Credit',
    debit: '0',
    credit: '1000',
  },
]
export default function AccountDetails({ id }) {
  const { data: chartOfAccount, isLoading } = useGetChartOfAccountsByIdQuery(id, { skip: !id })
  const {data: allChartOfAccounts, isLoading: isLoadingAllChartOfAccounts} = useGetChartOfAccountsQuery()
  const [currentId, setCurrentId] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const [open, setOpen] = useState(false);
  const router = useRouter()

  const detailsData = chartOfAccount?.data
  const handleOpenMoreDetails = () => {
    setOpen(true);
  }
  const handleEdit = () => {
    setEditOpen(true)
    setCurrentId(id)
  }
  const handleSelectAccount = (id) => {
    setCurrentId(id)
    router.push(`/dashboard/chart-of-accounts/details?id=${id}`)
  }
  const data = dummyData.find(item => item.account_id === id);
  return (
    <div className='grid grid-cols-12 gap-4'>
      {/* accounts list */}
      <div className='xl:col-span-3 bg-white px-4 py-4 rounded-lg xl:flex flex-col gap-0.5 hidden'>
        {
          allChartOfAccounts?.data?.map((item) => (
            <button onClick={() => handleSelectAccount(item.id)} key={item.id} className={cn('  py-2 px-4 hover:pl-5 transition-all duration-300 text-sm  w-full hover:bg-gray-100 cursor-pointer rounded-md text-left flex items-center gap-2 text-nowrap', {
              'bg-gray-100': item.id === id,
            })}>
              <Folder size={16} className='text-gray-500'/>
              <h1>{item.account_name}</h1>
            </button>
          ))
        }
      </div>
      {/* accounts details */}
      <div className='xl:col-span-9 bg-white  rounded-md col-span-12 py-1'>
        {/* buttons for edit and delete */}
        <div className='border-b flex items-center gap-2'>
          <Button variant="ghost" onClick={handleEdit}>
            <Pencil />
            Edit
          </Button>
          <div className='h-4 w-px bg-gray-200' />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" >
                <Ellipsis/>
              </Button>
            </PopoverTrigger>
            <PopoverContent className={'flex flex-col  w-max px-1 py-1'}>
              <Button variant="ghost" className={'w-full  justify-start'}>
                <Trash />
                Delete
              </Button>
              <Button variant="ghost" className={'w-full justify-start'}>
                <CircleX />
                Mark as Inactive
              </Button>
            </PopoverContent>
          </Popover>

        </div>
        {/* account details */}
          {/*  closing balance  */}
        <div className='py-5 px-6 bg-gray-50 border-b-2 border-dashed'>
          <div className='space-y-1'>
            <h5 className='text-xs tracking-wider text-gray-500 uppercase'>Closing Balance</h5>
            <h4 className='text-2xl font-bold font-mono'>AUD 100548.00</h4>
            <p className='text-sm '>{detailsData?.account_name} ({detailsData?.code})</p>
          </div>
        </div>
        {/* transactions list */}
        <div className='py-5 px-6 space-y-4'>
          <h5 className='text-lg font-medium'>Transactions</h5>
          <div>
            <DataTable
              data={transactions}
              columns={columns}
            />
          </div>
          <Button onClick={handleOpenMoreDetails} variant="link">Show More Details</Button>
        </div>
      </div>
      <MoreDetails open={open} setOpen={setOpen} data={data} />
      {editOpen && (
          <AccountForm
            isOpen={editOpen}
            setIsOpen={setEditOpen}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
      )}
    </div>
  )
}