import type { FC } from "react";
import React from "react";
import styles from "./StartMenuItem.module.css";

type Props = {};

export const StartMenuItem: FC<Props> = ({ children }) => {
  return (
    <>
      <li className={styles.StartMenuItem}>
        {children}
        <div aria-hidden="true" style={{ fontSize: "8px" }}>
          ►
        </div>
      </li>
    </>
  );
};
