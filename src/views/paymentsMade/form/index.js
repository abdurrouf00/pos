"use client";

import { useState } from "react";
import HrInput from "@/components/common/HrInput";
import { Button } from "@/components/ui/button";


export default function PaymentReceiveForm() {
  const [form, setForm] = useState({
    vendorName: "",
    payment: 0,
    paymentMade: "",
    bankCharge: 0,
    paymentDate: "",
    paymentMode: "",
    paidThrough: "",
    taxDeducted: "No Tax deducted",
    amountReceived: 0,
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
    if (!form.vendorName) {
      setErrorMsg("Please fill Vendor Name and Amount Received.");
      return;
    }
    setErrorMsg("");

    // Save data to LocalStorage
    const existingPayments = JSON.parse(localStorage.getItem("submittedPayments") || "[]");
    const newPayment = {
      paymentDate: form.paymentDate,
      payment: form.payment,
      referenceNo: form.paymentMade,
      vendorName: form.vendorName,
      invoiceNo: unpaidInvoices.map(inv => inv.invoiceNo).join(", "),
      paymentMode: form.paymentMode,
      amountReceived: form.amountReceived,
      unsentAmount: amountExcess,
    };
    localStorage.setItem("submittedPayments", JSON.stringify([...existingPayments, newPayment]));


    // Reset form & invoices
    setForm({
      vendorName: "",
      payment: 0,
      paymentMade: "",
      bankCharge: 0,
      paymentDate: "",
      paymentMode: "",
      paidThrough: "",
      taxDeducted: "No Tax deducted",
      amountReceived: 0,
    });
    setUnpaidInvoices(unpaidInvoices.map(inv => ({ ...inv, payment: 0, paymentReceivedOn: "" })));
  };

  return (
    <div className="relative">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Receive Payment</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="pt-10 pb-40 px-8 space-y-6 bg-white">
        {errorMsg && <p className="text-red-500 font-medium">{errorMsg}</p>}

        {/* Vendor & Payment Details */}
        <div className="space-y-4">
          <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
            <HrInput name="vendorName" value={form.vendorName} onChange={handleChange} placeholder="Vendor Name" label="Vendor Name" />
            <HrInput type="number" name="payment" value={form.payment} onChange={handleChange} placeholder="Payment Amount" label="Payment #" />

            <HrInput type="text" name="paymentMade" value={form.paymentMade} onChange={handleChange} placeholder="Payment Made" label="Payment Made" />

            <HrInput type="number" name="bankCharge" value={form.bankCharge} onChange={handleChange} label="Bank Charges (if any)" />

            <HrInput type="date" name="paymentDate" value={form.paymentDate} onChange={handleChange} label="Payment Date" />

            <HrInput type="text" name="paymentMode" value={form.paymentMode} onChange={handleChange} placeholder="Payment Mode" label="Payment Mode" />
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
                    <HrInput type="date" value={inv.paymentReceivedOn} onChange={(e) => handleInvoicePayment(i, "paymentReceivedOn", e.target.value)} className="w-full" />
                  </td>
                  <td className="border p-2">
                    <HrInput type="number" value={inv.payment} onChange={(e) => handleInvoicePayment(i, "payment", e.target.value)} className="w-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Payment Summary */}
        <div className="mt-6 border-t pt-6 flex justify-end">
          <div className="space-y-1 w-96">
            <div className="flex justify-between">
              <p>Amount Received :</p>
              <strong>{Number(form.payment || 0).toFixed(2)}</strong>
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




        {/* Terms & Conditions && File Upload */}
        <div className=" mt-6 bg-gray-100 pt-6 px-6 ">
          <div className="flex pl-6 p-10 gap-10 ">
            <div className="w-[60%] ">
              <p className="p-2">Notes</p>
              <textarea
                placeholder="Terms & Conditions"
                className="w-full h-14 border rounded-2xl p-2 bg-white" />
            </div>
            <div className="flex gap-5 pt-10 py-1 ">
              <span className="text-sm ">Upload file</span>
              <HrInput
                type="file"

                onChange={(e) => setUploadedFile(e.target.files[0])}
                className="w-60 text-right bg-white" />
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="flex fixed right-4  bottom-4 items-center    rounded sm:px-4 md:px-6 z-50">
          <Button type="submit">Save Payment</Button>
        </div>
      </form>

    </div>
  );
}
