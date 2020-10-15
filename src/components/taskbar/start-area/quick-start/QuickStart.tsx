import { VerticalSeparator } from "components/taskbar/VerticalSeparator";
import type { FC } from "typings/FC";
import * as React from "react";
import styles from "./QuickStart.module.css";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const QuickStart: FC<Props> = ({ children }) => {
  return (
    <>
      <VerticalSeparator />
      <section className={styles.QuickStart}>{children}</section>
      <VerticalSeparator />
    </>
  );
};
