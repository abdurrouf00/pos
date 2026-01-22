import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';  

export default function HomePage() {
  return (
    <div className="px-6 py-10">
      {/* Heading */}
      <p className="text-4xl font-bold mb-6 text-gray-800">Sales Inbox</p>

      {/* Text + Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <p className="text-gray-700 max-w-2xl leading-relaxed">
          This first-of-its-kind inbox will transform how you do sales. 
          This deal-changing email organizer unites email and HR-360 CRM 
          information in a single view.
        </p>

        <Button >
          Configure Now
        </Button>
      </div>

      {/* Image Section */}
      <div className=" pt-20 border-t">
        <Image 
          src="/salesInbox.png" 
          alt="Sales Inbox" 
          width={1800} 
          height={400} 
          className=""
        />
        <div className='flex  gap-15 mx-24 pl-8 pt-5 text-3xl  font-semibold text-gray-800'>
          <p>Prioritized in 4-column layout</p> 
          <p>Filtered with HR-360 CRM data</p>
          <p>With all contextual HR-360 CRM info</p>
        </div>
      </div>
    </div>
  );
}
