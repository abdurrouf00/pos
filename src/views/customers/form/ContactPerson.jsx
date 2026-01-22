"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import HrInput from "@/components/common/HrInput";
import { Button } from "@/components/ui/button";

export default function TeamTableForm() {
  const [rows, setRows] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      workPhone: "",
      mobile: "",
      skype: "",
      designation: "",
      department: "",
    },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        firstName: "",
        lastName: "",
        email: "",
        workPhone: "",
        mobile: "",
        skype: "",
        designation: "",
        department: "",
      },
    ]);
  };

  const removeRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Team Members:", rows);
    alert("Form Submitted!");
  };

  return (
    <div onSubmit={handleSubmit} className=" bg-white space-y-4">
      <h2 className="text-lg font-semibold mb-4">Contact persons</h2>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border text-sm p-2">First Name</th>
            <th className="border text-sm p-2">Last Name</th>
            <th className="border text-sm p-2">Email Address</th>
            <th className="border text-sm p-2">Work Phone</th>
            <th className="border text-sm p-2">Mobile</th>
            <th className="border text-sm p-2">Skype Name/Number</th>
            <th className="border text-sm p-2">Designation</th>
            <th className="border text-sm p-2">Department</th>
            <th className="border text-sm p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border p-1">
                <HrInput
                  name="firstName"
                  value={row.firstName}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full"
                />
              </td>
              <td className="border p-1">
                <HrInput
                  name="lastName"
                  value={row.lastName}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full"
                />
              </td>
              <td className="border p-1">
                <HrInput
                  name="email"
                  type="email"
                  value={row.email}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full"
                />
              </td>
              <td className="border p-1">
                <HrInput
                  name="workPhone"
                  value={row.workPhone}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full"
                />
              </td>
              <td className="border p-1">
                <HrInput
                  name="mobile"
                  value={row.mobile}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full"
                />
              </td>
              <td className="border p-1">
                <HrInput
                  name="skype"
                  value={row.skype}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full"
                />
              </td>
              <td className="border p-1">
                <HrInput
                  name="designation"
                  value={row.designation}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full"
                />
              </td>
              <td className="border p-1">
                <HrInput
                  name="department"
                  value={row.department}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full"
                />
              </td>
              <td className="border p-1 text-center">
                <Button
                  onClick={() => removeRow(index)}
                  className="bg-white hover:bg-white cursor-pointer"
                >
                  <Trash2 className="text-red-700" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
