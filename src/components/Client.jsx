"use client";
import React, { useEffect, useState } from "react";

export default function Client({ children }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  return <>{children}</>;
}
