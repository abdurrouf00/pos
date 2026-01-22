"use client";
import { Button } from "@/components/ui/button";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import {
  addSalaryHead,
  bindSalaryHeadData,
  getAllSalaryHead,
  initialSalaryHeadData,
  updateSalaryHead,
} from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import HrSelect from "@/components/common/HrSelect";

const SalaryHeadForm = (props) => {
  const userDataStr = Cookies.get("user_data");
  const userData = userDataStr ? JSON.parse(userDataStr) : null;
  // console.log("User data:", userData);

  const { setOpenForm, toggle } = props;
  const { basicSalaryHeadData, mutationLoading } = useSelector(({ salaryHead }) => salaryHead);
  const dispatch = useDispatch();
  const { id, name, type, calc_type, amount } = basicSalaryHeadData;

  const handleSubmit = (e) => {
    const addData = {
      name,
      type,
      calc_type,
      amount,
      status: 1,
    }
    const submittedData = {
      ...basicSalaryHeadData,
      organization_id: userData?.organization_id,
      company_id: userData?.company_id,
    };
    // console.log("Form submitted:", submittedData);
    const toastMsg = id ? "Salary Head Updated successfully" : "Salary Head Created successfully";
    const action = id
      ? updateSalaryHead(submittedData)
      : addSalaryHead(addData);
    dispatch(action).then((res) => {
      console.log('res', res);
      if (res.payload.id) {
        toast.success(toastMsg);
        dispatch(getAllSalaryHead());
        dispatch(bindSalaryHeadData(initialSalaryHeadData));
        setOpenForm(false);
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindSalaryHeadData({ ...basicSalaryHeadData, [name]: value }));
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Salary Head" : "Add Salary Head"}
    >
      <div className=" grid grid-cols-2 gap-4">
        <div>
          <HrInput
            name="name"
            label="Salary Head Name"
            placeholder="Enter salary head name"
            value={name}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        <div>
          <HrSelect
            name="type"
            label="Type"
            placeholder="Select Type"
            value={type}
            options={[
              { label: "Addition", value: 1 },
              { label: "Deduction", value: 2 },
            ]}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        <div>
          <HrSelect
            name="calc_type"
            label="Calc Type"
            placeholder="Select Calc Type"
            value={calc_type}
            options={[
              { label: "Fixed Amount", value: 1 },
              { label: "Percentage(%) Of Basic", value: 2 },
            ]}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <HrInput
            name="amount"
            label="Amount"
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

      </div>
      <div className="flex w-full ">
        <Button
          variant='primary'
          className="w-full"
          onClick={() => {
            handleSubmit();
          }}
          disabled={mutationLoading}
        >
          {mutationLoading ? 'Saving...' : "Save"}
        </Button>
      </div>
    </HrModal>
  );
};

export default SalaryHeadForm;
