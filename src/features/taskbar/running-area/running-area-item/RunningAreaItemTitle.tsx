import type { FC } from "react";
import * as React from "react";
import type { Process } from "typings/Process";
import styles from "./RunningAreaItemTitle.module.css";

type Props = {
  process: Process;
};

export const RunningAreaItemTitle: FC<Props> = ({ process }) => {
  const { name } = process;

  return <p className={styles.RunningAreaItemTitle}>{name}</p>;
};
