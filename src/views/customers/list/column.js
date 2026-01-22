import { Button } from "@/components/ui/button";

export const customerColumn = (handleDelete, handleInfo) => {
  const columns = [
    {
      field: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      field: 'email',
      header: 'Email',
      sortable: true,
    },

    {
      field: 'phone',
      header: 'Phone',
      sortable: true,
    },

    {
      field: 'customer_type',
      header: 'Customer Type',
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
