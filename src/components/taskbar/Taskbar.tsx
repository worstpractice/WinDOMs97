import type { FC } from "react";
import React from "react";
import styles from "./Taskbar.module.css";

type Props = {};

export const Taskbar: FC<Props> = ({ children }) => {
  return <footer className={styles.Taskbar}>{children}</footer>;
};
