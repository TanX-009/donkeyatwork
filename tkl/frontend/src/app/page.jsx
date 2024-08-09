"use client";

import styles from "./page.module.css";
import { useContext, useEffect } from "react";
import { UContext } from "@/components/UserContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { context } = useContext(UContext);
  const router = useRouter();

  useEffect(() => {
    if (!context.user) {
      router.push("/login");
    } else if (context.user.name === "admin") router.push("/admin");
  }, [context.user, router]);

  if (!context.user) return null;

  return <main className={styles.main}>User: {context?.user?.name || ""}</main>;
}
