import type { ReactNode } from "react";
import { default as React } from "react";
import type { FC } from "typings/FC";
import styles from "./RunningArea.module.css";

type Props = {
  children: ReactNode;
};

export const RunningArea: FC<Props> = ({ children }) => {
  return <section className={styles.RunningArea}>{children}</section>;
};
