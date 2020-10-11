import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import { isRef } from "type-predicates/isRef";
import styles from "./WindowTitle.module.css";

type Props = {
  process: Process;
};

export const WindowTitle: FC<Props> = ({ process }) => {
  const { activeRef } = useStore();
  
  const style = isRef(activeRef, process.windowRef) ? css(styles.ProgramName, styles.Active) : styles.ProgramName;

  const { icon, name } = process;

  return (
    <span className={styles.WindowTitle}>
      <img alt={name} className={styles.ProgramIcon} src={icon} />
      <h1 className={style}>{name}</h1>
    </span>
  );
};
