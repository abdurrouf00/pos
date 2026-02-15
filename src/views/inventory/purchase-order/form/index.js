"use client";

import React, { useState, useEffect } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function PurchaseOrderForm({ requisitionData }) {
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [vatPercent, setVatPercent] = useState(0);

  useEffect(() => {
    const baseItems = requisitionData?.details || [
      {
        id: "static-1",
        product_name: "বড় বক্স",
        unit: "BOX",
        requisition_qty: 10,
        received_qty: 3,
      }
    ];

    setItems(
      baseItems.map((d) => {
        // Pre-filling some static data for demonstration
        const pQty = 7; // Matching the 7 pending qty from the image
        const pUnit = 1;
        const noPack = pUnit !== 0 ? (pQty / pUnit).toFixed(2) : 0;
        const rate = 6.00; // Matching the 6.00 rate from the image
        
        return {
          ...d,
          supplier: "A",
          packaging_qty: pQty,
          packaging_unit: d.unit,
          pack_unit_qty: pUnit,
          no_pack: noPack,
          rate_per_pack: rate,
          amount: parseFloat(noPack) * rate,
        };
      })
    );
  }, [requisitionData]);

  const handleItemChange = (idx, field, value) => {
    const updatedItems = [...items];
    const item = updatedItems[idx];
    item[field] = value;

    // Logic: 
    // 1. If Packaging Qty or Pack Unit changes, update No Pack
    if (field === "packaging_qty" || field === "pack_unit_qty") {
      const pQty = parseFloat(item.packaging_qty) || 0;
      const pUnit = parseFloat(item.pack_unit_qty) || 0;
      item.no_pack = pUnit !== 0 ? (pQty / pUnit) : 0;
    }

    // 2. If No Pack or Rate/Pack changes, update AMT
    if (field === "no_pack" || field === "rate_per_pack" || field === "packaging_qty" || field === "pack_unit_qty") {
      const noPack = parseFloat(item.no_pack) || 0;
      const rate = parseFloat(item.rate_per_pack) || 0;
      item.amount = noPack * rate;
    }

    setItems(updatedItems);
  };

  const itemsTotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const vatAmount = (itemsTotal * (parseFloat(vatPercent) || 0)) / 100;
  const discountVal = parseFloat(discount) || 0;
  const grandTotal = itemsTotal + vatAmount - discountVal;

  const supplierOptions = [
    { label: "Select Supplier", value: "" },
    { label: "Supplier A", value: "A" },
    { label: "Supplier B", value: "B" },
  ];

  return (
    <div className="bg-white min-h-screen p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1200px] border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 border">
              <th className="px-3 py-2 text-[10px] font-black text-gray-900 border-r border-gray-200 text-center w-[50px]">SL</th>
              <th className="px-4 py-2 text-[10px] font-black text-gray-900 border-r border-gray-200">PRODUCT NAME</th>
              <th className="px-3 py-2 text-[10px] font-black text-gray-900 border-r border-gray-200 text-center">UNIT</th>
              <th className="px-3 py-2 text-[10px] font-black text-gray-900 border-r border-gray-200 text-center">REQ. QTY</th>
              <th className="px-3 py-2 text-[10px] font-black text-gray-900 border-r border-gray-200 text-center">REC. QTY</th>
              <th className="px-3 py-2 text-[10px] font-black text-orange-600 border-r border-gray-200 text-center bg-orange-50/30">PEN. QTY</th>
              <th className="px-4 py-2 text-[10px] font-black text-gray-900 border-r border-gray-200">SUPPLIER</th>
              <th className="px-2 py-2 text-[9px] font-black text-gray-900 border-r border-gray-200 text-center w-[100px]">QTY</th>
              <th className="px-2 py-2 text-[9px] font-black text-gray-900 border-r border-gray-200 text-center w-[70px]">UNIT</th>
              <th className="px-2 py-2 text-[9px] font-black text-gray-900 border-r border-gray-200 text-center w-[100px]">PACK UNIT</th>
              <th className="px-2 py-2 text-[9px] font-black text-gray-900 border-r border-gray-200 text-center w-[100px]">NO PACK</th>
              <th className="px-2 py-2 text-[9px] font-black text-gray-900 border-r border-gray-200 text-center w-[120px]">RATE/PACK</th>
              <th className="px-2 py-2 text-[9px] font-black text-gray-900 text-center w-[130px]">AMT.</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                <td className="px-3 py-2 text-sm text-center border">{index + 1}</td>
                <td className="px-4 py-2 text-sm border">{item.product_name}</td>
                <td className="px-2 py-2 text-center border">-</td>
                <td className="px-3 py-2 text-sm border text-center">{item.unit}</td>
                <td className="px-3 py-2 text-sm border text-center">{item.requisition_qty?.toFixed(3)}</td>
                <td className="px-3 py-2 text-sm border text-center">{item.received_qty?.toFixed(3)}</td>
                <td className="px-3 py-2 text-sm border text-center bg-orange-50/40">
                  {(item.requisition_qty - item.received_qty).toFixed(3)}
                </td>
                <td className="px-4 py-2 border min-w-[180px]">
                  <HrSelect
                    options={supplierOptions}
                    value={item.supplier}
                    onChange={(e) => handleItemChange(index, "supplier", e.target.value)}
                    className="h-10 text-sm border rounded"
                  />
                </td>
                <td className="px-3 py-2 border">
                  <HrInput
                    type="number"
                    value={item.packaging_qty}
                    onChange={(e) => handleItemChange(index, "packaging_qty", e.target.value)}
                    className="h-10 text-center text-[12px] font-black text-blue-900 border-gray-300 rounded"
                    wrapperClassName="mb-0"
                  />
                </td>
                <td className="px-3 py-2 text-sm border text-center">{item.packaging_unit}</td>
                <td className="px-3 py-2 border">
                  <HrInput
                    type="number"
                    value={item.pack_unit_qty}
                    onChange={(e) => handleItemChange(index, "pack_unit_qty", e.target.value)}
                    className="h-10 text-center text-sm rounded"
                    wrapperClassName="mb-0"
                  />
                </td>
                <td className="px-3 py-2 border">
                  <HrInput
                    type="number"
                    value={item.no_pack}
                    onChange={(e) => handleItemChange(index, "no_pack", e.target.value)}
                    className="h-10 text-center text-sm rounded"
                    wrapperClassName="mb-0"
                  />
                </td>
                <td className="px-3 py-2 border">
                  <HrInput
                    type="number"
                    value={item.rate_per_pack}
                    onChange={(e) => handleItemChange(index, "rate_per_pack", e.target.value)}
                    className="h-10 text-right text-sm rounded px-3"
                    wrapperClassName="mb-0"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-right">
                  {item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100">
              <td colSpan="13" className="px-6 py-2 text-sm font-black text-gray-700 text-right uppercase tracking-tighter">Total:</td>
              <td className="px-4 py-2 text-sm font-black text-gray-900 text-right">{itemsTotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-10 flex flex-col items-end gap-4">
        <div className="flex gap-4">
       
             
             <HrInput 
                type="number" 
                label="Items Total"
                readOnly
                value={itemsTotal} 
             />
             <HrInput 
                type="number" 
                label="Discount"
                value={discount} 
                onChange={(e) => setDiscount(e.target.value)}
             />
             <HrInput 
                type="number" 
                label="VAT (%)"
                value={vatPercent} 
                onChange={(e) => setVatPercent(e.target.value)}
             />
             <HrInput 
                type="number" 
                label="Grand Total"
                value={grandTotal} 
                readOnly
                className="bg-gray-50"
             />
          </div>
        </div>
        <div className="fixed bottom-4 right-4 flex gap-4">
          <Link href="/dashboard/requisition">
          <Button>Cancela</Button>
          </Link>
        <Button 
        onClick={() => console.log("Create Purchase Action")}
        >
          Create Purchase
        </Button>
        </div>
      </div>


    
  );
}



