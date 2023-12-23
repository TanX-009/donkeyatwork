import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { FaPause, FaPlay } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { BsExclamationDiamondFill } from "react-icons/bs";
import PropTypes from "prop-types";
import Loading from "@/src/app/ui/misc/loading";
import { formSecurePost } from "@/src/app/lib/form/post";
import { Context } from "@/src/app/(wrap)/layout";
import FailedRes from "@/src/app/ui/form/failedRes";

function startProject(project, user, updateTick, setFailedRes) {
  formSecurePost(
    "/manage/start_project",
    { project: project },
    user.token,
    // onSucess
    () => {
      updateTick((val) => !val);
    },
    // onElse
    (data) => {
      setFailedRes(data.msg);
    },
    // onError
    (data) => {
      setFailedRes(data.error);
    },
  );
}

function stopProject(project, user, updateTick, setFailedRes) {
  formSecurePost(
    "/manage/stop_project",
    { project: project },
    user.token,
    // onSucess
    () => {
      updateTick((val) => !val);
    },
    // onElse
    (data) => {
      setFailedRes(data.msg);
    },
    // onError
    (data) => {
      setFailedRes(data.error);
    },
  );
}

export default function Card({ project, deleting, setDeleting, updateTick }) {
  const { context } = useContext(Context);
  const [failedRes, setFailedRes] = useState(null);

  useEffect(() => {
    // if neither running nor exited set failed response
    if (project.state !== "running" && project.state !== "exited") {
      setFailedRes(project.msg);
    }
  }, []);

  const [stopping, setStopping] = useState(false);
  const [starting, setStarting] = useState(false);

  return (
    <>
      <div className={styles.projectCard}>
        {/* project name */}
        <h2>{project.project_name}</h2>

        {/* current project state or failed response */}
        {failedRes ? (
          <FailedRes>{failedRes}</FailedRes>
        ) : (
          <div>{project.msg}</div>
        )}

        {/* controls for the project state */}
        <div className={styles.controls}>
          {/* if control has failed show exclamation mark for tooltip */}
          {failedRes ? (
            <BsExclamationDiamondFill className={styles.exclaim} />
          ) : project.state === "running" ? (
            <button
              className={styles.button}
              onClick={() => {
                if (!stopping) {
                  setStopping(true);
                  stopProject(project, context.user, updateTick, setFailedRes);
                }
              }}
            >
              {/* if stopping show loading if not show pause */}
              {stopping ? <Loading /> : <FaPause />}
            </button>
          ) : project.state === "exited" ? (
            <button
              className={styles.button}
              onClick={() => {
                if (!starting) {
                  setStarting(true);
                  startProject(project, context.user, updateTick, setFailedRes);
                }
              }}
            >
              {/* if starting show loading if not show play */}
              {starting ? <Loading /> : <FaPlay />}
            </button>
          ) : (
            <BsExclamationDiamondFill className={styles.exclaim} />
          )}

          {/* delete button */}
          <button
            className={styles.deleteButton}
            onClick={() => {
              if (deleting) return;
              setDeleting(true);
            }}
          >
            {deleting ? <Loading /> : <IoCloseCircle />}
          </button>
        </div>
      </div>
    </>
  );
}
Card.propTypes = {
  project: PropTypes.object,
  deleting: PropTypes.bool,
  setDeleting: PropTypes.func,
  updateTick: PropTypes.func,
};
