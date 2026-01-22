 import React from "react";
 import NewLeads from "@/views/crm/leads/list/index";
 import Table from "@/views/crm/leads/list/table";  
    export default function HomePage() {    
       
        return (    
            <div>
                <NewLeads />
                <Table />
            </div>
        );
    }
