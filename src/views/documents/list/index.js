
import React from "react"
import FAQinIcons from './faq'
import Link from "next/link"

export default function DocumentShowPage(){
  return(
    <div>
     <Link href="/dashboard/documents" className="bg-gray-100 px-5 p-2 border rounded"> Back</Link>
<div className="flex justify-center items-center mt-20  bg-gray-50">
  <div className="max-w-3xl w-full border bg-gray-50 py-10 p-6 text-center">
    <h2 className="text-xl font-bold mb-6">
      Auto-upload your bank statements from email
    </h2>

    {/* Steps */}
    <div className="flex justify-around gap-6">
      {/* Step 1 */}
      <div className="flex flex-col items-center">
        <img
          src="/vector.jpg"
          alt="auto upload"
          className="h-20 w-20 rounded-full shadow-md mb-3"
        />
        <p className="text-sm font-medium">Enable Auto-upload in HR-360</p>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col items-center">
        <img
          src="/gmail.jpg"
          alt="gmail"
          className="h-20 w-20 rounded-full shadow-md mb-3"
        />
        <p className="text-sm font-medium">
          Set up auto-forwarding in your email
        </p>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col items-center">
        <img
          src="/bank.jpg"
          alt="bank"
          className="h-20 w-20 rounded-full shadow-md mb-3"
        />
        <p className="text-sm font-medium">Add Statements to Bank</p>
      </div>
    </div>

    {/* Button */}
    <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow">
      Enable Now
    </button>
  </div>
</div>

{/*//todo ================= icons FAQs =================== */}

<FAQinIcons/>

{/* ===========Image================ */}

  <div className="text-center pb-40 bg-gray-100">
  <h2 className="text-2xl font-semibold py-10 pl-8">
    How does Bank Statements Inbox work?
  </h2>
  <img
    src="/bankTransection.png"
    alt="bank process img"
    className="w-full max-w-5xl mx-auto"
  />
</div>


</div>
  )
}
