import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

export default function TextInput({
  name,
  label,
  placeholder,
  variant = "single",
  onChange,
  required,
}) {
  return (
    <div className={styles.textInput}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        className={styles[variant]}
        placeholder={placeholder || ""}
        name={name}
        onChange={onChange}
        required={required ? true : false}
      />
    </div>
  );
}

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};
