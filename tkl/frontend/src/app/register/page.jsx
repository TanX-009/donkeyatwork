import React from 'react'
import styles from "./page.module.css"

export default function Register() {
  return (
    <div className={styles.Register}>
      <form className={styles.container}>
      <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username"></input>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password"></input>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword"></input>
        <input type="submit" value="Register" />
      </form>
    </div>
  )
}
