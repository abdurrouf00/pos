"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import HrInput from "@/components/common/HrInput";

export default function CustomReportDisplay() {
  const [formData, setFormData] = useState({
    reportName: "",
    exportName: "",
    description: "",
    permission: "onlyMe",
    selectedUsers: [],
    inputValue: "",
  });

  const availableRoles = [
    "Staff",
    "Staff (Assigned Customers Only)",
    "TimesheetStaff",
    "Admin",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = () => {
    const trimmed = formData.inputValue.trim();
    if (trimmed && !formData.selectedUsers.includes(trimmed)) {
      setFormData({
        ...formData,
        selectedUsers: [...formData.selectedUsers, trimmed],
        inputValue: "",
      });
    }
  };

  const handleRemoveUser = (user) => {
    setFormData({
      ...formData,
      selectedUsers: formData.selectedUsers.filter((u) => u !== user),
    });
  };

  return (
    <div className="py-4 mb-30 gap-6 p-4 flex flex-col bg-white w-[60%]">
      {/* Report Name */}
      <div className="flex flex-col">
        <label className="font-medium">Report Name</label>
        <HrInput
          type="text"
          name="reportName"
          value={formData.reportName}
          onChange={handleChange}
          placeholder="Enter report name"
          className="border rounded p-2"
        />
      </div>

      {/* Name in Export */}
      <div className="flex flex-col">
        <label className="font-medium">Name in Export</label>
        <HrInput
          type="text"
          name="exportName"
          value={formData.exportName}
          onChange={handleChange}
          placeholder="Enter exported file name"
          className="border rounded p-2"
        />
      </div>

      {/* Report Description */}
      <div className="flex flex-col">
        <label className="font-medium">Report Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add a descriptions to your report "
          className="border rounded p-2"
          rows={3}
        />
      </div>
      <p className="text-sm text-gray-700"> You can use report descriptions to help you identify the details of the reports for your reference.</p>

      {/* Configure Permissions */}
      <div className="flex flex-col space-y-2 border-t pt-5">
        <label className="font-medium">Configure Permissions</label>

        <div className="space-y-1 flex gap-10 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="permission"
              value="onlyMe"
              checked={formData.permission === "onlyMe"}
              onChange={handleChange}
            />
            Only Me
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="permission"
              value="selected"
              checked={formData.permission === "selected"}
              onChange={handleChange}
            />
            Only Selected Users & Roles
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="permission"
              value="everyone"
              checked={formData.permission === "everyone"}
              onChange={handleChange}
            />
            Everyone
          </label>
        </div>

        {formData.permission === "selected" && (
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex gap-2">
              <input
                type="text"
                list="roles"
                placeholder="Type role or user..."
                value={formData.inputValue}
                onChange={(e) =>
                  setFormData({ ...formData, inputValue: e.target.value })
                }
                className="border p-1 flex-1 rounded text-sm"
              />
              <Button onClick={handleAddUser} type="button">
                Add
              </Button>
            </div>

            <datalist id="roles">
              {availableRoles.map((role) => (
                <option key={role}  value={role} />
              ))}
            </datalist>            

            <div className="flex flex-wrap gap-2">
              {formData.selectedUsers.map((user) => (
                <div
                  key={user}
                  className="bg-gray-200  px-2 py-1 rounded flex items-center gap-1"
                >
                  <span>{user}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveUser(user)}
                    className="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
