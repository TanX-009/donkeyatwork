import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import DeleteConfirmationPrompt from "./components/prompt";
import Card from "./components/card";
import DeleteFailedRes from "./components/failedRes";
import { Context } from "../../../layout";
import { formSecurePost } from "@/src/app/lib/form/post";

async function deleteProject(setFailedRes, project, user, updateTick) {
  formSecurePost(
    "/manage/delete_project",
    { project: project, user: user },
    user.token,
    // onSucess
    () => {
      updateTick((val) => !val);
    },
    // onElse
    (msg) => {
      setFailedRes(msg);
    },
    // onError
    (error) => {
      setFailedRes(error);
    },
  );
}

export default function ProjectCard({ project, updateTick }) {
  const [deleting, setDeleting] = useState(false);
  const [failedRes, setFailedRes] = useState(null);

  const { context } = useContext(Context);

  // if currently deleting display prompt else display card
  if (deleting) {
    return (
      <DeleteConfirmationPrompt
        onYes={() => {
          deleteProject(setFailedRes, project, context.user, updateTick);
        }}
        onNo={() => {
          setDeleting(false);
        }}
      />
    );
  }

  // if deleting returns error is displayed to the user
  if (failedRes) {
    return <DeleteFailedRes failedRes={failedRes} />;
  }
  return (
    <Card
      project={project}
      deleting={deleting}
      setDeleting={setDeleting}
      updateTick={updateTick}
    />
  );
}
ProjectCard.propTypes = {
  project: PropTypes.object,
  updateTick: PropTypes.func,
};
