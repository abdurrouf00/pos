"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { bindBranchData, deleteBranch, getAllBranches, getBranchById } from "../store";
import { branchColumn } from "./branchColumn";
import BranchForm from "../form";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function BranchList() {
    const { branchData, basicBranchData, loading } = useSelector((state) => state.branch);
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);

    const handleDelete = (rowData) => {
        dispatch(deleteBranch(rowData?.id))
            .then((res) => {
                toast.error('Deleted')
                dispatch(getAllBranches());
            })
    };

    const handleInfo = (rowData) => {

        dispatch(bindBranchData({ ...basicBranchData, id: rowData?.id }))
        setOpenForm(true)
    };

    useEffect(() => {
        dispatch(getAllBranches());
    }, [dispatch]);

    const extraField = () => {
        return (
            <div>
                <div
                    onClick={() => setOpenForm(true)}
                    className="border flex items-center gap-2 py-1 px-3 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[400]">
                    <FaCirclePlus />
                    New
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="flex gap-3">
                <div className="w-full">
                    <div className="p-2 bg-white shadow-lg w-full">
                        <DataTable
                            data={branchData}
                            columns={branchColumn(handleDelete, handleInfo)}
                            globalFilterFields={['name', 'code', 'companyId', 'address', 'phone', 'email', 'status']}
                            emptyMessage="No branches found."
                            rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
                            showGlobalFilter={true}
                            globalFilterPlaceholder="Type here to search..."
                            extraField={extraField()}
                            className="custom_datatable"
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
            {openForm && <BranchForm toggle={openForm} setOpenForm={setOpenForm} />}
        </>
    );
}