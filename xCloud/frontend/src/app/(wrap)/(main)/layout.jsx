import React from "react";
import PropTypes from "prop-types";

export default function MainLayout({ children }) {
  return <>{children}</>;
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
