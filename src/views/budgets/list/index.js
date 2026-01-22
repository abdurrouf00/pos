"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";

export default function BudgetTablePage() {
  const allMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const mainAccounts = ["income","expense"];
  const extraAccounts = ["asset","liability","equity"];

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    fiscalYear: "Jan 2025 - Dec 2025",
    budgetPeriod: "monthly"
  });

  // Budget Accounts & Monthly Values
  const [budgetData, setBudgetData] = useState({
    accounts: { income: [], expense: [], asset: [], liability: [], equity: [] }
  });
  const [monthlyData, setMonthlyData] = useState({});
  const [activeTab, setActiveTab] = useState("main");

  // Load saved budget
  useEffect(()=>{
    const saved = JSON.parse(sessionStorage.getItem("budgetData"));
    if(!saved) return;

    setBudgetData(saved);
    setFormData({
      name: saved.name || "",
      fiscalYear: saved.fiscalYear || "Jan 2025 - Dec 2025",
      budgetPeriod: saved.budgetPeriod || "monthly"
    });

    let initMonthly = {};
    Object.keys(saved.accounts).forEach(type=>{
      saved.accounts[type].forEach(acc=>{
        initMonthly[acc] = {};
        allMonths.forEach(m => { initMonthly[acc][m] = 0; });
      });
    });
    setMonthlyData(initMonthly);
  },[]);

  // Handle form change
  const handleFormChange = (e)=>{
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    setBudgetData({...budgetData, [name]: value});
  };

  // Handle monthly input change
  const handleMonthlyChange = (acc, month, value)=>{
    const newMonthly = {...monthlyData};
    newMonthly[acc][month] = Number(value);
    setMonthlyData(newMonthly);
  };

  // Get months to show
  let monthsToShow = [];
  if(formData.budgetPeriod==="monthly") monthsToShow = allMonths;
  else if(formData.budgetPeriod==="quarterly") monthsToShow = ["Jan-Mar","Apr-Jun","Jul-Sep","Oct-Dec"];
  else if(formData.budgetPeriod==="halfYearly") monthsToShow = ["Jan-Jun","Jul-Dec"];
  else monthsToShow = ["Year"];

  // Calculate total for one account
  const accountTotal = (acc)=>{
    let sum = 0;
    monthsToShow.forEach(m=>{
      sum += monthlyData[acc][m] || 0;
    });
    return sum;
  };

  // Calculate total for type
  const typeTotal = (type)=>{
    let total = 0;
    budgetData.accounts[type].forEach(acc=>{
      total += accountTotal(acc);
    });
    return total;
  };

  // Save
  const saveTable = ()=>{
    const finalData = {...budgetData, monthlyData, ...formData};
    sessionStorage.setItem("budgetDataWithValues", JSON.stringify(finalData));
    alert("Budget Table Saved!");
  };

  return (
    <div className="mb-30">

      {/* === Form === */}
      <div className="mb-6 border-b pb-4">
        <div className="flex mb-4">
          <label className="text-sm w-52 mb-1 mt-3">Name</label>
          <HrInput name="name" value={formData.name} onChange={handleFormChange} className="w-75"/>
        </div>
        <div className="flex mb-4">
          <label className="text-sm w-52 mb-1 mt-3">Fiscal Year</label>
          <HrSelect
            name="fiscalYear"
            value={formData.fiscalYear}
            onChange={handleFormChange}
            className="!w-75 p-2 border rounded"
            options={[
              {label:"Jan 2023 - Dec 2023", value:"Jan 2023 - Dec 2023"},
              {label:"Jan 2024 - Dec 2024", value:"Jan 2024 - Dec 2024"},
              {label:"Jan 2025 - Dec 2025", value:"Jan 2025 - Dec 2025"},
              {label:"Jan 2026 - Dec 2026", value:"Jan 2026 - Dec 2026"},
              {label:"Jan 2027 - Dec 2027", value:"Jan 2027 - Dec 2027"},
            ]}
          />
        </div>
        <div className="flex mb-4">
          <label className="text-sm w-52 mb-1 mt-3">Budget Period</label>
          <HrSelect
            name="budgetPeriod"
            value={formData.budgetPeriod}
            onChange={handleFormChange}
            className="!w-75 p-2 border rounded"
            options={[
              {label:"Monthly", value:"monthly"},
              {label:"Quarterly", value:"quarterly"},
              {label:"Half-Yearly", value:"halfYearly"},
              {label:"Yearly", value:"yearly"},
            ]}
          />
        </div>
      </div>

      {/* === Tabs === */}
      <div className="flex mb-4 border-b">
        <button onClick={()=>setActiveTab("main")} className={`px-4 py-2 ${activeTab==="main"?"border-b-2 border-blue-500 font-bold":""}`}>Main Accounts</button>
        <button onClick={()=>setActiveTab("extra")} className={`px-4 py-2 ${activeTab==="extra"?"border-b-2 border-blue-500 font-bold":""}`}>Extra Accounts</button>
      </div>

      {/* === Table === */}
      <table className="table-auto border-collapse border w-full text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border  px-2 py-1">Account</th>
            {monthsToShow.map((m,i)=><th key={i} className="border bg px-2 py-1">{m}</th>)}
            <th className="border px-2 py-1">Total</th>
          </tr>
        </thead>

        {(activeTab==="main"?mainAccounts:extraAccounts).map(type=>(
          <tbody key={type}>
            <tr className="bg-gray-50 font-medium ">
              <td  colSpan={monthsToShow.length+2} className="border   px-2 py-1">{type.charAt(0).toUpperCase() + type.slice(1)}</td>
            </tr>

            {budgetData.accounts[type].length === 0
              ? <tr>
                <td colSpan={monthsToShow.length+2} className="text-center italic text-gray-400">Add accounts</td></tr>
              : budgetData.accounts[type].map(acc=>(
                  <tr key={acc}>
                    <td className="border px-2 py-1">{acc}</td>
                    {monthsToShow.map((m,i)=>(
                      <td key={i} className=" border  px-1 py-1">
                        <input 
                        type="number" 
                        value={monthlyData[acc][m]||0}
                        onChange={e=>handleMonthlyChange(acc,m,e.target.value)} 
                        className="w-full px-1 py-0.5   rounded text-end"/>
                      </td>
                    ))}
                    <td className="border px-2 py-1 text-center">{accountTotal(acc)}</td>
                  </tr>
                ))
            }

            {budgetData.accounts[type].length>0 &&
              <tr className="font-semibold bg-gray-100 ">
                <td>Total {type.charAt(0).toUpperCase()+type.slice(1)}</td>
                {monthsToShow.map((m,i)=>{
                  let sum = 0;
                  budgetData.accounts[type].forEach(acc=>{ sum += monthlyData[acc][m]||0; });
                  return <td key={i} className="px-2 py-3 border text-end">{sum}</td>;
                })}
                <td className="text-center">{typeTotal(type)}</td>
              </tr>
            }
          </tbody>
        ))}

        {/* Profit/Loss for main */}
        {activeTab==="main" &&
          <tfoot>
            <tr className="font-bold bg-gray-200">
              <td>Total Profit / Loss</td>
              {monthsToShow.map((m,i)=>{
                let income=0, expense=0;
                budgetData.accounts.income.forEach(acc=>{income+=monthlyData[acc][m]||0;});
                budgetData.accounts.expense.forEach(acc=>{expense+=monthlyData[acc][m]||0;});
                return <td key={i} className="text-end px-2 ">{income-expense}</td>;
              })}
              <td className="text-center">{typeTotal("income")-typeTotal("expense")}</td>
            </tr>
          </tfoot>
        }
      </table>

      {/* === Save Button === */}
      <div className="mt-4 flex justify-end">
        <Button onClick={saveTable} className="bg-green-500 text-white">Save Table</Button>
      </div>

    </div>
  );
}
