import { onLMB } from "event-filters/onLMB";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import * as React from "react";
import { is } from "type-predicates/is";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import { moveInFront } from "utils/moveInFront";
import styles from "./RunningAreaItem.module.css";

type Props = {
  process: Process;
};

export const RunningAreaItem: FC<Props> = ({ process }) => {
  const { activate, activeRef, closeMenus, minimize, unMinimize } = useKernel();
  const runningItemRef = useOsRef<HTMLButtonElement>();

  // NOTE: This is vital. This is the line where each `Process` is given its very own `RunningItem` handle.
  process.runningItemRef = runningItemRef;

  const handleMouseDown = onLMB<HTMLButtonElement>((e) => {
    // NOTE: This event should not reach the `Taskbar` below, or it will become active instead of the `OsWindow` we meant to activate.
    e.stopPropagation();
    closeMenus();

    const { current: active } = activeRef;
    const { current: osWindow } = process.osWindowRef;

    if (is(active, osWindow)) {
      minimize(process);
      activate({ current: null });
    } else {
      unMinimize(process);
      activate(process.osWindowRef);
      moveInFront(process.osWindowRef);
    }
  });

  const style = isRef(activeRef, process.osWindowRef) ? css(styles.RunningAreaItem, styles.Active) : styles.RunningAreaItem;

  const { icon, name } = process;

  return (
    <button className={style} onMouseDown={handleMouseDown} ref={runningItemRef} type="button">
      <img alt={name} className={styles.Icon} loading="eager" src={icon} />
      <p className={styles.Title}>{name}</p>
    </button>
  );
};
