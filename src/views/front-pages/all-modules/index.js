"use client"
import { setLocal, userData } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { MdDashboard, MdAttachMoney } from 'react-icons/md'
import { AiOutlineTeam, AiOutlineBarChart } from 'react-icons/ai'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const ModuleScreen = () => {
  const menus = useSelector((state) => state.user.menus);
  console.log('local menus', menus);
  const getIcon = (menuUid) => {
    const icons = {
      payroll: <MdAttachMoney size={32} className="text-red-500" />,
      accounting: <AiOutlineBarChart size={32} className="text-purple-400" />,
      humanResourceMangemnt: (
        <AiOutlineTeam size={32} className="text-blue-600" />
      ),
    };
    return (
      icons[menuUid] || <MdDashboard size={32} className="text-gray-400" />
    );
  };

  const storeModuleId = (moduleId) => {
    setLocal("moduleId", moduleId);
  };

  return (
    <div className="min-h-[calc(90vh-70px)] w-full flex flex-col ">
      {/* Top Bar */}


      {/* Main */}
      <div className="flex-1 w-full flex items-center justify-center">
        <div className="w-full px-4 py-8">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Modules</h1>
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {menus
                ?.filter((ff) => ff.menu_name !== "Dashboard")
                ?.map((menuItem) => (
                  <Link
                    href={`/dashboard`}
                    key={menuItem.id}
                    onClick={() => {
                      storeModuleId(menuItem?.id);
                    }}
                    className="w-24 sm:w-28 md:w-32"
                  >
                    <div className="bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200 p-3 flex flex-col items-center justify-center h-24 cursor-pointer">
                      <div className="mb-2">{getIcon(menuItem.menu_uid)}</div>
                      <span className="text-xs font-medium text-center text-gray-700">
                        {menuItem.menu_name}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleScreen