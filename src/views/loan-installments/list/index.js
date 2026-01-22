"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLoanInstallments,
  getAllLoanInstallments,
  getLoanInstallmentsById,
} from "../store";
import { loanInstallmentsColumn } from "./loanInstallmentColumn";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import Confirm from "@/components/common/confirm";

export default function LoanInstallmentsList() {
  const { loanInstallmentsData, loading } = useSelector(
    ({ loanInstallments }) => loanInstallments
  );
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState({
    title: "",
    message: "",
    onConfirm: () => { },
  });

  const handleInfo = (rowData) => {
    dispatch(getLoanInstallmentsById(rowData?.id)).then(() => {
      setOpenForm(true);
    });
  };

  useEffect(() => {
    dispatch(getAllLoanInstallments());
  }, []);

  const extraField = () => {
    return <div></div>;
  };

  return (
    <>
      <div className="flex gap-3">
        <div className="w-full">
          <div className="p-2 bg-white shadow-lg w-full">
            <DataTable
              data={loanInstallmentsData}
              columns={loanInstallmentsColumn(handleInfo)}
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
