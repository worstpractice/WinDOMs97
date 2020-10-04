import type { FC } from "react";
import React from "react";
import styles from "./QuickStartItem.module.css";

type Props = {};

export const QuickStartItem: FC<Props> = ({ children }) => {
  return <div className={styles.QuickStartItem}>{children}</div>;
};
