"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkingShift, getAllWorkingShifts, getWorkingShiftById } from "../store";
import { workingShiftColumn } from "./workingShiftColumn";
import WorkingShiftForm from "../form";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function WorkingShiftList() {
    const { workingShiftData, basicWorkingShiftData, loading } = useSelector(({ workingShift }) => workingShift);
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);

    const handleDelete = (rowData) => {
        dispatch(deleteWorkingShift(rowData?.id))
            .then((res) => {
                toast.error('Deleted')
                dispatch(getAllWorkingShifts());
            })
        console.log('Delete:', rowData);
    };

    const handleInfo = (rowData) => {
        dispatch(getWorkingShiftById(rowData?.id))
            .then(() => {
                setOpenForm(true);
            });
    };

    useEffect(() => {
        dispatch(getAllWorkingShifts());
    }, [])

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
                            data={workingShiftData}
                            columns={workingShiftColumn(handleDelete, handleInfo)}
                            globalFilterFields={['name', 'startTime', 'endTime', 'breakTime', 'description', 'status']}
                            emptyMessage="No working shifts found."
                            rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
                            showGlobalFilter={true}
                            globalFilterPlaceholder="Type here to search..."
                            extraField={extraField()}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
            {openForm && <WorkingShiftForm toggle={openForm} setOpenForm={setOpenForm} />}

        </>
    );
}