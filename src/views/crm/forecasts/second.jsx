'use client'

import { useEffect, useState } from 'react'
import {Button} from '@/components/ui/button'

export default function NewForecastPage() {
  const [forecastData, setForecastData] = useState(null)

  const [targets, setTargets] = useState({
    company: { name: 'My Company', target: '' },
    roles: [
      {
        id: 1,
        name: 'CEO',
        target: '',
        expanded: true,
        users: [
          { id: 1, name: 'John Smith', target: '' },
          { id: 2, name: 'Emma Wilson', target: '' },
        ],
      },
      {
        id: 2,
        name: 'Sales Executive',
        target: '',
        expanded: true,
        users: [
          { id: 3, name: 'David Lee', target: '' },
          { id: 4, name: 'Sarah Brown', target: '' },
        ],
      },
    ],
  })

  // Load forecast info from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('forecastData')
    if (savedData) setForecastData(JSON.parse(savedData))
    else
      setForecastData({ name: 'Q4 Forecast', period: '2025', type: 'Revenue' })
  }, [])

  const updateCompanyTarget = (newValue) => {
    setTargets((prev) => ({
      ...prev,
      company: { ...prev.company, target: newValue },
    }))
  }

  const updateRoleTarget = (roleId, newValue) => {
    setTargets((prev) => ({
      ...prev,
      roles: prev.roles.map((role) =>
        role.id === roleId ? { ...role, target: newValue } : role
      ),
    }))
  }

  const updateUserTarget = (roleId, userId, newValue) => {
    setTargets((prev) => ({
      ...prev,
      roles: prev.roles.map((role) =>
        role.id === roleId
          ? {
              ...role,
              users: role.users.map((user) =>
                user.id === userId ? { ...user, target: newValue } : user
              ),
            }
          : role
      ),
    }))
  }

  const toggleRoleExpand = (roleId) => {
    setTargets((prev) => ({
      ...prev,
      roles: prev.roles.map((role) =>
        role.id === roleId ? { ...role, expanded: !role.expanded } : role
      ),
    }))
  }

  // ✅ Save to localStorage & show in console
  const handleSave = () => {
    const finalData = {
      forecastInfo: forecastData,
      targets: targets,
    }

    // Save in localStorage
    localStorage.setItem('forecastTargets', JSON.stringify(finalData))

    // Show in console
    console.log('✅ Forecast Saved Data:', finalData)

    alert('Forecast data saved successfully!')
  }

  if (!forecastData) return <div className="p-6 text-gray-600">Loading...</div>

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800">
          {forecastData.name} {forecastData.period}
          <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">
            {forecastData.type}
          </span>
        </h2>
      </div>

      {/* Set Targets */}
      <div className="p-5 shadow">
        <h3 className="font-semibold text-lg mb-4">Set Target</h3>

        {/* Company Target */}
        <div className="rounded p-3 mb-4 flex justify-between items-center bg-gray-200 px-5">
          <span className="font-medium text-gray-800">
            {targets.company.name}
          </span>
          <input
            type="number"
            placeholder=" "
            value={targets.company.target}
            onChange={(e) => updateCompanyTarget(e.target.value)}
            className="border border-gray-400 bg-white p-2 rounded w-28 text-right"
          />
        </div>

        {/* Roles */}
        {targets.roles.map((role) => (
          <div key={role.id} className="p-3 mb-3">
            <div className="flex justify-between items-center bg-gray-300 px-2 py-1 rounded-t">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleRoleExpand(role.id)}
                  className="w-6 h-6 border rounded text-gray-600 flex items-center justify-center"
                >
                  {role.expanded ? '−' : '+'}
                </button>
                <span className="font-medium text-gray-800">{role.name}</span>
                <span className="text-xs text-gray-500 bg-gray-200 px-1 rounded">
                  {role.users.length} users
                </span>
              </div>
              <input
                type="number"
                value={role.target}
                onChange={(e) => updateRoleTarget(role.id, e.target.value)}
                className="border border-gray-400 bg-white p-1 rounded text-right w-28"
              />
            </div>

            {/* Users under role (toggle visible) */}
            {role.expanded && (
              <div className="pl-8 p-3 space-y-2 bg-gray-200 px-2 rounded-b">
                {role.users.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700">{user.name}</span>
                    <input
                      type="number"
                      value={user.target}
                      onChange={(e) =>
                        updateUserTarget(role.id, user.id, e.target.value)
                      }
                      className="border border-gray-400 bg-white p-1 rounded text-right w-28"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {/* Submit */}
        <div className="text-right mt-4">
        <Button>Save Forecast</Button>
        </div>
      </div>
    </div>
  )
}
