import { useStartingDimensions } from "hooks/programs/useStartingDimensions";
import { default as React } from "react";
import type { FC } from "typings/FC";
import { Position } from "typings/Position";
import type { Process } from "typings/Process";
import styles from "./Cmd.module.css";

type Props = {
  process: Process;
};

export const Cmd: FC<Props> = ({ process }) => {
  useStartingDimensions(process);

  return (
    <main className={styles.Cmd}>
      <p>Mircosoft WinDOMs [Version 10.0.1337.1234]</p>
      <p>(c) 1997 Mircosoft Corporation. All rights reversed.</p>
    </main>
  );
};
