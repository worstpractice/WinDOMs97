import { default as React } from "react";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import styles from "./Minesweeper.module.css";

type Props = {
  process: Process;
};

export const Minesweeper: FC<Props> = ({ process }) => {
  return <div className={styles.Minesweeper}></div>;
};
