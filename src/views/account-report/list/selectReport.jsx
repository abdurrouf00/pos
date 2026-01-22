"use client";
import React, { useState, useEffect } from "react";
import dataJson from "../jsonFolder/listData.json";

export default function ModuleSelect() {
  const [parent, setParent] = useState("");
  const [child, setChild] = useState("");
  const [subChild, setSubChild] = useState("");

  const [childOptions, setChildOptions] = useState([]);
  const [subChildOptions, setSubChildOptions] = useState([]);

  // if selected Parent  then child options 
  useEffect(() => {
    if (parent) {
      const selected = dataJson.find((item) => item.name === parent);
      setChildOptions(selected?.children || []);
      setChild("");
      setSubChild("");
      setSubChildOptions([]);
    }
  }, [parent]);

  // if selected Child then sub-child options 
  useEffect(() => {
    if (child) {
      const selectedChild = childOptions.find((c) => c.name === child);
      setSubChildOptions(selectedChild?.children || []);
      setSubChild("");
    }
  }, [child]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
         Module Selector
      </h2>

      {/* Parent Select */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Parent Module</label>
        <select
          className="w-full p-2 border rounded-md"
          value={parent}
          onChange={(e) => setParent(e.target.value)}
        >
          <option value="">-- Select Parent --</option>
          {dataJson.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Child Select */}
      {childOptions.length > 0 && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Child Module</label>
          <select
            className="w-full p-2 border rounded-md"
            value={child}
            onChange={(e) => setChild(e.target.value)}
          >
            <option value="">-- Select Child --</option>
            {childOptions.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Sub-child Select */}
      {subChildOptions.length > 0 && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Sub-child Module</label>
          <select
            className="w-full p-2 border rounded-md"
            value={subChild}
            onChange={(e) => setSubChild(e.target.value)}
          >
            <option value="">-- Select Sub-child --</option>
            {subChildOptions.map((sc) => (
              <option key={sc.name} value={sc.name}>
                {sc.name}
              </option>
            ))}
          </select>
        </div>
      )}

      
     
    </div>
  );
}
