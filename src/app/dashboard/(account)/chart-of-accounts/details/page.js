"use client";
import React from 'react'
import AccountDetails from '@/views/chartOfAccounts/form/details'
import { useSearchParams } from 'next/navigation';

export default function AccountDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  return (
    <div>
      <AccountDetails id={id} />
    </div>
  )
}