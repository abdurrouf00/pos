'use client'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen max-w-md mx-auto py-20">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tighter mb-0.5">Company Details</h2>
        <p className="text-xs  text-gray-500 max-w-4/5 leading-relaxed">
          Select company and branch to continue
        </p>
      </div>
      <form className="w-full  flex flex-col gap-3">
        <HrSelect
          label="Company Name"
          name="company_name"
          placeholder="Company Name"
          onChange={() => {}}
          options={[]}
        />
        <HrSelect
          label="Branch"
          name="company_name"
          placeholder="Branch Name"
          onChange={() => {}}
        />
        <Button>Continue</Button>
      </form>
    </div>
  )
}
