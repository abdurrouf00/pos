'use client'
import { logout } from '@/app/actions/auth'
import { setMenus, setUser } from '@/lib/redux/userSlice'
import { clearLocalStorage } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdDashboard } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import SecondHeader from './SecondHeader'
import { Settings } from 'lucide-react'
import { Button } from '../ui/button'

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const dispatch = useDispatch()
  const [mounted, setMounted] = useState(false)
  const { user } = useSelector(state => state.user)
  // const [user, setUser] = useState({ name: "N/A", role: { name: "N/A" } });
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
    dispatch(setUser(null))
    dispatch(setMenus([]))
    clearLocalStorage()
  }
  const handleSettings = () => {
    router.push('/organization/modules')
  }

  useEffect(() => {
    setMounted(true)
    // setUser(userData ?? { name: "N/A", role: { name: "N/A" } });
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <header className="z-10 sticky top-0">
      <div className="px-3 sm:px-4 md:px-6 ">
        <div className="flex items-center justify-between h-14 md:h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:mr-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Toggle sidebar</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="ml-2 sm:ml-4 lg:hidden">
              {/* Mobile logo */}
              <img src="/logo.png" alt="HR360" className="h-14" />
            </div>
            <Link href="/organization/modules" className="relative">
              <MdDashboard size={30} color="#0E9DF9" className="cursor-pointer" />
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="outline" size="sm" onClick={handleSettings}>
              <Settings size={16} /> Settings
            </Button>

            {/* <button className="relative">
              <img src="/comment-icon.png" />
            </button>

            <button className=" relative">
              <img src="/message-icon.png" />
            </button>

            <button className=" relative">
              <img src="/notification-bell.png" />
            </button> */}

            {/* Profile dropdown */}
            <div className="relative ">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center focus:outline-none "
              >
                <div className="text-end">
                  <span className="hidden md:block ml-2 text-xs  text-black">
                    {user ? user?.name : 'N/A'}
                  </span>
                  <span className="hidden md:block ml-2 text-[0.6rem]  text-neutral-500">
                    {user?.role?.name || user?.role || 'N/A'}
                  </span>
                </div>
                <div className="ml-2 size-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
                  {user?.name?.charAt(0)}
                </div>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:block h-4 w-4 ml-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg> */}
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  {/* <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link> */}
                  {/* <Link
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link> */}
                  <button
                    onClick={handleLogout}
                    className=" w-full mx-2 rounded text-sm text-red-600  py-2.5 cursor-pointer  hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SecondHeader />
    </header>
  )
}
