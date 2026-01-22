import React from "react";
import NewPurchaseOrderPage from "@/views/crm/purchaseOrders/list/index";
import Table from "@/views/crm/purchaseOrders/list/table";
export default function PurchaseOrdersPage() {
  return (
    <div>
      <NewPurchaseOrderPage />
      <Table />
    </div>
  );
}