import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function IsDarkMode({ setDarkModeState }) {
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    const handleDarkModeChange = (event) => {
      setDarkModeState(event.matches);
    };
    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);
    setDarkModeState(darkModeMediaQuery.matches);
    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, []);
  return <></>;
}

IsDarkMode.propTypes = {
  setDarkModeState: PropTypes.func,
};
