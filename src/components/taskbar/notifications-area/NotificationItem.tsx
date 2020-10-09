import type { FC } from "react";
import React from "react";
import type { Process } from "typings/Process";
import styles from "./NotificationItem.module.css";

type Props = {
  process: Process;
};

export const NotificationItem: FC<Props> = ({ process }) => {
  const { icon, name } = process;

  return (
    <li className={styles.NotificationItem}>
      <img alt={name} className={styles.Icon} src={icon} />
    </li>
  );
};
