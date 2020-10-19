import * as React from "react";
import type { Binary } from "typings/Binary";
import type { FC } from "typings/FC";
import styles from "./DesktopItemIcon.module.css";

type Props = {
  binary: Binary;
};

export const DesktopItemIcon: FC<Props> = ({ binary }) => {
  const { fileName, icon } = binary;

  return <img alt={fileName} className={styles.DesktopItemIcon} loading="eager" src={icon} />;
};
