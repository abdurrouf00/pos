'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { 
  Bed, 
  CheckCircle, 
  Eraser, 
  Wrench, 
  Building2,
  ChevronRight,
  LogOut,
  CalendarDays,
  Search,
  Calendar
} from 'lucide-react'
import HrInput from '@/components/common/HrInput'
import AllRoom from './allRoom'
import AvailableRoomsModal from './model'
import BookingForm from './bookingForm'

const FloorStatusCard = ({ floor, stats, onSelect, onAvailableClick }) => {
  return (
    <Card 
      onClick={() => onSelect(floor)}
      className="group overflow-hidden border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 bg-white cursor-pointer"
    >
      <div className="p-0">
        {/* Card Header */}
        <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center group-hover:bg-primary/5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:border-primary/20 group-hover:text-primary transition-all">
              <span className="font-black text-lg">{floor}</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 tracking-tight">Floor {floor}</h3>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Room Status</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>

        {/* Card Body - Status Grid */}
        <div className="p-4 grid grid-cols-2 gap-2">
          <div 
            onClick={(e) => {
              e.stopPropagation();
              onAvailableClick(floor);
            }}
            className="space-y-1 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/50 hover:bg-emerald-100/70 transition-all active:scale-95 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Available</span>
            </div>
            <p className="text-2xl font-black text-emerald-700">{stats.available}</p>
          </div>

          <div className="space-y-1 p-3 rounded-xl bg-blue-50/50 border border-blue-100/50">
            <div className="flex items-center gap-2 text-blue-600">
              <Bed className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Booked</span>
            </div>
            <p className="text-2xl font-black text-blue-700">{stats.booked}</p>
          </div>

          <div className="space-y-1 p-2 rounded-xl bg-rose-50/50 border border-rose-100/50">
            <div className="flex items-center gap-2 text-rose-600">
              <Eraser className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Unclean</span>
            </div>
            <p className="text-xl font-black text-rose-700">{stats.unclean}</p>
          </div>

          <div className="space-y-1 p-2 rounded-xl bg-amber-50/50 border border-amber-100/50">
            <div className="flex items-center gap-2 text-amber-600">
              <Wrench className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Mainten...</span>
            </div>
            <p className="text-xl font-black text-amber-700">{stats.maintenance}</p>
          </div>

          <div className="space-y-1 p-2 rounded-xl bg-violet-50/50 border border-violet-100/50">
            <div className="flex items-center gap-2 text-violet-600">
              <LogOut className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Today C/O</span>
            </div>
            <p className="text-xl font-black text-violet-700">{stats.todayCheckout}</p>
          </div>

          <div className="space-y-1 p-2 rounded-xl bg-indigo-50/50 border border-indigo-100/50">
            <div className="flex items-center gap-2 text-indigo-600">
              <CalendarDays className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Tomorrow C/O</span>
            </div>
            <p className="text-xl font-black text-indigo-700">{stats.tomorrowCheckout}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function RoomList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const floorParam = searchParams.get('floor')

  const floorData = [
    { 
      floor: '1', 
      stats: { available: 8, booked: 12, unclean: 4, maintenance: 2, todayCheckout: 3, tomorrowCheckout: 5 },
      rooms: Array.from({ length: 34 }).map((_, i) => ({
        no: 101 + i,
        type: i % 5 === 0 ? 'Suite' : i % 3 === 0 ? 'Deluxe' : 'Standard',
        capacity: i % 5 === 0 ? 'Family Room' : i % 3 === 0 ? 'Double Room' : 'Single Room',
        price: i % 5 === 0 ? 250 : i % 3 === 0 ? 150 : 100,
        status: i < 8 ? 'available' : i < 20 ? 'booked' : i < 24 ? 'unclean' : i < 26 ? 'maintenance' : i < 29 ? 'todayCheckout' : 'tomorrowCheckout'
      }))
    },
    { 
      floor: '2', 
      stats: { available: 15, booked: 5, unclean: 2, maintenance: 1, todayCheckout: 2, tomorrowCheckout: 1 },
      rooms: Array.from({ length: 26 }).map((_, i) => ({
        no: 201 + i,
        type: i % 4 === 0 ? 'Deluxe' : 'Standard',
        capacity: i % 4 === 0 ? 'Double Room' : 'Single Room',
        price: i % 4 === 0 ? 160 : 110,
        status: i < 15 ? 'available' : i < 20 ? 'booked' : i < 22 ? 'unclean' : i < 23 ? 'maintenance' : i < 25 ? 'todayCheckout' : 'tomorrowCheckout'
      }))
    },
    { 
      floor: '3', 
      stats: { available: 10, booked: 10, unclean: 3, maintenance: 0, todayCheckout: 4, tomorrowCheckout: 2 },
      rooms: Array.from({ length: 29 }).map((_, i) => ({
        no: 301 + i,
        type: i % 3 === 0 ? 'Suite' : 'Standard',
        capacity: i % 3 === 0 ? 'Family Room' : 'Single Room',
        price: i % 3 === 0 ? 240 : 105,
        status: i < 10 ? 'available' : i < 20 ? 'booked' : i < 23 ? 'unclean' : i < 27 ? 'todayCheckout' : 'tomorrowCheckout'
      }))
    },
    { 
      floor: '4', 
      stats: { available: 12, booked: 8, unclean: 1, maintenance: 3, todayCheckout: 1, tomorrowCheckout: 4 },
      rooms: Array.from({ length: 29 }).map((_, i) => ({
        no: 401 + i,
        type: i % 5 === 0 ? 'Suite' : i % 3 === 0 ? 'Deluxe' : 'Standard',
        capacity: i % 5 === 0 ? 'Family Room' : i % 3 === 0 ? 'Double Room' : 'Single Room',
        price: i % 5 === 0 ? 250 : i % 3 === 0 ? 150 : 100,
        status: i < 12 ? 'available' : i < 20 ? 'booked' : i < 21 ? 'unclean' : i < 24 ? 'maintenance' : i < 25 ? 'todayCheckout' : 'tomorrowCheckout'
      }))
    },
  ]

  const [fromDate, setFromDate] = React.useState('')
  const [toDate, setToDate] = React.useState('')
  const [searchRoom, setSearchRoom] = React.useState('')

  // Modal States
  const [isAvailableModalOpen, setIsAvailableModalOpen] = React.useState(false)
  const [selectedFloorForModal, setSelectedFloorForModal] = React.useState(null)
  const [selectedRoomForBooking, setSelectedRoomForBooking] = React.useState(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false)

  const handleAvailableClick = (floorId) => {
    setSelectedFloorForModal(floorId)
    setIsAvailableModalOpen(true)
  }

  const handleRoomClickInModal = (room) => {
    setSelectedRoomForBooking(room)
    setIsBookingModalOpen(true)
  }

  const handleSelectFloor = (floorId) => {
    router.push(`?floor=${floorId}`)
  }

  const handleBack = () => {
    setSearchRoom('') // Clear search on back
    router.push('?')
  }

  const selectedFloorData = floorData.find(d => d.floor === floorParam)
  
  // Filter rooms when in a specific floor view
  const filteredRooms = React.useMemo(() => {
    if (!selectedFloorData) return []
    if (!searchRoom) return selectedFloorData.rooms
    return selectedFloorData.rooms.filter(room => 
      room.no.toString().includes(searchRoom)
    )
  }, [selectedFloorData, searchRoom])

  // Filter floors when in the summary view based on whether they contain the searched room
  const filteredFloorData = React.useMemo(() => {
    if (!searchRoom) return floorData
    return floorData.filter(floor => 
      floor.rooms.some(room => room.no.toString().includes(searchRoom))
    )
  }, [searchRoom, floorData])

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header - Always show some part of it or handle specifically */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            {floorParam ? `Floor ${floorParam} Rooms` : 'Room Status by Floor'}
          </h1>
          <p className="text-slate-500 text-sm mt-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {floorParam ? `Showing filtered rooms for floor ${floorParam}` : 'Real-time monitoring of all hotel floors'}
          </p>

          <div className="mt-6 flex flex-wrap items-end gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-40">
              <HrInput
                label="From Date"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="Select Date"
              />
            </div>
            <div className="w-40">
              <HrInput
                label="To Date"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="Select Date"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <HrInput
                  label="Search Room"
                  placeholder="Enter room number..."
                  value={searchRoom}
                  onChange={(e) => setSearchRoom(e.target.value)}
                />
                <Search className="absolute right-3 top-[34px] w-4 h-4 text-slate-400" />
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                className="h-10 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-sm active:scale-95"
                onClick={() => {
                  // In a real app, this would trigger an API call with dates
                  alert(`Filtering from ${fromDate || 'Any'} to ${toDate || 'Any'} for Room: ${searchRoom || 'Any'}`)
                }}
              >
                Apply
              </button>
              {(searchRoom || fromDate || toDate) && (
                <button 
                  className="h-10 px-4 bg-slate-100 text-slate-600 font-bold rounded-lg hover:bg-slate-200 transition-all shadow-sm active:scale-95"
                  onClick={() => {
                    setSearchRoom('')
                    setFromDate('')
                    setToDate('')
                  }}
                >
                  Reset
                </button>
              )}
              {floorParam && (
                <button 
                  className="h-10 px-6 bg-slate-100 text-slate-600 font-bold rounded-lg hover:bg-slate-200 transition-all shadow-sm active:scale-95"
                  onClick={handleBack}
                >
                  Back to Floors
                </button>
              )}
            </div>
          </div>
        </div>

        {/* View Switching Logic */}
        {floorParam && selectedFloorData ? (
          <AllRoom 
            floor={selectedFloorData.floor} 
            rooms={filteredRooms} 
            onBack={handleBack} 
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500">
              {filteredFloorData.map((item, index) => (
                <FloorStatusCard 
                  key={index} 
                  floor={item.floor} 
                  stats={item.stats} 
                  onSelect={handleSelectFloor}
                  onAvailableClick={handleAvailableClick}
                />
              ))}
            </div>
            
            {/* Available Rooms Modal */}
            {selectedFloorForModal && (
              <AvailableRoomsModal 
                isOpen={isAvailableModalOpen}
                setIsOpen={setIsAvailableModalOpen}
                floor={selectedFloorForModal}
                rooms={floorData.find(f => f.floor === selectedFloorForModal)?.rooms || []}
                onRoomClick={handleRoomClickInModal}
              />
            )}

            {/* Booking Form Modal (when triggered from AvailableRoomsModal) */}
            {selectedRoomForBooking && (
              <BookingForm 
                room={selectedRoomForBooking}
                isOpen={isBookingModalOpen}
                setIsOpen={setIsBookingModalOpen}
              />
            )}
            
            {filteredFloorData.length === 0 && (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold">No floors found matching room "#{searchRoom}"</p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-200/60">
              {[
                { color: 'bg-emerald-500', label: 'Available' },
                { color: 'bg-blue-500', label: 'Booked' },
                { color: 'bg-rose-500', label: 'Unclean' },
                { color: 'bg-amber-500', label: 'Maintenance' },
                { color: 'bg-violet-500', label: 'Today Checkout' },
                { color: 'bg-indigo-500', label: 'Tomorrow Checkout' }
              ].map((legend) => (
                <div key={legend.label} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${legend.color}`} />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{legend.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
