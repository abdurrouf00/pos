import Ract from "react";

import PaymentsMadeHeader from "@/views/paymentsMade/list/index";
import PaymentMadeTable from "@/views/paymentsMade/list/table";

export default function PaymentsMadeFormPage() {
    return (
        <div className="bg-white p-6 rounded min-h-screen ">
            <PaymentsMadeHeader />
            <PaymentMadeTable />



        </div>
    )
}