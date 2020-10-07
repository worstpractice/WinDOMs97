import type { FC } from "react";
import React from "react";
import { css } from "utils/css";
import styles from "./ChromeArea.module.css";

type Props = {
  isActive: boolean;
};

export const ChromeArea: FC<Props> = ({ children, isActive }) => {
  const style = isActive ? css(styles.ChromeArea, styles.Active) : styles.ChromeArea;

  return <header className={style}>{children}</header>;
};
