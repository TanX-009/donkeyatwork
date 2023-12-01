import React, { useState } from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function PasswordInput({
  name,
  label,
  placeholder,
  variant,
  onChange,
  required,
}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={styles.passwordInput}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.inputContainer}>
        <input
          type={isVisible ? "text" : "password"}
          placeholder={placeholder || ""}
          className={styles[variant]}
          name={name}
          onChange={onChange}
          required={required ? true : false}
        />
        {isVisible ? (
          <FaEyeSlash onClick={() => setIsVisible(false)} />
        ) : (
          <FaEye
            onClick={() => {
              setIsVisible(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

PasswordInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};
