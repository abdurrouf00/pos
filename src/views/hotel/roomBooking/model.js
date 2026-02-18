'use client'

import React from 'react'
import HrModal from '@/components/common/HrModal'


const AvailableRoomsModal = ({ rooms, isOpen, setIsOpen, floor, onRoomClick }) => {
  const availableRooms = rooms.filter(r => r.status === 'available')

  return (
    <HrModal
      toggle={isOpen}
      setToggle={setIsOpen}
      title={`Available Rooms - Floor ${floor}`}
      size="sm:max-w-4xl"
    >
      <div className="p-1">
        {availableRooms.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest w-24">Room No</th>
                  <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Capacity</th>
                  <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Price</th>
                  <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.entries(
                  availableRooms.reduce((acc, room) => {
                    if (!acc[room.type]) acc[room.type] = [];
                    acc[room.type].push(room);
                    return acc;
                  }, {})
                ).map(([category, rooms]) => (
                  <React.Fragment key={category}>
                    <tr className="bg-slate-50/50">
                      <td colSpan="4" className="px-4 py-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest border border-blue-200">
                          {category}
                        </span>
                      </td>
                    </tr>
                    {rooms.map((room) => (
                      <tr 
                        key={room.no} 
                        className="hover:bg-emerald-50/30 transition-colors group"
                      >
                        <td className="px-4 py-3">
                          <span className="font-black text-slate-700">#{room.no}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-medium text-slate-600">{room.capacity || 'N/A'}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="font-bold text-emerald-600">${room.price || '0'}.00</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button 
                            onClick={() => onRoomClick(room)}
                            className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all active:scale-95 shadow-sm"
                          >
                            Book Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">No available rooms on this floor</p>
          </div>
        )}
      </div>
    </HrModal>
  )
}

export default AvailableRoomsModal
