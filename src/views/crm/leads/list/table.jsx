"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import leadsData from "@/tableData";

export default function LeadTable() {
  const router = useRouter();

  const [leads, setLeads] = useState(leadsData);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (e, index) => {
    e.stopPropagation(); // 👉 checkbox ক্লিক করলে row click কাজ করবে না
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleDelete = () => {
    const updatedLeads = leads.filter((_, index) => !selectedRows.includes(index));
    setLeads(updatedLeads);
    setSelectedRows([]);
  };

  // 👉 row এ ক্লিক হলে page redirect
  const handleRowClick = (lead) => {
    router.push(`/dashboard/leads/lead-info?id=${lead.id}`);
  };

  return (
    <div className="p-4 pt-15">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Leads Table</h2>
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
            <th className="p-2 text-left">Lead Name</th>
            <th className="p-2 text-left">Company</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Lead Source</th>
            <th className="p-2 text-left">Lead Owner</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => handleRowClick(lead)}
            >
              <td className="p-2" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={(e) => handleCheckboxChange(e, index)}
                />
              </td>
              <td className="p-2">{lead.name}</td>
              <td className="p-2">{lead.company}</td>
              <td className="p-2">{lead.email}</td>
              <td className="p-2">{lead.phone}</td>
              <td className="p-2">{lead.source}</td>
              <td className="p-2">{lead.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
