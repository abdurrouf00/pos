"use client"


import React, { useState } from "react";
import leadsData from "@/tableData";

export default function LeadTable() {
  const [leads, setLeads] = useState(leadsData);
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
        <h2 className="text-xl font-semibold">Meeting Table</h2>
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
            <th className="p-2 text-left">Solution Number</th>         
            <th className="p-2 text-left">Solution Title</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left"> Case Owner</th>
            
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
              <td className="p-2">{lead.caseNo}</td>
              <td className="p-2">{lead.dealName}</td>
              <td className="p-2">{lead.status}</td>                         
              <td className="p-2">{lead.owner}</td>             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
