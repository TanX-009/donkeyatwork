import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { Context } from "@/src/app/(wrap)/layout";
import Image from "next/image";

export default function NavbarLogo() {
  const { context } = useContext(Context);
  return (
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
  );
}
