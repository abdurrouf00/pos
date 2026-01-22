import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import Loading from "@/components/ui/loading";
import { bindEmployeeData } from "../store";
import { useDispatch, useSelector } from "react-redux";

const ExperienceInfo = ({ loading }) => {
  const { basicEmployeeData } = useSelector((state) => state.employee);
  const { prev_job_info } = basicEmployeeData;
  const dispatch = useDispatch();
  const [experience, setExperience] = useState([
    { company: "", position: "", duration: "", responsibilities: "" },
  ]);

  const handleChangeInputRow = (index, e) => {
    const { name, value } = e.target;
    const updated = prev_job_info.map((item, index) => {
      if (index === index) {
        return { ...item, [name]: value };
      }
      return item;
    });
    dispatch(
      bindEmployeeData({ ...basicEmployeeData, prev_job_info: updated })
    );
  };

  const addExperience = () => {
    dispatch(
      bindEmployeeData({
        ...basicEmployeeData,
        prev_job_info: [
          ...prev_job_info,
          { company_name: "", position: "", joining_date: "", resign_date: "" },
        ],
      })
    );
  };

  const removeExperience = (index) => {
    const updated = prev_job_info.filter((item, ind) => ind !== index);
    dispatch(
      bindEmployeeData({ ...basicEmployeeData, prev_job_info: updated })
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-4 w-full">
      {prev_job_info.map((item, index) => (
        <div className="p-2 rounded-md" key={index}>
          <div className="flex flex-row gap-2 items-end">
            <HrInput
              label="Company Name"
              name={`company_name`}
              value={item.company_name}
              onChange={(e) => handleChangeInputRow(index, e)}
              placeholder="Enter company name"
            />
            <HrInput
              label="Position"
              name={`position`}
              value={item.position}
              onChange={(e) => handleChangeInputRow(index, e)}
              placeholder="Enter position"
            />
          </div>
          <div className="flex flex-row gap-2 items-end mt-2">
            <HrInput
              label="Joining Date"
              name={`joining_date`}
              value={item.joining_date}
              type="date"
              onChange={(e) => handleChangeInputRow(index, e)}
            />
            <HrInput
              label="Resign Date"
              name={`resign_date`}
              value={item.resign_date}
              type="date"
              onChange={(e) => handleChangeInputRow(index, e)}
            />
            {/* <HrInput
              label="Responsibilities"
              name={`responsibilities_${index}`}
              value={item.responsibilities}
              onChange={(e) =>
                handleChangeInputRow(index, "responsibilities", e.target.value)
              }
              placeholder="Enter key responsibilities"
            /> */}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              className="bg-red-600 text-white hover:bg-red-500"
              variant="outline"
              onClick={() => removeExperience(index)}
            >
              Delete <Trash2 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button
        className="bg-green-600 text-white hover:bg-green-500 w-32"
        variant="outline"
        onClick={addExperience}
      >
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
    </div>
  );
};

export default ExperienceInfo;
