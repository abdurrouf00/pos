"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { customerColumn } from "./column";
import DataTable from "@/components/common/DataTable";
import { useState } from "react";

export default function SecondHeader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);


  const title = pathname
    ?.split('/')
    ?.pop()
    ?.replace(/^\w/, c => c.toUpperCase()) || '';

  return (
    <div className="">

      <div className="w-full">
        <div className="p-2 bg-white shadow-lg w-full py-4">
          <div className="mb-2 flex justify-end">
            <Link href="/dashboard/customers/new-customer">
              <Button>
                <span className="text-2xl">+</span> New
              </Button>
            </Link>
          </div>
          <DataTable
            data={customers}
            columns={customerColumn()}
            globalFilterFields={['name', 'description', 'status']}
            emptyMessage="No customers found."
            rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
            showGlobalFilter={true}
            globalFilterPlaceholder="Type here to search..."
            // extraField={extraField()}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
