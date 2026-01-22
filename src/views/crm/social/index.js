import React from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
export default function HomePage() {
  
  return (
    <div className=" flex flex-col items-center px-6 pt-40 py-10 text-center gap-6  ">

      <Image src='/social.png' alt="Social Image" width={250} height={200} />
      <p className="text-xl max-w-2xl">Engage customers, gain valuable insights and generate leads through social media by linking your social media accounts with HR-360 CRM</p>
        <Button>Let's Get Started</Button>  
     

    </div>
  );
}
