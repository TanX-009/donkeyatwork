"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UContext } from "@/components/UserContext";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [submit, setSubmit] = useState(true);
  const [status, setStatus] = useState("");

  const router = useRouter();

  const { context } = useContext(UContext);

  const onRegister = async (e) => {
    e.preventDefault();
    setStatus("");

    if (submit) {
      try {
        const response = await axios.post(
          "http://localhost:4000/register",
          form,
        );
        setStatus(response.data.message);
        router.push("/login");
      } catch (error) {
        console.error(error);
        setStatus(error.response.data.message);
      }
    }
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (form.password === form.confirmPassword) setSubmit(true);
    else setSubmit(false);
  }, [form.password, form.confirmPassword]);

  useEffect(() => {
    if (context.user) router.push("/");
  }, [context.user, router]);

  if (context.user) return null;

  return (
    <form className={styles.form} onSubmit={onRegister}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={form.username}
        onChange={onChange}
        required
      ></input>

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={form.password}
        onChange={onChange}
        required
      ></input>

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={onChange}
        required
      ></input>

      {submit ? "" : "Password doesn't match!"}
      {status ? status : ""}

      <input className={"button"} type="submit" value="Register" />
      <Link className={"button"} href={"/login"}>
        Login
      </Link>
    </form>
  );
}
