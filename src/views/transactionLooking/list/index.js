import { FaUnlock } from "react-icons/fa";
import React from "react";
import Link from "next/link";

export default function TransactionLookingpage(){
    return(
        <div className="bg-white">
            <p className="w-[60%] text-sm ">Transaction locking prevents you and your users from making any changesto 
                 transactions that might affect your accounts. Once transactions are locked,userscannot edit, modify,
                 or delete any transactions that were recorded before the specified date in this module.</p>

            <div className="flex items-center px-3 mt-5 pb-5 mb-9 justify-between border-b w-[60%] ">
              <div className="items-center flex ">
                <p className="border p-5 m-2 rounded"><FaUnlock /></p>
                <div>
                    <p className="text-2xl font-semibold">All Transactions</p>
                    <p>You have not opted to lock all transactions.</p>
                </div>
              </div>
                <p>🔒 Lock</p>
            </div>

            <div className="p-4">
                <p className="text-2xl font-semibold ">Lock Individual Modules</p>
                <p className="p-5">You will be able to:</p>
                <ul className="pl-7 ">
                    <li>Select the modules (Sales, purchases, Banking, Accountant) you wish to lock, instead of locking all transactions.</li>
                    <li>Set different lock dates for each module.</li>
                </ul>
                
              <Link href="/dashboard/transactionLooking">
                  <p className=" text-blue-600 p-5">Lock Individual Modules → </p>
              </Link>
            </div>

        </div>
    )
}
