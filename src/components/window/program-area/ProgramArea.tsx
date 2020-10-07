import type { FC } from "react";
import React from "react";
import styles from "./ProgramArea.module.css";

type Props = {};

export const ProgramArea: FC<Props> = ({ children }) => {
  return (
    <main className={styles.ProgramArea}>
      <section className={styles.ProgramContent}>{children}</section>
    </main>
  );
};
