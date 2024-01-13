import React from "react";
import PropTypes from "prop-types";
import Navbar from "../../ui/layout/navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
