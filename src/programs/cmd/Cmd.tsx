import { onRMB } from "event-filters/onRMB";
import * as React from "react";
import type { FC } from "typings/FC";
import styles from "./Cmd.module.css";

type Props = {};

export const Cmd: FC<Props> = () => {
  const handleContextMenu = onRMB(() => {
    console.log("I felt that!");
  });

  return (
    <main className={styles.Cmd} onContextMenu={handleContextMenu}>
      <p>Microsoft Windows [Version 10.0.19041.508]</p>
      <p>(c) 2020 Microsoft Corporation. All rights reserved.</p>
    </main>
  );
};
