import { FaUnlock } from "react-icons/fa";
import React from "react";
import Link from "next/link";

export default function TransactionLookingpage() {
  return (
    <div className="bg-white p-6 rounded">
      <p className="w-[60%] text-sm ">Transaction locking prevents you and your users from making any changes to transactions that might affect your accounts. Once transactions are locked, users cannot edit, modify, or delete any transactions that were recorded before the specified date in this module.</p>

      <div className="flex items-center px-3 mt-5 justify-between border shadow-lg  bg-white rounded-lg w-[60%]">
        <div className="items-center flex ">
          <p className="border p-5 m-2 rounded"><FaUnlock /></p>
          <div>
            <p className="text-2xl">Sales</p>
            <p>You have not locked the transactions in this module.</p>
          </div>
        </div>
        <p>🔒 Lock</p>
      </div>

      <div className="flex items-center px-3 mt-3 justify-between border shadow-lg  bg-white rounded-lg w-[60%]">
        <div className="items-center flex ">
          <p className="border p-5 m-2 rounded"><FaUnlock /></p>
          <div>
            <p className="text-2xl">Purchases</p>
            <p>You have not locked the transactions in this module.</p>
          </div>
        </div>
        <p>🔒 Lock</p>
      </div>

      <div className="flex items-center px-3 mt-3 justify-between border shadow-lg  bg-white rounded-lg w-[60%]">
        <div className="items-center flex ">
          <p className="border p-5 m-2 rounded"><FaUnlock /></p>
          <div>
            <p className="text-2xl">Banking </p>
            <p>You have not locked the transactions in this module.</p>
          </div>
        </div>
        <p>🔒 Lock</p>
      </div>

      <div className="flex items-center px-3 mt-3 justify-between border shadow-lg  bg-white rounded-lg w-[60%]">
        <div className="items-center flex ">
          <p className="border p-5 m-2 rounded"><FaUnlock /></p>
          <div>
            <p className="text-2xl">Accountant </p>
            <p>You have not locked the transactions in this module.</p>
          </div>
        </div>
        <p>🔒 Lock</p>
      </div>
      <div className="bg-amber-100 p-5 mt-17 items-center flex justify-between">
        <div>
          <p className="text-xl font-semibold">Lock All Transactions At Once</p>
          <p>You can freeze all transactions at once instead of locking the Sales, Purchases, Banking and Account transactions individually.</p>
        </div>
        <Link href="/dashboard/transactionLooking/new-transactionLooking">
          <p className="text-end text-blue-600">Switch to Lock All Transactions → </p>
        </Link>
      </div>

    </div>
  )
}
