import type { FC } from "react";
import React from "react";
import styles from "./RunningItem.module.css";

type Props = {};

export const RunningItem: FC<Props> = ({ children }) => {
  return <div className={styles.RunningItem}>{children}</div>;
};
