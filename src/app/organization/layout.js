// "use client"
import OrganizationLayout from '@/components/layouts/OrganizationLayout';
import React from 'react'

export default function layout({ children }) {

  return (
    <div>
      <OrganizationLayout />
      <div className=''>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
          {children}
        </div>
      </div>
    </div>
  )
}
