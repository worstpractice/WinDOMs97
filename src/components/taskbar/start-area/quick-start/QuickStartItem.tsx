import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import type { Binary } from "typings/Binary";
import styles from "./QuickStartItem.module.css";

type Props = {
  binary: Binary;
};

export const QuickStartItem: FC<Props> = ({ binary }) => {
  const { executeBinary } = useStore();

  const handleLaunch = () => {
    executeBinary(binary);
  };

  const { fileName, icon } = binary;

  return (
    <article className={styles.QuickStartItem} onMouseDown={handleLaunch}>
      <img alt={fileName} className={styles.Icon} src={icon} />
    </article>
  );
};
