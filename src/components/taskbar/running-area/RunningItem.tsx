import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import { is } from "utils/is";
import { moveInFront } from "utils/moveInFront";
import styles from "./RunningItem.module.css";

type Props = {
  process: Process;
};

export const RunningItem: FC<Props> = ({ process }) => {
  const { activate, activeRef } = useStore();

  const handleActive: MouseEventHandler = (e) => {
    // NOTE: This event should not reach the Taskbar below, or it will become active instead of the window we meant to activate.
    e.stopPropagation();
    activate(process.windowRef);
    moveInFront(process.windowRef);
  };

  const style = is(activeRef, process.windowRef) ? css(styles.RunningItem, styles.Active) : styles.RunningItem;

  const { icon, name } = process;

  return (
    <button className={style} onMouseDown={handleActive} type="button">
      <img alt={name} className={styles.Icon} src={icon} />
      <p className={styles.Title}>{name}</p>
    </button>
  );
};
