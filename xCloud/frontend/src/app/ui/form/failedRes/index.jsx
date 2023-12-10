import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export default function FailedRes({ children }) {
  return <p className={styles.failedResponse}>{children}</p>;
}

FailedRes.propTypes = {
  children: PropTypes.node.isRequired,
};
