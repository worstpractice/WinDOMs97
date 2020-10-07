import type { FC } from "react";
import React from "react";
import styles from "./ContextMenuItem.module.css";

type Props = {};

export const ContextMenuItem: FC<Props> = ({ children }) => {
  return <li className={styles.ContextMenuItem}>{children}</li>;
};
