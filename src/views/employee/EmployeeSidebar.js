import { cn } from "@/lib/utils";
import React, { useState } from "react";

const EmployeeSidebar = ({ currentTeam, onTeamSelect, departments }) => {
  const [selectedTeam, setSelectedTeam] = useState("Product");

  const departmentsWithColors = departments?.map((item) => ({
    ...item,
    id: item.id,
    name: item.name,
    color: "bg-emerald-500",
    textColor: "text-emerald-500",
  }));

  const handleTeamClick = (teamName) => {
    setSelectedTeam(teamName);
    onTeamSelect(teamName);
  };

  return (
    <div className="p-0  text-[0.8rem] rounded w-full">
      <div className=" p-4">
        <h3 className="font-semibold mb-4">Team</h3>
        <ul className="flex gap-2">
          <li
            className={cn("flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-100 rounded p-2 px-4", {
              "bg-green-50 text-emerald-700 border-b-2 border-emerald-500": currentTeam === null
            })}
            onClick={() => handleTeamClick(null)}
          >
            <span
              className={`h-6 w-6 rounded-full flex items-center justify-center text-sm text-white bg-emerald-500`}
            >
              A
            </span>
            All
          </li>
          {departments?.map((team, index) => (
            <li
              key={index}
              className={cn("flex items-center gap-2 text-gray-700  cursor-pointer hover:bg-gray-100 rounded p-2 text-nowrap", {
                "bg-green-50 text-emerald-700 border-b-2 border-emerald-500": currentTeam === team?.id
              })}
              onClick={() => handleTeamClick(team?.id)}
            >
              <span
                className={`h-6 w-6 rounded-full flex items-center justify-center text-sm text-white bg-emerald-500`}
              >
                {team.name.charAt(0)}
              </span>
              {team?.name}
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
