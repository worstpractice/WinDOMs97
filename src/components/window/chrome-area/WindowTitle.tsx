import { useKernel } from "kernel";
import type { FC } from "typings/FC";
import * as React from "react";
import { isRef } from "type-predicates/isRef";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import styles from "./WindowTitle.module.css";

type Props = {
  process: Process;
};

export const WindowTitle: FC<Props> = ({ process }) => {
  const { activeRef } = useKernel();

  const { icon, name, windowRef } = process;

  const style = isRef(activeRef, windowRef) ? css(styles.ProgramName, styles.Active) : styles.ProgramName;

  return (
    <span className={styles.WindowTitle}>
      <img alt={name} className={styles.ProgramIcon} loading="eager" src={icon} />
      <h1 className={style}>{name}</h1>
    </span>
  );
};
