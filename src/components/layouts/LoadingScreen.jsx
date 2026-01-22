"use client";

import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import React, { useEffect, useState } from "react";

export default function LoadingScreen({ children }) {
  const loader = useTopLoader();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loader.isStarted()) {
      setIsLoading(true);
    }
  }, [loader.isStarted]);
  useEffect(() => {
    if (loader.isRendered()) {
      setIsLoading(false);
    }
  }, [loader.isRendered]);

  return isLoading ? <div>Loading...</div> : children;
}
