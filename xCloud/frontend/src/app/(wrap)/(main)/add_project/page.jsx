"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import Redirecting from "@/src/app/ui/misc/redirecting";
import SubmitInput from "@/src/app/ui/form/submit";
import { formPost } from "@/src/app/lib/form/post";
import TextInput from "@/src/app/ui/form/text";
import FileInput from "@/src/app/ui/form/file";
import FailedRes from "@/src/app/ui/form/failedRes";
import { Context } from "../../layout";

async function submitForm(file, body = {}, setFailedRes) {
  setFailedRes("Building...");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("data", JSON.stringify(body));
  formPost(
    "/manage/add_project",
    formData,
    // on success
    (data) => {
      setFailedRes(data.msg);
    },
    // on else
    (data) => {
      setFailedRes(data.msg);
    },
  );
}

export default function Home() {
  const router = useRouter();
  const { context } = useContext(Context);
  const [inputFields, setInputFields] = useState({ user: context.user });

  const [projectFile, setProjectFile] = useState(null);
  const [failedRes, setFailedRes] = useState("‎");

  const [onlyOnce, resetOnlyOnce] = useState(true);

  const handleInputField = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!context.user.token) {
      router.push("/login");
    }
  }, [context.user]);
  if (!context.user.token) {
    return <Redirecting />;
  }

  return (
    <div className={styles.home}>
      <h1>Hello {context.user.username}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // allow clicking only once
          if (onlyOnce) {
            resetOnlyOnce(false);
            submitForm(projectFile, inputFields, setFailedRes);
          }
        }}
      >
        {/* failed response */}
        <FailedRes>{failedRes}</FailedRes>

        {/* project file input */}
        <FileInput
          name="projectFile"
          accept=".zip"
          placeholder="Select Project File"
          onChange={(e) => setProjectFile(e.target.files[0])}
          variant="top"
        />

        {/* project name input */}
        <TextInput
          placeholder="Project Name"
          name="project_name"
          variant="center"
          onChange={handleInputField}
        />

        {/* port input */}
        <TextInput
          placeholder="PORT"
          name="main_port"
          variant="center"
          onChange={handleInputField}
        />

        {/* submit */}
        <SubmitInput value="Upload" variant="bottom" />
      </form>
    </div>
  );
}
