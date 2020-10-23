import { default as React } from "react";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import styles from "./Calc.module.css";

type Props = {
  process: Process;
};

export const Calc: FC<Props> = ({ process }) => {
  return <div className={styles.Calc}></div>;
};
