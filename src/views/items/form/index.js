"use client";

import HrInput from "@/components/common/HrInput";
import HrModal from "@/components/common/HrModal";
import HrSelect, { mapOptions } from "@/components/common/HrSelect";
import HrSwitch from "@/components/common/HrSwitch";
import { Button } from "@/components/ui/button";
import { useGetAccountHeadsByQueryQuery } from "@/views/account-head/store";
import { useEffect, useState } from "react";
import { useAddItemMutation, useGetItemByIdQuery, useUpdateItemMutation } from "../store";
import UILoading from "@/components/ui/UILoading";
import toast from "react-hot-toast";

const initialFormData = {
  item_type: "1",
  name: "",
  sku: "",
  purchase_head_id: '',
  sales_head_id: '',
  purchase_price: '',
  sales_price: '',
  track_inventory: '0',
  quantity_on_hand: '',
}
export default function ProductSalesPurchaseForm({ toggle, setOpenForm, editId, setEditId }) {
  const [formData, setFormData] = useState(initialFormData);
  const { data: accountHeads, isLoading: accountHeadsLoading } = useGetAccountHeadsByQueryQuery();
  console.log("accountHeads", accountHeads);
  const [addItem, { isLoading: isAddingItem }] = useAddItemMutation();
  const { data: itemData, isLoading: itemDataLoading } = useGetItemByIdQuery(editId, { skip: !editId });
  console.log("itemData", itemData);
  const [updateItem, { isLoading: isUpdatingItem }] = useUpdateItemMutation();
  const [selectedSections, setSelectedSections] = useState({
    sales: true,
    purchase: true,
  });
  useEffect(() => {
    if (itemData) {
      setFormData({ ...itemData?.data, item_type: itemData?.data?.item_type.toString() });
    }
  }, [itemData]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSectionChange = (e) => {
    const { name, checked } = e.target;
    setSelectedSections({ ...selectedSections, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    const submittedData = {
      ...formData,
      sales_head_id: +formData.sales_head_id,
      purchase_head_id: +formData.purchase_head_id,
      sales_price: +formData.sales_price,
      purchase_price: +formData.purchase_price,
      quantity_on_hand: +formData.quantity_on_hand,
      track_inventory: formData.track_inventory ? 1 : 0,
      item_type: +formData.item_type,
      ...(editId ? { id: editId } : {}),
    }
    console.log('submittedData', JSON.stringify(submittedData, null, 2))
    const action = editId ? updateItem(submittedData) : addItem(submittedData);
    action.unwrap().then(res => {
      console.log("res", res);
      if (res.success) {
        toast.success(editId ? "Item updated successfully" : "Item added successfully");
        setOpenForm(false);
        setEditId(null);
      }
    });
  };
  const handleSwitch = (value, name) => {
    setFormData({ ...formData, [name]: value ? 1 : 0 });
  }
  const handleModalClose = () => {
    setOpenForm(false);
    setEditId(null);
  }
  const accountHeadOptions = mapOptions(accountHeads?.data || [])
  return (
    <HrModal onClose={handleModalClose} toggle={toggle} setToggle={setOpenForm} title={editId ? "Edit Item" : "Add Item"}>
      <UILoading loading={accountHeadsLoading || itemDataLoading}>
        <div>
          {/* Header */}


          {/* Form */}
          <div className="w-full text-sm   ">
            <form onSubmit={handleSubmit} className=" w-full space-y-5">

              {/* Product Information */}
              <div className="space-y-6 ">
                <div className="flex items-center gap-4">
                  <label className="w-32">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="item_type"
                        value="1"
                        checked={formData.item_type === "1"}
                        onChange={handleChange}
                      />
                      Goods
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="item_type"
                        value="2"
                        checked={formData.item_type === "2"}
                        onChange={handleChange}
                      />
                      Service
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <HrInput
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    label="Name"
                  />
                  <HrInput
                    name="sku"
                    type="text"
                    value={formData.sku}
                    onChange={handleChange}
                    label="SKU"
                  />

                </div>
              </div>


              {/* Sales & Purchase Section */}
              <div className="">
                {/* Sales Section */}
                <div className="flex-1 space-y-4">
                  <HrSelect
                    name="purchase_head_id"
                    value={formData.purchase_head_id}
                    onChange={handleChange}
                    placeholder="Select Purchase Head"
                    options={accountHeadOptions}
                    label="Purchase Head"
                  />
                  <HrInput
                    name="purchase_price"
                    type="number"
                    value={formData.purchase_price}
                    onChange={handleChange}
                    label="Purchase Price (BDT)"
                  />
                  <HrSelect
                    name="sales_head_id"
                    value={formData.sales_head_id}
                    onChange={handleChange}
                    placeholder="Select Sales Head"
                    options={accountHeadOptions}
                    label="Sales Head"
                  />
                  <HrInput
                    name="sales_price"
                    type="number"
                    value={formData.sales_price}
                    onChange={handleChange}
                    label="Sales Price (BDT)"
                  />
                  <HrSwitch
                    name="track_inventory"
                    value={formData.track_inventory}
                    onChange={(value) => handleSwitch(value, 'track_inventory')}
                    label="Track Inventory"
                  />
                  <HrInput
                    name="quantity_on_hand"
                    type="number"
                    value={formData.quantity_on_hand}
                    onChange={handleChange}
                    label="Quantity On Hand"
                  />


                </div>


              </div>

              {/* Submit Button */}
              <div className="">
                <Button type="submit" className={'w-full'} disabled={isAddingItem || isUpdatingItem}>{isAddingItem || isUpdatingItem ? "Saving..." : "Save"}</Button>
              </div>
            </form>
            <div className="my-8 border-t border-gray-300"></div>

            <p className="text-xs text-gray-600 pl-10 pb-30 pt-10">
              Do you want to keep track of this item? Enable Inventory to view its stock based on the sales
              and purchase transactions you record for it. Go to <strong>Settings ➡ Preferences ➡ Items</strong> and enable inventory.
            </p>

          </div>
        </div>
      </UILoading>
    </HrModal>
  );
}
