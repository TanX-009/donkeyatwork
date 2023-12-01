import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export default function LinkButton({ path, name, variant }) {
  return (
    <Link className={`${styles.linkButton} ${styles[variant]}`} href={path}>
      {name}
    </Link>
  );
}

LinkButton.propTypes = {
  path: PropTypes.string,
  name: PropTypes.node.isRequired,
  variant: PropTypes.string,
};
