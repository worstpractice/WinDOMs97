import type { FC } from "react";
import React from "react";
import styles from "./StartMenuItem.module.css";

type Props = {};

export const StartMenuItem: FC<Props> = ({ children }) => {
  return (
    <>
      <div className={styles.StartMenuItem}>
        {children}
        <span style={{ fontSize: "8px" }}>►</span>
      </div>
    </>
  );
};
