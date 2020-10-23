import { default as React } from "react";
import type { FC } from "typings/FC";
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
