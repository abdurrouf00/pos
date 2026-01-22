 import React from "react";
    import NewAppointment from "@/views/crm/appointments/list/index";
    import  Table from "@/views/crm/appointments/list/table";
    export default function AppointmentPage() {
        return(
            <div>
                <NewAppointment /> 
                <Table />
            </div>
        )   
    }