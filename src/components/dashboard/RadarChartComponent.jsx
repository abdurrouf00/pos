"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
const data = [
    { name: "Product", value: 54, color: "#60a5fa" },
    { name: "Marketing", value: 93, color: "#34d399" },
    { name: "Sales", value: 82, color: "#facc15" },
    { name: "Development", value: 74, color: "#a855f7" },
    { name: "Operations", value: 56, color: "#3b82f6" },
    { name: "Customer Service", value: 45, color: "#f59e0b" },
    { name: "HR Department", value: 72, color: "#d946ef" },
    { name: "Admin", value: 89, color: "#f472b6" },
  ];

export default function RadarChartComponent() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800">Budget by Teams</h3>
      <p className="text-sm text-gray-500">Based on Contract</p>

   
      <div className="relative mt-4">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-4 space-y-1 text-gray-700 text-sm">
        {data.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="flex items-center">
              <span
                className="w-2.5 h-2.5 rounded-full mr-2"
                style={{ backgroundColor: ["#60a5fa", "#34d399", "#facc15", "#a855f7", "#3b82f6", "#f59e0b", "#d946ef", "#f472b6"][index] }}
              ></span>
              {item.name}
            </span>
            <span className="font-semibold">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
