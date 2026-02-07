"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import { Button } from "@/components/ui/button";


export default function PaymentReceiveForm() {
  const [form, setForm] = useState({
    customerName: "",
    amountReceived: 0,
    bankCharges: 0,
    paymentDate: "",
    paymentNo: "",
    paymentMode: "",
    depositTo: "",
    referenceNo: "",
    taxDeducted: "No Tax deducted",
  });

  const [unpaidInvoices, setUnpaidInvoices] = useState([
    { date: "2025-09-01", invoiceNo: "INV-001", invoiceAmount: 5000, amountDue: 5000, paymentReceivedOn: "", payment: 0 },
    { date: "2025-09-03", invoiceNo: "INV-002", invoiceAmount: 3000, amountDue: 3000, paymentReceivedOn: "", payment: 0 },
  ]);

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === "number" ? Number(value) : value });
  };

  const handleInvoicePayment = (index, field, value) => {
    const updated = [...unpaidInvoices];
    updated[index][field] = field === "payment" ? Number(value) : value;
    setUnpaidInvoices(updated);
  };

  const totalUsed = unpaidInvoices.reduce((sum, inv) => sum + Number(inv.payment || 0), 0);
  const amountExcess = Number(form.amountReceived || 0) - totalUsed;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.customerName || !form.amountReceived) {
      setErrorMsg("Please fill Customer Name and Amount Received.");
      return;
    }
    setErrorMsg("");
    setForm({
      customerName: "",
      amountReceived: 0,
      bankCharges: 0,
      paymentDate: "",
      paymentNo: "",
      paymentMode: "",
      depositTo: "",
      referenceNo: "",
      taxDeducted: "No Tax deducted",
    });
    setUnpaidInvoices(unpaidInvoices.map(inv => ({ ...inv, payment: 0, paymentReceivedOn: "" })));
  };

  return (
    <div className="relative bg-white p-6 rounded min-h-screen space-y-4">


      {/* Form */}
      <form onSubmit={handleSubmit} className=" pt-6 space-y-6 ">
        {errorMsg && <p className="text-red-500 font-medium">{errorMsg}</p>}

        {/* Customer & Payment Details */}
        <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
          <HrInput
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="Customer Name"
            label='Customer Name'
          />

          <HrInput
            type="number"
            name="amountReceived"
            value={form.amountReceived}
            onChange={handleChange}
            placeholder="Amount Received"
            label='Amount Received'
          />

          <HrInput
            type="number"
            name="bankCharges"
            value={form.bankCharges}
            onChange={handleChange}
            placeholder="Bank Charges"
            label='Bank Charges'
          />

          <HrInput
            type="date"
            name="paymentDate"
            value={form.paymentDate}
            onChange={handleChange}
            label='Payment Date'
          />

          <HrInput
            name="paymentNo"
            value={form.paymentNo}
            onChange={handleChange}
            placeholder="02"
            label='Payment #'
          />

          <HrInput
            name="paymentMode"
            value={form.paymentMode}
            onChange={handleChange}
            placeholder="Payment Mode"
            label='Payment Mode'
          />

          <HrInput
            name="depositTo"
            value={form.depositTo}
            onChange={handleChange}
            placeholder="Deposit To"
            label='Deposit To'
          />

          <HrInput
            name="referenceNo"
            value={form.referenceNo}
            onChange={handleChange}
            placeholder="Reference #"
            label='Reference #'
          />

          <div className="flex items-center gap-4 col-span-2 py-3">
            <label className="w-30">Tax Deducted?</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="taxDeducted"
                  value="No Tax deducted"
                  checked={form.taxDeducted === "No Tax deducted"}
                  onChange={handleChange}
                /> No Tax deducted
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="taxDeducted"
                  value="Yes"
                  checked={form.taxDeducted === "Yes"}
                  onChange={handleChange}
                /> Yes (TDS)
              </label>
            </div>
          </div>
        </div>

        {/* Unpaid Invoices Table */}
        <div className="overflow-x-auto mt-6 text-sm">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Invoice #</th>
                <th className="border p-2">Invoice Amount</th>
                <th className="border p-2">Amount Due</th>
                <th className="border p-2">Payment Received On</th>
                <th className="border p-2">Payment</th>
              </tr>
            </thead>
            <tbody>
              {unpaidInvoices.map((inv, i) => (
                <tr key={i}>
                  <td className="border p-2">{inv.date}</td>
                  <td className="border p-2">{inv.invoiceNo}</td>
                  <td className="border p-2">{inv.invoiceAmount}</td>
                  <td className="border p-2">{inv.amountDue}</td>
                  <td className="border p-2">
                    <HrInput
                      type="date"
                      value={inv.paymentReceivedOn}
                      onChange={(e) => handleInvoicePayment(i, "paymentReceivedOn", e.target.value)}
                      className="w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <HrInput
                      type="number"
                      value={inv.payment}
                      onChange={(e) => handleInvoicePayment(i, "payment", e.target.value)}
                      className="w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Summary */}
        <div className="mt-6 border-t pt-20 space-y-1  flex justify-end ml-auto ">
          <div className="space-y-1 w-96">
            <div className="flex justify-between">
              <p>Amount Received :</p>
              <strong>{Number(form.amountReceived || 0).toFixed(2)}</strong>
            </div>

            <div className="flex justify-between">
              <p>Amount used for Payments :</p>
              <strong>{totalUsed.toFixed(2)}</strong>
            </div>

            <div className="flex justify-between">
              <p>Amount Refunded :</p>
              <strong>0.00</strong>
            </div>

            <div className="flex justify-between text-red-600">
              <p>⚠ Amount in Excess:</p>
              <strong>BDT {amountExcess.toFixed(2)}</strong>
            </div>
          </div>
        </div>
        <div className="  w-full text-gray-600 ">
          <p>Notes (Internal use. Not visible to customer)</p>
          <textarea
            placeholder="Terms & Conditions"
            className="w-full h-14 border rounded p-2 bg-white mt-4"
          />

        </div>
        <div className="  w-50 text-gray-600">
          <HrInput
            type="file"
            className="w-full mt-4"
            onChange={(e) => console.log(e.target.files[0])}
          />
        </div >
        <p className="pt-2 border-t-1 text-gray-600">Additional Fields: Start adding custom fields for your payments received by going to Settings ➡ Sales ➡ Payments Received. </p>

      </form>

      {/* Fixed Bottom Button */}
      <div className="flex fixed bottom-0 w-[82%] items-center shadow-lg h-28 md:h-12 gap-8 bg-gray-200 rounded sm:px-4 md:px-6 z-50">
        <Button type="submit" onClick={handleSubmit}>Save Payment</Button>
      </div>



    </div>
  );
}
