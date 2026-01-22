"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import RadarChartComponent from "@/components/dashboard/RadarChartComponent";
import TransactionsTable from "@/components/dashboard/TransactionTable";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { user } = useSelector((state) => state.user);
  const { role } = useParams();
  // console.log(role);
  return (
    <>
      {/* Dashboard Content */}
      <div className="py-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Stats Card 1 */}
          <StatsCard
            title="Total Spent"
            titleColor="#36b293"
            bgColor="bg-[#edfffb]"
            metrics={[
              {
                label: "Fiat (Billion)",
                value: "1.238",
                valueColor: "#36B293",
              },
              { label: "USDT", value: "21.09", valueColor: "#36B293" },
              { label: "ETH", value: "18.39", valueColor: "#36B293" },
            ]}
          />

          {/* Stats Card 2 */}
          <StatsCard
            title="Outstanding Amount"
            titleColor="#4c98ff"
            bgColor="bg-[#e0ecfe]"
            metrics={[
              {
                label: "Fiat (Billion)",
                value: "3.457",
                valueColor: "#4c98ff",
              },
              { label: "USDT", value: "100", valueColor: "#4c98ff" },
              { label: "ETH", value: "327", valueColor: "#4c98ff" },
            ]}
          />

          {/* Stats Card 3 */}
          <StatsCard
            title="Upcoming Payments"
            bgColor="bg-white"
            metrics={[
              {
                label: "Fiat (Billion)",
                value: "1.238",
                valueColor: "#36B293",
              },
              { label: "USDT", value: "100", valueColor: "#4c98ff" },
              { label: "ETH", value: "19.24", valueColor: "#f6bb22" },
            ]}
          />

          {/* Stats Card 4 */}
          <StatsCard
            title="Transactions"
            bgColor="bg-white"
            metrics={[
              { label: "Completed", value: "287", valueColor: "#36B293" },
              { label: "Upcoming", value: "100", valueColor: "#4c98ff" },
              { label: "Pending", value: "90", valueColor: "#f6bb22" },
            ]}
          />
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="col-span-1">
              <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-4 sm:px-6">
                  <div>
                    <RadarChartComponent />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-4 sm:px-6">
                  <div className="">
                    <TransactionsTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
