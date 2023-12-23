import React, { useState } from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

export default function FileInput({
  accept,
  name,
  placeholder,
  onChange,
  variant,
}) {
  const [selectedFile, setSelectedFile] = useState("No file choosen");
  return (
    <div className={styles.fileInput + " " + styles[variant]}>
      <div className={styles.fakeInput}>
        <div className={styles.button}>Choose file</div>
        <div>{selectedFile}</div>
      </div>
      <input
        type="file"
        accept={accept}
        id={placeholder}
        name={name}
        required={true}
        onChange={(e) => {
          onChange(e);
          setSelectedFile(e.target.files[0].name);
        }}
      />
    </div>
  );
}

FileInput.propTypes = {
  accept: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
};
