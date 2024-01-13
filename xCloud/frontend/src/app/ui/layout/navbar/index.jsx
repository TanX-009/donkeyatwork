"use client";

import React, { useContext } from "react";
import styles from "./styles.module.scss";
import NavbarLogo from "../../info/navbarLogo";
import { GiAstronautHelmet } from "react-icons/gi";
import { Context } from "@/src/app/(wrap)/layout";

export default function Navbar() {
  const { context } = useContext(Context);
  return (
    <div className={styles.navbar}>
      {/* logo */}
      <NavbarLogo />

      {/* user */}
      <h1>
        <GiAstronautHelmet /> <span>{context.user.username}</span>
      </h1>
    </div>
  );
}
