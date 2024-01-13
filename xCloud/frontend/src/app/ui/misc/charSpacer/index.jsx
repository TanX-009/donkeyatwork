import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

export default function CharSpacer({ half, fourth }) {
  if (half) {
    return <div className={styles.half}>‎</div>;
  } else if (fourth) {
    return <div className={styles.fourth}>‎</div>;
  }
  return <div className={styles.charSpacer}>‎</div>;
}

CharSpacer.propTypes = {
  half: PropTypes.bool,
  fourth: PropTypes.bool,
};
