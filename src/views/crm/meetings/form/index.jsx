"use client";

import { useState, useEffect } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";

export default function MeetingForm() {
  const [formData, setFormData] = useState({
    title: "New Meeting",
    meetingVenue: "",
    location: "",
    allDay: false,
    fromDate: "",
    fromTime: "",
    toDate: "",
    toTime: "",
    host: "",
    participants: "",
    relatedTo: "",
    repeat: "",
    reminder: "",
  });

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    now.setHours(17, 0, 0, 0);
    tomorrow.setHours(18, 0, 0, 0);

    const formatDate = (date) => date.toISOString().split("T")[0];
    const formatTime = (date) => date.toTimeString().slice(0, 5);

    setFormData((prev) => ({
      ...prev,
      fromDate: formatDate(now),
      fromTime: formatTime(now),
      toDate: formatDate(tomorrow),
      toTime: formatTime(tomorrow),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Meeting Data:", formData);
    alert("✅ Meeting Saved Successfully!");
    // reset form if needed
  };

  return (
    <div className="bg-white  rounded min-h-screen space-y-4">
      <h2 className="text-2xl font-semibold mb-4 p-6">Meeting Information</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 p-6">
          <HrInput
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Meeting Title"
            label="Title"
          />

          <HrSelect
            name="meetingVenue"
            value={formData.meetingVenue}
            onChange={handleChange}
            options={[
              { value: "Client location", label: "Client location" },
              { value: "In-Office", label: "In-Office" },
              { value: "Online", label: "Online" },
            ]}
            label="Meeting Venue"
          />

          <HrInput
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            label="Location"
          />

          <div className="flex items-center gap-2">
            <label className="w-40 text-gray-600">All Day</label>
            <input
              type="checkbox"
              name="allDay"
              checked={formData.allDay}
              onChange={handleChange}
              className="w-5 h-5 accent-blue-600"
            />
          </div>

          <HrInput
            name="fromDate"
            type="date"
            value={formData.fromDate}
            onChange={handleChange}
            label="From Date"
          />
          {!formData.allDay && (
            <HrInput
              name="fromTime"
              type="time"
              value={formData.fromTime}
              onChange={handleChange}
              label="From Time"
            />
          )}

          <HrInput
            name="toDate"
            type="date"
            value={formData.toDate}
            onChange={handleChange}
            label="To Date"
          />
          {!formData.allDay && (
            <HrInput
              name="toTime"
              type="time"
              value={formData.toTime}
              onChange={handleChange}
              label="To Time"
            />
          )}

          <HrInput
            name="host"
            value={formData.host}
            onChange={handleChange}
            placeholder="Enter host name"
            label="Host"
          />

          <HrInput
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            placeholder="Enter participants"
            label="Participants"
          />

          <HrSelect
            name="relatedTo"
            value={formData.relatedTo}
            onChange={handleChange}
            options={[
              { value: "Lead", label: "Lead" },
              { value: "Contact", label: "Contact" },
              { value: "Deal", label: "Deal" },
            ]}
            label="Related To"
          />

          <HrSelect
            name="repeat"
            value={formData.repeat}
            onChange={handleChange}
            options={[
              { value: "None", label: "None" },
              { value: "Daily", label: "Daily" },
              { value: "Weekly", label: "Weekly" },
              { value: "Monthly", label: "Monthly" },
            ]}
            label="Repeat"
          />

          <HrSelect
            name="reminder"
            value={formData.reminder}
            onChange={handleChange}
            options={[
              { value: "None", label: "None" },
              { value: "15 min before", label: "15 min before" },
              { value: "30 min before", label: "30 min before" },
              { value: "1 hour before", label: "1 hour before" },
            ]}
            label="Participants Reminder"
          />
        </div>

        <div className="flex fixed bottom-0 w-[82%] items-center shadow-lg h-12 bg-gray-200 rounded px-6 z-50">
          <Button type="submit">Save Meeting</Button>
        </div>
      </form>
    </div>
  );
}
