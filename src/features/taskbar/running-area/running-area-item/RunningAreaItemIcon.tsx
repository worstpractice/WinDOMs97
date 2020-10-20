import type { FC } from "react";
import * as React from "react";
import type { Process } from "typings/Process";
import styles from "./RunningAreaItemIcon.module.css";

type Props = {
  process: Process;
};

export const RunningAreaItemIcon: FC<Props> = ({ process }) => {
  const { icon, name } = process;

  return <img alt={name} className={styles.RunningAreaItemIcon} loading="eager" src={icon} />;
};
