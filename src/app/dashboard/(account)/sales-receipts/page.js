import React from "react";

import SalesReceiptHeader from "@/views/salesReceipts/list/index"
import SalesReceiptTable from "@/views/salesReceipts/list/table"


export default function SalesReceiptsPage() {
  return (
    <div>
        <SalesReceiptHeader />
        <SalesReceiptTable /> 
    </div>
    )
}