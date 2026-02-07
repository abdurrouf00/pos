'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import HrInput from '@/components/common/HrInput'
import { Button } from '@/components/ui/button'
import { initialContactPerson } from './index'
import HrSwitch from '@/components/common/HrSwitch'

export default function ContactPerson({ contactPersons, setContactPersons }) {
  const handleChange = (index, e) => {
    const { name, value } = e.target
    const updatedRows = [...contactPersons]
    updatedRows[index][name] = value
    setContactPersons(updatedRows)
  }

  const addRow = () => {
    setContactPersons([...contactPersons, { ...initialContactPerson }])
  }

  const removeRow = index => {
    const updatedRows = [...contactPersons]
    updatedRows.splice(index, 1)
    setContactPersons(updatedRows)
  }

  return (
    <div className=" bg-white space-y-4">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border text-sm p-2">First Name</th>
            <th className="border text-sm p-2">Last Name</th>
            <th className="border text-sm p-2">Email Address</th>
            <th className="border text-sm p-2">Work Phone</th>
            <th className="border text-sm p-2">Designation</th>
            <th className="border text-sm p-2">Department</th>
            <th className="border text-sm p-2">Is Primary</th>
            <th className="border text-sm p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {contactPersons.map((row, index) => (
            <tr key={index}>
              <td className="border p-1">
                <HrInput
                  name="first_name"
                  value={row.first_name}
                  onChange={e => handleChange(index, e)}
                  className="w-full"
                />
              </td>
              <td className="border p-1">
                <HrInput
                  name="last_name"
                  value={row.last_name}
                  onChange={e => handleChange(index, e)}
                  className="w-full"
                />
              </td>
              <td className="border p-1">
                <HrInput
                  name="email"
                  type="email"
                  value={row.email}
                  onChange={e => handleChange(index, e)}
                  className="w-full"
                />
              </td>
              <td className="border p-1">
                <HrInput
                  name="work_phone"
                  value={row.work_phone}
                  onChange={e => handleChange(index, e)}
                  className="w-full"
                />
              </td>
              {/* <td className="border p-1">
                <HrInput
                  name="mobile"
                  value={row.mobile}
                  onChange={e => handleChange(index, e)}
                  className="w-full"
                />
              </td>
              <td className="border p-1">
                <HrInput
                  name="skype"
                  value={row.skype}
                  onChange={e => handleChange(index, e)}
                  className="w-full"
                />
              </td> */}
              <td className="border p-1">
                <HrInput
                  name="designation"
                  value={row.designation}
                  onChange={e => handleChange(index, e)}
                  className="w-full"
                />
              </td>

              <td className="border p-1">
                <HrInput
                  name="department"
                  value={row.department}
                  onChange={e => handleChange(index, e)}
                  className="w-full"
                />
              </td>
              <td className="border p-1 text-center">
                <HrSwitch
                  name="is_primary"
                  checked={row.is_primary === 1}
                  value={row.is_primary}
                  onChange={checked => {
                    handleChange(index, {
                      target: { name: 'is_primary', value: checked ? 1 : 0 },
                    })
                  }}
                  className="w-full"
                />
              </td>
              <td className="border p-1 text-center">
                <Button
                  onClick={() => removeRow(index)}
                  className="bg-white hover:bg-white cursor-pointer"
                >
                  <Trash2 className="text-red-700" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={addRow}>
        <Plus />
      </Button>
    </div>
  )
}
