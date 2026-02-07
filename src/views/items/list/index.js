import { Button } from "@/components/ui/button";
import { key_status_options } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Eye, Fingerprint, Trash2 } from "lucide-react";
import Link from "next/link";
import { AiOutlineProfile } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuUserPlus } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";


export const itemColumn = (handleInfo, handleDelete) => {
  const contractStyles = {
    yellow: "bg-yellow-100 text-yellow-600",
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-600",
  };
  const columns = [
    {
      header: "Actions",
      body: (rowData) => (
        <div className="flex gap-1 justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <span className="inline-block px-2 py-1">
                <HiOutlineDotsVertical />
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-40 px-2">
              <h4 className="text-xs text-gray-500 font-medium px-1">Actions</h4>
              <div className="pt-1 ">

                <Button className={'text-xs w-full pl-1 justify-start'} variant="ghost" onClick={() => handleInfo(rowData)}>
                  <Eye /> Details
                </Button>
                <Button variant={'ghost'} className={'text-xs w-full pl-1 justify-start'} onClick={() => handleDelete(rowData)}>
                  <Trash2 /> Delete
                </Button>
                {/* <Button className={'text-xs w-full pl-1 justify-start'} variant="ghost" onClick={() => handleChangeStatus(rowData)}>
                  <FaRegUser size={10} /> Change Status
                </Button>
                {rowData.user ? null : <Button className={'text-xs w-full pl-1 justify-start'} variant="ghost" onClick={() => handleCreateUser(rowData)}>
                  <LuUserPlus /> Create User
                </Button>}
                <Button className={'text-xs w-full pl-1 justify-start'} variant="ghost" onClick={() => handleFingerprint(rowData)}>
                  <Fingerprint /> Fingerprint
                </Button> */}
              </div>

            </PopoverContent>
          </Popover>

        </div>
      ),
      sortable: false,
      filter: false
    },
    {
      field: "name",
      header: "Name",
      sortable: true,
      filter: false,
    },
    {
      field: "sku",
      header: "SKU",
      sortable: true,
      filter: false,
    },


    {
      field: "quantity_on_hand",
      header: "Remaining Stock",
      sortable: true,
      filter: false,
    },
    {
      field: "purchase_price",
      header: "Purchase Price",
      sortable: true,
      filter: false,
    }

  ];

  return columns;
};
