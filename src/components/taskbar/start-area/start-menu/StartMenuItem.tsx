import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import type { Binary } from "typings/Binary";
import styles from "./StartMenuItem.module.css";

type Props = {
  binary: Binary;
};

export const StartMenuItem: FC<Props> = ({ binary }) => {
  const { executeBinary } = useStore();

  const handleLaunch = () => {
    executeBinary(binary);
  };

  const { fileName, icon, name } = binary;

  return (
    <li className={styles.StartMenuItem} onMouseDown={handleLaunch}>
      <img alt={fileName} src={icon} />
      {name}
    </li>
  );
};

// <div aria-hidden="true" style={{ fontSize: "8px" }}>
//  ►
// </div>
