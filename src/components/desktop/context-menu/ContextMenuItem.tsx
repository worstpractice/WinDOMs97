import type { FC } from "react";
import React from "react";
import type { Binary } from "typings/Binary";
import styles from "./ContextMenuItem.module.css";

type Props = {
  binary: Binary;
};

export const ContextMenuItem: FC<Props> = ({ binary }) => {
  const { fileName, icon, name } = binary;

  return (
    <li className={styles.ContextMenuItem}>
      <img alt={fileName} className={styles.Icon} src={icon} />
      {name}
    </li>
  );
};
