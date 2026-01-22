import DutyRosterForm from "@/views/duty-roster/form";

export default function CreateDutyRoster() {
  return (
    <>
      <div className="bg-white p-10 rounded-md mt-2">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Duty Roster</h2>

        <DutyRosterForm />
      </div>
    </>
  );
}
