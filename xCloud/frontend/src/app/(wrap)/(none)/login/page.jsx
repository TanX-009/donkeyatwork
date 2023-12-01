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

function loginHandler({ e, setFailedRes, registerForm, setContext, context }) {
  e.preventDefault();
  setFailedRes("Logging in...");
  formPost(
    // link
    "/register",
    // data
    registerForm,
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
}

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
            sizes="(max-width: 1920px) 16.6667vw, (max-width: 1440px) 22.2222vw, (max-width: 128
0px) 25.0000vw, (max-width: 980px) 32.6531vw, (max-width: 720px) 44.4444vw, (max-wid
th: 640px) 50.0000vw, (max-width: 360px) 88.8889vw, 30.5177vw"
          />
        ) : (
          <Image
            src={"xCloud-light.svg"}
            alt="xCloud"
            fill={true}
            priority={true}
            sizes="(max-width: 1920px) 16.6667vw, (max-width: 1440px) 22.2222vw, (max-width: 128
0px) 25.0000vw, (max-width: 980px) 32.6531vw, (max-width: 720px) 44.4444vw, (max-wid
th: 640px) 50.0000vw, (max-width: 360px) 88.8889vw, 30.5177vw"
          />
        )}
      </div>
      <p className={styles.failedRes}>{failedRes}</p>
      <form
        onSubmit={(e) => {
          loginHandler({
            e,
            setFailedRes,
            loginForm,
            setContext,
            context,
          });
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
      <div className={styles.links}>
        <LinkButton path="/register" name="Register" variant="top"></LinkButton>
        <LinkButton
          path="/forgot_password"
          name="Forgot Password"
          variant="bottom"
        ></LinkButton>
      </div>
    </div>
  );
}
