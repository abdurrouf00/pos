"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PurchaseOrderForm from "./form";

// Mock data shared for lookup (in a real app, this would be an API call or Redux)
const mockRequisitions = [
    {
      id: "3",
      requisition_no: "RC:REQ-SF1-202601-0003",
      is_approved: 0,
      status: "PENDING",
      department: { id: 1, name: "Sweet Factory 1" },
      purchase_challan_nos: null,
      details: [
        {
          id: "d1",
          product_name: "গুঁড়া দুধ (PURE)",
          brand: "PURE",
          unit: "KG",
          closing_stock: 0.0,
          requisition_qty: 150.0,
          received_qty: 0.0,
          order_to: "-",
          order_by: "-",
          order_date: "-",
        },
      ],
    },
    {
      id: "2",
      requisition_no: "RC:REQ-SF1-202601-0002",
      is_approved: 1,
      status: "PENDING",
      department: { id: 1, name: "Sweet Factory 1" },
      purchase_challan_nos: null,
      details: [
        {
          id: "d2",
          product_name: "গুঁড়া দুধ (PURE)",
          brand: "PURE",
          unit: "KG",
          closing_stock: 0.0,
          requisition_qty: 10.0,
          received_qty: 0.0,
          order_to: "Admin User",
          order_by: "Admin User",
          order_date: "22/01/2026 15:36",
        },
        {
          id: "d3",
          product_name: "গুঁড়া দুধ (STARSHIP)",
          brand: "STARSHIP",
          unit: "KG",
          closing_stock: 17.0,
          requisition_qty: 5.0,
          received_qty: 0.0,
          order_to: "Admin User",
          order_by: "Admin User",
          order_date: "22/01/2026 15:36",
        },
      ],
    },
    {
      id: "1",
      requisition_no: "RC:REQ-SF1-202601-0001",
      is_approved: 1,
      status: "FULFILLED",
      department: { id: 1, name: "Sweet Factory 1" },
      purchase_challan_nos: "135, 131, 152",
      details: [
        {
          id: "d4",
          product_name: "১০ x ১০ পলিথিন",
          brand: "-",
          unit: "BOX",
          closing_stock: 0.0,
          requisition_qty: 5.0,
          received_qty: 5.0,
          order_to: "Admin User",
          order_by: "Admin User",
          order_date: "22/01/2026 11:14",
        },
        {
          id: "d5",
          product_name: "ছোটটি বক্স",
          brand: "-",
          unit: "BOX",
          closing_stock: 0.0,
          requisition_qty: 2.0,
          received_qty: 2.0,
          order_to: "Admin User",
          order_by: "Admin User",
          order_date: "22/01/2026 11:14",
        },
      ],
    },
];

function PurchaseOrderCreateContent() {
  const searchParams = useSearchParams();
  const requisitionId = searchParams.get("requisitionId");

  const requisition = mockRequisitions.find((r) => r.id === requisitionId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h1 className="text-xl font-black text-gray-800 uppercase tracking-tight">Create Purchase Order</h1>
        {requisition && (
            <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Base Requisition</p>
                <p className="text-xs font-black text-blue-600 underline decoration-blue-200 underline-offset-4">{requisition.requisition_no}</p>
            </div>
        )}
      </div>

      <PurchaseOrderForm requisitionData={requisition} />
    </div>
  );
}

export default function PurchaseOrderCreate() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseOrderCreateContent />
    </Suspense>
  );
}
