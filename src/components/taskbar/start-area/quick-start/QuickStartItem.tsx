import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import type { Binary } from "typings/Binary";
import { onLMB } from "event-filters/onLMB";
import styles from "./QuickStartItem.module.css";

type Props = {
  binary: Binary;
  closeMenus: () => void;
};

export const QuickStartItem: FC<Props> = ({ binary, closeMenus }) => {
  const { executeBinary } = useStore();

  const handleLaunch = onLMB(() => {
    executeBinary(binary);
    closeMenus();
  });

  const { fileName, icon } = binary;

  return (
    <button className={styles.QuickStartItem} onMouseDown={handleLaunch} type="button">
      <img alt={fileName} className={styles.Icon} src={icon} />
    </button>
  );
};
