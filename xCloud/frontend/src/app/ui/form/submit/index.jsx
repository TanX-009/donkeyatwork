import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

export default function SubmitInput({ value, variant }) {
  return (
    <div className={styles.submitInput}>
      <input type="submit" className={styles[variant]} value={value || ""} />
    </div>
  );
}

SubmitInput.propTypes = {
  value: PropTypes.string,
  variant: PropTypes.string,
};
