"use client";

import { usePathname } from "next/navigation";

export default function SecondHeader() {
  const pathname = usePathname();

  const title = pathname
    ?.split('/')
    ?.pop()
    ?.replace(/^\w/, c => c.toUpperCase()) || '';

  return (
    <div className="border border-gray-100 bg-white px-3 sm:px-4 md:px-6 mx-3 rounded">
      <div className="flex items-center justify-between h-10 md:h-12  ">
        <div className="flex items-center">
          <div className="">
            <div className=" text-gray-700 text-sm ">{title}</div>
          </div>
        </div>
        {title !== "Dashboard" ? (
          <>
            <div className="flex items-center border py-2 px-3 rounded">
              <div className="flex items-center gap-2 px-3 cursor-pointer rounded-sm bg-white text-gray-200 text-[14px] font-[400]">
                Expense
              </div>
              <div className="flex items-center gap-2 px-3 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[600]">
                Members
              </div>
            </div>
            {/* <div>
              <div className="border flex items-center gap-2 py-1 px-3 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[400]">
                <FaCirclePlus />
                New
              </div>
            </div> */}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
