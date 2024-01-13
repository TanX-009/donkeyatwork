import React, { useState } from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import Loading from "@/src/app/ui/misc/loading";

export default function DeleteConfirmationPrompt({ onYes, onNo }) {
  const [clickable, setClickable] = useState(true);
  return (
    <div className={styles.prompt}>
      <span>Do you really want to delete this project?</span>
      <div className={styles.confirmationBtns}>
        <button
          // styling and radius variant
          className={`${styles.yes} ${styles.single}`}
          onClick={() => {
            if (clickable) {
              onYes();
              setClickable(false);
            }
          }}
        >
          {clickable ? "Yes" : <Loading />}
        </button>
        <button
          // styling and radius variant
          className={`${styles.no} ${styles.single}`}
          onClick={() => {
            if (clickable) {
              onNo();
            }
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}
DeleteConfirmationPrompt.propTypes = {
  onYes: PropTypes.func,
  onNo: PropTypes.func,
};
