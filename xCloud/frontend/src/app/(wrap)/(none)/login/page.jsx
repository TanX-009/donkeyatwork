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

async function getUserData(username) {
  let location = {};
  if (navigator.geolocation) {
    // Geolocation is supported
    await navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        location.coords = { latitude: latitude, longitude: longitude };

        // Call the reverse geocoding API
        await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        )
          .then((response) => response.json())
          .then((data) => {
            location.city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.county ||
              "";
            location.area = data.address.state || data.address.country || "";
          })
          .catch((error) => {
            console.error("Error getting location:", error);
          });
      },
      (error) => {
        console.error("Error getting location:", error);
      },
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }

  let ip = "";
  let isp = "";

  await fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) => {
      ip = data.ip || "";
      isp = data.org || "";
    })
    .catch((error) => {
      console.error("Error fetching IP information:", error);
    });

  const userAgent = window.navigator.userAgent;

  // Check if the user agent string contains keywords indicating the device type
  const isMobile = /Mobi/.test(userAgent); // Check for mobile devices
  const isTablet = /Tablet/.test(userAgent); // Check for tablets

  let device = "";

  if (isMobile) {
    device = "Mobile";
  } else if (isTablet) {
    device = "Tablet";
  } else {
    device = "Desktop";
  }

  const timestamp = new Date().toISOString();

  return {
    location: location,
    userAgent: userAgent,
    device: device,
    timestamp: timestamp,
    username: username,
    ip: ip,
    isp: isp,
  };
}

async function loginHandler({
  e,
  setFailedRes,
  loginForm,
  setContext,
  context,
  router,
}) {
  e.preventDefault();

  let userData = await getUserData(loginForm.username);
  let res = "";

  setFailedRes("Logging in...");
  await formPost(
    // link
    "/login",
    // data
    loginForm,
    // onSucess
    (data) => {
      setContext({ ...context, user: data.user }, () => router.push("/"));
      res = "Success";
    },
    // onElse
    (data) => {
      setFailedRes(data.msg);
      res = data.msg;
    },
    // onError
    (error) => {
      setFailedRes(error.message);
      res = error.message;
    },
  );

  userData.attempt = res;

  console.log(userData);
}

export default function Login() {
  const router = useRouter();
  const { context, setContext } = useContext(Context);

  const [loginForm, setLoginForm] = useState({});
  const [failedRes, setFailedRes] = useState("⠀");

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
