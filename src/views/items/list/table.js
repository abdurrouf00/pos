"use client";

import { useEffect, useState } from "react";
import RRR, { itemColumn } from "./index"; // যদি খালি থাকে দেখাতে চাই
import DataTable from "@/components/common/DataTable";
import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import ProductSalesPurchaseForm from "../form";
import { useDeleteItemMutation, useGetItemsQuery } from "../store";
import toast from "react-hot-toast";
import { confirmDialog, confirmObj } from "@/lib/utils";

export default function ItemsTable() {
  const [selected, setSelected] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteItem, { isLoading: isDeletingItem }] = useDeleteItemMutation();
  const { data: items, isLoading: isLoadingItems } = useGetItemsQuery();
  console.log('items', items);
  // Load items from localStorage


  // Checkbox toggle
  const handleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Select / Deselect All
  const handleSelectAll = () => {
    if (selected.length === items.length) {
      setSelected([]);
    } else {
      setSelected(items.map((_, i) => i));
    }
  };

  const handleDelete = (rowData) => {
    confirmDialog(confirmObj).then(async (e) => {
      if (e.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        deleteItem(rowData?.id).then(res => {
          if (res?.data?.success) {
            toast.dismiss(toastId);
            toast.success("Deleted successfully");
          } else {
            toast.dismiss(toastId);
            toast.error("Failed to delete");
          }
        })


      }
    });

  };
  // Show RRR if no items
  // if (items.length === 0) return <RRR />;
  const extraField = () => {
    return (
      <div className="flex items-center gap-2">


        <button onClick={() => setOpenForm(true)} className="border flex items-center gap-2 py-1 px-3 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[400]">
          <FaCirclePlus />
          New
        </button>


      </div>
    );
  };

  const handleDetails = (rowData) => {
    setOpenForm(true);
    setEditId(rowData?.id);
  }


  return (
    <div className="p-5  bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Items List</h2>
        {selected.length > 0 && (
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete Selected ({selected.length})
          </button>
        )}
      </div>

      <div className="overflow-x-auto w-full">
        <DataTable
          data={items?.data?.data}
          columns={itemColumn(handleDetails, handleDelete)}
          emptyMessage="No items found."
          rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
          showGlobalFilter={true}
          globalFilterPlaceholder="Type here to search..."
          extraField={extraField()}
          className="custom_datatable"
        // onPage={handlePage}
        // rows={perPage}
        // loading={loading}
        // page={currentPage}
        // first={firstRow}
        // totalRecords={totalPages}
        // lazy
        // paginator
        />
      </div>
      {openForm && <ProductSalesPurchaseForm toggle={openForm} setOpenForm={setOpenForm} editId={editId} setEditId={setEditId} />}
    </div>
  );
}
