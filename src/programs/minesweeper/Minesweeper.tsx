import { default as React } from "react";
import type { FC } from "typings/FC";
import styles from "./Minesweeper.module.css";

type Props = {};

export const Minesweeper: FC<Props> = () => {
  return <div className={styles.Minesweeper}></div>;
};