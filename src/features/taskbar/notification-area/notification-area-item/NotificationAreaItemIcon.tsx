import type { FC } from "react";
import * as React from "react";
import type { Process } from "typings/Process";
import styles from "./NotificationAreaItemIcon.module.css";

type Props = {
  process: Process;
};

export const NotificationAreaItemIcon: FC<Props> = ({ process }) => {
  const { icon, name } = process;

  return <img alt={name} className={styles.NotificationAreaItemIcon} loading="eager" src={icon} />;
};
