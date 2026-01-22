"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrganization, getAllOrganizations, getOrganizationById, updateOrganization } from "../store";
import { organizationColumn } from "./organizationColumn";
import OrganizationForm from "../form";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import HrInput from "@/components/common/HrInput";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import { Pencil } from "lucide-react";

export default function OrganizationList() {
    const { organizationData, basicOrganizationData, loading, mutationLoading } = useSelector(({ organization }) => organization);
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const metaInfo = organizationData ? organizationData[0] : null;

    const [metaData, setMetaData] = useState(metaInfo);


    useEffect(() => {
        if (organizationData) {
            setMetaData(organizationData[0]);
        }
    }, [organizationData]);

    const handleDelete = (rowData) => {
        dispatch(deleteOrganization(rowData?.id))
            .then((res) => {
                toast.error('Deleted')
                dispatch(getAllOrganizations());
            })
        console.log('Delete:', rowData);
    };

    const handleInfo = (rowData) => {
        dispatch(getOrganizationById(rowData?.id))
            .then(() => {
                setOpenForm(true);
            });
    };

    useEffect(() => {
        dispatch(getAllOrganizations());
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
    const handleChange = (e) => {
        setMetaData({ ...metaData, [e.target.name]: e.target.value });
    }
    console.log('organizationData', organizationData);
    console.log('metaData', metaData);
    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                id: metaData?.id,
                name: metaData?.name,
                phone: metaData?.phone,
                address: metaData?.address,
            }
            const res = await dispatch(updateOrganization(data)).unwrap();
            if (res?.data.success) {
                toast.success('Updated');
                setEditMode(false);
                dispatch(getAllOrganizations());
            }
            console.log('res', res);
        } catch (error) {

        }
    }
    return (
        <>
            <div className="flex gap-3">
                <div className="w-full">
                    <div className="p-10 pb-16 rounded bg-white shadow-lg w-full">

                        <div className="max-w-md">
                            <div className="mb-6 flex justify-between items-center">
                                <h4 className="text-neutral-800 font-semibold">Edit Company Info</h4>
                                <Button variant="outline" size="icon" onClick={() => setEditMode(!editMode)}><Pencil size={16} className="text-neutral-500" /> </Button>
                            </div>
                            <form onSubmit={handleEdit} className="flex flex-col gap-4 ">
                                <HrInput
                                    label="Organization Name"
                                    name="name"
                                    value={metaData?.name}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                    required
                                />
                                <HrInput
                                    label="Email"
                                    name="email"
                                    value={metaData?.email}
                                    // onChange={handleChange}
                                    disabled
                                />
                                <HrInput
                                    label="Contact"
                                    name="phone"
                                    value={metaData?.phone}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                    required
                                />
                                <HrInput
                                    label="Address"
                                    name="address"
                                    value={metaData?.address}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                />
                                {editMode && <Button disabled={mutationLoading}>{mutationLoading ? "Saving..." : "Save"}</Button>}
                            </form>
                        </div>
                        {/* <DataTable
                            data={organizationData}
                            columns={organizationColumn(handleDelete, handleInfo)}
                            globalFilterFields={['name', 'code', 'address', 'phone', 'email', 'website', 'status']}
                            emptyMessage="No organizations found."
                            rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
                            showGlobalFilter={true}
                            globalFilterPlaceholder="Type here to search..."
                            // extraField={extraField()}
                            loading={loading}
                        /> */}
                    </div>
                </div>
            </div>
            {openForm && <OrganizationForm toggle={openForm} setOpenForm={setOpenForm} />}

        </>
    );
}