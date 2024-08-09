"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useContext, useEffect } from "react";
import { UContext } from "@/components/UserContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const {context} = useContext(UContext)
  const router = useRouter();

  useEffect(() => {
    if (!context.user) {
      router.push('/login')
    }
  }, [context.user])

  return (
    <main className={styles.main}>
      {context?.user?.name || ""}
    </main>
  );
}
