"use client";

import { useState, useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Close sidebar on wider screens by default
  useEffect(() => {
    const handleResize = () => {
      const isPosOrPackages = pathname?.includes('/dashboard/pos') || pathname?.includes('/dashboard/packeges');
      
      if (isPosOrPackages) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(window.innerWidth >= 1024);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  // Close sidebar automatically when navigating to POS or Packages
  useEffect(() => {
    if (pathname?.includes('/dashboard/pos') || pathname?.includes('/dashboard/packeges')) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  // This would normally check for authentication
  const isAuthenticated = true;

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex-grow flex flex-col overflow-hidden ">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-3 sm:p-3 md:p-3 ">
          {children}
        </main>
      </div>
    </div>
  );
}
