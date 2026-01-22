import React from "react";
export default function PersonalInfo() {
  return (
    <div className="">
      <label htmlFor="notes" className="block mb-2 text-sm text-gray-700">
        Remarks (For Internal Use)
      </label>
      <textarea
        id="notes"
        rows={5}
        className="w-full border rounded p-2 text-gray-700 text-sm"
        placeholder="Type your notes here..."
      />
    </div>
  );
}