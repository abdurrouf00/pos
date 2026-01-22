"use client";

import React, { useState, useRef } from "react";
import { IoIosMailOpen } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { FcIdea } from "react-icons/fc";


const faqsData = [
  {
    id: 1,
    title: "HR-360 Mail",
    content: [
      "Enable Auto-upload Bank Statements in HR-360 and copy the generated email address.",
      "Open HR-360 Mail.",
      "Click the Gear icon in the top-right corner.",
      "Create a new incoming filter to filter the emails from your bank that has an attachment and fill in the details.",
      "Choose Forward email to under the Actions section.",
      "Paste the email address and click Save. Now, your bank statements will be forwarded to the Bank Statement Inbox in HR-360."
    ],
  },
  {
    id: 2,
    title: "Outlook",
    content: [
      "Enable Auto-upload Bank Statements in HR-360 and copy the generated email address.",
      "Open Outlook.",
      "Click the Gear icon in the top-right corner and click Settings.",
      "Click View all Outlook settings.",
      "Select the Rules tab under the Mail section.",
      "Click + Add new rule and enter the details with proper conditions.",
      "Ensure to add a condition as Has attachment so that only emails that have an attachment are auto-forwarded.",
      "Select Forward to under Add an action section and paste the generated email address.",
      "Click Save. Now, your bank statements will be forwarded to the Bank Statement Inbox in HR-360."
    ],
  },
  {
    id: 3,
    title: "Gmail",
    content: [
      "Enable Auto-upload Bank Statements in HR-360 and copy the generated email address.",
      "Open Gmail and navigate to Settings.",
      "Go to the Forwarding and POP/IMAP tab and click Add a forwarding address.",
      "Paste the generated email address in the popup and click Next.",
      "Click Proceed in the new tab that opens. Gmail will send a verification code to the Bank Statements Inbox in HR-360.",
      "Check the Bank Statements Inbox for the PDF file from Gmail and copy the verification code.",
      "Paste the code under Forwarding and POP/IMAP in Settings in Gmail to verify the email address. As soon as the email is verified, it will be added as a forwarding address.",
      "Next, go to Filters and Blocked Addresses tab.",
      "Click Create a new filter and fill in the details.",
      "Enter your bank’s email address from which you receive the bank statements.",
      "Mark the option Has attachment to filter only emails that have an attachment.",
      "Click Create filter.",
      "Mark the Forward it to option and select the forwarding address from the dropdown.",
      "Click Create filter. Now, your bank statements will be forwarded to the Bank Statement Inbox in HR-360."
    ],
  },
];

export default function Home() {
  const [openId, setOpenId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="bg-gray-50 flex flex-col items-center justify-center p-6">
      <p className="mb-6 cursor-pointer" onClick={() => setIsDrawerOpen(true)}>
        How do I auto-forward bank statements?
      </p>

      {/* Icons */}
      <div className="flex gap-6 text-4xl text-indigo-500 cursor-pointer">
        <IoIosMailOpen onClick={() => setIsDrawerOpen(true)} />
        <IoMdMail onClick={() => setIsDrawerOpen(true)} />
        <PiMicrosoftOutlookLogoFill onClick={() => setIsDrawerOpen(true)} />
      </div>

      {/* AnimatePresence for overlay + drawer */}
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-40"

            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer */}
          <div
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col"

          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-100">
              <h2 className="text-lg font-semibold flex gap-3 items-center">
                <FcIdea className="text-3xl" />
                How do I auto-forward bank statements from my email?
              </h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>
            </div>

            {/* FAQ Content */}
            <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-60px)]">
              {faqsData.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => toggle(faq.id)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

function FAQItem({ faq, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <span className="font-medium">{faq.title}</span>
        <span className="ml-4 flex items-center">
          <svg
            className={`transform transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"
              }`}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </span>
      </button>

      {/* Collapsible content */}
      <div

        className="overflow-hidden px-4"
      >
        <div className="py-4 text-gray-700 border-t">
          {Array.isArray(faq.content) ? (
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {faq.content.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          ) : (
            <p>{faq.content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
