import { Separator } from "components/Separator";
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
      <Separator dent="in" direction="vertical" />
      <section className={styles.QuickstartArea}>{children}</section>
      <Separator dent="in" direction="vertical" />
      <Separator direction="vertical" isStocky />
    </>
  );
};
