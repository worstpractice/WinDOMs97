import type { FC } from "react";
import React from "react";
import styles from "./RunningArea.module.css";

type Props = {};

export const RunningArea: FC<Props> = ({ children }) => {
  return <div className={styles.RunningArea}>{children}</div>;
};
