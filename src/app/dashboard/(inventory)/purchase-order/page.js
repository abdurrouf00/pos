"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import PurchaseOrderCreate from "@/views/inventory/purchase-order/purchaseOrderCreate";
import PurchaseOrderList from "@/views/inventory/purchase-order/list/index";
import NewPurchase from "@/views/inventory/purchase-order/form/newPurchase";

function PurchaseOrderPageContent() {
  const searchParams = useSearchParams();
  const requisitionId = searchParams.get("requisitionId");

  return (
    <>
      
      {requisitionId ? (
        
          
          <PurchaseOrderCreate />
        
      ) : (
        <>
        <NewPurchase />
        <PurchaseOrderList />
        </>
      )}
    </>
  );
}

export default function PurchaseOrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseOrderPageContent />
    </Suspense>
  );
}
