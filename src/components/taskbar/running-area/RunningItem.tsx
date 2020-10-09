import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import { is } from "utils/is";
import styles from "./RunningItem.module.css";

type Props = {
  process: Process;
};

export const RunningItem: FC<Props> = ({ process }) => {
  const { activate, activeRef } = useStore();

  const handleActive = () => {
    activate(process.windowRef);
  };

  const style = is(activeRef, process.windowRef) ? css(styles.RunningItem, styles.Active) : styles.RunningItem;

  const { icon, name } = process;

  return (
    <span className={styles.Wrapper} onMouseDown={handleActive}>
      <button className={style} type="button">
        <img alt={name} className={styles.Icon} src={icon} />
        <p className={styles.Title}>{name}</p>
      </button>
    </span>
  );
};
