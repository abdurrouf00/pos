// 'use client'

// import { useSearchParams } from 'next/navigation'
// import leadsData from '@/tableData'
// import { Twitter, Facebook } from 'lucide-react';
// import Link from 'next/link'

// import Deals from './deals'
// import AddNode from './node'
// import AddEmail from './email'
// import Campaign from './campaign'
// import Product from './product'
// import OpentActivites from './openActivities'
// import Attachments from './attachment';

// export default function LeadInfo() {
//   const params = useSearchParams()
//   const id = params.get('id')

//   const lead = leadsData.find((l) => String(l.id) === String(id))

//   if (!lead) return <div className="p-6 text-red-600">Lead not found!</div>

//   //  Delete Selected Files
//   const deleteSelectedFiles = () => {
//     if (selectedFiles.length === 0) {
//       alert('No files selected.')
//       return
//     }

//     if (!confirm(`Delete ${selectedFiles.length} selected file(s)?`)) return

//     setFolders((prev) =>
//       prev.map((folder) => ({
//         ...folder,
//         files: folder.files.filter((file) => !selectedFiles.includes(file.id)),
//       }))
//     )

//     setSelectedFiles([])
//   }

//   return (
//     <div className="">
//       <h2 className="text-2xl font-bold mb-6">contact Information</h2>

//       <div className="border  rounded-xl bg-gray-50 shadow-sm space-y-4 mb-7 p-6">
//         <div className="grid grid-cols-1 gap-y-4 gap-x-10">
//           <Field label="Name" value={lead.name} />
//           <Field label="Company" value={lead.company} />
//           <Field label="Email" value={lead.email} />
//           <Field label="Phone" value={lead.phone} />
//           <Field label="Lead Source" value={lead.source || '-'} />
//           <Field label="Mobile" value={lead.mobile || '-'} />
//         </div>
//       </div>

//       {/* MAIN CARD */}
//       <div className="border p-6 rounded-xl bg-gray-50 shadow-sm space-y-6">
//         {/* BASIC DETAILS */}
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">
//           Basic Details
//         </h3>

//         <div className="grid grid-cols-2 gap-y-4 gap-x-10">
//           <Field label="Name" value={lead.name} />
//           <Field label="Company" value={lead.company} />
//           <Field label="Email" value={lead.email} />
//           <Field label="Phone" value={lead.phone} />
//           <Field label="Mobile" value={lead.mobile || '-'} />
//           <Field label="Lead Source" value={lead.source || '-'} />
//           <Field label="Lead Owner" value={lead.owner} />
//           <Field label="First Name" value={lead.firstName || '-'} />
//           <Field label="Last Name" value={lead.lastName || '-'} />
//           <Field label="Title" value={lead.title || '-'} />
//           <Field label="Fax" value={lead.fax || '-'} />
//           <Field label="Website" value={lead.website || '-'} />
//           <Field label="Industry" value={lead.industry || '-'} />
//           <Field label="Lead Status" value={lead.status || '-'} />
//           <Field label="Annual Revenue" value={lead.total || ''} />
//           <Field label="No. of Employees" value={lead.employees || '-'} />
//           <Field label="Rating" value={lead.rating || '-'} />
//           <Field label="Email Opt Out" value={lead.optOut || '-'} />
//           <Field label="Skype ID" value={lead.skype || '-'} />
//           <Field label="Secondary Email" value={lead.secondaryEmail || '-'} />
//           <Field label="Twitter" value={lead.twitter || '-'} />
//         </div>

//         {/* ADDRESS SECTION */}
//         <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
//           Address Information
//         </h3>

//         <div className="grid grid-cols-2 gap-y-4 gap-x-10">
//           <Field label="Street" value={lead.street || '-'} />
//           <Field label="City" value={lead.city || '-'} />
//           <Field label="State" value={lead.state || '-'} />
//           <Field label="Zip Code" value={lead.zip || '-'} />
//           <Field label="Country" value={lead.country || '-'} />
//         </div>
//       </div>

//       <div className="space-y-6 mt-5">

//         <AddNode />
//         <OpentActivites />
//         <Deals/>
//         <Product />
//         <Attachments />
//         <AddEmail />
//         <Campaign />

//         <div className=" bg-white rounded-xl shadow-sm  ">
//           <p className="p-5  border-b text-lg font-semibold ">Social </p>
//           <div className="bg-sky-50 w-80 h-90 ">
//             <Link
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <p className="cursor-pointer flex p-5 border-b">
//                <Twitter/> Associate Facebook
//               </p>
//             </Link>

//             <Link
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <p className="cursor-pointer  flex p-5 border-b">
//                <Facebook/> Associate Twitter
//               </p>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// /* Re--usable Field Component */
// function Field({ label, value }) {
//   return (
//     <div className="flex items-center gap-4">
//       <span className="font-semibold w-40 text-gray-700 text-right">
//         {label}:
//       </span>
//       <span className="text-gray-900">{value}</span>
//     </div>
//   )
// }

'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import leadsData from '@/tableData'
import { Twitter, Facebook } from 'lucide-react'
import Link from 'next/link'

import Deals from './deals'
import AddNode from './node'
import AddEmail from './email'
import Campaign from './campaign'
import Product from './product'
import OpentActivites from './openActivities'
import Attachments from './attachment'

import { Clock, Trash2, Plus, Minus, Paperclip, Calendar } from 'lucide-react'

// ---- Timeline Dummy Data ----
const timelineData = [
  {
    date: 'Nov 23, 2025',
    items: [
      {
        time: '10:20 AM',
        text: 'Lead Status was updated from blank value to Junk Lead',
        by: 'Admin',
        icon: Clock,
      },
    ],
  },
  {
    date: 'Nov 19, 2025',
    items: [
      { time: '10:02 AM', text: '1 Product removed', by: 'Admin', icon: Minus },
      { time: '09:57 AM', text: '1 Product added', by: 'Admin', icon: Plus },
      {
        time: '09:41 AM',
        text: 'Meeting deleted - New Meeting',
        by: 'Admin',
        icon: Trash2,
      },
      {
        time: '09:41 AM',
        text: 'Attachment deleted - Facebook',
        by: 'Admin',
        icon: Paperclip,
      },
      { time: '09:41 AM', text: '1 Product removed', by: 'Admin', icon: Minus },
      {
        time: '09:36 AM',
        text: 'Meeting added - New Meeting',
        by: 'Admin',
        icon: Calendar,
      },
    ],
  },
  {
    date: 'Nov 17, 2025',
    items: [
      { time: '10:39 AM', text: '1 Product added', by: 'Admin', icon: Plus },
      {
        time: '10:31 AM',
        text: 'Attachment added - Facebook',
        by: 'Admin',
        icon: Paperclip,
      },
    ],
  },
  {
    date: 'Nov 13, 2025',
    items: [
      { time: '12:51 PM', text: 'Lead Created', by: 'Admin', icon: Plus },
    ],
  },
]

// -------------------------------------------------------------------

export default function LeadInfo() {
  const params = useSearchParams()
  const id = params.get('id')
  const [activeTab, setActiveTab] = useState('overview')

  const lead = leadsData.find((l) => String(l.id) === String(id))
  if (!lead) return <div className="p-6 text-red-600">Lead not found!</div>

  return (
    <div className="bg-gray-100 pb-2">
      {/* ------------ TABS ---------------- */}
      <div className="flex gap-4 p-3">
        <div className="flex gap-4 border rounded-2xl bg-white">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1 font-semibold ${
              activeTab === 'overview'
                ? 'border border-blue-300 bg-indigo-100 rounded-2xl'
                : 'text-gray-600 hover:bg-indigo-50 hover:rounded-2xl'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-1 font-semibold ${
              activeTab === 'timeline'
                ? 'border border-blue-300 bg-indigo-100 rounded-2xl'
                : 'text-gray-600 hover:bg-indigo-50 hover:rounded-2xl'
            }`}
          >
            Timeline
          </button>
        </div>
      </div>

      {/* ------------ OVERVIEW TAB ---------------- */}
      {activeTab === 'overview' && (
        <div className="">
          <div className="border rounded-xl bg-white shadow-sm space-y-4 mb-7 p-6">
            <div className="grid grid-cols-1 gap-y-4 gap-x-10">
              <Field label="Name" value={lead.name} />
              <Field label="Company" value={lead.company} />
              <Field label="Email" value={lead.email} />
              <Field label="Phone" value={lead.phone} />
              <Field label="Lead Source" value={lead.source || '-'} />
              <Field label="Mobile" value={lead.mobile || '-'} />
            </div>
          </div>

          {/* BASIC DETAILS */}
          <div className="border p-6 rounded-xl bg-white shadow-sm space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Basic Details
            </h3>

            <div className="grid grid-cols-2 gap-y-4 gap-x-10">
              <Field label="Name" value={lead.name} />
              <Field label="Company" value={lead.company} />
              <Field label="Email" value={lead.email} />
              <Field label="Phone" value={lead.phone} />
              <Field label="Mobile" value={lead.mobile || '-'} />
              <Field label="Lead Source" value={lead.source || '-'} />
              <Field label="Lead Owner" value={lead.owner} />
              <Field label="First Name" value={lead.firstName || '-'} />
              <Field label="Last Name" value={lead.lastName || '-'} />
              <Field label="Title" value={lead.title || '-'} />
              <Field label="Fax" value={lead.fax || '-'} />
              <Field label="Website" value={lead.website || '-'} />
              <Field label="Industry" value={lead.industry || '-'} />
              <Field label="Lead Status" value={lead.status || '-'} />
              <Field label="Annual Revenue" value={lead.total || ''} />
              <Field label="No. of Employees" value={lead.employees || '-'} />
              <Field label="Rating" value={lead.rating || '-'} />
              <Field label="Email Opt Out" value={lead.optOut || '-'} />
              <Field label="Skype ID" value={lead.skype || '-'} />
              <Field
                label="Secondary Email"
                value={lead.secondaryEmail || '-'}
              />
              <Field label="Twitter" value={lead.twitter || '-'} />
            </div>

            {/* ADDRESS */}
            <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
              Address Information
            </h3>

            <div className="grid grid-cols-2 gap-y-4 gap-x-10">
              <Field label="Street" value={lead.street || '-'} />
              <Field label="City" value={lead.city || '-'} />
              <Field label="State" value={lead.state || '-'} />
              <Field label="Zip Code" value={lead.zip || '-'} />
              <Field label="Country" value={lead.country || '-'} />
            </div>
          </div>

          {/* OTHER COMPONENTS */}
          <div className="space-y-6 mt-5">
            <AddNode />
            <OpentActivites />
            <Deals />
            <Product />
            <Attachments />
            <AddEmail />
            <Campaign />

            {/* SOCIAL */}
            <div className="bg-white rounded-xl shadow-sm">
              <p className="p-5 border-b text-lg font-semibold">Social</p>

            <div className="bg-sky-50 w-80 h-90">
                <Link href="https://facebook.com" target="_blank">
                  <p className="cursor-pointer flex p-5 border-b">
                    <Twitter /> Associate Facebook
                  </p>
                </Link>

                <Link href="https://twitter.com" target="_blank">
                  <p className="cursor-pointer flex p-5 border-b">
                    <Facebook /> Associate Twitter
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------ TIMELINE TAB ---------------- */}
      {activeTab === 'timeline' && <TimelineView />}
    </div>
  )
}

// FIELD COMPONENT
function Field({ label, value }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-semibold w-40 text-gray-700 text-right">
        {label}:
      </span>
      <span className="text-gray-900">{value}</span>
    </div>
  )
}

// -------------------------------------------------------------------

/* TIMELINE + DATE/TIME RANGE FILTERS */
function TimelineView() {
  const [searchText, setSearchText] = useState('')

  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const [fromTime, setFromTime] = useState('')
  const [toTime, setToTime] = useState('')

  // Convert "Nov 23, 2025" → Date object
  const parseDate = (d) => new Date(d)

  // Convert "10:20 AM" → minutes
  const parseTime = (t) => {
    if (!t) return null
    const [time, mer] = t.split(' ')
    let [h, m] = time.split(':').map(Number)
    if (mer === 'PM' && h !== 12) h += 12
    if (mer === 'AM' && h === 12) h = 0
    return h * 60 + m
  }

  const filteredData = useMemo(() => {
    return timelineData
      .map((group) => {
        const groupDate = parseDate(group.date)

        const items = group.items.filter((item) => {
          const itemTimeMinutes = parseTime(item.time)

          // text match
          const matchText = item.text
            .toLowerCase()
            .includes(searchText.toLowerCase())

          // date range match
          const matchDate =
            (!fromDate || groupDate >= new Date(fromDate)) &&
            (!toDate || groupDate <= new Date(toDate))

          // time range match
          const matchTime =
            (!fromTime || itemTimeMinutes >= parseTime(fromTime)) &&
            (!toTime || itemTimeMinutes <= parseTime(toTime))

          return matchText && matchDate && matchTime
        })

        return { ...group, items }
      })
      .filter((g) => g.items.length > 0)
  }, [searchText, fromDate, toDate, fromTime, toTime])

  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Timeline History</h2>

      {/* FILTERS */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div>
          <label> Search text</label>
          <input
            type="text"
            placeholder="Search text..."
            className="border p-2 rounded-lg"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="grid grid-cols">
          <label>From Date</label>
          <input
            type="date"
            className="border p-2 rounded-lg"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="grid grid-cols">
          <label>To Date</label>
          <input
            type="date"
            className="border p-2 rounded-lg"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div className="grid grid-cols">
          <label>From Time</label>
          <input
            type="time"
            className="border p-2 rounded-lg"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
          />
        </div>
        <div className="grid grid-cols">
          <label>To Time</label>
          <input
            type="time"
            className="border p-2 rounded-lg"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-10 p-6">
        {filteredData.map((group, idx) => (
          <div key={idx}>
            <div className="bg-gray-200 text-gray-700 px-3 py-1 inline-block rounded-md text-sm font-medium mb-4">
              {group.date}
            </div>

            <div className="relative border-l border-gray-300 ml-4">
              {group.items.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="mb-6 ml-6 relative">
                    <span className="absolute -left-5 top-1.5 w-3 h-3 bg-blue-600 rounded-full"></span>
                    <span className="absolute -left-12 top-0 text-blue-600">
                      <Icon size={20} />
                    </span>

                    <p className="text-sm text-gray-500">{item.time}</p>
                    <p className="text-gray-900 font-medium">{item.text}</p>
                    <p className="text-xs text-gray-500">by {item.by}</p>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
