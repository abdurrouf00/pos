"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function NewProjectForm() {
  const [form, setForm] = useState({
    projectName: "",
    projectCode: "",
    customerName: "",
    billingMethod: "",
    description: "",
    costBudget: "",
    revenueBudget: "",
    watchlist: false,
  });

  const [users, setUsers] = useState([{ user: "", email: "" }]);
  const [tasks, setTasks] = useState([{ taskName: "", description: "", billable: false }]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleUserChange = (index, field, value) => {
    const updated = [...users];
    updated[index][field] = value;
    setUsers(updated);
  };
  const addUser = () => setUsers([...users, { user: "", email: "" }]);
  const removeUser = (index) => setUsers(users.filter((_, i) => i !== index));

  const handleTaskChange = (index, field, value) => {
    const updated = [...tasks];
    updated[index][field] = value;
    setTasks(updated);
  };
  const addTask = () => setTasks([...tasks, { taskName: "", description: "", billable: false }]);
  const removeTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.projectName || !form.customerName) {
      return;
    }

    const newProject = { ...form, users, tasks, id: Date.now() };
    const stored = JSON.parse(localStorage.getItem("projects") || "[]");
    localStorage.setItem("projects", JSON.stringify([...stored, newProject]));


    // Reset form
    setForm({
      projectName: "",
      projectCode: "",
      customerName: "",
      billingMethod: "",
      description: "",
      costBudget: "",
      revenueBudget: "",
      watchlist: false,
    });
    setUsers([{ user: "", email: "" }]);
    setTasks([{ taskName: "", description: "", billable: false }]);
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-20">
      <h2 className="text-xl font-bold mb-4">New Project Form</h2>
      <form onSubmit={handleSubmit} className="pt-5 w-full space-y-4 ">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
          <HrInput
            type="text"
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            placeholder="Enter Project Name"
            label="Project Name"
          />

          <HrInput
            type="text"
            name="projectCode"
            value={form.projectCode}
            onChange={handleChange}
            placeholder="Enter Project Code"
            label="Project Code"
          />
          <HrInput
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="Enter Customer Name"
            label="Customer Name"
          />

          <HrSelect
            name="billingMethod"
            value={form.billingMethod}
            onChange={handleChange}
            options={[
              { value: "", label: "Select" },
              { value: "hourly", label: "Hourly" },
              { value: "fixed", label: "Fixed" },
            ]}
            label="Billing Method"
          />
          {/* Budget */}
          <HrInput
            type="number"
            name="costBudget"
            value={form.costBudget}
            onChange={handleChange}
            label="Cost Budget (BDT)"
          />

          <HrInput
            type="number"
            name="revenueBudget"
            value={form.revenueBudget}
            onChange={handleChange}
            label="Revenue Budget (BDT)"
          />

          <HrInput
            type="textarea"
            name="description"
            value={form.description}
            onChange={handleChange}
            label="Description"
            className=" h-1" />
        </div>

        {/* Users Table */}
        <div className="border-b-1 pb-6">
          <h2 className="font-semibold mb-2">Users</h2>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">S.No</th>
                <th className="border p-2">User</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={idx}>
                  <td className="border p-2 text-center">{idx + 1}</td>
                  <td className="border p-2">
                    <HrInput
                      type="text"
                      value={u.user}
                      onChange={(e) => handleUserChange(idx, "user", e.target.value)}
                      placeholder="User Name"
                      className="w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <HrInput
                      type="email"
                      value={u.email}
                      onChange={(e) => handleUserChange(idx, "email", e.target.value)}
                      placeholder="Email"
                      className="w-full"
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <button type="button" onClick={() => removeUser(idx)} className="text-red-500">
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            type="button"
            onClick={addUser}
            className="mt-2 px-4 text-white rounded ">
            + Add User
          </Button>
        </div>

        {/* Tasks Table */}
        <div className="border-b-1 pb-6">
          <h2 className="font-semibold mb-2">Tasks</h2>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">S.No</th>
                <th className="border p-2">Task Name</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Billable</th>
                <th className="border p-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t, idx) => (
                <tr key={idx}>
                  <td className="border p-2 text-center">{idx + 1}</td>
                  <td className="border p-2">
                    <HrInput
                      type="text"
                      value={t.taskName}
                      onChange={(e) => handleTaskChange(idx, "taskName", e.target.value)}
                      placeholder="Task Name"
                      className="w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <HrInput
                      type="text"
                      value={t.description}
                      onChange={(e) => handleTaskChange(idx, "description", e.target.value)}
                      placeholder="Task Description"
                      className="w-full"
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <HrInput
                      type="checkbox"
                      checked={t.billable}
                      onChange={(e) => handleTaskChange(idx, "billable", e.target.checked)}
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <button type="button" onClick={() => removeTask(idx)} className="text-red-500">
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            type="button"
            onClick={addTask}
            className="mt-2 px-4  text-white rounded border-b-1">
            + Add Task
          </Button>
        </div>


        {/* Watchlist */}
        <div>
          <label className=" flex items-center gap-2 pt-6 pb-4">
            <input
              type="checkbox"
              name="watchlist"
              checked={form.watchlist}
              onChange={handleChange}
            />
            Add to the watchlist on my dashboard
          </label>
        </div>


        <div className="flex gap-4 mt-8 ">
          <Button type="submit" className=" text-white">Create Project</Button>
          <Link href="/dashboard/projects/" >
            <Button className="bg-red-400 text-white">  Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
