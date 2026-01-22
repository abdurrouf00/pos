"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      router.push("/organization/modules");
    } else {
      router.push("/auth/login");
    }
  }, [router, user]);

  return <></>;
}
