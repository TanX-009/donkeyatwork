import React, { useState } from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

function isSelected(selected, option) {
  if (selected === option) return styles.selected;
  return styles.unSelected;
}

export default function Radio({ prompt, selected, setSelected, options }) {
  return (
    <div className={styles.radio}>
      {prompt}
      <div>
        {options.map((option, key) => {
          return (
            <button
              type="button"
              className={`${isSelected(selected, option)} ${styles.single}`}
              onClick={() => setSelected(option)}
              key={key}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Radio.propTypes = {
  prompt: PropTypes.string,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
};
