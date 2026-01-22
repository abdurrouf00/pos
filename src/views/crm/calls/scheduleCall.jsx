'use client'

import { useState } from 'react'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'

export default function ScheduleCallForm() {
  const [formData, setFormData] = useState({
    callFor: '',
    relatedTo: '',
    callType: '',
    callStatus: '',
    owner: '',
    subject: '',
    reminder: '',
    purpose: '',
    agenda: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    // if (!formData.callFor || !formData.relatedTo || !formData.callType || !formData.callStatus || !formData.owner || !formData.subject) {
    //   setErrorMsg("Please fill all required fields.");
    //   return;
    // }

    alert('Call Scheduled Successfully!')
    console.log(formData)

    // Reset form
    setFormData({
      callFor: '',
      relatedTo: '',
      callType: '',
      callStatus: '',
      owner: '',
      subject: '',
      reminder: '',
      purpose: '',
      agenda: '',
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="bg-white  w-full  p-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">
          Schedule a Call
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 w-[60%]">
          <h3 className="font-semibold text-gray-700">Call Information</h3>

          <HrInput
            label="Call For"
            name="callFor"
            value={formData.callFor}
            onChange={handleChange}
            placeholder="Enter person or account"
            required
          />

          <HrSelect
            label="Related To"
            name="relatedTo"
            value={formData.relatedTo}
            onChange={handleChange}
            options={[
              { value: 'Lead', label: 'Lead' },
              { value: 'Contact', label: 'Contact' },
              { value: 'Deal', label: 'Deal' },
            ]}
          />

          <HrSelect
            label="Call Type"
            name="callType"
            value={formData.callType}
            onChange={handleChange}
            options={[
              { value: 'Outgoing', label: 'Outgoing' },
              { value: 'Incoming', label: 'Incoming' },
            ]}
          />

          <HrSelect
            label="Outgoing Call Status"
            name="callStatus"
            value={formData.callStatus}
            onChange={handleChange}
            options={[
              { value: 'Scheduled', label: 'Scheduled' },
              { value: 'Pending', label: 'Pending' },
            ]}
          />

          <HrInput
            label="Call Owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
          />

          <HrInput
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            label="Subject"
            placeholder="Enter subject"
          />

          <HrSelect
            label="Reminder"
            name="reminder"
            value={formData.reminder}
            onChange={handleChange}
            options={[
              { value: 'None', label: 'None' },
              { value: '15 min before', label: '15 min before' },
              { value: '30 min before', label: '30 min before' },
              { value: '1 hour before', label: '1 hour before' },
            ]}
          />

          <h3 className="font-semibold mt-6 text-gray-700">
            Purpose Of Outgoing Call
          </h3>

          <HrInput
            label="Call Purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Purpose of call"
          />

          <HrInput
            label="Call Agenda"
            name="agenda"
            value={formData.agenda}
            onChange={handleChange}
            placeholder="Call agenda details"
          />

          <div className="text-right mt-6">
            <Button type="submit">Schedule Call</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
