import React from "react";

export default function TableSkeleton({ columns, rows = 10 }) {
  return (
    <div className="w-full overflow-x-auto  text-[10px]">
      <div className="flex gap-2 justify-between mb-4">
        <div className="h-10 bg-gray-200 animate-pulse w-1/3 rounded-md"></div>
        <div className="h-8 bg-gray-200 animate-pulse w-1/5 rounded-md"></div>
      </div>
      <table className="table-auto min-w-full border-collapse custom_datatable">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="text-left   px-4 py-2 font-[700] text-[#374151]"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((_, index) => (
                <td
                  key={index}
                  className="h-10 bg-gray-100 animate-pulse  border-2 border-white rounded-md"
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
