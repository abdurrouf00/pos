"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteLoan, getAllLoan, getLoanById } from "../store";
import { loanColumn } from "./loanColumn";
import LoanForm from "../form";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import Confirm from "@/components/common/confirm";
import { confirmDialog, confirmObj } from "@/lib/utils";

export default function LoanList() {
  const { loanData, loading } = useSelector(({ loan }) => loan);
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState({
    title: "",
    message: "",
    onConfirm: () => { },
  });
  const [editId, setEditId] = useState(null);

  const handleDelete = (rowData) => {
    confirmDialog(confirmObj).then(async (e) => {
      if (e.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        const res = await dispatch(deleteLoan(rowData?.id)).unwrap();
        if (res) {
          console.log('res', res)
          toast.dismiss(toastId);
          toast.success("Deleted successfully");
          dispatch(getAllLoan());
        } else {
          toast.dismiss(toastId);
          toast.error("Failed to delete");
        }
      }
    });

  };



  const handleInfo = (rowData) => {
    setOpenForm(true);
    console.log('rowData', rowData)
    setEditId(rowData?.id);
  };

  useEffect(() => {
    dispatch(getAllLoan());
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
              data={loanData}
              columns={loanColumn(handleDelete, handleInfo)}
              globalFilterFields={[
                "name",
                "department_id",
                "designation_id",
                "loan_amount",
                "installment_amount",
                "installment_number",
                "start_date",
                "end_date",
              ]}
              emptyMessage="No loans found."
              rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
              showGlobalFilter={true}
              globalFilterPlaceholder="Head here to search..."
              extraField={extraField()}
              loading={loading}
            />
          </div>
        </div>
      </div>
      {openForm && <LoanForm toggle={openForm} setOpenForm={setOpenForm} editId={editId} setEditId={setEditId} />}

    </>
  );
}
