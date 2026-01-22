import React  from "react";
import CandorCreditsForm from "@/views/vendorCredits/list/index"
import CandorCreditsTable from "@/views/vendorCredits/list/table"

export default function VendorCreditFormPage(){
    return(
        <div>
            <CandorCreditsForm/>
            <CandorCreditsTable/>
        
        </div>
    )
}