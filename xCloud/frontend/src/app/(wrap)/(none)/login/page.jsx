"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TextInput from "../../../ui/form/text";
import PasswordInput from "../../../ui/form/password";
import SubmitInput from "../../../ui/form/submit";
import { Context } from "../../layout";
import { updateOnChange } from "@/src/app/lib/form/updateOnChange";
import { formPost } from "@/src/app/lib/form/post";
import LinkButton from "@/src/app/ui/clickables/linkButton";
import FailedRes from "@/src/app/ui/form/failedRes";
import { useRouter } from "next/navigation";
import DisplayLogo from "@/src/app/ui/info/displayLogo";
import Redirecting from "@/src/app/ui/misc/redirecting";
import CharSpacer from "@/src/app/ui/misc/charSpacer";

function loginHandler({
  e,
  setFailedRes,
  loginForm,
  setContext,
  context,
  router,
}) {
  e.preventDefault();
  setFailedRes("Logging in...");
  formPost(
    // link
    "/login",
    // data
    loginForm,
    // onSucess
    (data) => {
      setContext({ ...context, user: data.user }, () => router.push("/"));
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
  const router = useRouter();
  const { context, setContext } = useContext(Context);

  const [loginForm, setLoginForm] = useState({});
  const [failedRes, setFailedRes] = useState("‎");

  // redirect user if is already loggedin
  useEffect(() => {
    if (context.user.username) {
      router.push("/");
    }
  }, [context.user.username]);
  if (context.user.username) {
    return <Redirecting />;
  }

  return (
    <div className={styles.login}>
      <form
        onSubmit={(e) => {
          loginHandler({
            e,
            setFailedRes,
            loginForm,
            setContext,
            context,
            router,
          });
        }}
      >
        {/* xCloud logo */}
        <DisplayLogo />

        {/* failed response */}
        <FailedRes>{failedRes}</FailedRes>

        {/* spacer */}
        <CharSpacer half />

        {/* username input */}
        <TextInput
          name="username"
          label=""
          placeholder="Username"
          variant="top"
          onChange={(e) => updateOnChange(e, loginForm, setLoginForm)}
          required={true}
        />

        {/* password input */}
        <PasswordInput
          name="password"
          label=""
          placeholder="Password"
          variant="center"
          onChange={(e) => updateOnChange(e, loginForm, setLoginForm)}
          required={true}
        />

        {/* submit login form */}
        <SubmitInput value="Login" variant="bottom" />

        {/* other pages link */}
        <div className={styles.links}>
          {/* to register */}
          <LinkButton
            path="/register"
            name="Register"
            variant="top"
          ></LinkButton>

          {/* to forgot password */}
          <LinkButton
            path="/forgot_password"
            name="Forgot Password"
            variant="bottom"
          ></LinkButton>
        </div>
      </form>
    </div>
  );
}
