import React from "react";
import PropTypes from "prop-types";

export default function NoneLayout({ children }) {
  return <>{children}</>;
}

NoneLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
