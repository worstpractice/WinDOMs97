import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import { isRef } from "type-predicates/isRef";
import styles from "./ChromeArea.module.css";

type Props = {
  process: Process;
};

export const ChromeArea: FC<Props> = ({ children, process }) => {
  const { activeRef } = useStore();

  const style = isRef(activeRef, process.windowRef) ? css(styles.ChromeArea, styles.Active) : styles.ChromeArea;

  return <header className={style}>{children}</header>;
};
