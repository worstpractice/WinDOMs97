import { VerticalSeparator } from "components/separators/VerticalSeparator";
import type { ReactNode } from "react";
import { default as React } from "react";
import type { FC } from "typings/FC";
import styles from "./QuickstartArea.module.css";

type Props = {
  children: ReactNode;
};

export const QuickstartArea: FC<Props> = ({ children }) => {
  return (
    <>
      <VerticalSeparator />
      <section className={styles.QuickstartArea}>{children}</section>
      <VerticalSeparator />
    </>
  );
};
