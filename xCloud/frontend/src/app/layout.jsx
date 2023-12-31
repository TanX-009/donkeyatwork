import React from "react";
import PropTypes from "prop-types";
import { Comfortaa, Ubuntu } from "next/font/google";
import "../styles/@_main.scss";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
});

export const metadata = {
  title: "xCloud",
  description: "Local cloud",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ubuntu.className + " " + comfortaa.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
