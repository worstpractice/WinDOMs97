import type { FC } from "react";
import React from "react";
import type { Binary } from "typings/Binary";
import styles from "./DesktopItemIcon.module.css";

type Props = {
  binary: Binary;
};

export const DesktopItemIcon: FC<Props> = ({ binary }) => {
  const { fileName, icon } = binary;

  return <img alt={fileName} className={styles.DesktopItemIcon} src={icon} />;
};