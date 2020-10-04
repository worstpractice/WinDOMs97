import { VerticalSeparator } from "components/taskbar/VerticalSeparator";
import type { FC } from "react";
import React from "react";
import styles from "./QuickStart.module.css";

type Props = {};

export const QuickStart: FC<Props> = ({ children }) => {
  return (
    <>
      <VerticalSeparator />
      <div className={styles.QuickStart}>{children}</div>
      <VerticalSeparator />
    </>
  );
};
