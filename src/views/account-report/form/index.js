"use client";
import { useState, useRef } from "react";
import React from "react";
import { IoFolderOutline } from "react-icons/io5";
import TableData from "../jsonFolder/formTable.json";

export default function ReportsPage() {
  const [activeCategory, setActiveCategory] = useState(TableData[0].category);

  // Refs for each category row
  const categoryRefs = useRef({});

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (categoryRefs.current[category]) {
      categoryRefs.current[category].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
  {/* Sidebar */}
  <aside className="w-64 h-screen bg-white shadow-md sticky top-0">
    <h2 className="text-lg font-bold p-4 border-b">Report Categories</h2>
    <ul className="overflow-scroll max-h-[calc(100vh-64px)]">
      {TableData.map((item) => (
        <li
          key={item.category}
          onClick={() => handleCategoryClick(item.category)}
          className={`p-2 cursor-pointer items-center gap-2 flex text-sm hover:bg-blue-100 ${
            activeCategory === item.category ? "bg-blue-200 font-semibold" : ""
          }`}
        ><IoFolderOutline />
          {item.category}
        </li>
      ))}
    </ul>
  </aside>

  {/* Main Content */}
  <main className="flex-1 pl-6 overflow-y-scroll" >
    <div className="bg-white shadow rounded-lg pb-20">
       <table className="min-w-full border border-gray-200">
            <thead >
              <tr className="bg-gray-200 ">
                <th className="px-4 py-2 border text-left">Report Name</th>
                <th className="px-4 py-2 border text-left">Type</th>
                <th className="px-4 py-2 border text-left">Created By</th>
              </tr>
            </thead>
            <tbody>
              {TableData.map((item) => (
                <React.Fragment key={item.category}>
                  {/* Category Header Row */}
                  <tr
                    ref={(el) => (categoryRefs.current[item.category] = el)}
                    className={`${
                      activeCategory === item.category
                        ? "bg-blue-100 text-blue-800 font-bold"
                        : "bg-gray-100 font-semibold"
                    }`}
                  >
                    <td colSpan="3" className="px-4 py-2 border">
                      {item.category}
                    </td>
                  </tr>

                  {/* Reports under category */}
                  {item.reports.map((report) => (
                    <tr
                      key={`${item.category}-${report.name}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 border text-sm">{report.name}</td>
                      <td className="px-4 py-2 border text-sm">{report.type}</td>
                      <td className="px-4 py-2 border text-sm">{report.createdBy}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
    </div>
  </main>
</div>
  )};