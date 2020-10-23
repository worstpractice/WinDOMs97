import type { FC } from "typings/FC";
import { default as React } from "react";
import styles from "./StartArea.module.css";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const StartArea: FC<Props> = ({ children }) => {
  return <section className={styles.StartArea}>{children}</section>;
};
