import type { FC } from "react";
import React from "react";
import styles from "./Program.module.css";

type Props = {};

export const Program: FC<Props> = () => {
  return (
    <main className={styles.Program}>
      <p>Microsoft Windows [Version 10.0.19041.508]</p>
      <p>(c) 2020 Microsoft Corporation. All rights reserved.</p>
    </main>
  );
};
