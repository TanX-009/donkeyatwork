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
import Requirement from "@/src/app/ui/form/requirement";
import CharSpacer from "@/src/app/ui/misc/charSpacer";
import { TiCloudStorage } from "react-icons/ti";
import Hl from "@/src/app/ui/misc/highlight";
import Radio from "@/src/app/ui/form/radio";

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

  // all input fields with user information
  const [inputFields, setInputFields] = useState({ user: context.user });

  // main project file
  const [mainProjectFile, setMainProjectFile] = useState(null);

  // state for user to toggle if dedicated backend is present
  const [isBackend, setIsBackend] = useState("No");
  // backend project file
  const [backendProjectFile, setBackendProjectFile] = useState(null);

  // state for user to toggle if dedicated database is present
  const [isDatabase, setIsDatabase] = useState("No");

  const [failedRes, setFailedRes] = useState("‎");

  // toggle for preventing user to spam submitting
  const [onlyOnce, resetOnlyOnce] = useState(true);

  const handleInputField = (e, type) => {
    setInputFields({
      ...inputFields,
      // spread is required in nested
      [type]: { ...inputFields[type], [e.target.name]: e.target.value },
    });
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
      <h1>
        <TiCloudStorage /> <span>Add project</span>
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // allow clicking only once
          if (onlyOnce) {
            resetOnlyOnce(false);
            submitForm(mainProjectFile, inputFields, setFailedRes);
          }
        }}
      >
        {/* failed response */}
        <FailedRes>{failedRes}</FailedRes>

        {/* general information */}
        <Requirement>Follow the form and instructions to deploy.</Requirement>
        <CharSpacer half />
        <Requirement>
          Currently, only projects based on <Hl>npm(node package manager)</Hl>{" "}
          are supported.
        </Requirement>
        <CharSpacer half />

        {/* project file input */}
        <FileInput
          name="mainProjectFile"
          accept=".zip"
          placeholder="Select Project File"
          onChange={(e) => setMainProjectFile(e.target.files[0])}
          variant="single"
        />

        {/* file requirements */}
        <CharSpacer half />
        <Requirement>
          The file must have all the files directly inside(ie. the{" "}
          <Hl>package.json</Hl> file must be directly inside the zip).
        </Requirement>
        <CharSpacer fourth />
        <Requirement>
          The <Hl>package.json</Hl> must have <Hl>start</Hl> script inside it.
        </Requirement>
        <CharSpacer half />

        {/* project name input */}
        <TextInput
          // toggle for preventing user to spam submitting
          placeholder="Project Name"
          name="project_name"
          variant="single"
          onChange={(e) => handleInputField(e, "main")}
        />

        {/* project name requirements */}
        <CharSpacer half />
        <Requirement>The project name must be unique.</Requirement>
        <CharSpacer half />

        {/* port input */}
        <TextInput
          placeholder="PORT"
          name="port"
          variant="single"
          onChange={(e) => handleInputField(e, "main")}
        />

        {/* port requirements */}
        <CharSpacer half />
        <Requirement>The port that is used by the start script.</Requirement>
        <CharSpacer fourth />
        <Requirement>
          e.g. if the link is <Hl>http://localhost:3000</Hl> then, the port is{" "}
          <Hl>3000</Hl>.
        </Requirement>

        <CharSpacer />

        <h2>Backend</h2>
        <CharSpacer fourth />

        <Radio
          prompt="Does your project have a dedicated backend?"
          selected={isBackend}
          setSelected={setIsBackend}
          options={["Yes", "No"]}
        />
        <CharSpacer half />

        {/* show options if backend is selected */}
        {isBackend === "Yes" ? (
          <>
            {/* project file input */}
            <FileInput
              name="backendProjectFile"
              accept=".zip"
              placeholder="Select Project File"
              onChange={(e) => setBackendProjectFile(e.target.files[0])}
              variant="single"
            />

            {/* file requirements */}
            <CharSpacer half />
            <Requirement>
              The file must have all the files directly inside(ie. the{" "}
              <Hl>package.json</Hl> file must be directly inside the zip).
            </Requirement>
            <CharSpacer fourth />
            <Requirement>
              The <Hl>package.json</Hl> must have <Hl>start</Hl> script inside
              it.
            </Requirement>
            <CharSpacer half />

            {/* port input */}
            <TextInput
              placeholder="PORT"
              name="main_port"
              variant="single"
              onChange={(e) => handleInputField(e, "main")}
            />

            {/* port requirements */}
            <CharSpacer half />
            <Requirement>
              The port that is used by the start script.
            </Requirement>
            <CharSpacer fourth />
            <Requirement>
              e.g. if the link is <Hl>http://localhost:3000</Hl> then, the port
              is <Hl>3000</Hl>.
            </Requirement>
          </>
        ) : (
          ""
        )}

        <CharSpacer />

        <h2>Database</h2>
        <CharSpacer fourth />

        <Radio
          prompt="Does your project have a dedicated database?"
          selected={isDatabase}
          setSelected={setIsDatabase}
          options={["Yes", "No"]}
        />
        <CharSpacer half />

        {/* show options if backend is selected */}
        {isDatabase === "Yes" ? (
          <>
            {/* port input */}
            <TextInput
              placeholder="PORT"
              name="main_port"
              variant="single"
              onChange={(e) => handleInputField(e, "main")}
            />

            {/* port requirements */}
            <CharSpacer half />
            <Requirement>
              The port that is used by the backend to fetch database.
            </Requirement>
            <CharSpacer fourth />
            <Requirement>
              e.g. if the link is <Hl>http://localhost:3000</Hl> then, the port
              is <Hl>3000</Hl>.
            </Requirement>
          </>
        ) : (
          ""
        )}

        <CharSpacer />

        {/* submit */}
        <SubmitInput value="Upload" variant="single" />

        <CharSpacer />
      </form>
    </div>
  );
}
