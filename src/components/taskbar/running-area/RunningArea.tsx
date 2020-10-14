import type { FC } from "react";
import * as React from "react";
import styles from "./RunningArea.module.css";

type Props = {};

export const RunningArea: FC<Props> = ({ children }) => {
  return <section className={styles.RunningArea}>{children}</section>;
};
