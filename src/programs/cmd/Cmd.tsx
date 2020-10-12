import type { FC } from "react";
import React from "react";
import styles from "./Cmd.module.css";

type Props = {};

export const Cmd: FC<Props> = () => {
  return (
    <main className={styles.Cmd}>
      <p>Microsoft Windows [Version 10.0.19041.508]</p>
      <p>(c) 2020 Microsoft Corporation. All rights reserved.</p>
    </main>
  );
};