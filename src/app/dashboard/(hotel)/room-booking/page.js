import { Suspense } from 'react'
import RoomList from '@/views/hotel/roomBooking'

export const metadata = {
  title: 'Room List - Hotel Management',
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RoomList />
    </Suspense>
  )
}
