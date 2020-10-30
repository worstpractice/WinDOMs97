import { default as React } from "react";
import type { FC } from "typings/FC";
import styles from "./Button.module.css";

type Props = {};

export const Button: FC<Props> = () => {
  return <div className={styles.Button}></div>;
};
