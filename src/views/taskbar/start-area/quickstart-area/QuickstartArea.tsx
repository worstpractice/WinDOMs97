import { VerticalSeparator } from "components/separators/VerticalSeparator";
import type { FC } from "typings/FC";
import * as React from "react";
import styles from "./QuickstartArea.module.css";
import type { ReactNode } from "react";

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
