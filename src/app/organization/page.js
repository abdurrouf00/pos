"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OrganizationPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/organization/modules");
  }, [router]);

  return <></>;
}
