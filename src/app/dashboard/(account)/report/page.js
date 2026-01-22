import React from "react";
import ReportTable from "@/views/account-report/form/index";
import CreateNewReportTab from "@/views/account-report/list/createNewReport"


export default function ProjectPage() {
    return (
        <div>
            <CreateNewReportTab />
            <ReportTable />

        </div>
    )
}