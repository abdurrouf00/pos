"use client";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
import { getAllDepartment } from "@/views/department/store";
import { getAllDesignations } from "@/views/designation/store";
import { getAllSalaryDesign } from "@/views/salary-design/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addSalarySheet,
  getAllSalarySheet
} from "../store";

const monthOptions = Array.from( { length: 12 }, ( _, i ) => ( {
  label: new Date( 0, i ).toLocaleString( "default", {
    month: "long",
  } ),
  value: i + 1,
} ) )
const yearOptions = Array.from( { length: 40 }, ( _, i ) => ( {
  label: 2025 + i,
  value: 2025 + i,
} ) )
const initialSalarySheetData = {
  title: "",
  salary_design_id: "",
  year: "",
  month: "",
  department_id: "",
  designation_id: "",
};
const SalarySheetForm = ( props ) => {
  const [formData, setFormData] = useState( initialSalarySheetData )

  const { setOpenForm, toggle } = props;
  const { mutationLoading } = useSelector(
    ( { salarySheet } ) => salarySheet
  );
  const departmentData = useSelector( state => state.department.departmentData );
  const designationData = useSelector( state => state.designation.designationData );
  const salaryDesignData = useSelector( state => state.salaryDesign.salaryDesignData );

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( getAllSalaryDesign() );
    dispatch( getAllDepartment() )
    dispatch( getAllDesignations() )
  }, [] )
  const {
    id,
    title,
    salary_design_id,
    year,
    month,
    department_id,
    designation_id,
  } = formData;

  const handleSubmit = ( e ) => {
    e.preventDefault()
    const submittedData = {
      ...formData,

    };
    // console.log("Form submitted:", submittedData);
    const action = id
      ? updateSalaryHead( submittedData )
      : addSalarySheet( submittedData );
    dispatch( action ).then( ( res ) => {
      console.log( "res", res )
      if ( res.payload.success ) {
        setOpenForm( false );
        dispatch( getAllSalarySheet() );
        toast.success( "Salary Sheet Created successfully" );

      } else {
        toast.error( res.payload.msg )
      }

    } );
  };

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    setFormData( { ...formData, [name]: value } )
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Salary Sheet" : "Add Salary Sheet"}
    >
      <form
        onSubmit={handleSubmit}
        className=" grid grid-cols-2 gap-3">
        <div>
          <HrInput
            name="title"
            label="Title"
            placeholder="Enter title"
            value={title}
            onChange={( e ) => {
              handleChange( e );
            }}
            required
          />
        </div>
        <div>
          <HrSelect
            name="salary_design_id"
            label="Salary Design"
            placeholder="Select Salary Design"
            value={salary_design_id}
            onChange={( e ) => {
              handleChange( e );
            }}
            options={mapOptions( salaryDesignData, "name", "id" )}
            required
          />
        </div>
        <div>
          <HrSelect
            name="year"
            label="Year"
            placeholder="Select Year"
            value={year}
            onChange={( e ) => {
              handleChange( e );
            }}
            options={yearOptions}
            required
          />
        </div>
        <div>
          <HrSelect
            name="month"
            label="Month"
            placeholder="Select Month"
            value={month}
            onChange={( e ) => {
              handleChange( e );
            }}
            options={monthOptions}
            required
          />
        </div>
        <div>
          <HrSelect
            name="department_id"
            label="Department"
            placeholder="Select Department"
            value={department_id}
            onChange={( e ) => {
              handleChange( e );
            }}
            options={mapOptions( departmentData, "name", "id" )}
          />
        </div>
        <div>
          <HrSelect
            name="designation_id"
            label="Designation"
            placeholder="Select Designation"
            value={designation_id}
            onChange={( e ) => {
              handleChange( e );
            }}
            options={mapOptions( designationData, "name", "id" )}
          />
        </div>
        <div className="flex justify-center col-span-2">
          <Button
            type="submit"
            className="w-full mt-4"
          >
            {mutationLoading ? 'Saving...' : "Save"}
          </Button>
        </div>
      </form>
    </HrModal>
  );
};

export default SalarySheetForm;
