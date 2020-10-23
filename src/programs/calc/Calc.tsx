import { default as React } from "react";
import type { FC } from "typings/FC";
import styles from "./Calc.module.css";

type Props = {};

export const Calc: FC<Props> = () => {
  return <div className={styles.Calc}></div>;
};