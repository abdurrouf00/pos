'use client'

import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import BookingForm from './bookingForm'

const getStatusStyles = (status) => {
  switch (status) {
    case 'available': 
      return {
        card: 'bg-emerald-50 border-emerald-100 hover:border-emerald-300',
        dot: 'bg-emerald-500',
        text: 'text-emerald-900',
        subtext: 'text-emerald-600/70',
        label: 'Available'
      }
    case 'booked': 
      return {
        card: 'bg-blue-50 border-blue-100 hover:border-blue-300',
        dot: 'bg-blue-500',
        text: 'text-blue-900',
        subtext: 'text-blue-600/70',
        label: 'Booked'
      }
    case 'unclean': 
      return {
        card: 'bg-rose-50 border-rose-100 hover:border-rose-300',
        dot: 'bg-rose-500',
        text: 'text-rose-900',
        subtext: 'text-rose-600/70',
        label: 'Unclean'
      }
    case 'maintenance': 
      return {
        card: 'bg-amber-50 border-amber-100 hover:border-amber-300',
        dot: 'bg-amber-500',
        text: 'text-amber-900',
        subtext: 'text-amber-600/70',
        label: 'Maintenance'
      }
    default: 
      return {
        card: 'bg-slate-50 border-slate-100',
        dot: 'bg-slate-500',
        text: 'text-slate-900',
        subtext: 'text-slate-500',
        label: 'Unknown'
      }
  }
}

export const AllRoom = ({ floor, rooms, onBack }) => {
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const handleRoomClick = (room) => {
    if (room.status === 'available') {
      setSelectedRoom(room)
      setIsBookingModalOpen(true)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Room Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {rooms.map((room) => {
          const styles = getStatusStyles(room.status)
          return (
            <div 
              key={room.no}
              onClick={() => handleRoomClick(room)}
              className={cn(
                "group border rounded-2xl p-4 shadow-sm transition-all duration-300 cursor-pointer relative overflow-hidden",
                styles.card,
                room.status === 'available' ? 'active:scale-95' : 'cursor-not-allowed grayscale-[0.2] opacity-90'
              )}
            >
              <div className="flex justify-between items-start mb-3 relative z-10">
                <span className={cn("text-lg font-black", styles.text)}>#{room.no}</span>
                <div className={cn("w-2.5 h-2.5 rounded-full shadow-sm animate-pulse", styles.dot)} />
              </div>
              
              <div className="space-y-0.5 relative z-10">
                <p className={cn("text-[10px] font-bold uppercase tracking-tighter", styles.subtext)}>
                  {room.type}
                </p>
                <p className={cn("text-xs font-black truncate", styles.text)}>
                  {styles.label}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Booking Modal */}
      {selectedRoom && (
        <BookingForm 
          room={selectedRoom} 
          isOpen={isBookingModalOpen} 
          setIsOpen={setIsBookingModalOpen} 
        />
      )}
    </div>
  )
}

export default AllRoom
