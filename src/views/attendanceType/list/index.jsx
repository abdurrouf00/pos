"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAttendanceType,
  getAllAttendanceType,
  getAttendanceTypeById,
} from "../store";
import { attendanceTypeColumn } from "./attendanceTypeColumn";
import AttendanceTypeForm from "../form";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import Confirm from "@/components/common/confirm";
import HrInput from "@/components/common/HrInput";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const initialFilter = {
  name: "",
  short_name: "",
  color: "",
};

export default function AttendanceTypeList() {
  const { attendanceTypeData, loading } = useSelector(
    ({ attendanceType }) => attendanceType
  );
  const [filter, setFilter] = useState(initialFilter);
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const handleDelete = (rowData) => {
    setConfirmOpen(true);
    setConfirmData({
      title: "Delete Attendance Type",
      message: "Are you sure you want to delete this attendance type?",
      onConfirm: () => handleDeleteConfirm(rowData),
    });
  };

  const handleDeleteConfirm = (rowData) => {
    dispatch(deleteAttendanceType(rowData?.id)).then((res) => {
      toast.error("Deleted");
      dispatch(getAllAttendanceType());
    });
  };

  const handleInfo = (rowData) => {
    dispatch(getAttendanceTypeById(rowData?.id)).then(() => {
      setOpenForm(true);
    });
  };

  useEffect(() => {
    dispatch(getAllAttendanceType());
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleSearch = () => {};

  const handleClear = () => {
    setFilter(initialFilter);
  };

  return (
    <>
      <div className="flex gap-3 p-2 ">
        <div className="w-full">
          <div className=" bg-white shadow-lg w-full px-5 py-6">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 items-end pb-4">
              <HrInput
                label="Name"
                name="name"
                placeholder="Search by name"
                value={filter.name}
                onChange={handleChange}
              />
              <HrInput
                label="Short Name"
                name="short_name"
                placeholder="Search by short name"
                value={filter.short_name}
                onChange={handleChange}
              />
              <HrInput
                label="Color"
                name="color"
                placeholder="Search by color"
                value={filter.color}
                onChange={handleChange}
              />
              <div className="flex gap-2 items-center">
                <Button
                  variant="success"
                  className="w-max"
                  onClick={handleSearch}
                >
                  <Search />
                  Search
                </Button>
                <Button
                  variant="outline-success"
                  className="w-max"
                  onClick={handleClear}
                >
                  Reset
                </Button>
              </div>
            </div>
            <DataTable
              data={attendanceTypeData}
              columns={attendanceTypeColumn(handleDeleteConfirm, handleInfo)}
              globalFilterFields={["name", "short_name", "color"]}
              emptyMessage="No attendance types found."
              rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
              showGlobalFilter={true}
              globalFilterPlaceholder="Type here to search..."
              extraField={extraField()}
              loading={loading}
              className="custom_datatable"
            />
          </div>
        </div>
      </div>
      {openForm && (
        <AttendanceTypeForm toggle={openForm} setOpenForm={setOpenForm} />
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
