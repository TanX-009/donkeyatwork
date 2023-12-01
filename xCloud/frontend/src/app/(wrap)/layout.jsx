"use client";

import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import IsDarkMode from "../lib/darkmode";

export const Context = createContext();

export default class WrapperLayout extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isDarkMode: true,
    };
  }
  render() {
    const { children } = this.props;
    return (
      <Context.Provider
        value={{
          context: this.state,
          setContext: (value, callback) => {
            if (callback) {
              this.setState(value, callback);
            } else this.setState(value);
          },
        }}
      >
        {children}

        <IsDarkMode // check for dark mode
          setDarkModeState={(value) => {
            this.setState({ ...this.state, isDarkMode: value });
          }}
        />
      </Context.Provider>
    );
  }
}

WrapperLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
