"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AccountForm from "../form/index";
import HrModal from "@/components/common/HrModal";

export default function SecondHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const title = pathname
    ?.split("/")
    ?.filter(Boolean)
    ?.pop()
    ?.replace(/^\w/, (c) => c.toUpperCase()) || "";

  return (
    <div className="border border-gray-100 bg-white px-4 pr-10 rounded">
      <div className="flex items-center justify-between h-10 md:h-12">
        <div className="hover:bg-gray-100 font-bold text-2xl p-2 rounded">All {title}</div>

        <Button onClick={() => setIsOpen(true)}>
          <span className="text-2xl">+</span> New
        </Button>
      </div>


      <HrModal toggle={isOpen} setToggle={setIsOpen}>
        <AccountForm closeForm={() => setIsOpen(false)} />
      </HrModal>
    </div>
  );
}
