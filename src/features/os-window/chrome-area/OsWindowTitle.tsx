import { useKernel } from "kernel";
import * as React from "react";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import styles from "./OsWindowTitle.module.css";

type Props = {
  process: Process;
};

export const OsWindowTitle: FC<Props> = ({ process }) => {
  const { activeRef } = useKernel();

  const { icon, name, osWindowRef } = process;

  const style = isRef(activeRef, osWindowRef) ? css(styles.ProcessName, styles.Active) : styles.ProcessName;

  return (
    <span className={styles.OsWindowTitle}>
      <img alt={name} className={styles.ProcessIcon} loading="eager" src={icon} />
      <h1 className={style}>{name}</h1>
    </span>
  );
};
