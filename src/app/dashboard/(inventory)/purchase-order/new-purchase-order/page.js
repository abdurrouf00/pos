"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import PurchaseOrderForm from "@/views/inventory/purchase-order/form/form";

export default function NewPurchaseOrderPage() {
  const searchParams = useSearchParams();
  const requisitionId = searchParams.get("requisitionId") || null;

  return (
    <div>
      <PurchaseOrderForm requisitionId={requisitionId} />
    </div>
  );
}