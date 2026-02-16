"use client";

import { useParams } from "next/navigation";
import RequisitionDetail from "@/views/inventory/requisition/detail";

export default function RequisitionViewPage() {
  const params = useParams();
  const id = params?.id;

  return <RequisitionDetail id={id} />;
}
