import { useMutableRef } from "hooks/useMutableRef";
import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import { isRef } from "utils/isRef";
import { moveInFront } from "utils/moveInFront";
import styles from "./RunningItem.module.css";

type Props = {
  process: Process;
};

export const RunningItem: FC<Props> = ({ process }) => {
  const { activate, activeRef } = useStore();
  const runningItemRef = useMutableRef();

  // NOTE: This is vital. This is the line where each process is given its very own `runningItem` handle.
  process.runningItemRef = runningItemRef;

  const handleActive: MouseEventHandler = (e) => {
    // NOTE: This event should not reach the Taskbar below, or it will become active instead of the window we meant to activate.
    e.stopPropagation();
    activate(process.windowRef);
    moveInFront(process.windowRef);
  };

  const style = isRef(activeRef, process.windowRef) ? css(styles.RunningItem, styles.Active) : styles.RunningItem;

  const { icon, name } = process;

  return (
    <button className={style} onMouseDown={handleActive} ref={runningItemRef as any} type="button">
      <img alt={name} className={styles.Icon} src={icon} />
      <p className={styles.Title}>{name}</p>
    </button>
  );
};
