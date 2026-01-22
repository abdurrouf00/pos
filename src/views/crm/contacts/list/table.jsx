'use client'
import React, { useState } from 'react'
import leadsData from '@/tableData' // এখানে অবশ্যই contacts এর ডাটা হবে
import { useRouter } from 'next/navigation'

export default function ContactTable() {
  const router = useRouter()
  const [contacts, setContacts] = useState(leadsData)
  const [selectedRows, setSelectedRows] = useState([])

  const handleCheckboxChange = (e, index) => {
    e.stopPropagation()
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const handleDelete = () => {
    const updatedContacts = contacts.filter(
      (_, index) => !selectedRows.includes(index)
    )
    setContacts(updatedContacts)
    setSelectedRows([])
  }

  const handleRowClick = (contact) => {
    router.push(`/dashboard/contacts/contact-info?id=${contact.id}`)
  }

  return (
    <div className="p-4 pt-15">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Contact Table</h2>
        {selectedRows.length > 0 && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Selected ({selectedRows.length})
          </button>
        )}
      </div>

      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">✓</th>
            <th className="p-2 text-left">Contact Name</th>
            <th className="p-2 text-left">Account Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Company</th>
            <th className="p-2 text-left">Lead Owner</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => handleRowClick(contact)}
            >
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={(e) => handleCheckboxChange(e, index)}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td className="p-2">{contact.name}</td>
              <td className="p-2">{contact.account}</td>
              <td className="p-2">{contact.email}</td>
              <td className="p-2">{contact.phone}</td>
              <td className="p-2">{contact.company || contact.account}</td>
              <td className="p-2">{contact.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
