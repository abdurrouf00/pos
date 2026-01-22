'use client'

import { useState } from 'react'
import CampaignData from '@/tableData.json'
import { Button } from '@/components/ui/button'

export default function Campaignselector() {
  const [open, setOpen] = useState(false)
  const [selectedCampaigns, setSelectedCampaigns] = useState([])
  const [tempSelected, setTempSelected] = useState([]) // popup checkbox
  const [selected, setSelected] = useState([]) // selected rows for delete

  // Popup checkbox toggle
  const toggleCheckbox = (Campaign) => {
    setTempSelected((prev) =>
      prev.some((p) => p.id === Campaign.id)
        ? prev.filter((p) => p.id !== Campaign.id)
        : [...prev, Campaign]
    )
  }

  // Add popup selected Campaigns into main table
  const addSelectedCampaigns = () => {
    setSelectedCampaigns((prev) => [...prev, ...tempSelected])
    setTempSelected([])
    setOpen(false)
  }

  // Selected table checkbox toggle
  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  // Delete selected rows
  const deleteSelectedRows = () => {
    setSelectedCampaigns((prev) =>
      prev.filter((_, index) => !selected.includes(index))
    )
    setSelected([])
  }

  return (
    <div className="p-4 border rounded-md bg-white shadow-md">
      {/* HEADER */}
      <div className="flex mb-2 items-center justify-between ">
        <h2 className="text-lg font-semibold mb-3">Campaigns</h2>

        <Button onClick={() => setOpen(true)}>Add Campaign</Button>
      </div>

      {/* DELETE BUTTON (only when rows selected) */}
      {selected.length > 0 && (
        <button
          className="mb-3 bg-red-600 text-white px-3 py-1 rounded"
          onClick={deleteSelectedRows}
        >
          Delete Selected
        </button>
      )}

      {/* MAIN TABLE */}
      {selectedCampaigns.length === 0 ? (
        <div className="border-t text-center text-gray-600  p-2">
          No Campaigns selected
        </div>
      ) : (
        <table className="w-full border mt-3">
          <thead>
            <tr>
              <th className="p-2 border text-center">✓</th>
              <th className="border px-4 py-2">Campaign Name</th>
              <th className="border px-4 py-2">Company</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Owner</th>
            </tr>
          </thead>

          <tbody>
            {selectedCampaigns.map((p, index) => (
              <tr key={index}>
                <td className="p-2 border text-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(index)}
                    onChange={() => handleCheckbox(index)}
                  />
                </td>

                <td className="border px-4 py-2">{p.name}</td>
                <td className="border px-4 py-2">{p.company}</td>
                <td className="border px-4 py-2">{p.phone}</td>
                <td className="border px-4 py-2">{p.email}</td>
                <td className="border px-4 py-2">{p.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* POPUP / MODAL */}
      {open && (
        <div className="fixed  items-center top-0 bg-black/0 flex  justify-center z-50">
          <div className="bg-white w-4xl rounded-xl shadow-lg p-5 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Select Campaigns</h2>

            <table className="w-full border">
              <thead>
                <tr>
                  <th className="border px-4 py-2"></th>
                  <th className="border px-4 py-2">Campaign Name</th>
                  <th className="border px-4 py-2">Company</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Owner</th>
                </tr>
              </thead>

              <tbody>
                {CampaignData.map((Campaign, i) => (
                  <tr key={i}>
                    <td className="border px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={tempSelected.some((p) => p.id === Campaign.id)}
                        onChange={() => toggleCheckbox(Campaign)}
                      />
                    </td>
                    <td className="border px-4 py-2">{Campaign.name}</td>
                    <td className="border px-4 py-2">{Campaign.company}</td>
                    <td className="border px-4 py-2">{Campaign.phone}</td>
                    <td className="border px-4 py-2">{Campaign.email}</td>
                    <td className="border px-4 py-2">{Campaign.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end gap-3 mt-4">
              <Button
                className="bg-gray-400 "
                onClick={() => {
                  setTempSelected([])
                  setOpen(false)
                }}
              >
                Cancel
              </Button>

              <Button onClick={addSelectedCampaigns}>Add</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
