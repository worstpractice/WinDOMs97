import type { FC } from "react";
import React from "react";
import { css } from "utils/css";
import styles from "./WindowTitle.module.css";

type Props = {
  icon: string;
  isActive: boolean;
  name: string;
};

export const WindowTitle: FC<Props> = ({ icon, isActive, name }) => {
  const style = isActive ? css(styles.ProgramName, styles.Active) : styles.ProgramName;

  return (
    <span className={styles.WindowTitle}>
      <img alt={name} className={styles.ProgramIcon} src={icon} />
      <h1 className={style}>{name}</h1>
    </span>
  );
};
