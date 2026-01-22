"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteRole, getAllRole, getRoleById } from "../store";
import { roleColumn } from "./RoleColumn";
import RoleForm from "../form";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import AccessForm from "../form/AccessForm";

import { confirmDialog, confirmObj } from "@/lib/utils";

const productTeams = [
  {
    id: 1,
    name: "Ralph...",
    salary: "20,000,000",
    payment: "10,000,000",
    level: "Internship",
    contract: "Probation",
    contractType: "yellow",
  },
  {
    id: 2,
    name: "Cameron...",
    salary: "40,000,000",
    payment: "30,000,000",
    level: "Contractor",
    contract: "Signed",
    contractType: "blue",
  },
  {
    id: 3,
    name: "Guy Hawkins",
    salary: "16,000,000",
    payment: "16,000,000",
    level: "Senior",
    contract: "End soon",
    contractType: "red",
  },
];



export default function RoleList() {
  const { roleData, basicRoleData, loading } = useSelector(({ role }) => role);
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [roleId, setRoleId] = useState(null);

  // const handleDelete = (rowData) => {
  //   confirmDialog(confirmObj).then(async (e) => {
  //     if (e.isConfirmed) {
  //       const toastId = toast.loading("Deleting...");
  //       const res = await deleteRole(rowData.id).unwrap();
  //       if (res) {
  //         toast.dismiss(toastId);
  //         toast.success("Deleted successfully");
  //         dispatch(getAllRole());
  //       } else {
  //         toast.dismiss(toastId);
  //         toast.error("Failed to delete");
  //       }
  //     }
  //   });
  // };
  const handleDelete = async (row) => {
    confirmDialog(confirmObj).then(async (e) => {
      if (e.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        const res = await dispatch(deleteRole(row.id)).unwrap();
        console.log("Response from deleteLeaveType:", res);
        if (res) {
          dispatch(getAllRole());
          toast.dismiss(toastId);
          toast.success("Deleted successfully");
        } else {
          toast.dismiss(toastId);
          toast.error("Failed to delete");
        }
      }
    });
  };

  const handleInfo = (rowData) => {
    dispatch(getRoleById(rowData?.id))
      .then(() => {
        setOpenForm(true);
      });
  };

  const handleAccess = (rowData) => {
    setRoleId(rowData?.id);
    setAccessModalOpen(true);
  };

  useEffect(() => {
    dispatch(getAllRole());
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
              data={roleData}
              columns={roleColumn(handleDelete, handleInfo, handleAccess)}
              globalFilterFields={['name']}
              emptyMessage="No roles found."
              rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
              showGlobalFilter={true}
              globalFilterPlaceholder="Type here to search..."
              extraField={extraField()}
              className="custom_datatable"
              loading={loading}
            />
          </div>
        </div>
      </div>
      {openForm && <RoleForm toggle={openForm} setOpenForm={setOpenForm} />}
      {accessModalOpen && <AccessForm open={accessModalOpen} setOpen={setAccessModalOpen} roleId={roleId} />}
    </>
  );
}
