import { onLMB } from "event-filters/onLMB";
import { useKernel } from "kernel";
import type { FC } from "typings/FC";
import * as React from "react";
import type { Binary } from "typings/Binary";
import styles from "./ContextMenuItem.module.css";

type Props = {
  binary: Binary;
  closeMenus: () => void;
};

export const ContextMenuItem: FC<Props> = ({ binary, closeMenus }) => {
  const { executeBinary } = useKernel();

  const handleLaunch = onLMB<HTMLLIElement>(() => {
    closeMenus();
    executeBinary(binary);
  });

  const { fileName, icon, name } = binary;

  return (
    <li className={styles.ContextMenuItem} onMouseDown={handleLaunch}>
      <img alt={fileName} className={styles.Icon} loading="lazy" src={icon} />
      {name}
    </li>
  );
};
