// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function DealColumn({ stage, deals = [] }) {
//   const [hovered, setHovered] = useState(false);
//   const router = useRouter();

//   return (
//     <div
//       className="relative w-64 flex-shrink-0 rounded-xl shadow-md bg-gray-100 hover:bg-gray-200 transition-all"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Header */}
//       <div className="bg-blue-200 text-gray-800 font-semibold text-center py-2 rounded-t-xl border-b">
//         {stage}
//       </div>

//       {/* Deals List */}
//       <div className="flex flex-col gap-2 p-2 h-[70vh] overflow-y-auto">
//         {deals.length > 0 ? (
//           deals.map((deal) => (
//             <div
//               key={deal.id}
//               className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
//             >
//               <p className="font-medium text-sm">{deal.name}</p>
//               <p className="text-xs text-gray-500">{deal.company}</p>
//               <p className="text-xs text-gray-700">${deal.amount}</p>
//               <p className="text-[10px] text-gray-400">{deal.date}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-400 mt-10 text-sm">
//             No Deals Found
//           </p>
//         )}
//       </div>

//       {/* Hover Create Deal */}
//       <AnimatePresence>
//         {hovered && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             className="absolute bottom-3 left-0 right-0 flex justify-center"
//           >
//             <Link href="/dashboard/deals/new-deal" >
            
//             <button
//               className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 shadow"
//               >
//               + Create Deal
//             </button>
//               </Link>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function DealColumn({ stage, deals = [] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-64 flex-shrink-0 rounded-xl shadow-md bg-gray-100 hover:bg-gray-200 transition-all"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div className="bg-blue-200 text-gray-800 font-semibold text-center py-2 rounded-t-xl border-b">
        {stage}
      </div>

      {/* Deals List */}
      <div className="flex flex-col gap-2 p-2 h-[70vh] overflow-y-auto">
        {deals.length > 0 ? (
          deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <p className="font-medium text-sm">{deal.name}</p>
              <p className="text-xs text-gray-500">{deal.company}</p>
              <p className="text-xs text-gray-700">${deal.amount}</p>
              <p className="text-[10px] text-gray-400">{deal.date}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-10 text-sm">
            No Deals Found
          </p>
        )}
      </div>

      {/* Hover Create Deal */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-3 left-0 right-0 flex justify-center"
          >
            <Link href="/dashboard/deals/new-deal">
              <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 shadow">
                + Create Deal
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
