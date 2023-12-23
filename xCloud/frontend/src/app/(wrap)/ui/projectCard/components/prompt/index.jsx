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
          className={styles.yes}
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
          className={styles.no}
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
