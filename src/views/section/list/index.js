"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteSection, getAllSections, getSectionById } from "../store";
import { sectionColumn } from "./sectionColumn";
import SectionForm from "../form";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function SectionList() {
    const { sectionData, basicSectionData, loading } = useSelector(({ section }) => section);
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);
    const [importModalOpen, setImportModalOpen] = useState(false);

    const handleDelete = (rowData) => {
        dispatch(deleteSection(rowData?.id))
            .then((res) => {
                toast.error('Deleted')
                dispatch(getAllSections());
            })
        console.log('Delete:', rowData);
    };

    const handleInfo = (rowData) => {
        dispatch(getSectionById(rowData?.id))
            .then(() => {
                setOpenForm(true);
            });
    };

    useEffect(() => {
        dispatch(getAllSections());
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
                            data={sectionData}
                            columns={sectionColumn(handleDelete, handleInfo)}
                            globalFilterFields={['name', 'departmentId', 'description', 'status', 'manager']}
                            emptyMessage="No sections found."
                            rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
                            showGlobalFilter={true}
                            globalFilterPlaceholder="Type here to search..."
                            extraField={extraField()}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
            {openForm && <SectionForm toggle={openForm} setOpenForm={setOpenForm} />}

        </>
    );
}