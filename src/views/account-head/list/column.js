import { Button } from "@/components/ui/button";
import { Info, Trash2 } from "lucide-react";

export const accountHeadColumn = (handleDelete, handleInfo) => {
  const columns = [
    {
      field: 'account_name',
      header: 'Name',
      sortable: true,
      body: (rowData) => (
        <div>
          {/* <Link href={`/dashboard/account-heads/details?id=${rowData.id}`}> */}
            {rowData.account_name}
          {/* </Link> */}
        </div>
      ),
    },
    {
      field: 'acc_type.name',
      header: 'Account Type',
      sortable: true,
      body: (rowData) => (
        <div>
          {rowData?.account_type?.name}
        </div>
      ),
    },
    {
      field: 'parent_head.name',
      header: 'Parent Head',
      sortable: true,
    },
    {
      field: 'code',
      header: 'Code',
      sortable: true,
      body: (rowData) => (
        <div>
          {rowData.code}
        </div>
      ),
    },

    {
      field: 'opening_balance',
      header: 'Opening Balance',
      sortable: true,
    },
    // {
    //     field: 'status',
    //     header: 'Status',
    //     sortable: true,
    //     body: (rowData) => (
    //         <span className={`px-2 py-1 rounded-full text-xs ${
    //             rowData.status === 'active'
    //                 ? 'bg-green-100 text-green-800'
    //                 : 'bg-red-100 text-red-800'
    //         }`}>
    //             {rowData.status}
    //         </span>
    //     ),
    // },
    {
      header: 'Actions',
      sortable: false,
      body: (rowData) => (
        <div className="flex gap-2">
          <Button
            onClick={() => handleDelete(rowData)}
            className="bg-white hover:bg-white cursor-pointer"
          >
            <Trash2 className="text-red-700" />
          </Button>
          <Button
            onClick={() => handleInfo(rowData)}
            className="bg-white hover:bg-white cursor-pointer"
          >
            <Info className="text-gray-500 w-4 h-4" />
          </Button>
        </div>
      ),
      style: { width: '100px' },
    },
  ];

  return columns;
};