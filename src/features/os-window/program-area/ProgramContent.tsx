import type { ReactNode } from "react";
import type { FC } from "typings/FC";
import styles from "./ProgramContent.module.css";

type Props = {
  children: ReactNode;
};

export const ProgramContent: FC<Props> = ({ children }) => {
  return <section className={styles.ProgramContent}>{children}</section>;
};
