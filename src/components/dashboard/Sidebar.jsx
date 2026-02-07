'use client'

import axios from '@/helpers/axios'
import { cn, createLink, getLocal } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'nextjs-toploader/app'
import { useEffect, useState } from 'react'
import { IoMdArrowDropright } from 'react-icons/io'
import { MdDashboard } from 'react-icons/md'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import Date from '@/data/menus.json'


const activeClass = 'bg-blue-500/10 text-blue-900 font-bold '

const MenuSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
    </div>
  )
}

export default function Sidebar({ open, setOpen }) {
  //const { menus } = useSelector(state => state.user)
  const [menus, setMenus] = useState(Date);
  const pathname = usePathname()
  const [expandedMenus, setExpandedMenus] = useState({})
  const [menuItems, setMenuItems] = useState([])
  const [isBrowser, setIsBrowser] = useState(false)
  const router = useRouter()
  const icons = {
    // settings:
  }
  // Set isBrowser flag once component mounts
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const createLink = menu_name => {
    const arr = menu_name.split(' ')
    const link = arr.map(item => item.toLowerCase()).join('-')
    return `/dashboard/${link}`
  }
  // Fetch menu data only on client side
  useEffect(() => {
    if (isBrowser) {
      try {
        const moduleId = getLocal('moduleId')
        const moduleUid = moduleId ? moduleId : null
        const formattedMenuItems = menus
          ?.filter(ff => ff.menu_name && ff.menu_name !== 'Dashboard')
          ?.filter(mm => mm.id === moduleUid)
          ?.map(dd => {
            return {
              title: dd.menu_name,
              href: '/dashboard',
              isMainCategory: true,

              subItems: dd.children?.map(d1 => ({
                title: d1.menu_name,

                href: createLink(d1.menu_name),

                icon: '/image 19.png',
                subItems: d1.children?.map(d2 => ({
                  title: d2.menu_name,
                  href: createLink(d2.menu_name),
                  icon: '/image 19.png',
                })),
              })),
            }
          })
        setMenuItems(formattedMenuItems)
      } catch (error) {
        console.error('Error parsing menus from localStorage:', error)
        setMenuItems([])
      }
    }
  }, [isBrowser])

  useEffect(() => {
    // axios.headers
  }, [])

  // Initialize expanded state based on current path
  useEffect(() => {
    if (menuItems.length > 0) {
      const findParentPath = (items, targetPath) => {
        for (const item of items) {
          if (item.subItems) {
            for (const subItem of item.subItems) {
              if (subItem.href === targetPath) {
                return item.title
              }
            }
          }
        }
        return null
      }

      const parentPath = menuItems[0]?.subItems && findParentPath(menuItems[0].subItems, pathname)
      if (parentPath) {
        setExpandedMenus(prev => ({
          ...prev,
          [parentPath]: true,
        }))
      }
    }
  }, [pathname, menuItems])

  const toggleSubmenu = (itemPath, event) => {
    event.stopPropagation()

    setExpandedMenus(prev => ({
      ...prev,
      [itemPath]: !prev[itemPath],
    }))
  }

  const handleRoute = item => {
    if (item.subItems?.length > 0) {
      return
    } else if (item.href) {
      router.push(item.href)
    }
  }

  const renderMenuItem = (item, parentPath = '') => {
    const currentPath = parentPath ? `${parentPath}/${item.title}` : item.title
    const isActive = pathname.includes(item.href)
    const hasSubItems = item.subItems?.length > 0
    const isExpanded = expandedMenus[currentPath]

    return (
      <div key={currentPath} className="">
        <div
          className={cn(
            'flex items-center gap-2 py-2.5 px-4 rounded-md  hover:bg-neutral-100  cursor-pointer text-gray-500 text-[0.8rem]   hover:pl-6 transition-all duration-300 font-semibold',
            {
              [activeClass]: isActive,
            }
          )}
          onClick={() => handleRoute(item)}
        >
          <span> {item.icon && <Circle size={12} />}</span>

          {hasSubItems ? (
            <button
              onClick={e => toggleSubmenu(currentPath, e)}
              className={cn('flex justify-between items-center w-full  flex-grow   text-nowrap')}
            >
              {item.title}
              <span
                className={cn('transition-transform duration-300 ml-1 mt-1', {
                  'rotate-90': isExpanded,
                })}
              >
                <ChevronRight size={16} className="text-muted-foreground" />
              </span>
            </button>
          ) : (
            <span href={item.href} className={cn('flex items-center   rounded    text-nowrap')}>
              {item.title}
            </span>
          )}
        </div>

        {hasSubItems && (
          <div
            className={cn('overflow-hidden transition-all duration-300 ease-in-out ', {
              'max-h-[500px] opacity-100': isExpanded,
              'max-h-0 opacity-0': !isExpanded,
            })}
          >
            <div className="ml-4 border-l border-gray-200 pl-2 mt-1">
              {item.subItems.map(sub => renderMenuItem(sub, currentPath))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Show a simplified sidebar if not in browser yet
  if (!isBrowser || menuItems.length === 0) {
    return (
      <div
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className="flex items-center">
          <img src="/logo.png" alt="HR360 Logo" className="h-18" />
        </div>
        <div className="p-4">
          <MenuSkeleton />
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className={cn(
          'inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-500 ease-in-out overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 fixed lg:relative',
          {
            ' translate-x-0 w-64': open,
            ' -translate-x-full w-0': !open,
          }
        )}
      >
        <div className="flex items-center justify-between  pr-4">
          <div className="h-18 w-24">
            <img src="/logo.png" alt="HR360 Logo" className="w-full h-full object-cover" />
          </div>
          <Button size={'icon'} variant={'ghost'} onClick={() => setOpen(false)} className="">
            <ChevronLeft />
          </Button>
        </div>
        {/* Search button - hidden on mobile */}
        <div className="space-y-2  text-gray-500 hover:text-gray-600   text-sm px-4 mb-2 border-b pb-1">
          {/* <input
            type="text"
            className="outline-none  rounded-sm   px-2 py-2 border w-full"
            placeholder="Search anything..."
          /> */}
          <Link
            href={'/dashboard'}
            className={cn(
              'group text-neutral-700  items-center  px-3 py-2 text-[0.8rem] rounded hover:bg-neutral-100 transition-colors duration-300 flex gap-2 w-full justify-start ',
              {
                [activeClass]: pathname === '/dashboard',
              }
            )}
          >
            <span>
              <MdDashboard size={16} />
            </span>
            <span>Interactive Dashboard </span>
            {/* <IoMdArrowDropright size={20} /> */}
          </Link>
        </div>

        {/* <div className="border-b border-gray-200 my-2 mx-3"></div> */}

        <div className="pb-1 ">
          {/* Render menu items from array */}

          {menuItems
            .filter(item => item.permission === 'admin' || !item.permission)
            .map(category => (
              <div key={category.title} className="mt-1 mx-3">
                {/* Main category */}
                <Link
                  href={category.href}
                  className={`group text-nowrap flex items-center   text-[0.6rem] text-neutral-500 mt-3 mb-2  font-semibold   px-3 tracking-wider uppercase`}
                >
                  {category.title}
                </Link>

                {/* Render category's subItems */}
                {category.subItems && category.subItems.map(item => renderMenuItem(item))}
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
