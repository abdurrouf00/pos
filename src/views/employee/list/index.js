"use client";
import Confirm from "@/components/common/confirm";
import DataTable from "@/components/common/DataTable";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import ImportBox from "@/components/common/ImportBox";
import { Button } from "@/components/ui/button";
import { getAllDepartment } from "@/views/department/store";
import {
  Search
} from "lucide-react";
import Link from "next/link";
import { useRouter } from 'nextjs-toploader/app';
import { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import EmployeeForm from "../form";
import FingerPrintForm from "../form/FingerPrintForm";
import { getAllEmployee, importEmployeeData, setMetaData } from "../store";
import { employeeColumn } from "./EmployeeColumn";
import ChangeStatus from "../change-status";
import { status_options } from "@/lib/constants";
import CreateUser from "../create-user";

const initialFilter = {
  department_id: '',
  name: '',
  nid_no: '',
  current_status: '1',
}

const all_status_options = [
  { label: 'All', value: '' },
  ...status_options,
]

export default function EmployeeManagement({ employee }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState({
    title: "",
    message: "",
    onConfirm: () => { },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [id, setId] = useState(null);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [visibleTeam, setVisibleTeam] = useState(null);
  const [filter, setFilter] = useState(initialFilter)
  const [openFingerprintForm, setOpenFingerprintForm] = useState(false);
  const [empId, setEmpId] = useState(null);
  const [openChangeStatusForm, setOpenChangeStatusForm] = useState(false);
  const [openCreateUserForm, setOpenCreateUserForm] = useState(false);
  //global state
  const { departmentData } = useSelector(({ department }) => department);
  const { employeeData, currentPage, perPage, totalPages, firstRow, loading } = useSelector(({ employee }) => employee);
  const dispatch = useDispatch();

  const router = useRouter();

  const params = {
    department_id: visibleTeam,
    current_status: filter.current_status,
    page: currentPage,
    per_page: perPage,
    ...filter
  }



  const handleDelete = (rowData) => {
    setConfirmOpen(true);
    setConfirmData({
      title: "Delete Employee",
      message: "Are you sure you want to delete this employee?",
      onConfirm: () => handleDeleteConfirm(rowData),
    });
  };

  const handleDeleteConfirm = (rowData) => {
    dispatch(deleteEmployee(rowData?.id)).then((res) => {
      toast.error("Deleted");
      dispatch(getAllEmployee());
    });
  };

  const handleFingerprint = (rowData) => {
    setOpenFingerprintForm(true);
    setEmpId(rowData.id);
  }

  // const handleInfo = (rowData) => {
  //   setIsOpen(true);
  //   setId(rowData.id);
  //   router.back();
  // };

  const handleInfo = (rowData) => {
    router.push(`/dashboard/employee/${rowData.id}`);
  };

  useEffect(() => {
    dispatch(getAllDepartment());

  }, [])

  const getEmployees = (params) => {
    dispatch(getAllEmployee(params));
  }
  useEffect(() => {
    getEmployees(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleTeam]);

  const handleImport = () => {
    setImportModalOpen(true);
  };

  const handleStatusChange = (e) => {
    setFilter({
      ...filter,
      current_status: e.target.value,
    })
    getEmployees({
      ...params,
      current_status: e.target.value,
    });
  }

  const extraField = () => {
    return (
      <div className="flex items-center gap-2">
        <div
          onClick={() => {
            handleImport();
          }}
          className="border flex items-center gap-2 py-1 px-3 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[400]"
        >
          Import
        </div>
        <Link href="/dashboard/employee/new">
          <div className="border flex items-center gap-2 py-1 px-3 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[400]">
            <FaCirclePlus />
            New
          </div>
        </Link>
        <div className="w-[150px]">
          <HrSelect
            options={all_status_options}
            name='current_status'
            placeholder='Select Status'
            onChange={handleStatusChange}
            value={filter.current_status}
          />
        </div>
      </div>
    );
  };

  const handlePage = (page) => {
    console.log("page", page);
    dispatch(setMetaData({
      current_page: page.page + 1,
      per_page: page.rows,
      // total: page.totalPages,
      firstRow: page.first,
    }));
    const paramsObj = {
      ...params,
      page: page.page + 1,
      per_page: page.rows,
    }
    getEmployees(paramsObj);
  };

  const deptOptions = mapOptions(departmentData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    })
  }

  const handleSearch = () => {
    getEmployees(params);
  }

  const handleClear = () => {
    const query = {
      ...params,
      ...initialFilter
    }
    setFilter(initialFilter);
    getEmployees(query);
  }

  const handleChangeStatus = (rowData) => {
    setOpenChangeStatusForm(true);
    setEmpId(rowData.id);
  }
  const handleCreateUser = (rowData) => {
    setOpenCreateUserForm(true);
    setEmpId(rowData.id);
  }

  return (
    <>
      <div className="flex flex-col   bg-white shadow px-5 py-6">
        <div className=" pb-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 items-end">
          {/* <EmployeeSidebar
            currentTeam={visibleTeam}
            departments={departmentData}
            onTeamSelect={handleTeamSelect}
          /> */}
          <HrSelect
            label="Department"
            options={deptOptions}
            onChange={handleChange}
            name="department_id"
            value={filter.department_id}
            placeholder='Select Department'
          />
          <HrInput value={filter.name} label='Name' name='name' placeholder='Search by name' onChange={handleChange} />
          <HrInput value={filter.nid_no} label='NId' name='nid_no' placeholder='Search by Nid' onChange={handleChange} />

          <div className="flex gap-2 items-center">
            <Button variant='success' className="w-max" onClick={handleSearch}>
              <Search />
              Search
            </Button>
            <Button variant='outline-success' className="w-max" onClick={handleClear}>
              Reset
            </Button>
          </div>
        </div>
        <div className="w-full">
          <div className="   w-full rounded">
            <DataTable
              data={employeeData}
              columns={employeeColumn(handleInfo, handleFingerprint, handleChangeStatus, handleCreateUser)}
              // globalFilterFields={[
              //   "name",
              //   "level",
              //   "contract",
              //   "salary",
              //   "payment",
              // ]}
              emptyMessage="No employees found."
              rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
              showGlobalFilter={true}
              globalFilterPlaceholder="Type here to search..."
              extraField={extraField()}
              className="custom_datatable"
              onPage={handlePage}
              rows={perPage}
              loading={loading}
              // currentPage={currentPage}
              page={currentPage}
              first={firstRow}
              totalRecords={totalPages}
              lazy
              paginator
            // size="small"
            />
          </div>
        </div>
      </div>
      {importModalOpen && (
        <ImportBox
          toggle={importModalOpen}
          setToggle={setImportModalOpen}
          setOpenForm={setImportModalOpen}
          handleImportFunction={importEmployeeData}
          title="Import Employee CSV file"
          downloadableFile="/sample_emp_file.xlsx"
        />
      )}
      {openForm && <EmployeeForm toggle={openForm} setOpenForm={setOpenForm} />}
      {isOpen && (
        <HrModal
          toggle={isOpen}
          setToggle={setIsOpen}
          title={id ? "Employee Details" : ""}
          size="w-full"
        >
          {employee}
          {/* <EmployeeDetails toggle={isOpen} setOpenForm={setIsOpen} id={id} /> */}
        </HrModal>
      )}
      {openFingerprintForm && (
        <FingerPrintForm
          open={openFingerprintForm}
          setOpen={setOpenFingerprintForm}
          empId={empId}
        />
      )}
      <Confirm
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmData.onConfirm}
        title={confirmData.title}
        message={confirmData.message}
      />
      {openChangeStatusForm && <ChangeStatus
        open={openChangeStatusForm}
        setOpen={setOpenChangeStatusForm} empId={empId} setEmpId={setEmpId} />
      }
      {openCreateUserForm && <CreateUser
        open={openCreateUserForm}
        params={params}
        setOpen={setOpenCreateUserForm} empId={empId} setEmpId={setEmpId} />
      }
    </>
  );
}
