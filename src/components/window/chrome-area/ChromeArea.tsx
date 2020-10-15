import { useKernel } from "kernel";
import type { ReactNode } from "react";
import * as React from "react";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import styles from "./ChromeArea.module.css";

type Props = {
  children: ReactNode;
  process: Process;
};

export const ChromeArea: FC<Props> = ({ children, process }) => {
  const { activeRef } = useKernel();

  const style = isRef(activeRef, process.windowRef) ? css(styles.ChromeArea, styles.Active) : styles.ChromeArea;

  return <header className={style}>{children}</header>;
};
