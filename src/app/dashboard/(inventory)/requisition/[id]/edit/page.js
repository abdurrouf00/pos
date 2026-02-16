"use client";

import { useParams } from "next/navigation";
import RequisitionForm from "@/views/inventory/requisition/form/form";

export default function RequisitionEditPage() {
  const params = useParams();
  const id = params?.id;

  return <RequisitionForm editId={id} />;
}
