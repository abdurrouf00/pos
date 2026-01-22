import EmployeeDetails from "@/views/employee/details";

async function page({ params }) {
  const { empId } = await params;
  return (
    <div className="flex gap-3">
      <div className="w-full">
        <EmployeeDetails id={empId} />
      </div>
    </div>
  );
}

export default page;
