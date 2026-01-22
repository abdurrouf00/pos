'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Input from '@/components/common/HrInput'
import Select from '@/components/common/HrSelect'

export default function LeadsPage() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    type: '',
    period: '',
    name: '',
  })
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const isFormValid = formData.type && formData.period && formData.name

  const handleNext = () => {
    if (isFormValid) {
      localStorage.setItem('forecastData', JSON.stringify(formData))
      setOpen(false)
      router.push('/dashboard/forecasts/new-forecast')
    }
  }

  return (
    <div className="relative w-full  bg-gray-100">
      {/* ======= Top Bar ======= */}
      <div className="flex fixed top-0 w-[82%] justify-end items-center h-12 bg-gray-200 rounded sm:px-4 z-40">
        <Button type="button" onClick={() => setOpen(true)}>
          + New
        </Button>
      </div>

      {/* ======= Sidebar Popup ======= */}
      <AnimatePresence>
        {open && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-black/0 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />

            {/* Popup Card */}
            <motion.div
              className="absolute  left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl w-full max-w-2xl sm:w-[800px] mx-auto p-6 z-50"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Create Forecast
              </h2>

              {/* Forecast Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Forecast Type
                </label>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  <option>Sales</option>
                  <option>Revenue</option>
                  <option>Leads</option>
                </Select>
              </div>

              {/* Forecast Period */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Forecast Period
                </label>
                <Select
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                >
                  <option value="">Select Period</option>
                  <optgroup label="Completed">
                    <option>Q1 2023</option>
                    <option>Q2 2023</option>
                    <option>Q3 2023</option>
                    <option>Q4 2023</option>
                  </optgroup>
                  <optgroup label="Current">
                    <option>Q1 2025</option>
                  </optgroup>
                  <optgroup label="Future">
                    <option>Q1 2026</option>
                    <option>Q2 2026</option>
                    <option>Q3 2026</option>
                  </optgroup>
                </Select>
              </div>

              {/* Forecast Name */}
              <div className="mb-6">
                <Input
                  label="Forecast Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter forecast name"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNext}
                  disabled={!isFormValid}
                  className={`px-4 py-2 rounded-lg ${
                    isFormValid
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-300 cursor-not-allowed text-gray-100'
                  }`}
                >
                  Next
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
