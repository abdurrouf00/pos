import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import Loading from "@/components/ui/loading";
import { bindEmployeeData } from "../store";
import { useDispatch, useSelector } from "react-redux";

const EducationInfo = ({ handleChange, loading }) => {
  const { basicEmployeeData } = useSelector((state) => state.employee);
  const { edu_info } = basicEmployeeData;
  const [education, setEducation] = useState([
    { level: "", institute: "", year: "", gradePoint: "", result: "" },
  ]);
  const dispatch = useDispatch();

  const handleChangeInputRow = (i, e) => {
    const { name, value } = e.target;
    const updated = edu_info.map((item, index) => {
      if (index === i) {
        return { ...item, [name]: value };
      }
      return item;
    });
    console.log("updated", updated);
    dispatch(bindEmployeeData({ ...basicEmployeeData, edu_info: updated }));
  };
  const addEducation = () => {
    // setEducation([
    //   {
    //     degree: "",
    //     ins_name: "",
    //     passing_year: "",
    //     result: "",
    //   },
    // ]);
    dispatch(
      bindEmployeeData({
        ...basicEmployeeData,
        edu_info: [
          ...edu_info,
          {
            degree: "",
            ins_name: "",
            passing_year: "",
            result: "",
          },
        ],
      })
    );
  };

  const removeEducation = (index) => {
    const updated = edu_info.filter((item, ind) => ind !== index);
    dispatch(bindEmployeeData({ ...basicEmployeeData, edu_info: updated }));
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-4 w-full ">
      {edu_info.map((item, index) => (
        <div className="p-2 rounded-md" key={index}>
          <div className="flex flex-row gap-2 items-end">
            <HrInput
              label="Exam/Degree Title"
              name={"degree"}
              value={item.degree}
              onChange={(e) => handleChangeInputRow(index, e)}
              placeholder="Enter exam/degree"
            />
            <HrInput
              label="Institute"
              name={"ins_name"}
              value={item.ins_name}
              onChange={(e) => handleChangeInputRow(index, e)}
              placeholder="Enter institute"
            />
          </div>

          <div className="flex flex-row gap-2 items-end mt-2">
            <HrInput
              label="Passing Year"
              name={"passing_year"}
              value={item.passing_year}
              onChange={(e) => handleChangeInputRow(index, e)}
              type="number"
              min={1900}
              max={new Date().getFullYear()}
              placeholder="Passing Year"
              length={4}
            />
            {/* <HrInput
              label="Grade Point"
              name={`grade_point_${index}`}
              value={item.gradePoint}
              onChange={(e) =>
                handleChangeInputRow(index, "gradePoint", e.target.value)
              }
              placeholder="Enter grade point"
            /> */}
            <HrInput
              label="Result"
              name={"result"}
              value={item.result}
              onChange={(e) => handleChangeInputRow(index, e)}
              placeholder="Enter result"
            />
          </div>
          <div className="flex justify-end mt-4 w-full">
            <Button
              className="bg-red-600 text-white hover:bg-red-500"
              variant="outline"
              onClick={() => removeEducation(index)}
            >
              Delete <Trash2 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button
        className={
          "bg-green-600 text-white hover:bg-green-500 hover:text-white w-32"
        }
        variant="outline"
        onClick={addEducation}
      >
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
    </div>
  );
};

export default EducationInfo;
