import type { FC } from "typings/FC";
import * as React from "react";
import type { Binary } from "typings/Binary";
import styles from "./DesktopItemTitle.module.css";

type Props = {
  binary: Binary;
};

export const DesktopItemTitle: FC<Props> = ({ binary }) => {
  const { fileName } = binary;

  return <p className={styles.DesktopItemTitle}>{fileName}</p>;
};
