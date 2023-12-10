import React from "react";
import styles from "./styles.module.scss";

export default function Redirecting() {
  return (
    <div className={styles.redirect}>
      <h2>Redirecting</h2>
      <div className={styles.loader}></div>
    </div>
  );
}
