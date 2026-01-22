"use client";
import React, { useState } from "react";
import serviceData from "@/tableData";

export default function LeadTable() {
  const [leads, setLeads] = useState(serviceData);
  const [selectedRows, setSelectedRows] = useState([]);

  // ✅ Checkbox toggle handler
  const handleCheckboxChange = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // ✅ Delete selected rows
  const handleDelete = () => {
    const updatedLeads = leads.filter((_, index) => !selectedRows.includes(index));
    setLeads(updatedLeads);
    setSelectedRows([]);
  };

  return (
    <div className="p-4 pt-15">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Service Table</h2>
        {selectedRows.length > 0 && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Selected ({selectedRows.length})
          </button>
        )}
      </div>

      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">✓</th>
            <th className="p-2 text-left">Service Name</th>
            <th className="p-2 text-left">Duration</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Location</th>
           </tr> 
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td className="p-2">{lead.name}</td>
              <td className="p-2">{lead.duration}</td>
              <td className="p-2">{lead.price}</td>
              <td className="p-2">{lead.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
