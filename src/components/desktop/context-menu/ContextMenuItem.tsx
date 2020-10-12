import { onLMB } from "event-filters/onLMB";
import { useKernel } from "kernel";
import type { FC } from "react";
import React from "react";
import type { Binary } from "typings/Binary";
import styles from "./ContextMenuItem.module.css";

type Props = {
  binary: Binary;
};

export const ContextMenuItem: FC<Props> = ({ binary }) => {
  const { executeBinary } = useKernel();

  const handleLaunch = onLMB<HTMLLIElement>(() => {
    executeBinary(binary);
  });

  const { fileName, icon, name } = binary;

  return (
    <li className={styles.ContextMenuItem} onMouseDown={handleLaunch}>
      <img alt={fileName} className={styles.Icon} src={icon} />
      {name}
    </li>
  );
};
