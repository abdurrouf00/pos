import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const columns = (handleEdit, handleDelete) => {
  const columns = [
    {
      header: "#SL",
      body: (row, { rowIndex }) => <span>{rowIndex + 1}</span>,
      style: {
        width: "100px",
        textAlign: "center",
      },
      sortable: false,
      filter: false,
    },
    {
      field: "name",
      header: "Name",
      sortable: true,
    },
    {
      field: "leave_policy_group.name",
      header: "Leave Policy",
      sortable: true,
      body: (rowData) => <span className="capitalize">{rowData.leave_policy_group?.name}</span>,
    },

    {
      header: "Actions",
      sortable: false,
      body: (rowData) => (
        <div className="flex gap-2">
          <>
            <>
              <Button
                variant={"outline-success"}
                onClick={() => handleEdit(rowData)}
                className=""
                size={"sm"}
              >
                <Pencil size={10} />
              </Button>
              <Button
                variant={"outline-destructive"}
                onClick={() => handleDelete(rowData)}
                className=""
                size={"sm"}
              >
                <Trash2 className="text-xs" />
              </Button>
            </>



          </>
        </div>
      ),
      style: { width: "100px" },
    },
  ];

  return columns;
};