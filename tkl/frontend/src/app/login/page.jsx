"use client"

import React, { useContext, useState } from 'react'
import styles from "./page.module.css"
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UContext } from '@/components/UserContext';

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

export default function Login() {
  const [status, setStatus] = useState("");
  const router = useRouter()
  const {context, setContext} = useContext(UContext)

  const onLogin = async (e) => {
    e.preventDefault();
    setStatus("")


    try {
      const extraData = await getUserData(e.target.username.value)

      const data = {
        username: e.target.username.value,
        password: e.target.password.value,
        extraData: extraData
      }
      console.log(extraData)

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
