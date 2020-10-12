import type { FC } from "react";
import React from "react";
import styles from "./ProgramContent.module.css";

type Props = {};

export const ProgramContent: FC<Props> = ({ children }) => {
  return <section className={styles.ProgramContent}>{children}</section>;
};
