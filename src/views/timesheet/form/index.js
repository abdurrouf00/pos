"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import { Button } from "@/components/ui/button";

import Link from "next/link";

const today = new Date().toISOString().split("T")[0];

export default function NewLogEntryForm() {
  const [form, setForm] = useState({
    date: today,
    projectName: "",
    customerName: "",
    taskName: "",
    user: "",
    timeSpent: "",
    billable: false,
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (!form.date || !form.projectName || !form.taskName || !form.user || !form.timeSpent) {
      return;
    }

    const prevLogs = JSON.parse(localStorage.getItem("logs") || "[]");
    const newLog = { ...form, id: Date.now() };
    localStorage.setItem("logs", JSON.stringify([...prevLogs, newLog]));

    // Reset form
    setForm({ ...form, projectName: "", customerName: "", taskName: "", user: "", timeSpent: "", billable: false, notes: "" });
  };

  return (
    <div className=" pb-20 ">

      <form onSubmit={handleSubmit} >
        <div className="p-10 bg-white space-y-4 container mx-auto  rounded-2xl">

          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="billable"
              checked={form.billable}
              onChange={handleChange}
            />
            <span>Billable</span>
          </div>

          <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
            <HrInput
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              label="Date"
            />
            <HrInput
              type="text"
              name="projectName"
              value={form.projectName}
              onChange={handleChange}
              placeholder="Project Name"
              label="Project Name"
            />
            <HrInput
              type="text"
              name="taskName"
              value={form.taskName}
              onChange={handleChange}
              placeholder="Task Name"
              label="Task Name"
            />
            <HrInput
              type="text" name="user"
              value={form.user}
              onChange={handleChange}
              placeholder="User Name"
              label="User"
            />
            <HrInput
              type="number"
              name="timeSpent"
              value={form.timeSpent}
              onChange={handleChange}
              placeholder="Time Spent"
              label="Time Spent (hours)"
            />


            <HrInput
              type="textarea"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Notes"
              label="Notes"
              className="h-20"
            />
          </div>
          <div className="col-span-2 gap-4 flex">
            <Button type="submit">Add Log</Button>
            <Link href="/dashboard/timesheet/" >
              <Button className="bg-red-400 text-white"> Cancel</Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
