import type { FC } from "react";
import * as React from "react";
import styles from "./StartArea.module.css";

type Props = {};

export const StartArea: FC<Props> = ({ children }) => {
  return <section className={styles.StartArea}>{children}</section>;
};
