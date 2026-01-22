import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { IoIosList } from "react-icons/io";

const transactions = [
  { id: 1, name: "Ralph...", value: "10,000,000", time: "09:30:12 - 28/03/23", status: "Completed", currency: "\uD83D\uDCB6" },
  { id: 2, name: "Ralph...", value: "0,0043", time: "09:30:12 - 28/03/23", status: "Pending", currency: "\uD83D\uDCB2" },
  { id: 3, name: "Guy...", value: "16,000,000", time: "09:31:12 - 28/03/23", status: "Completed", currency: "\uD83D\uDCB6" },
  { id: 4, name: "Guy...", value: "16,000,000", time: "09:31:12 - 28/03/23", status: "Completed", currency: "\uD83D\uDCB6" },
  { id: 5, name: "Guy...", value: "16,000,000", time: "09:31:12 - 28/03/23", status: "Completed", currency: "\uD83D\uDCB6" },
];

export default function TransactionsTable() {
  const [search, setSearch] = useState("");

  return (
    <div className="h-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <div className="relative">
            Type
          <input
            type="text"
            placeholder="Type to search"
            className="border px-3 py-1.5 rounded-md text-sm pl-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute right-2 top-2.5 h-4 w-4 cursor-pointer text-gray-500" />
        </div>
        <div className="border flex items-center gap-2 py-2 px-4 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[400]"><IoIosList />View All</div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-gray-500 text-sm">
            <th className="py-2">To</th>
            <th className="py-2 flex items-center gap-1">Value <ChevronDown size={14} /></th>
            <th className="py-2">Time</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-t text-gray-700 text-sm">
              <td className="py-2">{transaction.name}</td>
              <td className="py-2 flex items-center gap-1">{transaction.currency} {transaction.value}</td>
              <td className="py-2">{transaction.time}</td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 text-xs rounded-md font-medium ${
                    transaction.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
