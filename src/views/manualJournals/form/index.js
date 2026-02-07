"use client";

import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { currencies, accountOptions } from "./constant";
import HrSelect from "@/components/common/HrSelect";
import HrInput from "@/components/common/HrInput";


export default function JournalFormPage() {
  const emptyRow = () => ({
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    account: "",
    description: "",
    contact: "",
    transactionType: "Debit",
    tax: 0,
    debits: "",
    credits: "",
  });

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    journalNo: "",
    reference: "",
    notes: "",
    reportingMethod: "Accrual and Cash",
    currency: "BDT",
  });

  const [rows, setRows] = useState([emptyRow(), emptyRow()]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addRow = () => setRows((r) => [...r, emptyRow()]);
  const removeRow = (id) => {
    if (rows.length <= 2) return;
    setRows((r) => r.filter((row) => row.id !== id));
  };

  const updateRow = (id, field, value) => {
    setRows((r) =>
      r.map((row) =>
        row.id === id
          ? field === "debits"
            ? { ...row, debits: value, credits: value ? "" : row.credits }
            : field === "credits"
              ? { ...row, credits: value, debits: value ? "" : row.debits }
              : { ...row, [field]: value }
          : row
      )
    );
  };

  const { subtotalDebits, subtotalCredits, totalDebits, totalCredits, difference } =
    useMemo(() => {
      let sDeb = 0,
        sCred = 0;
      rows.forEach((row) => {
        const d = parseFloat(row.debits) || 0;
        const c = parseFloat(row.credits) || 0;
        sDeb += d;
        sCred += c;
      });
      const diff = sDeb - sCred;
      return {
        subtotalDebits: sDeb.toFixed(2),
        subtotalCredits: sCred.toFixed(2),
        totalDebits: sDeb.toFixed(2),
        totalCredits: sCred.toFixed(2),
        difference: diff.toFixed(2),
      };
    }, [rows]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.journalNo) {
      return;
    }

    if (parseFloat(totalDebits) !== parseFloat(totalCredits)) {
      return;
    }

    const journalToSave = { ...form, rows };
    const existing = JSON.parse(localStorage.getItem("journalData") || "[]");
    const updated = [...existing, journalToSave];
    localStorage.setItem("journalData", JSON.stringify(updated));


    setForm({
      date: new Date().toISOString().slice(0, 10),
      journalNo: "",
      reference: "",
      notes: "",
      reportingMethod: "Accrual and Cash",
      currency: "BDT",
    });
    setRows([emptyRow(), emptyRow()]);
  };

  return (
    <main className="min-h-screen bg-white px-10 mb-36 pt-10">
      <div className=" bg-white">

        <form onSubmit={handleSubmit}>
          <div className=" ">
            {/* Header */}
            <div className="grid grid-cols-4 gap-4">
              <HrInput
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                label="Date"
              />

              <HrInput
                type="text"
                name="journalNo"
                value={form.journalNo}
                onChange={handleChange}
                label="Journal#"
              />

              <HrInput
                type="text"
                name="reference"
                value={form.reference}
                onChange={handleChange}
                label="Reference#"
              />

              <HrSelect
                label="Currency"
                options={currencies}
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
              />

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                label="Notes"
                rows={2}
              ></textarea>
            </div>

            {/* Table */}
            <div className="overflow-x-auto ">
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr className="text-sm">
                    <th className="p-2 border w-40">Account</th>
                    <th className="p-2 border w-40">Description</th>
                    <th className="p-2 border w-32">Contact</th>
                    <th className="p-2 border w-32">Transaction Type</th>
                    <th className="p-2 border w-20">Tax</th>
                    <th className="p-2 border w-24">Debits</th>
                    <th className="p-2 border w-24">Credits</th>
                    <th className="p-2 border w-16">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="border">
                        <select
                          className="w-full p-1 border rounded"
                          value={row.account}
                          onChange={(e) => updateRow(row.id, "account", e.target.value)}
                        >
                          <option value="">Select Account</option>
                          {accountOptions.map((group, index) => (
                            <optgroup key={index} label={group.category}>
                              {group.accounts.map((acc, idx) => (
                                <option key={idx} value={acc}>
                                  {acc}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </td>

                      <td className="border p-1">
                        <HrInput
                          className="w-full border"
                          value={row.description}
                          onChange={(e) => updateRow(row.id, "description", e.target.value)}
                        />
                      </td>

                      <td className="border p-1">
                        <HrInput
                          className="w-full"
                          value={row.contact}
                          onChange={(e) => updateRow(row.id, "contact", e.target.value)}
                        />
                      </td>

                      <td className="border p-1">
                        <HrSelect
                          value={row.transactionType}
                          onChange={(e) =>
                            updateRow(row.id, "transactionType", e.target.value)
                          }
                          options={[
                            { value: "Debit", label: "Debit" },
                            { value: "Credit", label: "Credit" },
                          ]}
                        />
                      </td>

                      <td className="border p-1">
                        <HrInput
                          className="w-full"
                          type="number"
                          step="0.01"
                          value={row.tax}
                          onChange={(e) => updateRow(row.id, "tax", e.target.value)}
                        />
                      </td>

                      <td className="border p-1">
                        <HrInput
                          className="w-full"
                          type="number"
                          step="0.01"
                          value={row.debits}
                          onChange={(e) => updateRow(row.id, "debits", e.target.value)}
                        />
                      </td>

                      <td className="border p-1">
                        <HrInput
                          className="w-full"
                          type="number"
                          step="0.01"
                          value={row.credits}
                          onChange={(e) => updateRow(row.id, "credits", e.target.value)}
                        />
                      </td>

                      <td className="border p-1 text-center">
                        <button
                          type="button"
                          onClick={() => removeRow(row.id)}
                          disabled={rows.length <= 2}
                          className={`px-2 py-1 rounded ${rows.length <= 2
                            ? "bg-gray-300"
                            : "bg-red-500 text-white"
                            }`}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-2 mt-2">
              <Button type="button" onClick={addRow}>
                + Add Row
              </Button>
            </div>

            {/* Totals */}
            <div className="flex justify-between gap-4 border rounded-2xl p-4 bg-gray-50 max-w-2xl ml-auto">
              <div className="flex flex-col justify-between text-sm text-gray-600">
                <p>Sub Total</p>
                <p>Total ({form.currency})</p>
                <p>Difference</p>
              </div>

              <div className="flex mr-20 gap-10">
                <div className="text-lg font-medium">
                  <p>{subtotalDebits}</p>
                  <p>{totalDebits}</p>
                </div>

                <div className="text-lg font-medium">
                  <p>{subtotalCredits}</p>
                  <p>{totalCredits}</p>
                  <div
                    className={`${difference !== "0.00" ? "text-red-600" : "text-green-600"
                      } font-bold`}
                  >
                    {difference}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex fixed bottom-0 w-[82%] items-center shadow-lg h-16 bg-gray-200 rounded sm:px-4 z-50">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
