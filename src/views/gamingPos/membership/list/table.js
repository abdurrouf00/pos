"use client"
import DataTable from "@/components/common/DataTable"

const getColumns = () => {

        


    return [

        {
            header: "Mobile",
            field: "mobile",
        },
        {
            header: "Guardian Name",
            field: "guardian_name",
        },
        {
            header: "Kids Name",
            field: "kids_name",
        },
        {
            header: "Membership ",
            field: "membership",
        },
        {
            header: "Start Day",
            field: "start_day",
        },
        {
            header: "End Day",
            field: "end_day",
        },
        {
            header: "Price",
            field: "price",
        },
        {
            header: "Status",
            field: "status",
        },
        
    ]
}

const MembershipList = () => {
    const data = {
        data: {
            data: [
                {
                    membership_name: "Premium Plan",
                    mobile: "01700000000",
                    guardian_name: "John Doe",
                    kids_name: " Doe",
                    membership: "Gold",
                    start_day: "2024-01-01",
                    end_day: "2024-12-31",
                    price: "5000",
                    status: "Active",
                },
                {
                    membership_name: "Basic Plan",
                    mobile: "01700000001",
                    guardian_name: "John Doe",
                    kids_name: "John ",
                    membership: "Silver",
                    start_day: "2024-02-01",
                    end_day: "2024-08-01",
                    price: "2000",
                    status: "Expired",
                },
                {
                    membership_name: "Standard Plan",
                    mobile: "01700000002",
                    guardian_name: "John Doe",
                    kids_name: "Jony",
                    membership: "Bronze",
                    start_day: "2024-03-15",
                    end_day: "2024-09-15",
                    price: "3500",
                    status: "Active",
                },
            ]
        }
    }

    return (
        <div className="flex flex-col bg-white shadow px-5 py-6 rounded">
            <DataTable
                data={data?.data?.data}
                columns={getColumns()}
                emptyMessage="No membership found."
                rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
                showGlobalFilter={true}
                globalFilterPlaceholder="Type here to search..."
                className="custom_datatable"
            />
        </div>
    )
}

export default MembershipList