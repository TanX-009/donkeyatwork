"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TextInput from "../../ui/form/text";
import PasswordInput from "../../ui/form/password";
import Image from "next/image";
import SubmitInput from "../../ui/form/submit";

// handler for login form input values
function loginFormOnChange(loginForm, setLoginForm, event) {
  setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
}

export default function Login() {
  const [loginForm, setLoginForm] = useState({});

  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    const handleDarkModeChange = (event) => {
      setIsDarkMode(event.matches);
    };
    darkModeMediaQuery.addListener(handleDarkModeChange);
    setIsDarkMode(darkModeMediaQuery.matches);
    return () => {
      darkModeMediaQuery.removeListener(handleDarkModeChange);
    };
  }, []);

  return (
    <div className={styles.login}>
      <div className={styles.logo}>
        {isDarkMode ? (
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextInput
          name=""
          placeholder="Username"
          variant="top"
          onChange={(e) => loginFormOnChange(loginForm, setLoginForm, e)}
        />
        <PasswordInput
          name=""
          placeholder="Password"
          variant="center"
          onChange={(e) => loginFormOnChange(loginForm, setLoginForm, e)}
        />
        <SubmitInput value="Login" variant="bottom" />
      </form>
    </div>
  );
}
