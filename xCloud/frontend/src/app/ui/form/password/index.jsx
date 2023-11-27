import React, { useState } from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function PasswordInput({
  name,
  placeholder,
  variant,
  onChange,
}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={styles.passwordInput}>
      <label htmlFor={name}>{name}</label>
      <div className={styles.inputContainer}>
        {isVisible ? (
          <input
            type="password"
            placeholder={placeholder || ""}
            className={styles[variant]}
            name={name}
            onChange={onChange}
          />
        ) : (
          <input
            type="text"
            placeholder={placeholder || ""}
            className={styles[variant]}
            name={name}
            onChange={onChange}
          />
        )}
        {isVisible ? (
          <FaEye onClick={() => setIsVisible(false)} />
        ) : (
          <FaEyeSlash
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
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
};
