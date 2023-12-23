"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Context } from "./layout";
import { useRouter } from "next/navigation";
import Redirecting from "../ui/misc/redirecting";
import NavbarLogo from "../ui/info/navbarLogo";
import { GiAstronautHelmet } from "react-icons/gi";
import { TiCloudStorage } from "react-icons/ti";
import { IoRefresh } from "react-icons/io5";
import { getSecureData } from "../lib/data/getData";
import ProjectCard from "./ui/projectCard";
import LinkButton from "../ui/clickables/linkButton";

export default function Home() {
  const router = useRouter();
  const { context } = useContext(Context);

  const [projects, setProjects] = useState([]);
  const [tick, updateTick] = useState(true);

  useEffect(() => {
    if (!context.user.token) {
      router.push("/login");
    }
  }, [context.user]);
  if (!context.user.token) {
    return <Redirecting />;
  }

  useEffect(() => {
    setProjects([]);
    getSecureData(
      "/manage/get_projects/" + context.user._id,
      setProjects,
      context.user.token,
      {
        user: context.user,
      },
    );
  }, [tick]);

  return (
    <div className={styles.page}>
      {/* navbar */}
      <div className={styles.navbar}>
        {/* logo */}
        <NavbarLogo />

        {/* user */}
        <h1>
          <GiAstronautHelmet /> {context.user.username}
        </h1>
      </div>

      {/* home page */}
      <div className={styles.home}>
        <div className={styles.heading}>
          <h1>Projects</h1>

          <div className={styles.headingButtons}>
            {/* refresh button */}
            <button
              className={styles.refresh}
              onClick={() => {
                updateTick((val) => !val);
              }}
            >
              <IoRefresh />
              <span>Refresh</span>
            </button>

            {/* add project button */}
            <LinkButton
              path="/add_project"
              name={
                <>
                  <TiCloudStorage /> <span>Add project</span>
                </>
              }
              variant="single"
            />
          </div>
        </div>
        <div className={styles.projects}>
          {projects.map((project, key) => (
            <ProjectCard key={key} project={project} updateTick={updateTick} />
          ))}
        </div>
      </div>
    </div>
  );
}
