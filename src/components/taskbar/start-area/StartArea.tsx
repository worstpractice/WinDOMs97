import type { FC } from "react";
import React from "react";
import styles from "./StartArea.module.css";

type Props = {};

export const StartArea: FC<Props> = ({ children }) => {
  return <span className={styles.StartArea}>{children}</span>;
};
