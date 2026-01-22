"use client";
import { Button } from "@/components/ui/button";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import { addDesignation, bindDesignationData, getAllDesignations, initialDesignationData, updateDesignation } from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

const DesignationForm = (props) => {
  const userDataStr = Cookies.get("user_data");
  const userData = userDataStr ? JSON.parse(userDataStr) : null;

  const { setOpenForm, toggle } = props;
  const { basicDesignationData } = useSelector(({ designation }) => designation);
  const dispatch = useDispatch();
  const { id, name, job_grade } = basicDesignationData;

  const handleSubmit = (e) => {
    const submittedData = {
      ...basicDesignationData,
      organization_id: userData?.organization_id,
      company_id: userData?.company_id,
    }
    const action = id ? updateDesignation(submittedData) : addDesignation(submittedData);
    dispatch(action).then((res) => {
      setOpenForm(false);
      dispatch(getAllDesignations());
      toast.success("Designation Created successfully");
      dispatch(bindDesignationData(initialDesignationData));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindDesignationData({ ...basicDesignationData, [name]: value }));
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Designation" : "Add Designation"}
    >
      <div className="space-y-4">
        <div>
          <HrInput
            name="name"
            label="Designation Name"
            placeholder="Enter designation name"
            value={name}
            onChange={(e) => { handleChange(e) }}
            required
          />
        </div>
        <div>
          <HrInput
            name="job_grade"
            label="Job Grade"
            placeholder="Enter code"
            value={job_grade}
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

export default DesignationForm;