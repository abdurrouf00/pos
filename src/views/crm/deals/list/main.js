// "use client";
// import dealsData from "@/tableData.json";
// import DealColumn from "./table";

// export default function DealsBoard() {
//   // Group deals by stage
//   const groupedDeals = dealsData.reduce((acc, deal) => {
//     if (!acc[deal.stage]) acc[deal.stage] = [];
//     acc[deal.stage].push(deal);
//     return acc;
//   }, {});

//   // Define stages (10 columns)
//   const stages = [
//     "Qualification",
//     "Needs Analysis",
//     "Value Proposition",
//     "Identify Decision Makers",
//     "Proposal/Quote",
//     "Negotiation/Review",
//     "Closed Won",
//     "Closed Lost",
//     "Closed Lost to Competition",
    
//   ];

//   return (
//     <div className="flex pt-15 gap-3 overflow-x-auto p-4 h-screen bg-gray-50">
//       {stages.map((stage) => (
//         <DealColumn
//           key={stage}
//           stage={stage}
//           deals={groupedDeals[stage] || []}
//         />
//       ))}
//     </div>
//   );
// }




// "use client";
// import { useState, useEffect } from "react";
// import dealsData from "@/tableData.json";
// import DealColumn from "./table";
// import { DragDropContext } from "@hello-pangea/dnd";

// export default function DealsBoard() {
//   const stages = [
//     "Qualification",
//     "Needs Analysis",
//     "Value Proposition",
//     "Identify Decision Makers",
//     "Proposal/Quote",
//     "Negotiation/Review",
//     "Closed Won",
//     "Closed Lost",
//     "Closed Lost to Competition",
//   ];

//   // empty at fast
//   const [groupedDeals, setGroupedDeals] = useState({});

//   //  data load after Client Render 
//   useEffect(() => {
//     const saved = localStorage.getItem("dealsBoardData");
//     if (saved) {
//       setGroupedDeals(JSON.parse(saved));
//     } else {
//       const grouped = stages.reduce((acc, stage) => {
//         acc[stage] = dealsData.filter((deal) => deal.stage === stage);
//         return acc;
//       }, {});
//       setGroupedDeals(grouped);
//     }
//   }, []);

//   //  save to localStorage 
//   useEffect(() => {
//     if (Object.keys(groupedDeals).length > 0) {
//       localStorage.setItem("dealsBoardData", JSON.stringify(groupedDeals));
//     }
//   }, [groupedDeals]);

//   //  Drag Handle
//   const handleDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     if (
//       source.droppableId === destination.droppableId &&
//       source.index === destination.index
//     )
//       return;

//     const sourceDeals = Array.from(groupedDeals[source.droppableId]);
//     const destDeals =
//       source.droppableId === destination.droppableId
//         ? sourceDeals
//         : Array.from(groupedDeals[destination.droppableId]);

//     const [movedDeal] = sourceDeals.splice(source.index, 1);
//     movedDeal.stage = destination.droppableId;
//     destDeals.splice(destination.index, 0, movedDeal);

//     setGroupedDeals((prev) => ({
//       ...prev,
//       [source.droppableId]: sourceDeals,
//       [destination.droppableId]: destDeals,
//     }));
//   };

//   // ✅ প্রথমে state লোড না হওয়া পর্যন্ত কিছু দেখিও না
//   if (Object.keys(groupedDeals).length === 0) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-500">
//         Loading Deals...
//       </div>
//     );
//   }

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <div className="flex pt-15 gap-3 overflow-x-auto p-4 h-screen bg-gray-50">
//         {stages.map((stage) => (
//           <DealColumn
//             key={stage}
//             stage={stage}
//             deals={groupedDeals[stage] || []}
//           />
//         ))}
//       </div>
//     </DragDropContext>
//   );
// }




"use client";

import { useState } from "react";
import dealsData from "@/tableData.json";
import DealColumn from "./DealColumn";
import { DragDropContext } from "@hello-pangea/dnd";

export default function DealsBoard() {
  const stages = [
    "Qualification",
    "Needs Analysis",
    "Value Proposition",
    "Identify Decision Makers",
    "Proposal/Quote",
    "Negotiation/Review",
    "Closed Won",
    "Closed Lost",
    "Closed Lost to Competition",
  ];

  // state initialized from static data
  const initialGrouped = stages.reduce((acc, stage) => {
    acc[stage] = dealsData.filter((deal) => deal.stage === stage);
    return acc;
  }, {});

  const [groupedDeals, setGroupedDeals] = useState(initialGrouped);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceDeals = Array.from(groupedDeals[source.droppableId]);
    const destDeals =
      source.droppableId === destination.droppableId
        ? sourceDeals
        : Array.from(groupedDeals[destination.droppableId]);

    const [movedDeal] = sourceDeals.splice(source.index, 1);
    movedDeal.stage = destination.droppableId;
    destDeals.splice(destination.index, 0, movedDeal);

    setGroupedDeals((prev) => ({
      ...prev,
      [source.droppableId]: sourceDeals,
      [destination.droppableId]: destDeals,
    }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex pt-15 gap-3 overflow-x-auto p-4 h-screen bg-gray-50">
        {stages.map((stage) => (
          <DealColumn key={stage} stage={stage} deals={groupedDeals[stage]} />
        ))}
      </div>
    </DragDropContext>
  );
}
