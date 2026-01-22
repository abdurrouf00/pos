"use client";
import { useState, useRef, useEffect } from "react";

import TaskForm from "@/views/crm/tasks/form/index";
import MeetingForm from "@/views/crm/meetings/form/index";
import CallForm from "@/views/crm/calls/logCall";
import ScheduleCallForm from "@/views/crm/calls/scheduleCall";
import CallLogForm from "@/views/crm/calls/logCall";
import { Button } from "@/components/ui/button";

export default function OpenActivities() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [openForm, setOpenForm] = useState(null);
  const [activities, setActivities] = useState([]);

  const dropdownRef = useRef(null);

  // ===== CLOSE DROPDOWN ON OUTSIDE CLICK =====
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // save activity
  const handleActivitySubmit = (type, data) => {
    setActivities((prev) => [...prev, { type, ...data }]);
    setOpenForm(null);
  };

  return (
    <div className="relative p-3 border rounded-xl bg-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold mb-3">Open Activities</h2>

        <Button
          onClick={() => setShowDropdown(!showDropdown)}
          
        >
          New Add
        </Button>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-6 top-14 bg-white border shadow-lg rounded-md z-20 w-40"
        >
          <div className="p-3 hover:bg-gray-100 cursor-pointer">
            <p className="font-medium" onClick={() => setOpenForm("call")}>
              Call
            </p>

            <div className="pl-4 text-sm space-y-1 mt-1">
              <p className="hover:underline cursor-pointer" onClick={() => setOpenForm("schedulecall")}>
                Schedule Call
              </p>
              <p className="hover:underline cursor-pointer" onClick={() => setOpenForm("calllog")}>
                Call Log
              </p>
            </div>
          </div>

          <p className="p-3 hover:bg-gray-100 cursor-pointer" onClick={() => setOpenForm("meeting")}>
            Meeting
          </p>

          <p className="p-3 hover:bg-gray-100 cursor-pointer" onClick={() => setOpenForm("task")}>
            Task
          </p>
        </div>
      )}

      {/* Popup Modal */}
      {openForm && (
        <Popup onClose={() => setOpenForm(null)}>
          {openForm === "call" && (
            <CallForm onSubmit={(data) => handleActivitySubmit("Call", data)} />
          )}
          {openForm === "schedulecall" && (
            <ScheduleCallForm
              onSubmit={(data) => handleActivitySubmit("Schedule Call", data)}
            />
          )}
          {openForm === "calllog" && (
            <CallLogForm
              onSubmit={(data) => handleActivitySubmit("Call Log", data)}
            />
          )}
          {openForm === "meeting" && (
            <MeetingForm
              onSubmit={(data) => handleActivitySubmit("Meeting", data)}
            />
          )}
          {openForm === "task" && (
            <TaskForm onSubmit={(data) => handleActivitySubmit("Task", data)} />
          )}
        </Popup>
      )}

       <div className="pt-3 space-y-3 border-t">
        {activities.length === 0 ? (
          <p className="text-gray-500">No activities added yet.</p>
        ) : (
          activities.map((item, inx) => (
            <div
              key={inx}
              className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.type}</p>
                <p className="text-sm text-gray-600">
                  {JSON.stringify(item)}
                </p>
              </div>
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
      onClick={onClose} // BACKDROP CLICK CLOSE
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] p-6 relative overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // STOP INSIDE CLICK
      >
        <button
          className="absolute top-7 right-2 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
