"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteJobType, getAllJobTypes, getJobTypeById, setMetaData } from "../store";
import { jobTypeColumn } from "./jobTypeColumn";
import JobTypeForm from "../form";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function JobTypeList() {
    const { jobTypeData, basicJobTypeData, loading, currentPage, perPage, totalPages, firstRow } = useSelector(({ jobType }) => jobType);
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);
    const params = {
        page: currentPage,
        per_page: perPage,
    }
    const handleDelete = (rowData) => {
        dispatch(deleteJobType(rowData?.id))
            .then((res) => {
                toast.error('Deleted')
                dispatch(getAllJobTypes(params));
            })
        console.log('Delete:', rowData);
    };

    const handleInfo = (rowData) => {
        dispatch(getJobTypeById(rowData?.id))
            .then(() => {
                setOpenForm(true);
            });
    };

    useEffect(() => {
        dispatch(getAllJobTypes(params));
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

    const handlePage = (page) => {
        console.log("page", page);
        dispatch(setMetaData({
            current_page: page.page + 1,
            per_page: page.rows,
            // total: page.totalPages,
            firstRow: page.first,
        }));
        const paramsObj = {
            ...params,
            page: page.page + 1,
            per_page: page.rows,
        }
        dispatch(getAllJobTypes(paramsObj));
    }
    return (
        <>
            <div className="flex gap-3">
                <div className="w-full">
                    <div className="p-2 bg-white shadow-lg w-full">
                        <DataTable
                            data={jobTypeData}
                            columns={jobTypeColumn(handleDelete, handleInfo)}
                            globalFilterFields={['name', 'code', 'description', 'status']}
                            emptyMessage="No job types found."
                            rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
                            showGlobalFilter={true}
                            globalFilterPlaceholder="Type here to search..."
                            extraField={extraField()}
                            loading={loading}
                            onPage={handlePage}
                            rows={perPage}
                            lazy
                            paginator
                            page={currentPage}
                            totalRecords={totalPages}
                            first={firstRow}
                        />
                    </div>
                </div>
            </div>
            {openForm && <JobTypeForm toggle={openForm} setOpenForm={setOpenForm} />}
        </>
    );
}