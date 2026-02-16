"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetRequisitionByIdQuery } from "../store";
import { ArrowLeft, FileDown } from "lucide-react";

const STATUS_LABELS = { 1: "Draft", 2: "Submitted", 3: "Approved", 4: "Rejected", 5: "Converted to PO", 6: "Cancelled" };
const PRIORITY_LABELS = { 0: "Low", 1: "Normal", 2: "High", 3: "Urgent" };

export default function RequisitionDetail({ id }) {
  const { data, isLoading, error } = useGetRequisitionByIdQuery(id, { skip: !id });

  const requisition = data?.data ?? data;
  const items = requisition?.items ?? [];

  const totalAmount = items.reduce(
    (sum, i) => sum + (Number(i.unit_price) || 0) * (Number(i.requested_qty) || 0),
    0
  );
  const totalQty = items.reduce((sum, i) => sum + (Number(i.requested_qty) || 0), 0);

  const handlePrintPdf = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="bg-[#fbfcff] min-h-screen p-4 md:p-8 flex items-center justify-center">
        <p className="text-gray-500">Loading requisition…</p>
      </div>
    );
  }

  if (error || !requisition) {
    return (
      <div className="bg-[#fbfcff] min-h-screen p-4 md:p-8">
        <p className="text-red-600">Failed to load requisition.</p>
        <Button variant="outline" asChild className="mt-4">
          <Link href="/dashboard/requisition">Back to list</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#fbfcff] min-h-screen p-4 md:p-8 pb-32 requisition-print-container">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          .requisition-print-container { background: #fff !important; padding: 0 !important; }
        }
      `}} />
      <div className="flex items-center gap-4 mb-6 no-print">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/requisition">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Requisition {requisition.requisition_no ?? requisition.id}
          </h1>
          <p className="text-sm text-gray-500">
            {requisition.requisition_date
              ? new Date(requisition.requisition_date).toLocaleDateString()
              : ""}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Requisition No</span>
            <span className="font-medium">{requisition.requisition_no ?? "—"}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Date</span>
            <span>
              {requisition.requisition_date
                ? new Date(requisition.requisition_date).toLocaleDateString()
                : "—"}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Requested By</span>
            <span>{requisition.requested_by_employee?.name ?? requisition.requested_by ?? "—"}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Department</span>
            <span>{requisition.department?.name ?? requisition.department_id ?? "—"}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Requested For</span>
            <span>{requisition.requested_for ?? "—"}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Priority</span>
            <span>{PRIORITY_LABELS[requisition.priority] ?? requisition.priority ?? "—"}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Status</span>
            <span>{STATUS_LABELS[requisition.status] ?? requisition.status ?? "—"}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Expected Date</span>
            <span>
              {requisition.expected_date
                ? new Date(requisition.expected_date).toLocaleDateString()
                : "—"}
            </span>
          </div>
          <div className="md:col-span-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Purpose</span>
            <span>{requisition.purpose ?? "—"}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-2 py-3 text-[10px] font-black border text-center w-12">SL</th>
                <th className="px-3 py-3 text-[10px] font-black border min-w-[200px]">Product</th>
                <th className="px-3 py-3 text-[10px] font-black border text-center w-28">Qty</th>
                <th className="px-3 py-3 text-[10px] font-black border min-w-[120px]">Unit</th>
                <th className="px-3 py-3 text-[10px] font-black border text-right w-32">Unit Price</th>
                <th className="px-3 py-3 text-[10px] font-black border min-w-[140px]">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500 text-sm">
                    No items.
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={item.id ?? index} className="border">
                    <td className="p-2 border text-sm text-center">
                      {(index + 1).toString().padStart(2, "0")}
                    </td>
                    <td className="p-2 border text-sm">
                      {item.product?.product_name ?? item.product_name ?? item.product_id ?? "—"}
                    </td>
                    <td className="p-2 border text-sm text-center">
                      {Number(item.requested_qty)?.toLocaleString() ?? "—"}
                    </td>
                    <td className="p-2 border text-sm">{item.unit?.name ?? item.unit_id ?? "—"}</td>
                    <td className="p-2 border text-sm text-right">
                      {Number(item.unit_price)?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) ?? "—"}
                    </td>
                    <td className="p-2 border text-sm">{item.purpose ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {requisition.notes ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <span className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Notes</span>
          <p className="text-sm whitespace-pre-wrap">{requisition.notes}</p>
        </div>
      ) : null}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-wrap gap-6 md:gap-10">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total products
            </span>
            <span className="text-xl font-bold text-gray-900">{items.length}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total quantity
            </span>
            <span className="text-xl font-bold text-gray-900">{totalQty.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total amount
            </span>
            <span className="text-xl font-bold text-gray-900">
              {totalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap no-print">
        <Button variant="outline" asChild>
          <Link href="/dashboard/requisition">Back to list</Link>
        </Button>
        <Button variant="outline" onClick={handlePrintPdf}>
          <FileDown className="h-4 w-4 mr-2" />
          Print PDF
        </Button>
        {requisition.status === 1 && (
          <Button asChild>
            <Link href={`/dashboard/requisition/${id}/edit`}>Edit</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
