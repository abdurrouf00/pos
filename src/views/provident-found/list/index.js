"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllProvidentFund, getProvidentFundById } from "../store";
import { providentFundColumn } from "./PFColumn";
import { FaCirclePlus } from "react-icons/fa6";

export default function ProvidentFundList() {
  const { providentFundData, loading } = useSelector(
    ({ providentFund }) => providentFund
  );
  const dispatch = useDispatch();

  const handleInfo = (rowData) => {
    dispatch(getProvidentFundById(rowData?.id)).then(() => {
      setOpenForm(true);
    });
  };

  useEffect(() => {
    dispatch(getAllProvidentFund());
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
              data={providentFundData}
              columns={providentFundColumn(handleInfo)}
              globalFilterFields={["name", "type", "calc_type", "amount"]}
              emptyMessage="No provident funds found."
              rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
              showGlobalFilter={true}
              globalFilterPlaceholder="Head here to search..."
              extraField={extraField()}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
