import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

export default function CharSpacer({ half }) {
  if (half) {
    return <div className={styles.half}>‎</div>;
  }
  return <div className={styles.charSpacer}>‎</div>;
}

CharSpacer.propTypes = {
  half: PropTypes.bool,
};
