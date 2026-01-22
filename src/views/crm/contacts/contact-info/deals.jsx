"use client";
import { useState, useRef, useEffect } from "react";

import DealForm from "@/views/crm/deals/form/index";
import { Button } from "@/components/ui/button";

export default function OpenActivities() {
  const [openForm, setOpenForm] = useState(null);
  const [activities, setActivities] = useState([]);

  // save activity
  const handleActivitySubmit = (type, data) => {
    setActivities((prev) => [...prev, { type, ...data }]);
    setOpenForm(null);
  };

  return (
    <div className="relative p-3 border rounded-xl bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Add New Deals</h2>

        <Button onClick={() => setOpenForm("task")}>
          New Deal
        </Button>
      </div>

      {/* Popup Modal */}
      {openForm && (
        <Popup onClose={() => setOpenForm(null)}>
          {openForm === "task" && (
            <DealForm
              onSubmit={(data) => handleActivitySubmit("Task", data)}
            />
          )}

          {openForm === "deals" && (
            <DealForm
              onSubmit={(data) => handleActivitySubmit("Deals", data)}
            />
          )}
        </Popup>
      )}

      {/* Activities List */}
      <div className="pt-3 space-y-3 border-t">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center">No activities added yet.</p>
        ) : (
          activities.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-gray-50"
            >
              <p className="font-semibold">{item.type}</p>
              <p className="text-sm text-gray-600">
                {JSON.stringify(item)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ---------- Popup Component ---------- */
function Popup({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] p-6 relative overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
      >
        <button
          className="absolute top-4 right-4 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
