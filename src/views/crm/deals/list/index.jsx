"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SecondHeader() {
  const pathname = usePathname();

  const title = pathname
    ?.split('/')
    ?.pop()
    ?.replace(/^\w/, c => c.toUpperCase()) || '';

  return (
    <div className="border border-gray-100 bg-white  px-4 pr-10 rounded">
      <div className="flex items-center justify-between h-10 md:h-12  ">
        <div className="   hover:bg-gray-100 font-bold text-2xl p-2 rounded">All {title}</div>
          <>
          <Link href="/dashboard/deals/new-deal">
           <Button>
            <span className="text-2xl">+</span> New
           </Button>
          </Link>
          </>
      </div>
    </div>
  );
}
