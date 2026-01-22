"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteDesignation, getAllDesignations, getDesignationById, setMetaData } from "../store";
import { designationColumn } from "./designationColumn";
import DesignationForm from "../form";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function DesignationList() {
    const { designationData, basicDesignationData, loading, currentPage, perPage, totalPages, firstRow } = useSelector((state) => state.designation);
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);
    const params = {
        page: currentPage,
        per_page: perPage,
    }
    const handleDelete = (rowData) => {
        dispatch(deleteDesignation(rowData?.id))
            .then((res) => {
                toast.error('Deleted')
                dispatch(getAllDesignations(params));
            })
    };

    const handleInfo = (rowData) => {
        dispatch(getDesignationById(rowData?.id))
            .then(() => {
                setOpenForm(true);
            });
    };


    useEffect(() => {
        dispatch(getAllDesignations(params));
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
        dispatch(getAllDesignations(paramsObj));
    };
    return (
        <>
            <div className="flex gap-3">
                <div className="w-full">
                    <div className="p-2 bg-white shadow-lg w-full">
                        <DataTable
                            data={designationData}
                            columns={designationColumn(handleDelete, handleInfo)}
                            globalFilterFields={['name', 'code', 'departmentId', 'description', 'status']}
                            emptyMessage="No designations found."
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
            {openForm && <DesignationForm toggle={openForm} setOpenForm={setOpenForm} />}
        </>
    );
}