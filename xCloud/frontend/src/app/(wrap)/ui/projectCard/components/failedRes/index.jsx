import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

export default function DeleteFailedRes({ failedRes }) {
  return <div className={styles.failedRes}>{failedRes}</div>;
}
DeleteFailedRes.propTypes = {
  failedRes: PropTypes.string,
};
