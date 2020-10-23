import { default as React } from "react";
import type { FC } from "typings/FC";
import styles from "./Cmd.module.css";

type Props = {};

export const Cmd: FC<Props> = () => {
  return (
    <main className={styles.Cmd}>
      <p>Mircosoft WinDOMs [Version 10.0.1337.1234]</p>
      <p>(c) 1997 Mircosoft Corporation. All rights reversed.</p>
    </main>
  );
};
