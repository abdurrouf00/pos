'use client'

import { useState } from 'react'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'

export default function LogCallForm() {
  const now = new Date()
  now.setHours(17, 30, 0, 0)
  const formattedDateTime = now.toISOString().slice(0, 16)

  const [formData, setFormData] = useState({
    callFor: '',
    relatedTo: '',
    callType: '',
    callStatus: '',
    startTime: formattedDateTime,
    subject: '',
    voice: null,
    purpose: '',
    agenda: '',
    result: '',
    description: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  // handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // validation
    // if (!formData.callFor || !formData.relatedTo || !formData.callType || !formData.callStatus || !formData.subject) {
    //   setErrorMsg("Please fill all required fields.");
    //   return;
    // }

    // setErrorMsg("");

    // save to localStorage
    // const existingCalls = JSON.parse(localStorage.getItem("loggedCalls") || "[]");
    // const newCall = { ...formData, id: Date.now(), voiceFileName: formData.voice?.name || null };
    // localStorage.setItem("loggedCalls", JSON.stringify([...existingCalls, newCall]));

    alert('Call logged successfully!')
    console.log('Logged Call Data:', formData)

    // reset form
    setFormData({
      callFor: '',
      relatedTo: '',
      callType: '',
      callStatus: '',
      startTime: formattedDateTime,
      subject: '',
      voice: null,
      purpose: '',
      agenda: '',
      result: '',
      description: '',
    })
  }

  return (
    <div className="min-h-screen  bg-white p-8 w-full  items-center justify-center">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">Log a Call</h2>

      <form onSubmit={handleSubmit} className="space-y-4 w-[60%] ">
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
          label="Call Status"
          name="callStatus"
          value={formData.callStatus}
          onChange={handleChange}
          options={[
            { value: 'Completed', label: 'Completed' },
            { value: 'Missed', label: 'Missed' },
            { value: 'Cancelled', label: 'Cancelled' },
          ]}
        />

        <HrInput
          label="Call Start Time"
          name="startTime"
          type="datetime-local"
          value={formData.startTime}
          onChange={handleChange}
        />

        <HrInput
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Enter subject"
          required
        />

        <HrInput
          label="Voice Recording"
          name="voice"
          type="file"
          onChange={handleChange}
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
          placeholder="Agenda details"
        />

        <h3 className="font-semibold mt-6 text-gray-700">
          Outcome Of Outgoing Call
        </h3>

        <HrInput
          label="Call Result"
          name="result"
          value={formData.result}
          onChange={handleChange}
          placeholder="Outcome or remarks"
        />

        <div className="flex flex-col">
          <label className="mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="border rounded-lg p-2"
            placeholder="Enter additional details..."
          />
        </div>

        <div className="text-right mt-6">
          <Button type="submit">Log Call</Button>
        </div>
      </form>
    </div>
  )
}
