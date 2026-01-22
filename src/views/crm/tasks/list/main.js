"use client";
import dealsData from "./data.json";
import DealColumn from "./table";

export default function DealsBoard() {
  // Group deals by stage
  const groupedDeals = dealsData.reduce((acc, deal) => {
    if (!acc[deal.stage]) acc[deal.stage] = [];
    acc[deal.stage].push(deal);
    return acc;
  }, {});

  // Define stages (10 columns)
  const stages = [
   "Not Started",
   "Deferred",
   "In Progress",
   "Completed",
   "Waiting for input"

    
  ];

  return (
    <div className="flex pt-15 gap-3 overflow-x-auto p-4 h-screen bg-gray-50">
      {stages.map((stage) => (
        <DealColumn
          key={stage}
          stage={stage}
          deals={groupedDeals[stage] || []}
        />
      ))}
    </div>
  );
}
