"use client";
import { Button } from "@/components/ui/button";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import { addDivision, bindDivisionData, getAllDivisions, initialDivisionData, updateDivision } from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

const DivisionForm = (props) => {
  const userDataStr = Cookies.get("user_data");
  const userData = userDataStr ? JSON.parse(userDataStr) : null;

  const { setOpenForm, toggle } = props;
  const { basicDivisionData } = useSelector(({ division }) => division);
  const dispatch = useDispatch();
  const { id, name } = basicDivisionData;

  const handleSubmit = (e) => {
    const submittedData = {
      ...basicDivisionData
    }
    const action = id ? updateDivision(submittedData) : addDivision(submittedData);
    dispatch(action).then((res) => {
      setOpenForm(false);
      dispatch(getAllDivisions());
      toast.success("Division Created successfully");
      dispatch(bindDivisionData(initialDivisionData));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindDivisionData({ ...basicDivisionData, [name]: value }));
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Division" : "Add Division"}
    >
      <div className="space-y-4">
        <div>
          <HrInput
            name="name"
            label="Division Name"
            placeholder="Enter division name"
            value={name}
            onChange={(e) => { handleChange(e) }}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={() => { handleSubmit() }}>Submit</Button>
        </div>
      </div>
    </HrModal>
  );
}

export default DivisionForm;