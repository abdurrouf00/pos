"use client";
import { useState, useRef } from "react";
import React from "react";
import { IoFolderOutline } from "react-icons/io5";
import TableData from "../jsonFolder/formTable.json";
import { useRouter } from "next/navigation";

export default function ReportsPage() {
  const [activeCategory, setActiveCategory] = useState(TableData[0].category);
  const router = useRouter();

  // Refs for each category row
  const categoryRefs = useRef({});

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (categoryRefs.current[category]) {
      categoryRefs.current[category].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const slugify = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  return (
    <div className="flex h-screen bg-gray-100">
  {/* Sidebar */}
  <aside className="w-64 h-screen bg-white shadow-md sticky top-0">
    <h2 className="text-lg font-bold p-4 border-b">Report Categories</h2>
    <ul className="overflow-scroll max-h-[calc(100vh-64px)] scrollbar-hide">
      {TableData.map((item) => (
        <li
          key={item.category}
          onClick={() => handleCategoryClick(item.category)}
          className={`p-3 cursor-pointer items-center gap-3 flex text-sm transition-all duration-200 border-l-4 ${
            activeCategory === item.category 
              ? "bg-blue-50 text-[#282560] font-bold border-[#282560]" 
              : "text-gray-600 border-transparent hover:bg-gray-50 hover:pl-4"
          }`}
        ><IoFolderOutline className={activeCategory === item.category ? "text-[#282560]" : "text-gray-400"} />
          {item.category}
        </li>
      ))}
    </ul>
  </aside>

  {/* Main Content */}
  <main className="flex-1 pl-6 overflow-y-scroll" >
    <div className="bg-white shadow rounded-lg pb-20 mt-4 mr-4 border border-gray-100">
       <table className="min-w-full">
            <thead >
              <tr className="bg-[#282560] text-white">
                <th className="px-6 py-4 text-left font-semibold tracking-wider">Report Name</th>
                <th className="px-6 py-4 text-left font-semibold tracking-wider">Type</th>
                <th className="px-6 py-4 text-left font-semibold tracking-wider">Created By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {TableData.map((item) => (
                <React.Fragment key={item.category}>
                  {/* Category Header Row */}
                  <tr
                    ref={(el) => (categoryRefs.current[item.category] = el)}
                    className={`${
                      activeCategory === item.category
                        ? "bg-blue-50/50 text-[#282560] font-bold"
                        : "bg-gray-50/30 font-semibold"
                    }`}
                  >
                    <td colSpan="3" className="px-6 py-3 text-sm uppercase tracking-widest text-[#282560]">
                      {item.category}
                    </td>
                  </tr>

                  {/* Reports under category */}
                  {item.reports.map((report) => (
                    <tr
                      key={`${item.category}-${report.name}`}
                      onClick={() => router.push(`/dashboard/report/details/${slugify(report.name)}`)}
                      className="group hover:bg-blue-50/30 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-gray-800 group-hover:text-[#F49420] font-medium transition-colors border-b border-transparent group-hover:border-[#F49420]/30">
                          {report.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 italic">{report.type}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {report.createdBy}
                        </span>
                      </td>
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
