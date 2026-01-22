"use client";
import { Button } from "@/components/ui/button";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import {
  addLoan,
  bindLoanData,
  getAllLoan,
  getLoanById,
  initialLoanData,
  updateLoan,
} from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import { getAllEmployee } from "@/views/employee/store";
import { useEffect } from "react";

const LoanForm = (props) => {
  const userDataStr = Cookies.get("user_data");
  const userData = userDataStr ? JSON.parse(userDataStr) : null;
  // console.log("User data:", userData);

  const { setOpenForm, toggle, editId, setEditId } = props;
  const { basicLoanData, mutationLoading, fetching } = useSelector(({ loan }) => loan);
  const { departmentData, designationData, salaryDesignData, employeeData } =
    useSelector(({ department, designation, salaryDesign, employee }) => ({
      departmentData: department.departmentData,
      designationData: designation.designationData,
      salaryDesignData: salaryDesign.salaryDesignData,
      employeeData: employee.employeeData,
    }));
  const dispatch = useDispatch();


  const getEmployeeData = async () => {
    dispatch(getAllEmployee());
  };

  useEffect(() => {
    if (editId) {
      dispatch(getLoanById(editId))
    }
    return () => {
      dispatch(bindLoanData(initialLoanData));
      setEditId(null);
    }
  }, [editId]);

  const {
    loan_amount,
    employee_id,
    installment_amount,
    installment_number,

    start_date,
    end_date,
  } = basicLoanData;

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedData = {
      ...basicLoanData,
      ...(editId && { id: editId }),
    };
    console.log("Form submitted:", submittedData);
    const action = editId ? updateLoan(submittedData) : addLoan(submittedData);
    const toastMsg = editId ? "Loan Updated successfully" : "Loan Created successfully";
    dispatch(action).then((res) => {
      console.log('res', res)
      if (res.payload.success) {
        setOpenForm(false);
        setEditId(null);
        dispatch(getAllLoan());
        toast.success(toastMsg);
        dispatch(bindLoanData(initialLoanData));
      }

    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "installment_number") {
      const installmentAmount = Math.round(loan_amount / +value);
      dispatch(bindLoanData({ ...basicLoanData, [name]: value, installment_amount: installmentAmount }));
    } else if (name === 'start_date') {
      const endDate = new Date(value);
      endDate.setMonth(endDate.getMonth() + +installment_number);
      dispatch(bindLoanData({ ...basicLoanData, [name]: value, end_date: endDate.toISOString().split('T')[0] }));
    } else {
      dispatch(bindLoanData({ ...basicLoanData, [name]: value }));
    }
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={editId ? "Update Loan" : "Add Loan"}
    >
      <form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-4">
        <div>
          <HrSelect
            name="employee_id"
            label="Employee"
            placeholder="Select Employee"
            value={employee_id}
            onChange={(e) => {
              handleChange(e);
            }}
            required
            options={mapOptions(employeeData, "name", "id")}
            onFocus={getEmployeeData}
            disabled={fetching}
          />
        </div>

        <div>
          <HrInput
            name="loan_amount"
            label="Loan Amount"
            placeholder="Enter Loan Amount"
            value={loan_amount}
            type="number"
            onChange={(e) => {
              handleChange(e);
            }}
            required
            disabled={fetching}
          />
        </div>
        <div>
          <HrInput
            name="installment_number"
            label="Installment Number"
            placeholder="Select Installment Number"
            value={installment_number}
            type="number"
            onChange={handleChange}
            disabled={fetching}
            min={1}
            required
          />
        </div>
        <div>
          <HrInput
            name="installment_amount"
            label="Installment Amount"
            placeholder="Select Installment Amount"
            value={installment_amount}
            type="number"
            disabled
          />
        </div>

        <div>
          <HrInput
            name="start_date"
            label="Start Date"
            placeholder="Select Start Date"
            value={start_date}
            type="date"
            onChange={(e) => {
              handleChange(e);
            }}
            disabled={!installment_number}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <div>
          <HrInput
            name="end_date"
            label="End Date"
            type="date"
            placeholder="Enter End Date"
            value={end_date}
            disabled
          />
        </div>
        <div className="flex justify-center col-span-2">
          <Button
            className="w-full"
            type="submit"
            disabled={mutationLoading || fetching}
          >
            {mutationLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </HrModal>
  );
};

export default LoanForm;
