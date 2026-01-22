'use client';

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    appointmentFor: "",
    serviceName: "",
    date: "",
    time: "",
    appointmentName: "",
    additionalInfo: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  // handleChange for input/select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

   
    // Reset
    setFormData({
      appointmentFor: "",
      serviceName: "",
      date: "",
      time: "",
      appointmentName: "",
      additionalInfo: "",
    });

    alert("✅ Appointment Created Successfully!");
  };

  return (
    <div className="bg-white p-6 rounded min-h-screen space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
      
        {/* Appointment Information */}
        <div className=" p-4 space-y-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800  pb-2">
            Appointment Information
          </h3>

          <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
            <HrSelect
              name="appointmentFor"
              label="Appointment For"
              value={formData.appointmentFor}
              onChange={handleChange}
              options={[
                { value: "users", label: "Users" },
                { value: "clients", label: "Clients" },
                { value: "customers", label: "Customers" },
              ]}
            />

            <HrInput
              name="serviceName"
              label="Service Name"
              placeholder="Enter service name"
              value={formData.serviceName}
              onChange={handleChange}
              required
            />

            <HrInput
              type="text"
              name="appointmentName"
              label="Appointment Name"
              placeholder="Enter appointment name"
              value={formData.appointmentName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date & Time */}
          <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
            <HrInput
              type="date"
              name="date"
              label="Appointment Date"
              value={formData.date}
              onChange={handleChange}
            />

            <HrSelect
              name="time"
              label="Appointment Time"
              value={formData.time}
              onChange={handleChange}
              options={[
                { value: "8:00 AM", label: "8:00 AM" },
                { value: "9:00 AM", label: "9:00 AM" },
                { value: "10:00 AM", label: "10:00 AM" },
                { value: "11:00 AM", label: "11:00 AM" },
                { value: "12:00 PM", label: "12:00 PM" },
                { value: "1:00 PM", label: "1:00 PM" },
                { value: "2:00 PM", label: "2:00 PM" },
                { value: "3:00 PM", label: "3:00 PM" },
                { value: "4:00 PM", label: "4:00 PM" },
                { value: "5:00 PM", label: "5:00 PM" },
                { value: "6:00 PM", label: "6:00 PM" },
                { value: "7:00 PM", label: "7:00 PM" },
                { value: "8:00 PM", label: "8:00 PM" },
                { value: "9:00 PM", label: "9:00 PM" },
              ]}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className=" p-4 space-y-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800  pb-2">
            Additional Information
          </h3>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            role="2"
            placeholder="Write additional notes..."
            className="w-full  border rounded p-2"
          />
        </div>

        {/* Submit Button */}
        <div className="text-right mr-4">
          <Button type="submit">Save Appointment</Button>
        </div>
      </form>
    </div>
  );
}
