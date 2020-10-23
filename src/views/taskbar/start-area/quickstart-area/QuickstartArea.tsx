import { Divider } from "components/Divider";
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
      <Divider dent="in" direction="vertical" />
      <Divider direction="vertical" isStocky />
      <section className={styles.QuickstartArea}>{children}</section>
      <Divider dent="in" direction="vertical" />
      <Divider direction="vertical" isStocky />
    </>
  );
};
