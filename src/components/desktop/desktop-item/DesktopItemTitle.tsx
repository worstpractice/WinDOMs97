import type { FC } from "react";
import React from "react";
import type { Binary } from "typings/Binary";
import styles from "./DesktopItemTitle.module.css";

type Props = {
  binary: Binary;
};

export const DesktopItemTitle: FC<Props> = ({ binary }) => {
  const { fileName } = binary;

  return <p className={styles.DesktopItemTitle}>{fileName}</p>;
};
