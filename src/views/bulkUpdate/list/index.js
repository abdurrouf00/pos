"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function BulkUpdateTransactions() {
  return (
    <div className="flex flex-col items-center text-center mt-32 ">
      {/* ✅ flex + items-center = horizontally center */}
      {/* <img
        src="/account-recode.png"
        alt="laim logo"
        className="h-32 mb-4"
      /> */}

      <h3 className="text-2xl font-medium mb-2">
        Bulk Update Accounts in Transactions
      </h3>

      <p className="max-w-6xl text-gray-700">
        Filter transactions (Invoices, Credit Notes, Purchase Orders, Expenses,
        Bills, Vendor Credits) and bulk-update its accounts with a new account
      </p>

      <p className="bg-amber-100 p-5 mt-4 max-w-3xl rounded-lg mb-8">
        Bulk-updating accounts in transactions will cause significant changes to
        the financial data of your business. We recommend that you do this with
        the assistance of an accountant.
      </p>
      <Link href="/dashboard/bulk-update/new-bulkUpdate">
        <Button > Filter and Bulk Update</Button>
      </Link>
    </div>
  );
}
