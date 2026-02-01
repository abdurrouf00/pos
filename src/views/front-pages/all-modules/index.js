"use client"
import { setLocal } from '@/lib/utils'
import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const ModuleScreen = () => {
  const menus = useSelector((state) => state.user.menus);

  const modules = [
    {
      name: "Common Setings",
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="14" width="44" height="36" rx="6" fill="#282560" />
          <rect x="16" y="20" width="32" height="24" fill="#F49420" />
          <circle cx="24" cy="32" r="4" fill="#282560" />
          <circle cx="32" cy="32" r="4" fill="#282560" />
          <circle cx="40" cy="32" r="4" fill="#282560" />
          <path d="M18 48H46" stroke="#F49420" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "Restaurant",
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 16C20 16 28 8 32 8C36 8 44 16 44 16" stroke="#F49420" strokeWidth="6" strokeLinecap="round" />
          <circle cx="32" cy="28" r="12" fill="#282560" />
          <path d="M26 34L38 34M24 40H40" stroke="#F49420" strokeWidth="5" strokeLinecap="round" />
          <rect x="18" y="48" width="28" height="8" rx="2" fill="#282560" />
        </svg>
      )
    },    
    {
      name: "CRM",
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 12C22 12 14 20 14 30C14 40 22 48 32 48C42 48 50 40 50 30C50 20 42 12 32 12Z" fill="#282560" />
          <path d="M24 36C24 36 28 42 32 42C36 42 40 36 40 36" stroke="#F49420" strokeWidth="5" strokeLinecap="round" />
          <circle cx="26" cy="28" r="4" fill="#F49420" />
          <circle cx="38" cy="28" r="4" fill="#F49420" />
        </svg>
      )
    },
    {
      name: "Accounts",
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="16" width="40" height="32" rx="4" fill="#282560" />
          <path d="M18 24H46M18 32H46M18 40H46" stroke="#F49420" strokeWidth="4" strokeLinecap="round" />
          <circle cx="32" cy="8" r="6" fill="#F49420" />
        </svg>
      )
    },
    {
      name: "Inventory",
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="14" y="12" width="36" height="40" rx="4" fill="#282560" />
          <rect x="20" y="18" width="24" height="10" fill="#F49420" />
          <rect x="20" y="32" width="24" height="10" fill="#F49420" />
          <path d="M32 52L38 58H26L32 52Z" fill="#F49420" />
        </svg>
      )
    },
    {
      name: "Payroll",
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="24" fill="#F49420" />
          <path d="M20 24H44V40H20V24Z" fill="#282560" />
          <path d="M26 30H38M26 34H38" stroke="#F49420" strokeWidth="4" strokeLinecap="round" />
          <circle cx="32" cy="48" r="4" fill="#282560" />
        </svg>
      )
    },
    {
      name: "Attendance",
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="26" stroke="#282560" strokeWidth="6" />
          <path d="M32 12V32L44 40" stroke="#F49420" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="19" y="50" width="26" height="8" rx="2" fill="#282560" />
        </svg>
      )
    },
    {
      name: "HRM",
       label: "Employee",
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="20" r="12" fill="#F49420" />
          <path d="M32 36C20.4 36 11 45.4 11 57H53C53 45.4 43.6 36 32 36Z" fill="#282560" />
          <path d="M20 20C20 13.37 25.37 8 32 8C38.63 8 44 13.37 44 20H20Z" fill="#F49420" />
        </svg>
      )
    },
    {
      name: "POS",
      label: "POS (Point of Sale)",
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="14" y="10" width="36" height="44" rx="6" fill="#282560" />
          <rect x="20" y="18" width="24" height="12" fill="#F49420" />
          <path d="M32 36V46M26 46H38" stroke="#F49420" strokeWidth="4" strokeLinecap="round" />
          <circle cx="32" cy="54" r="4" fill="#F49420" />
        </svg>
      )
    }
  ];

  const storeModuleId = (moduleId) => {
    setLocal("moduleId", moduleId);
  };

  const getMenuId = (name) => {
    if (!menus) return null;
    // Map some common names that might differ
    const nameMap = {
      "Accounts": "Accounting",
      "Payroll": "Pay Roll",
      "HRM": "Employee"
    };
    const searchName = nameMap[name] || name;

    const match = menus.find(m =>
      m.menu_name.toLowerCase().trim() === searchName.toLowerCase().trim() ||
      m.menu_uid.toLowerCase().trim() === searchName.toLowerCase().trim()
    );
    return match?.id;
  };

  return (
    <div className="min-h-[calc(100vh-70px)] w-full bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#282560] mb-3">Modules</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {modules.map((module, index) => {
            const menuId = getMenuId(module.name);
            return (
              <Link
                href={menuId ? "/dashboard" : "/"}
                key={index}
                onClick={() => {
                  if (menuId) storeModuleId(menuId);
                }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-5 md:p-8 flex flex-col items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 border border-blue-50 group-hover:border-[#282560]/10 h-full">
                  <div className="mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {module.icon}
                  </div>
                  <span className="text-sm font-bold text-center text-[#282560] group-hover:text-[#F49420] transition-colors duration-300">
                    {module.label || module.name}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ModuleScreen
