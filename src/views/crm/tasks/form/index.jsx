'use client'

import { useState } from 'react'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'

export default function ContactCreateForm() {
  const [formData, setFormData] = useState({
    taskOwner: '',
    subject: '',
    dueDate: '',
    contact: '',
    status: '',
    priority: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact Data:', formData)
    alert('Contact Created Successfully ✅')
    // reset form
    setFormData({
      taskOwner: '',
      subject: '',
      dueDate: '',
      contact: '',
      status: '',
      priority: '',
      description: '',
    })
  }

  return (
    <div className="bg-white  rounded min-h-screen space-y-4">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4 p-6">Create Task</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 p-6">
          <HrInput
            name="taskOwner"
            value={formData.taskOwner}
            onChange={handleChange}
            placeholder="Enter Task Owner"
            label="Task Owner"
          />

          <HrSelect
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="-None-"
            options={[
              { value: '', label: '-None-' },
              { value: 'Email', label: 'Email' },
              { value: 'Call', label: 'Call' },
              { value: 'Meeting', label: 'Meeting' },
              { value: 'Sent Letter', label: 'Sent Letter' },
              { value: 'Product Demo', label: 'Product Demo' },
            ]}
            label="Subject"
          />

          <HrInput
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            label="Due Date"
          />

          <HrInput
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter Contact Name"
            label="Contact"
          />

          <HrSelect
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              { value: '', label: '-None-' },
              { value: 'Not Started', label: 'Not Started' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' },
              { value: 'Pending Input', label: 'Pending Input' },
            ]}
            label="Status"
          />

          <HrSelect
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={[
              { value: '', label: '-None-' },
              { value: 'Normal', label: 'Normal' },
              { value: 'High', label: 'High' },
              { value: 'Highest', label: 'Highest' },
              { value: 'Low', label: 'Low' },
              { value: 'Lowest', label: 'Lowest' },
            ]}
            label="Priority"
          />
        </div>

        {/* Description */}
        <div className='p-6'>
          <label className="block text-gray-600 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter description"
            className="w-full border rounded p-3"
          />
        </div>

        {/* Submit Button */}
        <div className="flex fixed bottom-0 w-[83%] items-center shadow-lg h-12 bg-gray-200 rounded px-6 z-50">
          <Button type="submit">Save Task</Button>
        </div>
      </form>
    </div>
  )
}
