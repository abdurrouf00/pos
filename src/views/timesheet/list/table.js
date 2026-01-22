"use client";

import { useEffect, useState } from "react";

export default function LogsTable() {
  const [logs, setLogs] = useState([]);
  const [selected, setSelected] = useState([]);

  const loadLogs = () => {
    const stored = JSON.parse(localStorage.getItem("logs") || "[]");
    setLogs(stored);
  };

  useEffect(() => {
    loadLogs();
    const interval = setInterval(loadLogs, 1000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  const handleCheckbox = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleDelete = () => {
    const updated = logs.filter((log) => !selected.includes(log.id));
    localStorage.setItem("logs", JSON.stringify(updated));
    setSelected([]);
    setLogs(updated);
  };

  // if (logs.length === 0) return <p>No log entries found.</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Logs List</h2>

      {selected.length > 0 && (
        <button onClick={handleDelete} className="mb-3 px-3 py-1 bg-red-500 text-white rounded">
          Delete Selected
        </button>
      )}

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">✓</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Project</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Task</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Billable</th>


          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="border p-2 text-center">
                <input type="checkbox" checked={selected.includes(log.id)} onChange={() => handleCheckbox(log.id)} />
              </td>
              <td className="border p-2">{log.date}</td>
              <td className="border p-2">{log.projectName}</td>
              <td className="border p-2">{log.user}</td>
              <td className="border p-2">{log.taskName}</td>
              <td className="border p-2">{log.timeSpent}</td>
              <td className="border p-2 text-center">{log.billable ? "Paied" : "Unpaid"}</td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
