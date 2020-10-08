import type { FC } from "react";
import React from "react";
import type { Binary } from "typings/Binary";
import styles from "./NotificationItem.module.css";

type Props = {
  binary: Binary;
};

export const NotificationItem: FC<Props> = ({ binary }) => {
  const { icon, name } = binary;

  return (
    <li className={styles.NotificationItem}>
      <img alt={name} className={styles.Icon} src={icon} />
    </li>
  );
};
