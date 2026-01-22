"use client";
import DataTable from "@/components/common/DataTable";
import HrInput from "@/components/common/HrInput";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
import { getAllDepartment } from "@/views/department/store";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  attendanceFileUpload,
  bindAttendanceFormData,
  bindAttendanceFormType,
  getAllAttendance,
  searchAttendanceByDateRange,
  searchAttendanceBySingleDate,
} from "../store";
import { covertDateToYMD } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import details from "./Details";
import DetailsEdit from "../form/DetailsEdit";
export const columns = (handleDelete, handleEdit, handleApprove, userRole) => {
  const columns = [
    {
      header: "#SL",
      body: (row, { rowIndex }) => <span>{rowIndex}</span>,
      style: {
        width: "100px",
        textAlign: "center",
      },
      sortable: false,
      filter: false,
    },
    {
      field: "date",
      header: "Date",
      sortable: true,
    },

    // {
    //   header: "Actions",
    //   sortable: false,
    //   body: (rowData) => (
    //     <div className="flex gap-2">
    //       <>
    //         <Button
    //           variant={"outline-success"}
    //           onClick={() => handleEdit(rowData)}
    //           className=""
    //           size={"sm"}
    //         >
    //           <Pencil size={10} />
    //         </Button>
    //         <Button
    //           variant={"outline-destructive"}
    //           onClick={() => handleDelete(rowData)}
    //           className=""
    //           size={"sm"}
    //         >
    //           <Trash2 className="text-xs" />
    //         </Button>
    //       </>
    //     </div>
    //   ),
    //   style: { width: "100px" },
    // },
  ];

  return columns;
};
function AttendanceList() {
  const [filterData, setFilterData] = useState({
    from_date: "",
    to_date: "",
    department_id: "",
    file: "",
  });
  const [currentRow, setCurrentRow] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const router = useRouter();

  const [attendanceFileIn, setAttendanceFileIn] = useState(null);
  const [attendanceFileOut, setAttendanceFileOut] = useState(null);
  const [inFileUploading, setInFileUploading] = useState(false);
  const [outFileUploading, setOutFileUploading] = useState(false);

  const dispatch = useDispatch();
  const [showSearchResult, setShowSearchResult] = useState(false);
  const { basicAttendanceData, searchValue, attendanceData, loading } =
    useSelector((state) => state.attendance);
  const { departmentData } = useSelector(({ department }) => department);
  const { dat } = basicAttendanceData;
  const { date, department_id } = searchValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData({ ...filterData, [name]: value });
  };

  const handleDepartmentOnFocus = () => {
    dispatch(getAllDepartment());
  };
  const handleSearch = () => {
    if (filterData.from_date && filterData.to_date) {
      dispatch(
        searchAttendanceByDateRange({
          from_date: filterData.from_date,
          to_date: filterData.to_date,
        })
      );
    } else if (filterData.from_date) {
      dispatch(searchAttendanceBySingleDate(filterData.from_date));
    }
  };

  const handleEdit = (rowData) => {
    setCurrentRow(rowData);
    setOpenEdit(true);
  };
  const handleDelete = () => {};

  const convertTo24hourFormat = (time, am_pm) => {
    let [hours, minutes, seconds = "00"] = time.split(":");
    hours = parseInt(hours, 10);

    if (am_pm === "PM" && hours !== 12) {
      hours += 12;
    } else if (am_pm === "AM" && hours === 12) {
      hours = 0;
    }

    // Pad with leading zeros for consistency
    const hh = String(hours).padStart(2, "0");
    return `${hh}:${minutes}:${seconds}`;
  };
  const handleUpload = async (e, type = "in", file = attendanceFileIn) => {
    e.preventDefault();
    if (type === "in") {
      setInFileUploading(true);
    } else {
      setOutFileUploading(true);
    }
    const formData = new FormData();
    formData.append("type", type);
    formData.append("attendance_file", file.file);
    const res = await dispatch(attendanceFileUpload(formData)).unwrap();
    if (res.success) {
      let data;
      toast.success("File uploaded");
      setAttendanceFileIn(null);
      setAttendanceFileOut(null);
      if (type === "in") {
        data = res.data.map((item) => ({
          ...item,
          date: covertDateToYMD(item.date),
          time: convertTo24hourFormat(item.time, item.am_pm),
          attendance_type_id: item.attendance_type_id ?? "2",
        }));
      } else {
        data = res.data.map((item) => ({
          ...item,
          date: covertDateToYMD(item.date),
          time: convertTo24hourFormat(item.time, item.am_pm),
        }));
      }
      const attendaceData = data;
      dispatch(bindAttendanceFormData(attendaceData));
      dispatch(bindAttendanceFormType(type));
      router.push(`/dashboard/attendance-form`);
    } else {
      toast.error(res.message || "File upload failed");
      setAttendanceFileIn(null);
      setAttendanceFileOut(null);
    }
    if (type === "in") {
      setInFileUploading(false);
    } else {
      setOutFileUploading(false);
    }
  };

  const handleTakeAttendanceManually = () => {
    dispatch(bindAttendanceFormType("manual"));
    router.push(`/dashboard/attendance-form/manual`);
  };

  const extraField = () => {
    return (
      <div>
        <div
          onClick={() => handleTakeAttendanceManually()}
          className="border flex items-center gap-2 py-1 px-3 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[600]"
        >
          {/* <FaCirclePlus /> */}
          Take Attendance Manually
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-3">
      <div className="w-full">
        <div className="p-2 bg-white  w-full h-full  rounded-md">
          <div>
            <div className=" grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-4 border border-gray-200 p-4 rounded items-end mb-4">
              <form
                onSubmit={(e) => handleUpload(e, "in", attendanceFileIn)}
                className="flex gap-2 items-end "
              >
                <HrInput
                  name="attendance_file"
                  label="In File"
                  placeholder="Select file"
                  type="file"
                  onChange={(e) => {
                    setAttendanceFileIn({
                      value: e.target.value,
                      file: e.target.files[0],
                    }); // This stores the files in state
                  }}
                  value={attendanceFileIn?.value || ""}
                  required
                />
                <Button disabled={inFileUploading} type="submit">
                  {inFileUploading ? "Uploading..." : "Upload"}
                </Button>
              </form>
              <form
                onSubmit={(e) => handleUpload(e, "out", attendanceFileOut)}
                className="flex gap-2 items-end "
              >
                <HrInput
                  name="attendance_file"
                  label="Out File"
                  placeholder="Select file"
                  type="file"
                  onChange={(e) => {
                    setAttendanceFileOut({
                      value: e.target.value,
                      file: e.target.files[0],
                    }); // This stores the files in state
                  }}
                  value={attendanceFileOut?.value || ""}
                  required
                />
                <Button disabled={outFileUploading} type="submit">
                  {outFileUploading ? "Uploading..." : "Upload"}
                </Button>
              </form>
              <div className="flex items-end justify-start gap-2">
                <div className="">
                  <a
                    href={`${process.env.NEXT_PUBLIC_BACKEND_URL}assets/default_attachments/user_attendance_format.xlsx`}
                    download
                  >
                    <button className="px-4 cursor-pointer font-semibold py-1.5 bg-white border border-primary rounded text-sm text-primary">
                      Download Sample
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* filter options */}
          <div className=" grid lg:grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-4 border border-gray-200 p-4 rounded items-end">
            <div>
              <HrInput
                name="from_date"
                label="From Date"
                placeholder="Enter date"
                value={filterData.from_date}
                type="date"
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
            </div>
            <div>
              <HrInput
                name="to_date"
                label="To Date"
                placeholder="Enter date"
                value={filterData.to_date}
                type="date"
                onChange={(e) => {
                  handleChange(e);
                }}
                disabled={!filterData.from_date}
                min={filterData.from_date}
                required
              />
            </div>
            <div>
              <HrSelect
                name="department_id"
                label="Department"
                type="text"
                placeholder="Enter Department"
                value={filterData.department_id}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
                options={mapOptions(departmentData, "name", "id")}
              />
            </div>
            <div className="flex items-end justify-start ">
              <Button onClick={handleSearch} disabled={loading}>
                Search
              </Button>
            </div>
          </div>

          <div className="mt-4">
            {/* table */}
            <DataTable
              loading={loading}
              data={attendanceData}
              columns={columns(handleDelete, handleEdit)}
              globalFilterFields={["name"]}
              emptyMessage="No attendance found."
              rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
              showGlobalFilter={true}
              className="custom_datatable"
              globalFilterPlaceholder="Type here to search..."
              extraField={extraField()}
              dataKey="id"
              expandable={true}
              rowExpansionTemplate={(rowData) => details(rowData, handleEdit)}
            />
          </div>
        </div>
      </div>
      {openEdit && (
        <DetailsEdit
          open={openEdit}
          setOpen={setOpenEdit}
          data={currentRow}
          setData={setCurrentRow}
        />
      )}
    </div>
  );
}

export default AttendanceList;
