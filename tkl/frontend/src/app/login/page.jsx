import React from 'react'
import styles from "./page.module.css"

export default function Login() {
  return (
    <div className={styles.login}>
      <form className={styles.container}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username"></input>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" name="password"></input>
        <input type="submit" value="Log In" />
      </form>
    </div>
  )
}
