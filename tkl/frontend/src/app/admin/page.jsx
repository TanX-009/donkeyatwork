"use client";

import styles from "./page.module.css";
import { UContext } from "@/components/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

async function fetchData(setData, setError) {
  setError("");
  try {
    const response = await axios.get("http://localhost:4000/getAllData");
    setData(response.data);
  } catch (error) {
    setError(error?.response?.data?.message || error.message);
  }
}

export default function Admin() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [tick, updateTick] = useState(false);

  const { context } = useContext(UContext);

  useEffect(() => {
    fetchData(setData, setError);
  }, [tick]);

  useEffect(() => {
    if (!context.user) {
      router.push("/login");
    } else if (context.user.name !== "admin") {
      router.push("/");
    }
  }, [context.user, router]);

  if (!context.user) return null;

  return (
    <div className={styles.admin}>
      <div className={styles.nav}>
        Admin
        <button
          className={"button"}
          onClick={() => {
            setData([]);
            updateTick((val) => !val);
          }}
        >
          Refresh
        </button>
      </div>
      {error}
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Device</th>
              <th>City</th>
              <th>Area</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Timestamp</th>
              <th>IP</th>
              <th>ISP</th>
              <th>User Agent</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice()
              .reverse()
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>{item.device}</td>
                  <td>{item.city}</td>
                  <td>{item.area}</td>
                  <td>{item.latitude}</td>
                  <td>{item.longitude}</td>
                  <td>{item.timestamp}</td>
                  <td>{item.ip}</td>
                  <td>{item.isp}</td>
                  <td>{item.userAgent}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
