import React from "react";


import TimesheetHeader from "@/views/timesheet/list/index"

import TimesheetTable from "@/views/timesheet/list/table"

export default function TimeSheetPage(){
    return(
        <div>
            <TimesheetHeader/>
            <TimesheetTable/>

        </div>
    )
}