'use client'
import { cn, createLink, setLocal, userData } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { MdDashboard, MdAttachMoney } from 'react-icons/md'
import { AiOutlineTeam, AiOutlineBarChart } from 'react-icons/ai'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { ChevronRight, Settings, XCircle } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'
import { Button } from '@/components/ui/button'

const SubLink = ({ item }) => {
  // console.log('SubLink', item)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  const handleClick = () => {
    if (item.children) {
      toggle()
    } else {
      router.push(createLink(item.menu_name))
    }
  }
  return (
    <>
      <div
        // href={createLink(item.menu_name)}
        role="button"
        tabIndex={0}
        key={item.id}
        className="hover:bg-gray-100 rounded-md p-2  w-full flex items-center justify-between cursor-pointer hover:pl-4 transition-all duration-200 ease-in-out"
        onClick={handleClick}
      >
        <span className="text-xs font-medium text-center text-gray-800 ">{item.menu_name}</span>
        {item.children ? (
          <span
            className={cn(
              'text-xs font-medium text-center text-gray-700 transition-transform duration-200 ease-in-out',
              {
                'rotate-90': isOpen,
              }
            )}
          >
            <ChevronRight size={16} />
          </span>
        ) : null}
      </div>
      <div className="pl-4">
        {isOpen ? item.children?.map(child => <SubLink key={child.id} item={child} />) : null}
      </div>
    </>
  )
}

const ModuleScreen = () => {
  const menus = useSelector(state => state.user.menus)
  const router = useRouter()
  const getIcon = menuUid => {
    const icons = {
      settings: <Settings size={32} className="text-gray-400" />,

      payroll: <MdAttachMoney size={32} className="text-red-500" />,
      accounting: <AiOutlineBarChart size={32} className="text-purple-400" />,
      humanResourceMangemnt: <AiOutlineTeam size={32} className="text-blue-600" />,
    }
    return icons[menuUid] || <MdDashboard size={32} className="text-gray-400" />
  }

  const storeModuleId = moduleId => {
    setLocal('moduleId', moduleId)
  }

  const handleCloseSettings = () => {
    router.push('/dashboard')
  }
  console.log('menus', menus)
  return (
    <div className="min-h-[calc(90vh-70px)] w-full flex flex-col ">
      {/* Top Bar */}

      {/* Main */}
      <div className="flex-1 w-full flex items-center justify-center">
        <div className="w-full px-4 py-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-full">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 ">All Modules</h1>
              </div>
              {/* <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCloseSettings}
                >
                  <XCircle size={16} />
                  Close Settings
                </Button>
              </div> */}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-10  w-full">
              {menus
                ?.filter(ff => ff.menu_name !== 'Dashboard')
                ?.map(menuItem => (
                  <div
                    // href={`/dashboard`}
                    key={menuItem.id}
                    onClick={() => {
                      console.log('menuItem', menuItem)
                      router.push('/dashboard')
                      storeModuleId(menuItem?.id)
                    }}
                    className="w-40 rounded-md  transition-all duration-200
                      cursor-pointer p-2 flex-shrink-0 bg-white shadow-sm hover:shadow-md"
                  >
                    <div className=" ">
                      {/* Module name */}
                      <div className=" flex flex-col items-center justify-center gap-2  p-2 rounded-md">
                        <div
                          className=" [&>svg]:size-8"
                          dangerouslySetInnerHTML={{ __html: menuItem.menu_icon }}
                        />

                        <span className="text-sm text-center text-gray-800 font-bold">
                          {menuItem.menu_name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleScreen