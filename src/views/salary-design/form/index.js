"use client";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
import UILoading from "@/components/ui/UILoading";
import { getAllSalaryHead } from "@/views/salary-head/store";
import { cloneDeep } from "lodash";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addSalaryDesign,
  bindSalaryDesignData,
  getAllSalaryDesign,
  getSalaryDesignById,
  updateSalaryDesign
} from "../store";

export const initialHead = {
  head_id: "",
  calc_type: "",
  amount: "",
}
export const initialSalaryDesignData = {

  name: "",
  head_details: [
    { ...initialHead }
  ],
};
const SalaryDesignForm = (props) => {
  const [formLoading, setFormLoading] = useState(false);
  const { setOpenForm, toggle, editId, setEditId } = props;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialSalaryDesignData);

  const { basicSalaryDesignData, mutationLoading } = useSelector(
    ({ salaryDesign }) => salaryDesign
  );
  const { salaryHeadData } = useSelector(({ salaryHead }) => salaryHead);
  const { name, head_details } = formData;

  const getById = () => {
    if (editId) {
      setFormLoading(true)
      dispatch(getSalaryDesignById(editId))
        .then((res) => {
          const headDetails = res.payload.design_details.map(itm => {
            const { id, head_id, calc_type, default_amount } = itm;
            return {
              id,
              head_id,
              calc_type,
              amount: default_amount
            }
          })
          const modifiedPayload = {
            name: res.payload.name,
            head_details: headDetails
          }
          setFormData(modifiedPayload)
          setFormLoading(false)
        })
        .catch((err) => {
          setFormLoading(false)
        })
    }
  }

  useEffect(() => {
    getById()
    return () => {
      setEditId(null)
    }
  }, [editId])
  const handleChange = (index, field, value) => {
    const updatedDetails = cloneDeep(head_details);
    // deep copy
    updatedDetails[index][field] = value;
    setFormData({
      ...formData,
      head_details: updatedDetails,
    })

  };
  console.log("head_details", head_details)
  const handleAddRow = () => {
    const newRow = {
      ...initialHead
    };
    setFormData({
      ...formData,
      head_details: [...head_details, newRow],
    })

  };
  console.log("formData", formData)

  const handleRemoveRow = (index) => {
    const updatedDetails = head_details.filter((_, i) => i !== index);
    dispatch(
      bindSalaryDesignData({
        ...basicSalaryDesignData,
        head_details: updatedDetails,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredHeads = formData.head_details.filter(head => head.head_id && head.calc_type && head.amount);
    const heads = filteredHeads.map((head) => ({
      ...head,
      head_id: +head.head_id,
      calc_type: +head.calc_type,
      amount: +head.amount,
    }));
    const percentageHeads = heads.filter(head => head.calc_type === 2);
    const invalidPercentageAmount = percentageHeads.some(head => head.amount > 100);
    if (invalidPercentageAmount) {
      toast.error("Percentage heads amount should not be greater than 100");
      return;
    }
    const submittedData = {
      ...(editId ? { id: editId } : {}),
      name: formData.name,
      head_details: heads
    };
    console.log('submittedData', submittedData)
    const action = editId
      ? updateSalaryDesign(submittedData)
      : addSalaryDesign(submittedData);
    dispatch(action).then((res) => {
      console.log('res', res)
      if (res.payload.success) {
        setOpenForm(false);
        dispatch(getAllSalaryDesign());
        toast.success("Salary Design saved successfully");

      }

    });
  };


  useEffect(() => {
    const loadAllData = async () => {
      setFormLoading(true);
      try {
        await Promise.all([dispatch(getAllSalaryHead())]);
      } finally {
        setFormLoading(false);
      }
    };

    loadAllData();
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={editId ? "Update Salary Design" : "Add Salary Design"}
      size='max-w-3xl'
    >
      <UILoading loading={formLoading}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <HrInput
              name="name"
              label="Salary Design Name"
              placeholder="Enter salary design name"
              value={name}
              disabled={formLoading}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-12 gap-1 font-semibold border-b pb-2 text-xs mt-10">
            <div className="col-span-1">SL</div>
            <div className="col-span-3">Head</div>
            <div className="col-span-3">Calc. Type</div>
            <div className="col-span-3">Amount</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {head_details.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-1">{index + 1}</div>

              {/* Head Field */}
              <div className="col-span-3">
                <HrSelect
                  placeholder="Select Head"
                  options={mapOptions(salaryHeadData, "name", "id")}
                  value={item.head_id}
                  required={index === 0}
                  onChange={(e) => handleChange(index, "head_id", e.target.value)}
                />
              </div>

              {/* Calc Type */}
              <div className="col-span-3">
                <HrSelect
                  placeholder="Calc. Type"
                  options={[
                    { label: "Fixed", value: "1" },
                    { label: "Percentage", value: "2" },
                  ]}
                  value={item.calc_type}
                  required={index === 0}
                  onChange={(e) =>
                    handleChange(index, "calc_type", e.target.value)
                  }
                />
              </div>

              {/* Amount */}
              <div className="col-span-3">
                <HrInput
                  type="number"
                  disabled={formLoading}
                  placeholder="Amount"
                  value={item.amount}
                  max={item.calc_type === "2" ? 100 : Infinity}
                  required={index === 0}
                  onChange={(e) => handleChange(index, "amount", e.target.value)}
                />
              </div>

              {/* Delete Button */}
              <div className="col-span-2 text-center">
                <Button
                  variant="ghost"
                  disabled={formLoading}
                  size="icon"
                  type="button"
                  onClick={() => handleRemoveRow(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>
          ))}

          <div className="text-right">
            <Button type="button" onClick={handleAddRow} variant='success' size='icon'>
              <Plus size={10} />
            </Button>
          </div>

          <div className="text-center mt-6 flex justify-end ">
            <Button disabled={mutationLoading} type='submit' >{mutationLoading ? 'Saving...' : "Save"}</Button>
          </div>
        </form>
      </UILoading>
    </HrModal>
  );
};

export default SalaryDesignForm;
