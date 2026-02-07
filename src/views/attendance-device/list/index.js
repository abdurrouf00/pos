"use client"
import DataTable from "@/components/common/DataTable"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"
import { useState } from "react"
import { FaCirclePlus } from "react-icons/fa6"
import AttendanceDeviceForm from "../form"
import { useDeleteAttendanceDeviceMutation, useGetAttendanceDevicesQuery } from "../store"
import { confirmDialog, confirmObj } from "@/lib/utils"
import toast from "react-hot-toast"

const getColumns = (handleEdit, handleDelete) => {
    return [

        {
            header: "Device Name",
            field: "device_name",
        },
        {
            header: "Device ID",
            field: "device_id",
        },
        {
            header: 'Actions',
            body: (rowData) => (
                <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(rowData?.id)}>
                        <Edit size={16} />
                    </Button>
                    <Button variant="outline-destructive" size="sm" onClick={() => handleDelete(rowData?.id)}>
                        <Trash size={16} />
                    </Button>
                </div>
            )

        },
    ]
}

const AttendanceDeviceList = () => {
    const [openForm, setOpenForm] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const { data, isLoading } = useGetAttendanceDevicesQuery();
    const [deleteAttendanceDevice, { isLoading: isDeletingAttendanceDevice }] = useDeleteAttendanceDeviceMutation();
    const handleNew = () => {
        setCurrentId(null);
        setOpenForm(true);
    }
    const handleEdit = (id) => {
        setCurrentId(id);
        setOpenForm(true);
    }
    const extraField = () => {
        return (
            <div className="flex items-center gap-2">


                <Button onClick={handleNew} className="border flex items-center gap-2 py-1 px-3 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[400]">
                    <FaCirclePlus size={16} />
                    New
                </Button>


            </div>
        );
    };
    const handleDelete = async (id) => {
        confirmDialog(confirmObj).then(async (e) => {
            if (e.isConfirmed) {
                const toastId = toast.loading("Deleting...");
                const res = await deleteAttendanceDevice(id).unwrap();
                console.log('res', res)
                if (res?.success) {
                    toast.success("Deleted successfully");
                    toast.dismiss(toastId);
                } else {
                    toast.dismiss(toastId);
                    toast.error("Failed to delete");
                }
            }
        })
    }
    return (
        <div className="flex flex-col   bg-white shadow px-5 py-6 rounded">
            <DataTable
                data={data?.data?.data}
                columns={getColumns(handleEdit, handleDelete)}
                emptyMessage="No attendance devices found."
                rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
                showGlobalFilter={true}
                globalFilterPlaceholder="Type here to search..."
                className="custom_datatable"
                loading={isLoading}
                extraField={extraField()}
            />
            {openForm && <AttendanceDeviceForm open={openForm} setOpen={setOpenForm} currentId={currentId} setCurrentId={setCurrentId} />}
        </div>
    )
}

export default AttendanceDeviceList