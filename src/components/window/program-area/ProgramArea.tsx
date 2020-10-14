import type { FC } from "react";
import * as React from "react";
import styles from "./ProgramArea.module.css";

type Props = {};

export const ProgramArea: FC<Props> = ({ children }) => {
  return <main className={styles.ProgramArea}>{children}</main>;
};
