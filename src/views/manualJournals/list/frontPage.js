"use client";

import React from "react";
import { CirclePlay } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FrontPage() {
  return (
    <div className="flex flex-col items-center justify-center h-120 p-5 gap-6">
      {/* Top Info Section */}
      <div className="flex items-center gap-4 bg-amber-50 border h-50  p-15 rounded-lg md:hover:border-amber-100">
        <CirclePlay size={32} className="text-black" />
        <div className="pl-3 border-l-4 border-black">
          <img
            src="/hr360-logo-copy.png"
            alt="Logo"
            className="w-20 mb-1"
          />
          <p className="font-medium">How to create manual journals</p>
        </div>
      </div>

      {/* Description */}
      <div className="text-center space-y-1">
        <p className="text-gray-700 font-medium">Start making journal entries.</p>
        <p className="text-gray-600 text-sm">You can transfer & adjust money between accounts.</p>
      </div>

      {/* Button */}
      <Link href="/dashboard/manual-journals/new-manualjournals">
        <Button className="px-6 py-2 mt-2">Create New Journals</Button>
      </Link>
    </div>
  );
}
