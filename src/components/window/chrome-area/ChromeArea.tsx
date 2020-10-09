import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import { is } from "utils/is";
import styles from "./ChromeArea.module.css";

type Props = {
  process: Process;
};

export const ChromeArea: FC<Props> = ({ children, process }) => {
  const { activeRef } = useStore();

  const style = is(activeRef, process.windowRef) ? css(styles.ChromeArea, styles.Active) : styles.ChromeArea;

  return <header className={style}>{children}</header>;
};
