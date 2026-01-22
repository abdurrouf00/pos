"use client";
import { Button } from "@/components/ui/button";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import { addEmployeeCategory, bindEmployeeCategoryData, getAllEmployeeCategories, initialEmployeeCategoryData, updateEmployeeCategory } from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

const EmployeeCategoryForm = (props) => {
  const userDataStr = Cookies.get("user_data");
  const userData = userDataStr ? JSON.parse(userDataStr) : null;

  const { setOpenForm, toggle } = props;
  const { basicEmployeeCategoryData, isSubmitting } = useSelector(({ employeeCategory }) => employeeCategory);
  const dispatch = useDispatch();
  const { id, name } = basicEmployeeCategoryData;

  const handleSubmit = (e) => {
    const submittedData = {
      ...basicEmployeeCategoryData
    }
    const action = id ? updateEmployeeCategory(submittedData) : addEmployeeCategory(submittedData);
    dispatch(action).then((res) => {
      setOpenForm(false);
      dispatch(getAllEmployeeCategories());
      toast.success("Employee Category Created successfully");
      dispatch(bindEmployeeCategoryData(initialEmployeeCategoryData));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindEmployeeCategoryData({ ...basicEmployeeCategoryData, [name]: value }));
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Employee Category" : "Add Employee Category"}
    >
      <div className="space-y-4">
        <div>
          <HrInput
            name="name"
            label="Category Name"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => { handleChange(e) }}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={() => { handleSubmit() }} disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
        </div>
      </div>
    </HrModal>
  );
}

export default EmployeeCategoryForm;