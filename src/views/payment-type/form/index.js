"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import { addPaymentType, bindPaymentTypeData, getAllPaymentTypes, initialPaymentTypeData, updatePaymentType } from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const PaymentTypeForm = (props) => {
  const { setOpenForm, toggle } = props;
  const {basicPaymentTypeData} = useSelector(({paymentType}) => paymentType);
  const dispatch = useDispatch();
  const {id, name, description, status, paymentMethod, accountNumber, bankName} = basicPaymentTypeData;

  const handleSubmit = (e) => {
    console.log("Form submitted:", basicPaymentTypeData);
    const action = id ? updatePaymentType(basicPaymentTypeData) : addPaymentType(basicPaymentTypeData);
    dispatch(action).then((res) => {
      setOpenForm(false);
      dispatch(getAllPaymentTypes());
      toast.success("Payment Type Created successfully");
      dispatch(bindPaymentTypeData(initialPaymentTypeData));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindPaymentTypeData({...basicPaymentTypeData, [name]: value}));
  };

  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={id ? "Update Payment Type" : "Add Payment Type"}
    >
      <div className="space-y-4">
        <div>
          <HrInput
            name="name"
            label="Name"
            placeholder="Enter payment type name"
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

export default PaymentTypeForm; 