"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import { addProject, bindProjectData, getAllProjects, initialProjectData, updateProject } from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";


const ProjectForm = (props) => {
  const { setOpenForm, toggle } = props;
  const {basicProjectData} = useSelector(({project}) => project);
  const dispatch = useDispatch();
  const {id, name} = basicProjectData;

//   useEffect(() => {
//     return () => {
//         dispatch(bindProjectData(initialProjectData));
//     }
//   }, [])

  const handleSubmit = (e) => {
    console.log("Form submitted:", basicProjectData);
    const action = id ? updateProject(basicProjectData) : addProject(basicProjectData);
    dispatch(action).then((res) => {
      setOpenForm(false);
      dispatch(getAllProjects());
      toast.success("Section Created successfully");
      dispatch(bindProjectData(initialProjectData));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindProjectData({...basicProjectData, [name]: value}));
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Project" : "Add Project"}
    >
      <div className="space-y-4">
        <div>
          <HrInput
            name="name"
            label="Name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => {handleChange(e)}}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={() => {handleSubmit()}}>Submit</Button>
        </div>
      </div>
    </HrModal>
  );
}

export default ProjectForm;
