'use client'
import React, { useState, useEffect } from 'react'
import TableData from '@/tableData' // অথবা localStorage থেকে লোড করতে পারো
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LeadTable() {
  const [table, setTable] = useState([])
  const [selected, setSelected] = useState([])
  const [showButtons, setShowButtons] = useState(false) // CallLog & ScheduleCall button visibility

  useEffect(() => {
    // localStorage থেকে লোড
    const saved = JSON.parse(localStorage.getItem('leads') || '[]')
    setTable(saved.length ? saved : TableData)
  }, [])

  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete selected rows?')) return
    const updated = table.filter((_, index) => !selected.includes(index))
    setTable(updated)
    localStorage.setItem('leads', JSON.stringify(updated))
    setSelected([])
  }

  return (
    <div className="p-6 pt-5 bg-gray-50 min-h-screen">
      {/* Create Call Button and Toggle */}
      <div className=" flex mb-5 justify-end ">
        <Button onClick={() => setShowButtons(!showButtons)}>
          Create Call
        </Button>
        {showButtons && (
          <>
            <Link href="/dashboard/calls/callLog">
              <Button className="ml-2">Log a Call</Button>
            </Link>
            <Link href="/dashboard/calls/sediulCall">
              <Button className="ml-2">Schedule a Call</Button>
            </Link>
          </>
        )}
      </div>

      {/* Delete Selected Button */}
      {selected.length > 0 && (
        <button
          onClick={handleDelete}
          className="mb-3 px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete Selected ({selected.length})
        </button>
      )}

      {/* Table */}
      {table.length === 0 ? (
        <p className="p-6 text-center text-gray-500">No leads available.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border text-center">
                  <input
                    type="checkbox"
                    checked={
                      selected.length === table.length && table.length > 0
                    }
                    onChange={() => {
                      if (selected.length === table.length) setSelected([])
                      else setSelected(table.map((_, i) => i))
                    }}
                  />
                </th>
                <th className="p-2 border">Subject</th>
                <th className="p-2 border">Call Type</th>
                <th className="p-2 border">Call Start Time</th>
                <th className="p-2 border">Call Duration</th>
                <th className="p-2 border">Related To</th>
                <th className="p-2 border">Contact Name</th>
                <th className="p-2 border">Call Owner</th>
              </tr>
            </thead>
            <tbody>
              {table.map((lead, idx) => (
                <tr key={lead.id || idx} className="border-b hover:bg-gray-100">
                  <td className="p-2 border text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(idx)}
                      onChange={() => handleCheckbox(idx)}
                    />
                  </td>
                  <td className="p-2 border">{lead.name}</td>
                  <td className="p-2 border">{lead.calltype}</td>
                  <td className="p-2 border">{lead.from}</td>
                  <td className="p-2 border">{lead.duration}</td>
                  <td className="p-2 border">{lead.dealName}</td>
                  <td className="p-2 border">{lead.contact}</td>
                  <td className="p-2 border">{lead.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
