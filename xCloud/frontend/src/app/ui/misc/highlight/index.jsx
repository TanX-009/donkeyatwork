import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export default function Hl({ children }) {
  return <span className={styles.highlight}>{children}</span>;
}

Hl.propTypes = {
  children: PropTypes.node.isRequired,
};
