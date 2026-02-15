"use client";

import React, { useState, useEffect } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import moment from "moment";
import Link from "next/link";

const initialFormData = {
  date: moment().format("YYYY-MM-DD"),
  requisitionBy: "Admin User",
  department: "Sweet Factory 1",
  requisitionNo: "REQ-SF1-" + moment().format("YYYYMM") + "-XXXX",
  subject: "",
};

const initialItems = [
  { id: 1, name: "বড় বক্স", packSize: "", quantity: 0, unit: "Box", rate: 6.0, amount: 0.0 },
  { id: 2, name: "১০ x ১০ পলিথিন", packSize: "", quantity: 0, unit: "Box", rate: 25.0, amount: 0.0 },
  { id: 3, name: "ছোট বক্স", packSize: "", quantity: 0, unit: "Box", rate: 4.5, amount: 0.0 },
  { id: 4, name: "Potato", packSize: "", quantity: 0, unit: "kg", rate: 45, amount: 0 },
];

export default function RequisitionForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [items, setItems] = useState(initialItems);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (idx, field, value) => {
    const updatedItems = [...items];
    updatedItems[idx][field] = value;

    if (field === "quantity" || field === "rate") {
      const gty = parseFloat(updatedItems[idx].quantity) || 0;
      const rate = parseFloat(updatedItems[idx].rate) || 0;
      updatedItems[idx].amount = gty * rate;
    }

    setItems(updatedItems);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    // Logic to "Save" data
    const requisitionData = { ...formData, items, totalAmount };
    console.log("Create Requisition:", requisitionData);
    
    // Show success message
    toast.success("Requisition Saved Successfully!");

    // Refresh/Reset the form
    setFormData({
        ...initialFormData,
        date: moment().format("YYYY-MM-DD") // Ensure date is fresh today
    });
    setItems(initialItems);
  };

  return (
    <div className="bg-[#fbfcff] min-h-screen p-4 md:p-8 pb-32">
      {/* --- FORM HEADER --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 transition-all hover:shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                Create Requisition
              </h1>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase tracking-wider">
                New Order
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {formData.requisitionNo}
              </span>
            </div>
          </div>      

        <div className="flex gap-4">
            <HrInput
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              />
            <HrInput
              label="Requisition By"
              name="requisitionBy"
              value={formData.requisitionBy}
              onChange={handleInputChange}
              placeholder="Admin User"
               />
        </div>
      </div>

      {/* --- ITEM TABLE --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 p-4">
        <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-4 py-5 text-[10px] font-black  border text-center">
                  SL
                </th>
                <th className="px-6 py-5 text-[10px] font-black border ">
                  ITEM DESCRIPTION
                </th>
                <th className="px-6 py-5 text-[10px] font-black border ">
                  PACK SIZE
                </th>
                <th className="px-4 py-5 text-[10px] font-black border text-center w-[120px]">
                  QUANTITY
                </th>
                <th className="px-4 py-5 text-[10px] font-black border text-center w-[100px]">
                  UNIT
                </th>
                <th className="px-4 py-5 text-[10px] font-black border text-right w-[140px]">
                  RATE
                </th>
                <th className="px-6 py-5 text-[10px] font-black border text-right w-[160px]">
                  TOTAL AMOUNT
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  className="border "
                >
                  <td className="p-2 border text-sm text-center">
                    {(index + 1).toString().padStart(2, '0')}
                  </td>
                  <td className="p-2 border text-sm min-w-[300px]">
                    {item.name}
                  </td>
                  <td className="p-2 border min-w-[180px]">
                    <HrInput
                      value={item.packSize}
                      onChange={(e) => handleItemChange(index, "packSize", e.target.value)}
                      placeholder="e.g., 25kg/Bag"
                    />
                  </td>
                  <td className="p-2 border">
                    <HrInput
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    />
                  </td>
                  <td className="p-2 border text-center text-sm">
                    {item.unit}
                  </td>
                  <td className="p-2 border">
                    <HrInput
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                    />
                  </td>
                  <td className="p-2 border text-right">
                    {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody> 
            <tfoot>
              <tr>
                <td colSpan={6} className="text-right font-bold pr-4 py-2">
                  Total Amount:
                </td>
                <td className="text-right font-bold pr-4 py-2">
                  {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
            </tfoot>          
          </table>      
      </div>
        <div className="flex items-center gap-4 w-full justify-end mr-4">
          <Button>
            <Link href="/dashboard/requisition">
            Cancel
            </Link>
          </Button>
          <Button
            onClick={handleSubmit}>
            Save Requisition
          </Button>
        </div>
        </div>

  );
}
