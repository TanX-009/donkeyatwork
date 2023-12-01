"use client";

import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import TextInput from "../../../ui/form/text";
import PasswordInput from "../../../ui/form/password";
import Image from "next/image";
import SubmitInput from "../../../ui/form/submit";
import { Context } from "../../layout";
import { updateOnChange } from "@/src/app/lib/form/updateOnChange";
import { formPost } from "@/src/app/lib/form/post";
import LinkButton from "@/src/app/ui/clickables/linkButton";

export default function Login() {
  const { context, setContext } = useContext(Context);

  const [loginForm, setLoginForm] = useState({});
  const [failedRes, setFailedRes] = useState("‎");

  return (
    <div className={styles.login}>
      <div className={styles.logo}>
        {context.isDarkMode ? (
          <Image
            src={"xCloud-dark.svg"}
            alt="xCloud"
            fill={true}
            priority={true}
            sizes="(max-width: 1920em) 16.6667vw, (max-width: 1440em) 22.2222vw, (max-width: 128
0em) 25.0000vw, (max-width: 980em) 32.6531vw, (max-width: 720em) 44.4444vw, (max-wid
th: 640em) 50.0000vw, (max-width: 360em) 88.8889vw, 30.5177vw"
          />
        ) : (
          <Image
            src={"xCloud-light.svg"}
            alt="xCloud"
            fill={true}
            priority={true}
            sizes="(max-width: 1920em) 16.6667vw, (max-width: 1440em) 22.2222vw, (max-width: 128
0em) 25.0000vw, (max-width: 980em) 32.6531vw, (max-width: 720em) 44.4444vw, (max-wid
th: 640em) 50.0000vw, (max-width: 360em) 88.8889vw, 30.5177vw"
          />
        )}
      </div>
      <p>{failedRes}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFailedRes("Logging in...");
          formPost(
            // link
            "/login",
            // data
            loginForm,
            // onSucess
            (data) => {
              setContext({ ...context, user: data.user });
            },
            // onElse
            (data) => {
              setFailedRes(data.msg);
            },
            // onError
            (error) => {
              setFailedRes(error.message);
            },
          );
        }}
      >
        <TextInput
          name="username"
          label=""
          placeholder="Username"
          variant="top"
          onChange={(e) => updateOnChange(e, loginForm, setLoginForm)}
          required={true}
        />
        <PasswordInput
          name="password"
          label=""
          placeholder="Password"
          variant="center"
          onChange={(e) => updateOnChange(e, loginForm, setLoginForm)}
          required={true}
        />
        <SubmitInput value="Login" variant="bottom" />
      </form>
      <LinkButton path="/register">Register</LinkButton>
    </div>
  );
}
