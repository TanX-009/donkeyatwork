"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TextInput from "../../../ui/form/text";
import PasswordInput from "../../../ui/form/password";
import Image from "next/image";
import SubmitInput from "../../../ui/form/submit";
import { Context } from "../../layout";
import { updateOnChange } from "@/src/app/lib/form/updateOnChange";
import { formPost } from "@/src/app/lib/form/post";
import LinkButton from "@/src/app/ui/clickables/linkButton";
import { useRouter } from "next/navigation";
import CharSpacer from "@/src/app/ui/misc/charSpacer";
import FailedRes from "@/src/app/ui/form/failedRes";
import Redirecting from "@/src/app/ui/misc/redirecting";

function forgotPassHandler({
  e,
  setFailedRes,
  forgotPassForm,
  setContext,
  context,
  router,
}) {
  e.preventDefault();

  // form validation
  if (forgotPassForm.password !== forgotPassForm.confirm_password) {
    setFailedRes("Password don't match!");
  } else {
    setFailedRes("Changing password...");
    formPost(
      // link
      "/forgot_password",
      // data
      forgotPassForm,
      // onSucess
      () => {
        router.push("/login");
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
}

export default function Register() {
  const router = useRouter();
  const { context, setContext } = useContext(Context);

  const [forgotPassForm, setForgotPassForm] = useState({});
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
    <div className={styles.register}>
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
      <FailedRes>{failedRes}</FailedRes>
      {/* spacer */}
      <CharSpacer half />
      <form
        onSubmit={(e) => {
          forgotPassHandler({
            e,
            setFailedRes,
            forgotPassForm,
            setContext,
            context,
            router,
          });
        }}
      >
        <TextInput
          name="username"
          label=""
          placeholder="Username"
          variant="single"
          onChange={(e) => updateOnChange(e, forgotPassForm, setForgotPassForm)}
          required={true}
        />
        <CharSpacer />
        <p>Secret Question</p>
        <PasswordInput
          name="secretanswer"
          label=""
          placeholder="Secret answer"
          variant="single"
          onChange={(e) => updateOnChange(e, forgotPassForm, setForgotPassForm)}
          required={true}
        />
        <CharSpacer />
        <PasswordInput
          name="password"
          label=""
          placeholder="New password"
          variant="top"
          onChange={(e) => updateOnChange(e, forgotPassForm, setForgotPassForm)}
          required={true}
        />
        <PasswordInput
          name="confirm_password"
          label=""
          placeholder="Confirm new password"
          variant="center"
          onChange={(e) => updateOnChange(e, forgotPassForm, setForgotPassForm)}
          required={true}
        />
        <SubmitInput value="Change password" variant="bottom" />
      </form>
      <div className={styles.links}>
        <LinkButton path="/login" name="Login" variant="single"></LinkButton>
      </div>
    </div>
  );
}
