"use client";

import React, { useContext, useEffect, useState } from "react";
import { Context } from "./layout";
import { useRouter } from "next/navigation";
import Redirecting from "../ui/misc/redirecting";
import { getData } from "../lib/data/getData";
import SubmitInput from "../ui/form/submit";
import { formPost } from "../lib/form/post";

async function submitForm(file, body = {}) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("data", JSON.stringify(body));
  formPost(
    "/addProject",
    formData,
    (data) => {
      console.log(data);
    },
    (data) => {
      console.log(data);
    },
  );
}

export default function Home() {
  const router = useRouter();
  const { context } = useContext(Context);

  const [projectFile, setProjectFile] = useState(null);
  const [test, setTest] = useState();
  console.log(test);

  useEffect(() => {
    if (!context.user.token) {
      router.push("/login");
    }
  }, [context.user]);
  if (!context.user.token) {
    return <Redirecting />;
  }

  return (
    <div>
      <h1>Hello</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm(projectFile, { asdf: "asdf" });
        }}
      >
        <input
          type="file"
          accept=".zip"
          name="projectFile"
          required={true}
          onChange={(e) => setProjectFile(e.target.files[0])}
        />
        <SubmitInput value="Upload" variant="single" />
      </form>
      <button
      // onClick={() => {
      //   getData("/addProject", setTest, { asdf: "asdf" });
      // }}
      >
        Get
      </button>
    </div>
  );
}
