'use client'

import { Button } from '@/components/ui/button'
import { useState, useRef } from 'react'

export default function ComposeEmailPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [emails, setEmails] = useState([])
  const [selected, setSelected] = useState([])

  // RICH TEXT BODY
  const editorRef = useRef(null)

  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value)
  }

  const resetForm = () => {
    setIsOpen(false)
    setTo('')
    setSubject('')
    if (editorRef.current) editorRef.current.innerHTML = ''
  }

  const handleSend = () => {
    const newEmail = {
      to,
      subject,
      body: editorRef.current.innerHTML, // SAVE RICH TEXT
      type: 'Sent',
      time: new Date().toLocaleString(),
    }
    setEmails([newEmail, ...emails])
    resetForm()
  }

  const handleSchedule = () => {
    const newEmail = {
      to,
      subject,
      body: editorRef.current.innerHTML,
      type: 'Scheduled',
      time: new Date().toLocaleString(),
    }
    setEmails([newEmail, ...emails])
    resetForm()
  }

  const toggleCheckbox = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index))
    } else {
      setSelected([...selected, index])
    }
  }

  const deleteSelectedRows = () => {
    setEmails((prev) => prev.filter((_, index) => !selected.includes(index)))
    setSelected([])
  }

  return (
    <div className="p-5 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between ">
        <p className="text-lg font-semibold">Emails</p>
        <Button onClick={() => setIsOpen(true)}>Compose Email</Button>
      </div>

      {/* DELETE BUTTON */}
      {selected.length > 0 && (
        <button
          className="mb-3 bg-red-600 text-white px-3 py-1 rounded "
          onClick={deleteSelectedRows}
        >
          Delete Selected ({selected.length})
        </button>
      )}

      {/* POPUP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 flex justify-center items-start pt-20 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 space-y-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>

            {/* To */}
            <div>
              <label className="block font-medium mb-1">To:</label>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter recipient email"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block font-medium mb-1">Subject:</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter subject"
              />
            </div>

            {/* ---------- RICH TEXT TOOLBAR ---------- */}
            <div className="border rounded bg-gray-50 p-2 flex flex-wrap gap-2">
              <button
                onClick={() => execCmd('bold')}
                className="px-2 py-1 border rounded"
              >
                B
              </button>
              <button
                onClick={() => execCmd('italic')}
                className="px-2 py-1 border rounded"
              >
                I
              </button>
              <button
                onClick={() => execCmd('underline')}
                className="px-2 py-1 border rounded"
              >
                U
              </button>

              <select
                className="border rounded px-2"
                onChange={(e) => execCmd('fontSize', e.target.value)}
              >
                <option value="3">Font Size</option>
                <option value="3">Normal</option>
                <option value="7">H1</option>
                <option value="6">H2</option>
                <option value="3">H3</option>
                <option value="2">H4</option>
                <option value="1">H5</option>
              </select>

              <button
                onClick={() => execCmd('justifyLeft')}
                className="px-2 border rounded"
              >
                Left
              </button>
              <button
                onClick={() => execCmd('justifyCenter')}
                className="px-2 border rounded"
              >
                Center
              </button>
              <button
                onClick={() => execCmd('justifyRight')}
                className="px-2 border rounded"
              >
                Right
              </button>

              <button
                onClick={() => execCmd('insertUnorderedList')}
                className="px-2 border rounded"
              >
                • List
              </button>
              <button
                onClick={() => execCmd('insertOrderedList')}
                className="px-2 border rounded"
              >
                1. List
              </button>

              <button
                onClick={() => {
                  const url = prompt('Enter image URL:')
                  if (url) execCmd('insertImage', url)
                }}
                className="px-2 border rounded"
              >
                Image
              </button>

              <button
                onClick={() => {
                  const url = prompt('Enter link URL:')
                  if (url) execCmd('createLink', url)
                }}
                className="px-2 border rounded"
              >
                Link
              </button>
            </div>

            {/* --------- RICH TEXT EDITOR AREA ---------- */}
            <div
              ref={editorRef}
              contentEditable
              className="w-full border rounded px-3 py-3 min-h-[200px] focus:ring-2 focus:ring-blue-400 whitespace-pre-wrap break-words"
              data-placeholder="Write your email here..."
            ></div>

            BUTTONS
            <div className="flex space-x-3">
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Send
              </button>

              <button
                onClick={handleSchedule}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EMAIL TABLE */}
      <table className="w-full border-t mt-2">
        {emails.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan="4" className="text-center py-2 text-gray-500">
                No emails sent or scheduled yet.
              </td>
            </tr>
          </tbody>
        ) : (
          <>
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-2 border text-center w-8">✓</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Description</th>
              </tr>
            </thead>

            <tbody>
              {emails.map((email, idx) => (
                <tr key={idx} className="border bg-gray-50">
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(idx)}
                      onChange={() => toggleCheckbox(idx)}
                    />
                  </td>

                  <td className="border px-4 py-2">{email.to}</td>
                  <td className="border px-4 py-2">{email.subject}</td>

                  {/* RENDER RICH HTML */}
                  <td
                    className="border px-4 py-2"
                    dangerouslySetInnerHTML={{ __html: email.body }}
                  />
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  )
}
