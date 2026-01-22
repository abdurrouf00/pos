import React from "react"
import RecurringBillsHeader from "@/views/recurringBills/list/index";
import RecurringBillsTable from "@/views/recurringBills/list/table";


export default function recurringBillsForm(){
    return(
         <div>
            <RecurringBillsHeader/>
            <RecurringBillsTable/>
         </div>
    )
}