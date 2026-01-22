export const loanInstallmentsColumn = (handleInfo) => {
  const columns = [
    {
      field: "name",
      header: "Name",
      sortable: true,
    },
    {
      field: "department_id",
      header: "Department",
      sortable: true,
    },
    {
      field: "designation_id",
      header: "Designation",
      sortable: true,
    },
    {
      field: "amount",
      header: "Amount",
      sortable: true,
    },
    {
      field: "date",
      header: "Date",
      sortable: true,
    },
  ];

  return columns;
};
