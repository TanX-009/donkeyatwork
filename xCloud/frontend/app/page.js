import React from "react";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>This is a heading.</h1>
      <h2>This is a heading.</h2>
      <h3>This is a heading.</h3>
      <h4>This is a heading.</h4>
      <h5>This is a heading.</h5>
      <h6>This is a heading.</h6>
      <p>This is a paragraph.</p>
    </div>
  );
}
