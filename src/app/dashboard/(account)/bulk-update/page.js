import React from "react";
import BulkUpdateHome from "@/views/bulkUpdate/list/index"
import BulkUpdateNew from "@/views/bulkUpdate/list/newBalk"

export default function BulkUpdatePage(){
    return(
        <div>
            <BulkUpdateNew/>
        
        <BulkUpdateHome/>
        
        </div>
    )
}