"use client";

import React, { useEffect, useState } from "react";

export default function AccountsTable() {
  const [accounts, setAccounts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    setAccounts(storedAccounts);
  }, []);

  // Toggle row selection
  const handleRowSelect = (rowIndex) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(rowIndex)
        ? prevSelected.filter((i) => i !== rowIndex)
        : [...prevSelected, rowIndex]
    );
  };

  // Delete selected accounts
  const handleDeleteSelected = () => {
    const updatedAccounts = accounts.filter(
      (_, rowIndex) => !selectedRows.includes(rowIndex)
    );
    setAccounts(updatedAccounts);
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    setSelectedRows([]);
  };

  // Group accounts by accountType
  const groupedAccounts = accounts.reduce((acc, account, index) => {
    if (!acc[account.accountType]) acc[account.accountType] = [];
    acc[account.accountType].push({ ...account, index });
    return acc;
  }, {});

  return (
    <div className="  font-medium  pb-20">
     

      {selectedRows.length > 0 && (
        <button
          onClick={handleDeleteSelected}
          className="mb-3 px-3 py-1 bg-red-600 text-white rounded"
        >
          Delete Selected
        </button>
      )}

      <table className="w-full border-collapse border border-gray-300  ">
        <thead className="text-left">
          <tr className="bg-gray-100">
            <th className="p-2 border-t">✓</th>
            <th className="p-2 border-t">Account Name</th>
            <th className="p-2 border-t">Account Code</th>
            <th className="p-2 border-t">Account Type</th>
            <th className="p-2 border-t">Documents</th>
            <th className="p-2 border-t">Parent Account</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedAccounts).map((accountType) =>
            groupedAccounts[accountType].map((account) => {
              const rows = [];

              if (!account.isSubAccount) {
                // Normal account
                rows.push(
                  <tr key={account.index} className="md:hover:bg-gray-100">
                    <td className="border-t p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(account.index)}
                        onChange={() => handleRowSelect(account.index)}
                      />
                    </td>
                    <td className="border-t p-4 text-blue-600">{account.accountName}</td>
                    <td className="border-t p-4">{account.accountCode}</td>
                    <td className="border-t p-4">{account.accountType}</td>
                    <td className="border-t p-4"></td>
                    <td className="border-t p-4"></td>
                  </tr>
                );
              } else {
                // Parent row
                rows.push(
                  <tr key={`${account.index}-parent`} className="bg-gray-40 md:hover:bg-gray-100 ">
                    <td className="border-t p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(account.index)}
                        onChange={() => handleRowSelect(account.index)}
                      />
                    </td>
                    <td className="border-t p-4 text-blue-600">{account.parentAccount}</td>
                    <td className="border-t p-4"></td>
                    <td className="border-t p-4">{account.accountType}</td>
                    <td className="border-t p-4"></td>
                    <td className="border-t p-4"></td>
                  </tr>
                );

                // Sub-account row
                rows.push(
                  <tr key={`${account.index}-child`} className="md:hover:bg-gray-100">
                    <td className="border-t p-3 text-center text-3xl">↳</td>
                    <td className="border-t p-4 text-blue-600">{account.accountName}</td>
                    <td className="border-t p-4">{account.accountCode}</td>
                    <td className="border-t p-4">{account.accountType}</td>
                    <td className="border-t p-4"></td>
                    <td className="border-t p-4">{account.parentAccount}</td>
                  </tr>
                );
              }

              return rows;
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
