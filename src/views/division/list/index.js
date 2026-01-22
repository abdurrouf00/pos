"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteDivision, getAllDivisions, getDivisionById } from "../store";
import { divisionColumn } from "./divisionColumn";
import DivisionForm from "../form";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function DivisionList() {
    const { divisionData, basicDivisionData, loading } = useSelector((state) => state.division);
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);

    const handleDelete = (rowData) => {
        dispatch(deleteDivision(rowData?.id))
            .then((res) => {
                toast.error('Deleted')
                dispatch(getAllDivisions());
            })
        console.log('Delete:', rowData);
    };

    const handleInfo = (rowData) => {
        dispatch(getDivisionById(rowData?.id))
            .then(() => {
                setOpenForm(true);
            });
    };

    useEffect(() => {
        dispatch(getAllDivisions());
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
                            data={divisionData}
                            columns={divisionColumn(handleDelete, handleInfo)}
                            globalFilterFields={['name', 'code', 'companyId', 'branchId', 'description', 'status']}
                            emptyMessage="No divisions found."
                            rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
                            showGlobalFilter={true}
                            globalFilterPlaceholder="Type here to search..."
                            extraField={extraField()}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
            {openForm && <DivisionForm toggle={openForm} setOpenForm={setOpenForm} />}
        </>
    );
}