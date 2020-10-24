import { useStartingDimensions } from "hooks/programs/useStartingDimensions";
import { useOsRef } from "hooks/useOsRef";
import { default as React } from "react";
import type { FC } from "typings/FC";
import type { Loader } from "typings/Loader";
import styles from "./Minesweeper.module.css";

type Props = {
  getProcess: Loader;
};

export const Minesweeper: FC<Props> = ({ getProcess }) => {
  const programRef = useOsRef<HTMLDivElement>();
  const process = getProcess(programRef);
  useStartingDimensions(process);

  return <div className={styles.Minesweeper} ref={programRef}></div>;
};
