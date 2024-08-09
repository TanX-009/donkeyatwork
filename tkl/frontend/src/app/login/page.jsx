"use client"

import React, { useContext, useState } from 'react'
import styles from "./page.module.css"
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UContext } from '@/components/UserContext';

export default function Login() {
  const [status, setStatus] = useState("");
  const router = useRouter()
  const {context, setContext} = useContext(UContext)

  const onLogin = async (e) => {
    e.preventDefault();
    setStatus("")

    const data = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    try {
      const response = await axios.post("http://localhost:4000/login", data)
      setStatus(response.data.message)
      setContext({...context, user: response.data.user}, () => {
        if (response.data.user.name === "admin") {
          router.push("/admin")
        } else router.push("/")
      })
    } catch (error) {
      console.error(error)
      setStatus(error.response.data.message)
    }
  }
  return (
    <div className={styles.login}>
      <form className={styles.container} onSubmit={onLogin}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required></input>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required></input>
        {status ? status : ""}
        <input type="submit" value="Log In" />
        <Link href={"/register"}>Register</Link>
        </form>
    </div>
  )
}
