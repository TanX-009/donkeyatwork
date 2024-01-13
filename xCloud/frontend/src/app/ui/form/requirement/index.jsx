import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export default function Requirement({ children }) {
  return <p className={styles.requirement}>{children}</p>;
}

Requirement.propTypes = {
  children: PropTypes.node.isRequired,
};
