import { Button } from "@/components/ui/button";

export const expenseColumn = (handleDelete, handleInfo) => {
  const columns = [
    {
      field: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      field: 'date',
      header: 'Date',
      sortable: true,
    },

    {
      field: 'amount',
      header: 'Amount',
      sortable: true,
    },

    {
      field: 'amount_is',
      header: 'Amount Is',
      sortable: true,
    },

    {
      field: 'paid_through',
      header: 'Paid Through',
      sortable: true,
    },

    {
      field: 'vendor',
      header: 'Vendor',
      sortable: true,
    },

    {
      field: 'reference',
      header: 'Reference',
      sortable: true,
    },

    {
      field: 'customer',
      header: 'Customer',
      sortable: true,
    },
    {
      header: 'Actions',
      sortable: false,
      body: (rowData) => (
        <div className="flex gap-2">
          <Button onClick={() => handleDelete(rowData)}>Delete</Button>
        </div>
      ),
    },
  ];
  return columns;
};
