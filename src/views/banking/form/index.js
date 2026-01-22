"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BankingPage() {
  const [open, setOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [agree, setAgree] = useState(false);

  const banks = [
    { title: "Bank of America (US) - Bank", image: "/boa.png" },
    { title: "Commonwealth Bank", image: "/cwb.png" },
    { title: "ANZ", image: "/anz.png" },
    { title: "TD Bank", image: "/td.png" },
    { title: "Scotiabank", image: "/scotiabank.png" },
    { title: "Bank of America (US) - Credit Card" },
    { title: "Discover Card (US)" },
    { title: "TD Bank EasyWeb (Canada) - Credit" },
  ];

  const handleClick = (bank) => {
    setSelectedBank(bank);
    setOpen(true);
  };

  const handleSubmit = () => {
    if (!agree) {
      alert("Please agree to the EULA to proceed.");
      return;
    }
    alert(`Submitted for ${selectedBank}`);
    setOpen(false);
    setAgree(false);
  };

  return (
    <div className="mx-auto p-6 pb-20 bg-white">
      {/* Header */}
      <h1 className="font-medium mb-2">
        Connect and Add Your Bank Accounts or Credit Cards
      </h1>
      <p className="text-gray-700 mb-6 text-xs">
        Connect your bank accounts to fetch the bank feeds using one of our
        third-party bank feeds service providers. Or, you can add your bank
        accounts manually and import bank feeds.
      </p>

      {/* Automatic Banks Section */}
      <div className="mb-8 pb-10 rounded-2xl bg-white border-1">
        <div className="flex p-5 items-center justify-between bg-gray-100 rounded-t-2xl">
          <div>
            <h2 className="font-medium">Automatic Bank Feeds Supported Banks</h2>
            <p className="text-gray-600 text-sm mb-4">
              Connect your bank accounts and fetch the bank feeds using one of
              our third-party bank feeds service providers.
            </p>
          </div>
          <div>
            <Button onClick={() => handleClick()}>Connect Bank</Button>
          </div>
        </div>

        {/* Bank Cards */}
        <div className="mt-5 px-10 pb-5 flex flex-wrap gap-5">
          {/* PayPal */}
          <div className="flex items-center gap-4 bg-gray-100 rounded-md p-3 w-[300px] cursor-pointer hover:bg-gray-200">
            <img src="/paypal.png" alt="" className="h-8 w-16 object-contain" />
            <p className="text-sm">PayPal</p>
          </div>

          {/* Dynamic Banks */}
          {banks.map((bank) => (
            <div
              key={bank.title}
              onClick={() => handleClick(bank.title)}
              className="flex items-center gap-4 bg-gray-100 rounded-md p-3 w-[300px] cursor-pointer hover:bg-gray-200"
            >
              {bank.image && (
                <img
                  src={bank.image}
                  alt=""
                  className="h-8 w-16 object-contain"
                />
              )}
              <p className="text-sm">{bank.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Add Section */}
      <div className="flex justify-between p-3 border rounded-xl bg-white items-center mb-20">
        <div>
          <h2 className="font-medium mb-2">Add bank or credit card account manually</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Unable to connect your bank or credit card account using our Service
            Provider? Add the accounts manually using your account details.
          </p>
        </div>
        <div>
          <Link href="/dashboard/banking/new">
            <button className="px-4 py-2 border-1 bg-gray-50 rounded-lg hover:bg-gray-100">
              Add Account
            </button>
          </Link>
        </div>
      </div>

      {/* Popup Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-start z-50"

          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-b-2xl shadow-xl w-full sm:w-[1200px] pb-5"

          >
            <h2 className="font-medium pl-8 pb-1 pt-3">
              Connect and Add Your Bank or Credit Card Accounts
            </h2>
            <p className="text-xs text-gray-700 mb-4 pl-8">
              Choose the bank feeds service provider, and read and agree to
              the End User License Agreement to connect your bank.
            </p>

            {/* Bank Provider Selector */}
            <div className="pl-8 bg-gray-100 border p-2">
              <label>Bank Feeds Service Provider:</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="text-blue-500 p-1"
              >
                <option value="Yodlee">Yodlee</option>
                <option value="Token">Token</option>
              </select>
            </div>

            {/* EULA Text */}
            <div className="mb-4 text-sm text-gray-700 max-h-40 overflow-y-auto pl-8 pt-4 rounded">
              The End User License Agreement (EULA) describes the terms and
              conditions under which you may use the Automatic Bank Feeds for
              the selected bank feeds service provider. Kindly read and agree
              to all the end user terms to proceed.
            </div>

            {/* Checkbox */}
            <div className="mb-4 pl-8 border-b pb-5">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                I have read and agree to all the end user terms for automatic
                bank feeds.
              </label>
            </div>

            {/* Buttons */}
            <div className="flex pl-8 gap-2">
              <Button onClick={handleSubmit}>Submit</Button>
              <Button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-50 rounded border text-black hover:bg-gray-400"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
