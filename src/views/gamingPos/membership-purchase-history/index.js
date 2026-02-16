'use client'

import React from 'react'
import PurchaseHistoryList from './list'

export default function MembershipPurchaseHistory() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="border border-gray-100 bg-white px-4 pr-10 rounded">
        <div className="flex items-center justify-between h-10 md:h-12">
          <div className="hover:bg-gray-100 font-bold text-2xl p-2 rounded">
            Membership Purchase History
          </div>
        </div>
      </div>
      <PurchaseHistoryList />
    </div>
  )
}
