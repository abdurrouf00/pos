"use client";
import Confirm from "@/components/common/confirm";
import DataTable from "@/components/common/DataTable";
import { confirmDialog, confirmObj } from "@/lib/utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCirclePlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import SalaryDesignForm from "../form";
import {
  deleteSalaryDesign,
  getAllSalaryDesign
} from "../store";
import { salaryDesignColumn } from "./salaryDesignColumn";


export default function SalaryDesignList() {
  const [editId, setEditId] = useState(null);
  const { salaryDesignData, loading } = useSelector(
    ({ salaryDesign }) => salaryDesign
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
      title: "Delete Salary Design",
      message: "Are you sure you want to delete this salary design?",
      onConfirm: () => handleDeleteConfirm(rowData),
    });
  };

  const handleDeleteConfirm = (row) => {
    confirmDialog(confirmObj).then(async (e) => {
      if (e.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        const res = await dispatch(deleteSalaryDesign(row.id)).unwrap();
        if (res.success) {
          toast.dismiss(toastId);
          toast.success("Deleted successfully");
          dispatch(getAllSalaryDesign());
        } else {
          toast.dismiss(toastId);
          toast.error("Failed to delete");
        }
      }
    });


    // dispatch( deleteSalaryDesign( rowData?.id ) ).then( ( res ) => {
    //   toast.error( "Deleted" );
    //   dispatch( getAllSalaryDesign() );
    // } );
  };

  const handleInfo = (rowData) => {
    setEditId(rowData?.id)
    setOpenForm(true)
  };

  useEffect(() => {
    dispatch(getAllSalaryDesign());
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
              data={salaryDesignData}
              columns={salaryDesignColumn(handleDeleteConfirm, handleInfo)}
              globalFilterFields={["name", "design_details", "action"]}
              emptyMessage="No salary designs found."
              rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
              showGlobalFilter={true}
              globalFilterPlaceholder="Design here to search..."
              extraField={extraField()}
              loading={loading}
              className="custom_datatable"
            />
          </div>
        </div>
      </div>
      {openForm && (
        <SalaryDesignForm toggle={openForm} setOpenForm={setOpenForm} editId={editId} setEditId={setEditId} />
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
