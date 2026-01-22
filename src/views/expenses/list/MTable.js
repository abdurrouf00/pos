"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MileageTable({ data }) {
  return (
    <div className="p-10 max-w-[80%] bg-white container mx-auto mt-10 space-y-4">
      <h2 className="text-lg font-semibold mb-4">Saved Mileage Preferences</h2>
      <div className="border border-gray-300">
        <div className="flex gap-4 bg-gray-100 p-2 font-semibold">
          <div className="w-[150px]">Category</div>
          <div className="w-[100px]">Unit</div>
           <div className="w-[140px]">Date</div>
          <div className="flex-1 w-[100px]">Rates</div>
         
        </div>

        {data.map((item, i) => (
          <div key={i} className="flex gap-4 border-b border-gray-200 p-2 items-center">
            <div className="w-[150px]">{item.defaultCategory}</div>
            <div className="w-[100px]">{item.defaultUnit}</div>
            <div className="flex-1 flex flex-col gap-1">
              {item.mileageRates.map((rate, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <span className="w-[150px]">{rate.startDate}</span>
                  <span className="w-[150px]">{rate.rate}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
