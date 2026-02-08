"use client"
import DataTable from "@/components/common/DataTable"
import { useState } from "react"

const getColumns = (onView) => {
    return [
        {
            header: "Category",
            field: "category",
        },
        {
            header: "Date & Time ",
            field: "date_time",
        },
        {
            header: "Description",
            field: "description",
        },
        {
            header: "Receive",
            field: "receive",
        },
        {
            header: "Expense",
            field: "expense",
        },
        {
            header: "Running Balance",
            field: "running_balance",
        },
        {
            header: "Action",
            field: "action",
            body: (rowData) => (
                <button 
                    onClick={() => onView(rowData)}
                    className="text-cyan-600 hover:text-cyan-700 font-bold text-sm underline px-2 py-1 rounded hover:bg-cyan-50"
                >
                    View
                </button>
            )
        }
    ]
}

const MembershipList = () => {
    const [selectedExpense, setSelectedExpense] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const handleView = (expense) => {
        setSelectedExpense(expense)
        setShowModal(true)
    }

    const data = {
        data: {
            data: [
                {
                    category: "Premium Plan",
                    date_time: "2024-01-01",
                    description: "Lunch Expense",
                    receive: "5000",
                    expense: "",
                    running_balance: "5000",
                    action: "View",
                },
                {
                    category: "Premium Plan",
                    date_time: "2024-01-01",
                    description: "Salary Expense",
                    receive: "",
                    expense: "3000",
                    running_balance: "2000",
                    action: "View",
                },
                {
                    category: "Dinner Plan",
                    date_time: "2024-02-01",    
                    description: "Dinner Expense",
                    receive: "",
                    expense: "1000",
                    running_balance: "1000",
                    action: "View",
                },
                {
                    category: "Standard Plan",                    
                    date_time: "2024-09-15",
                    description: "Dinner Expense",
                    receive: "3500",
                    expense: "",
                    running_balance: "4500",
                    action: "View",
                },
                {
                    category: "Premium Plan",
                    date_time: "2024-01-01",
                    description: "Lunch Expense",
                    receive: "",
                    expense: "4000",
                    running_balance: "500",
                    action: "View",
                },
            ]
        }
    }

    return (
        <div className="flex flex-col bg-white shadow px-5 py-6 rounded relative">
            <DataTable
                data={data?.data?.data}
                columns={getColumns(handleView)}
                emptyMessage="No expense found."
                rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
                showGlobalFilter={true}
                globalFilterPlaceholder="Type here to search..."
                className="custom_datatable"
            />

            {/* Expense Detail Modal */}
            {showModal && selectedExpense && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                        <div className="bg-sky-400 text-white px-4 py-3 flex justify-between items-center">
                            <h3 className="font-bold">Expense Details</h3>
                            <button onClick={() => setShowModal(false)} className="hover:text-gray-200">✕</button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="grid grid-cols-2 gap-4 border-b pb-4">
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">Category</p>
                                    <p className="font-semibold text-gray-700">{selectedExpense.category}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">Date & Time</p>
                                    <p className="font-semibold text-gray-700">{selectedExpense.date_time}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 border-b pb-4">
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">Receive</p>
                                    <p className="font-semibold text-green-600">৳ {selectedExpense.receive || '0'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">Expense</p>
                                    <p className="font-semibold text-red-600">৳ {selectedExpense.expense || '0'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">Balance</p>
                                    <p className="font-semibold text-sky-600">৳ {selectedExpense.running_balance}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase">Description</p>
                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-dashed mt-1">
                                    {selectedExpense.description}
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 flex justify-end">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded text-sm font-bold text-gray-700 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MembershipList