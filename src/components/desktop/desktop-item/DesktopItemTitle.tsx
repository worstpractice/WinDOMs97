import type { FC } from "react";
import * as React from "react";
import type { Binary } from "typings/Binary";
import styles from "./DesktopItemTitle.module.css";

type Props = {
  binary: Binary;
};

export const DesktopItemTitle: FC<Props> = ({ binary: { fileName } }) => {
  return <p className={styles.DesktopItemTitle}>{fileName}</p>;
};
