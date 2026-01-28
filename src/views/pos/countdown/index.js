'use client'
import { useState, useEffect } from 'react'
import { Trash2, Clock, AlarmClock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CountdownPage() {
  const [countdowns, setCountdowns] = useState([])
  const [currentTime, setCurrentTime] = useState(Date.now())

  // Load initial data
  useEffect(() => {
    const loadCountdowns = () => {
      const stored = localStorage.getItem('pos_active_countdowns')
      if (stored) {
        setCountdowns(JSON.parse(stored))
      }
    }

    loadCountdowns()

    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', loadCountdowns)
    return () => window.removeEventListener('storage', loadCountdowns)
  }, [])

  // Timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Calculate remaining time
  const getRemainingTime = (endTime) => {
    const diff = endTime - currentTime
    if (diff <= 0) return 0
    return diff
  }

  const formatTime = (ms) => {
    if (ms <= 0) return "00:00"
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const getProgress = (start, end) => {
    const total = end - start
    const elapsed = currentTime - start
    const percent = (elapsed / total) * 100
    return Math.min(100, Math.max(0, percent))
  }

  const handleClearFinished = () => {
    const activeOnly = countdowns.filter(c => getRemainingTime(c.endTime) > 0)
    setCountdowns(activeOnly)
    localStorage.setItem('pos_active_countdowns', JSON.stringify(activeOnly))
  }

  const handleRemove = (id) => {
    const updated = countdowns.filter(c => c.id !== id)
    setCountdowns(updated)
    localStorage.setItem('pos_active_countdowns', JSON.stringify(updated))
  }

  const activeCountdowns = countdowns.filter(c => getRemainingTime(c.endTime) > 0)
  const finishedCountdowns = countdowns.filter(c => getRemainingTime(c.endTime) <= 0)

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Clock className="w-8 h-8 text-blue-600" />
          Active Sessions
        </h1>
        {finishedCountdowns.length > 0 && (
          <Button 
            variant="destructive" 
            onClick={handleClearFinished}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear Finished ({finishedCountdowns.length})
          </Button>
        )}
      </div>

      {countdowns.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed">
          <AlarmClock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No active massage sessions</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countdowns.map((item) => {
            const remaining = getRemainingTime(item.endTime)
            const isFinished = remaining <= 0
            const progress = getProgress(item.startTime, item.endTime)
            
            return (
              <div 
                key={item.id} 
                className={`transform transition-all duration-300 hover:scale-105 border rounded-xl overflow-hidden shadow-sm ${
                  isFinished ? 'bg-red-50 border-red-200' : 'bg-white border-blue-100'
                }`}
              >
                <div className={`p-4 text-white flex justify-between items-start ${
                    isFinished ? 'bg-red-500' : 'bg-blue-600'
                }`}>
                    <div>
                        <h3 className="font-bold text-lg">{item.itemName}</h3>
                        <p className="text-blue-100 text-xs mt-1 opacity-90">
                           Started: {new Date(item.startTime).toLocaleTimeString()}
                        </p>
                    </div>
                     <button 
                        onClick={() => handleRemove(item.id)}
                        className="text-white/80 hover:text-white hover:bg-white/20 rounded p-1"
                     >
                        ×
                     </button>
                </div>
                
                <div className="p-6 flex flex-col items-center justify-center">
                   <div className="text-5xl font-mono font-bold tracking-wider mb-2 text-gray-700">
                     {isFinished ? "00:00" : formatTime(remaining)}
                   </div>
                   
                   <p className={`text-sm font-medium mb-4 ${isFinished ? 'text-red-600' : 'text-blue-600'}`}>
                     {isFinished ? "SESSION FINISHED" : "REMAINING TIME"}
                   </p>

                   {/* Progress Bar */}
                   <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                            isFinished ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${isFinished ? 100 : progress}%` }}
                      />
                   </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
