"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSalarySheet,
  getAllSalarySheet,
  getSalarySheetById,
} from "../store";
import { salarySheetColumn } from "./salarySheetColumn";
import SalarySheetForm from "../form";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import Confirm from "@/components/common/confirm";
import { useRouter } from "next/navigation";

export default function SalarySheetList() {
  const { salarySheetData, loading } = useSelector(
    ({ salarySheet }) => salarySheet
  );
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState({
    title: "",
    message: "",
    onConfirm: () => { },
  });
  const router = useRouter();
  const handleDelete = (rowData) => {
    setConfirmOpen(true);
    setConfirmData({
      title: "Delete Salary Sheet",
      message: "Are you sure you want to delete this salary sheet?",
      onConfirm: () => handleDeleteConfirm(rowData),
    });
  };

  const handleDeleteConfirm = (rowData) => {
    dispatch(deleteSalarySheet(rowData?.id)).then((res) => {
      toast.error("Deleted");
      dispatch(getAllSalarySheet());
    });
  };

  const handleInfo = (rowData) => {
    router.push(`/dashboard/salary-sheet/details/${rowData?.id}`);
  };

  useEffect(() => {
    dispatch(getAllSalarySheet());
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
              data={salarySheetData}
              columns={salarySheetColumn(handleDelete, handleInfo)}
              globalFilterFields={["name", "type", "calc_type", "amount"]}
              emptyMessage="No salary sheets found."
              rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
              showGlobalFilter={true}
              globalFilterPlaceholder="Head here to search..."
              extraField={extraField()}
              loading={loading}
            />
          </div>
        </div>
      </div>
      {openForm && (
        <SalarySheetForm toggle={openForm} setOpenForm={setOpenForm} />
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
