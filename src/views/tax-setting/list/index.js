'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TaxSettingForm from "../form";
import { useDeleteTaxSettingMutation, useGetTaxSettingsQuery } from "../store";
import DataTable from "@/components/common/DataTable";
import { taxSettingColumn } from "./column";
import toast from "react-hot-toast";
import { confirmDialog, confirmObj } from "@/lib/utils";
export default function TaxSettingList() {
  const [openModal, setOpenModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const { data: taxSettings, isLoading } = useGetTaxSettingsQuery();
  const [deleteTaxSetting] = useDeleteTaxSettingMutation();
console.log('taxSettings', taxSettings)
  const extraField = () => {
    return (
      <Button onClick={() => setOpenModal(true)} 
      size="sm">Add New</Button>
    )
  }
  const handleEdit = (rowData) => {
    setEditId(rowData.id)
    setOpenModal(true)
  }
  const handleDelete = (rowData) => {
    confirmDialog(confirmObj).then(async e => {
      if (e.isConfirmed) {
        const toastId = toast.loading('Deleting...')
       const res = await deleteTaxSetting(rowData.id).unwrap();
       if (res.success) {
        toast.dismiss(toastId)
        toast.success('Tax setting deleted successfully');
       } else {
        toast.dismiss(toastId)
        toast.error('Failed to delete tax setting');
       }
      }
    })
  }
  return (
    <div>
        
        <DataTable
              data={taxSettings?.data?.data || []}
              columns={taxSettingColumn(handleEdit, handleDelete)}
              globalFilterFields={['name']}
              emptyMessage="No tax settings found."
              rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
              showGlobalFilter={true}
              globalFilterPlaceholder="Type here to search..."
              extraField={extraField()}
              loading={isLoading}
              className="custom_datatable"
            />
            {openModal && <TaxSettingForm 
            toggle={openModal} 
            setToggle={setOpenModal}
             editId={editId} 
             setEditId={setEditId} />}
    </div>
  )
}