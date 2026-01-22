"use client";

import { useEffect, useState } from "react";

export default function ProjectsTable() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState([]);

  const loadProjects = () => {
    const stored = JSON.parse(localStorage.getItem("projects") || "[]");
    setProjects(stored);
  };

  useEffect(() => {
    loadProjects();
    const interval = setInterval(loadProjects, 1000); // auto-refresh every 1 sec
    return () => clearInterval(interval);
  }, []);

  // if (projects.length === 0) return <p className="text-gray-500">No projects found.</p>;

  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Delete selected projects
  const handleDeleteSelected = () => {
    const updated = projects.filter((_, index) => !selected.includes(index));
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
    setSelected([]);
  };

  // Delete single project
  const handleDeleteSingle = (id) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
    setSelected((prev) => prev.filter((index) => projects[index].id !== id));
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Projects List</h2>

      {selected.length > 0 && (
        <button
          onClick={handleDeleteSelected}
          className="mb-3 px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete Selected
        </button>
      )}

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">✓</th>
            <th className="border p-2">Project Name</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Billing</th>
            <th className="border p-2">Users</th>
            <th className="border p-2">Tasks</th>
            <th className="border p-2">Watchlist</th>

          </tr>
        </thead>
        <tbody>
          {projects.map((p, index) => (
            <tr key={p.id}>
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={selected.includes(index)}
                  onChange={() => handleCheckbox(index)}
                />
              </td>
              <td className="border p-2">{p.projectName}</td>
              <td className="border p-2">{p.customerName}</td>
              <td className="border p-2">{p.billingMethod}</td>
              <td className="border p-2">{p.users.map(u => u.user).join(", ")}</td>
              <td className="border p-2">{p.tasks.map(t => t.taskName).join(", ")}</td>
              <td className="border p-2 text-center">{p.watchlist ? "✅" : "❌"}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
