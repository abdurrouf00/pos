import React from 'react';
import RecurringExpensesForm from "@/views/recurringExpenses/list/index"
import Table from "@/views/recurringExpenses/list/table"


export default function RecurringExpensesPage(){


    return(

        <div>
            <RecurringExpensesForm/>
            <Table/>

        </div>
    )
}
