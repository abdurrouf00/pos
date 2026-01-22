"use client";
import DataTable from "@/components/common/DataTable";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { confirmDialog, confirmObj } from "@/lib/utils";
import DeviceForm from "@/views/devices/form";
import {
  useDeleteDeviceMutation,
  useGetAllDevicesQuery,
} from "@/views/devices/store";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const columns = (handleDelete, handleEdit) => {
  const columns = [
    {
      field: "device_id",
      header: "Device ID",
      sortable: true,
    },
    {
      field: "device_name",
      header: "Device Name",
      sortable: true,
    },
    {
      header: "Actions",
      sortable: false,
      body: (rowData) => (
        <div className="flex gap-2">
          <Button
            variant={"outline-success"}
            onClick={() => handleEdit(rowData)}
            className=""
            size={"sm"}
          >
            <Pencil size={10} />
          </Button>
          {/* <Button
            variant={"outline-destructive"}
            onClick={() => handleDelete(rowData)}
            className=""
            size={"sm"}
          >
            <Trash2 className="text-xs" />
          </Button> */}
        </div>
      ),
      style: { width: "100px" },
    },
  ];

  return columns;
};
export default function Devices() {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [deleteDevice, { isLoading: isDeletingDevice }] =
    useDeleteDeviceMutation();
  const { data: devicesData, isLoading: isLoadingDevices } =
    useGetAllDevicesQuery();

  const handleOpenFormModal = () => {
    setOpenFormModal(true);
    setEditId(null);
  };
  const handleEdit = (row) => {
    setEditId(row.id);
    setOpenFormModal(true);
  };
  const handleDelete = async (row) => {
    confirmDialog(confirmObj).then(async (e) => {
      if (e.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        const res = await deleteDevice(row.id).unwrap();

        if (res) {
          toast.dismiss(toastId);
          toast.success("Deleted successfully");
        } else {
          toast.dismiss(toastId);
          toast.error("Failed to delete");
        }
      }
    });
  };
  return (
    <>
      <div className="bg-white px-4 pt-4 pb-8 rounded mx-0.5  border border-gray-100">
        <div className="pb-3 flex justify-end">
          <Button onClick={handleOpenFormModal} variant={"primary"}>
            <Plus /> Add New
          </Button>
        </div>
        <DataTable
          // loading={fetchingAllData}
          data={devicesData?.data.data}
          columns={columns(handleDelete, handleEdit)}
          globalFilterFields={["name"]}
          emptyMessage="No leave types found."
          rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
          showGlobalFilter={true}
          className="custom_datatable"
          globalFilterPlaceholder="Type here to search..."
          // extraField={extraField()}
        />
      </div>
      {openFormModal ? (
        <DeviceForm
          open={openFormModal}
          setOpen={setOpenFormModal}
          editId={editId}
        />
      ) : null}
    </>
  );
}
