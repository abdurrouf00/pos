'use client'

import { usePathname } from 'next/navigation'

export default function SecondHeader() {
  const pathname = usePathname()

  const title =
    pathname
      ?.split('/')
      ?.pop()
      ?.replace(/^\w/, c => c.toUpperCase()) || ''

  return (
    <div className=" bg-white px-3 sm:px-4 md:px-6 mx-3 rounded mb-1 ">
      <div className="flex items-center justify-between py-4  ">
        <div className="flex items-center">
          <div className="">
            <div className=" text-gray-700  tracking-tight ">{title}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
