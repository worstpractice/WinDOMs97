import { default as React } from "react";
import type { FC } from "typings/FC";
import styles from "./Application.module.css";

type Props = {};

export const Application: FC<Props> = () => {
  return <div className={styles.Application}></div>;
};