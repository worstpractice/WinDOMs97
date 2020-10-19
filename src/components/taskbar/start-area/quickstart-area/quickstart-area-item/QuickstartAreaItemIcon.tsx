import type { FC } from "react";
import * as React from "react";
import type { Binary } from "typings/Binary";
import styles from "./QuickstartAreaItemIcon.module.css";

type Props = {
  binary: Binary;
};

export const QuickstartAreaItemIcon: FC<Props> = ({ binary }) => {
  const { fileName, icon } = binary;

  return <img alt={fileName} className={styles.QuickstartAreaItemIcon} loading="eager" src={icon} />;
};
