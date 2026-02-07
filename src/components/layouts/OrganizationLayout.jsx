'use client'
import { logout } from '@/app/actions/auth'
import { setMenus, setUser } from '@/lib/redux/userSlice'
import { clearLocalStorage } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Client from '../Client'

export default function OrganizationLayout() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { user } = useSelector(state => state.user)
  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
    dispatch(setUser(null))
    dispatch(setMenus([]))
    clearLocalStorage()
  }
  return (
    <Client>
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image src="/logo.png" alt="HR360 Logo" className="" width={100} height={100} />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user ? user?.name : 'N/A'}</span>
              <button
                // href="/auth/login"
                onClick={handleLogout}
                className="text-sm cursor-pointer  text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Client>
  )
}
