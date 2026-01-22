"use client";
import React from "react";
import dealRevenue from "./data2.json";
import dealQuantity from "./data.json";

const DealsOverview = () => {
  return (
    <div className="p-6 pt-10 space-y-8">
      {/* Deal Revenue Table */}
      <div className="p-4 ">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Deal Revenue</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Period</th>
                <th className="px-4 py-2 border">Target</th>
                <th className="px-4 py-2 border">Gap</th>
                <th className="px-4 py-2 border">Achievement</th>
                <th className="px-4 py-2 border">Predicted Achievement</th>
                <th className="px-4 py-2 border">Pipeline</th>
                <th className="px-4 py-2 border">Committed</th>
                <th className="px-4 py-2 border">Best Case</th>
              </tr>
            </thead>
            <tbody>
              {dealRevenue.map((row, i) => (
                <tr key={i} className="text-center border-b hover:bg-gray-50">
                  <td className="px-4 py-2 border">{row.period}</td>
                  <td className="px-4 py-2 border">{row.target}</td>
                  <td className="px-4 py-2 border">{row.achievement}</td>
                  <td className="px-4 py-2 border">{row.gap}</td>
                  <td className="px-4 py-2 border">{row.predicted}</td>
                  <td className="px-4 py-2 border">{row.pipeline}</td>
                  <td className="px-4 py-2 border">{row.committed}</td>
                  <td className="px-4 py-2 border">{row.bestCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deal Quantity Table */}
      <div className="p-4 ">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Deal Quantity</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Period</th>
                <th className="px-4 py-2 border">Target</th>
                <th className="px-4 py-2 border">Achievement</th>
                <th className="px-4 py-2 border">Gap</th>
                <th className="px-4 py-2 border">Predicted Achievement</th>
                <th className="px-4 py-2 border">Pipeline</th>
                <th className="px-4 py-2 border">Committed</th>
                <th className="px-4 py-2 border">Best Case</th>
              </tr>
            </thead>
            <tbody>
              {dealQuantity.map((row, i) => (
                <tr key={i} className="text-center border-b hover:bg-gray-50">
                  <td className="px-4 py-2 border">{row.period}</td>
                  <td className="px-4 py-2 border">{row.target}</td>
                  <td className="px-4 py-2 border">{row.achievement}</td>
                  <td className="px-4 py-2 border">{row.gap}</td>
                  <td className="px-4 py-2 border">{row.predicted}</td>
                  <td className="px-4 py-2 border">{row.pipeline}</td>
                  <td className="px-4 py-2 border">{row.committed}</td>
                  <td className="px-4 py-2 border">{row.bestCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DealsOverview;
