"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, getAllProjects, getProjectById } from "../store";
import { projectColumn } from "./projectColumn";
import ProjectForm from "../form";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function ProjectList() {
    const { projectData, loading } = useSelector(({ project }) => project);
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);

    const handleDelete = (rowData) => {
        dispatch(deleteProject(rowData?.id))
            .then((res) => {
                toast.error('Deleted')
                dispatch(getAllProjects());
            })
        console.log('Delete:', rowData);
    };

    const handleInfo = (rowData) => {
        dispatch(getProjectById(rowData?.id))
            .then(() => {
                setOpenForm(true);
            });
    };

    useEffect(() => {
        dispatch(getAllProjects());
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
                            data={projectData}
                            columns={projectColumn(handleDelete, handleInfo)}
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
            {openForm && <ProjectForm toggle={openForm} setOpenForm={setOpenForm} />}

        </>
    );
}