import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export default function LinkButton({ path, name }) {
  return (
    <Link className={styles.linkButton} href={path}>
      {name}
    </Link>
  );
}

LinkButton.propTypes = {
  path: PropTypes.string,
  name: PropTypes.node.isRequired,
};
