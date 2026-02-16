import RequisitionView from "@/views/inventory/requisition/list";
import RequisitionCreate from "@/views/inventory/requisition/form/index";

export const metadata = {
  title: "Purchase Requisitions",
};

export default function RequisitionPage() {
  return (
    <>
      <RequisitionCreate />
      <RequisitionView />
    </>
  );
}
