import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <Image
        src={"/circl-face.gif"}
        alt="loading"
        width={100}
        height={100}
        unoptimized
      />
    </div>
  );
}

export default Loading;
