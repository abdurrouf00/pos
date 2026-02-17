'use client'

import React, { useState } from 'react'
import HrModal from '@/components/common/HrModal'
import HrInput from '@/components/common/HrInput'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle2,
  Clock,
} from 'lucide-react'

const BookingForm = ({ room, isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    nid: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: '0',
    requestedFor: '',
    kids: '0'
  })

  if (!room) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Booking Data:', formData)
    alert('Booking Confirmed!')
    setIsOpen(false)
  }

  return (
    <HrModal
      toggle={isOpen}
      setToggle={setIsOpen}
      title={`Book Room #${room.no}`}
      size="sm:max-w-2xl"
    >
      <div className="">
        {/* Room Quick Info Header */}
        <div className="flex items-center gap-4 bg-primary/5 p-2 rounded-2xl border border-primary/10">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-black text-slate-800 tracking-tight">Room #{room.no} - {room.type}</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-3 h-3" /> Status: Available for Check-in
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Base Price</p>
            <p className="text-xl font-black text-primary">$120.00<span className="text-xs text-slate-400 font-normal">/night</span></p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Guest Information Section */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b pb-2">Guest Information</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HrInput
                  label="Guest Full Name"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleInputChange}
                  placeholder="Enter Guest Name"
                  required
                />
                
                <HrInput
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter Phone Number"
                  required
                />
                
                <HrInput
                  label="NID / Passport Number"
                  name="nid"
                  value={formData.nid}
                  onChange={handleInputChange}
                  placeholder="Enter NID / Passport Number"
                  required
                />
                
                <HrInput
                  label="Email Address (Optional)"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email Address"
                  type="email"
                />
            </div>
          </div>

          {/* Stay Details Section */}
          <div className="space-y-4 pt-2">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b pb-2">Stay Details</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <HrInput
                  label="Check-in Date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  type="date"
                  required
                />
                
                <HrInput
                  label="Check-out Date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  type="date"
                  required
                />
              
                <HrInput
                  label="Guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="0"
                  required
                />
                <HrInput
                  label="Kids"
                  name="kids"
                  value={formData.kids}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="0"
                />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="px-8 font-bold text-slate-500 hover:bg-slate-50 border-slate-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-10 font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              Confirm Booking
            </Button>
          </div>
        </form>
      </div>
    </HrModal>
  )
}

export default BookingForm
