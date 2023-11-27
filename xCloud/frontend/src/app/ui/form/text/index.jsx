import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

export default function TextInput({ name, placeholder, variant, onChange }) {
  return (
    <div className={styles.textInput}>
      <label htmlFor={name}>{name}</label>
      <input
        type="text"
        className={styles[variant]}
        placeholder={placeholder || ""}
        name={name}
        onChange={onChange}
      />
    </div>
  );
}

TextInput.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
};
