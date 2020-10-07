import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import type { Binary } from "typings/Binary";
import styles from "./QuickStartItem.module.css";

type Props = {
  binary: Binary;
};

export const QuickStartItem: FC<Props> = ({ binary }) => {
  const { executeBinary, setActiveWidget } = useStore();

  const handleLaunch: MouseEventHandler = (e) => {
    executeBinary(binary);
    setActiveWidget("Window");
    e.stopPropagation();
  };

  const { fileName, icon } = binary;

  return (
    <button className={styles.QuickStartItem} onMouseDown={handleLaunch} type="button">
      <img alt={fileName} className={styles.Icon} src={icon} />
    </button>
  );
};
