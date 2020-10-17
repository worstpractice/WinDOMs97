import { onLMB } from "event-filters/onLMB";
import { useKernel } from "kernel";
import * as React from "react";
import type { Binary } from "typings/Binary";
import type { FC } from "typings/FC";
import styles from "./QuickStartItem.module.css";

type Props = {
  binary: Binary;
  closeMenus: () => void;
};

export const QuickStartItem: FC<Props> = ({ binary, closeMenus }) => {
  const { executeBinary } = useKernel();

  const handleLaunch = onLMB<HTMLButtonElement>(() => {
    executeBinary(binary);
    closeMenus();
  });

  const { fileName, icon } = binary;

  return (
    <button className={styles.QuickStartItem} onMouseDown={handleLaunch} type="button">
      <img alt={fileName} className={styles.Icon} loading="eager" src={icon} />
    </button>
  );
};
