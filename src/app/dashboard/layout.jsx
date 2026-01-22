import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function Layout({ children, employee }) {
  return (
    <>
      <DashboardLayout>
        {children}
        {employee}
      </DashboardLayout>
    </>
  );
}
