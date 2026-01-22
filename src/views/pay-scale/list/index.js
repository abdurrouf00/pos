"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deletePayScale, getAllPayScale, getPayScaleById, setMetaData } from "../store";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import PayScaleForm from "../form";
import { payScaleColumn } from "./payScaleColumn";

import { confirmDialog, confirmObj } from "@/lib/utils";

export default function PayScaleList() {
    const { payScaleData, loading, currentPage, perPage, totalPages, firstRow } = useSelector(({ payScale }) => payScale);
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);
    const params = {
        page: currentPage,
        per_page: perPage,
    }

    const handleDelete = (rowData) => {
        confirmDialog(confirmObj).then(async (e) => {
            if (e.isConfirmed) {
                const toastId = toast.loading("Deleting...");
                dispatch(deletePayScale(rowData?.id))
                    .then((res) => {
                        toast.dismiss(toastId);
                        toast.success('Deleted')
                        dispatch(getAllPayScale(params));
                    })
                    .catch((err) => {
                        toast.dismiss(toastId);
                        toast.error('Failed to delete')
                    })
            }
        })


    };

    const handleInfo = (rowData) => {
        dispatch(getPayScaleById(rowData?.id))
            .then(() => {
                setOpenForm(true);
            });
    };

    useEffect(() => {
        dispatch(getAllPayScale(params));
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

    const handlePage = (page) => {
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
        dispatch(getAllPayScale(paramsObj));
    }
    return (
        <>
            <div className="flex gap-3">
                <div className="w-full">
                    <div className="p-2 bg-white shadow-lg w-full">
                        <DataTable
                            data={payScaleData}
                            columns={payScaleColumn(handleDelete, handleInfo)}
                            globalFilterFields={['name', 'departmentId', 'description', 'status', 'manager']}
                            emptyMessage="No sections found."
                            rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
                            showGlobalFilter={true}
                            globalFilterPlaceholder="Type here to search..."
                            extraField={extraField()}
                            className="custom_datatable"
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
            {openForm && <PayScaleForm toggle={openForm} setOpenForm={setOpenForm} />}

        </>
    );
}