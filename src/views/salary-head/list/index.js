"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSalaryHead,
  getAllSalaryHead,
  getSalaryHeadById,
} from "../store";
import { salaryHeadColumn } from "./salaryHeadColumn";
import SalaryHeadForm from "../form";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import Confirm from "@/components/common/confirm";


export default function SalaryHeadList() {
  const { salaryHeadData, loading } = useSelector(
    ({ salaryHead }) => salaryHead
  );
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState({
    title: "",
    message: "",
    onConfirm: () => { },
  });

  const handleDelete = (rowData) => {
    setConfirmOpen(true);
    setConfirmData({
      title: "Delete Salary Head",
      message: "Are you sure you want to delete this salary head?",
      onConfirm: () => handleDeleteConfirm(rowData),
    });
  };

  const handleDeleteConfirm = (rowData) => {
    dispatch(deleteSalaryHead(rowData?.id)).then((res) => {
      toast.error("Deleted");
      dispatch(getAllSalaryHead());
    });
  };

  const handleInfo = (rowData) => {
    dispatch(getSalaryHeadById(rowData?.id)).then(() => {
      setOpenForm(true);
    });
  };

  useEffect(() => {
    dispatch(getAllSalaryHead());
  }, []);

  const extraField = () => {
    return (
      <div>
        <div
          onClick={() => setOpenForm(true)}
          className="border flex items-center gap-2 py-1 px-3 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[400]"
        >
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
              data={salaryHeadData}
              columns={salaryHeadColumn(handleDeleteConfirm, handleInfo)}
              globalFilterFields={["name", "type", "calc_type", "amount"]}
              emptyMessage="No salary heads found."
              rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
              showGlobalFilter={true}
              globalFilterPlaceholder="Head here to search..."
              extraField={extraField()}
              loading={loading}
              className="custom_datatable"
            />
          </div>
        </div>
      </div>
      {openForm && (
        <SalaryHeadForm toggle={openForm} setOpenForm={setOpenForm} />
      )}
      <Confirm
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmData.onConfirm}
        title={confirmData.title}
        message={confirmData.message}
      />
    </>
  );
}
