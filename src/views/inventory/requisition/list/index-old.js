"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import RequisitionTable from "./requisitionTable";
import RequisitionEditModal from "./RequisitionEditModal";

// Mock Data for demonstration matching the image
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
        product_name: "গুঁড়া দুধ (PURE)aa",
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

export default function RequisitionList() {
  const router = useRouter();
  const [requisitions, setRequisitions] = useState(mockRequisitions);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRequisition, setSelectedRequisition] = useState(null);

  const handleEdit = (requisition) => {
    setSelectedRequisition(requisition);
    setIsEditModalOpen(true);
  };

  const handleDelete = (requisition) => {
    setRequisitions(prev => prev.filter(r => r.id !== requisition.id));
  };

  const handleApprove = (requisition) => {
    setRequisitions(prev => 
      prev.map(r => r.id === requisition.id ? { ...r, is_approved: 1 } : r)
    );
  };

  const handleSettle = (requisition) => {
    console.log("Settle:", requisition);
  };

  const handleCreatePurchase = (requisition) => {
    router.push(`/dashboard/purchase-order?requisitionId=${requisition.id}`);
  };

  return (
    <div className="p-4 bg-white/50 min-h-screen space-y-4">
      {/* Table Section */}
      <div className="pb-10">
        <RequisitionTable 
          data={requisitions} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          onApprove={handleApprove}
          onSettle={handleSettle}
          onCreatePurchase={handleCreatePurchase}
        />
      </div>

      {/* Edit Modal */}
      {selectedRequisition && (
        <RequisitionEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          requisition={selectedRequisition}
        />
      )}
    </div>
  );
}
