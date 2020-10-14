import { onLMB } from "event-filters/onLMB";
import { useDomRef } from "hooks/useDomRef";
import { useKernel } from "kernel";
import type { FC } from "react";
import * as React from "react";
import { isRef } from "type-predicates/isRef";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import { moveInFront } from "utils/moveInFront";
import styles from "./RunningItem.module.css";

type Props = {
  closeMenus: () => void;
  process: Process;
};

export const RunningItem: FC<Props> = ({ closeMenus, process }) => {
  const { activate, activeRef } = useKernel();
  const runningItemRef = useDomRef<HTMLButtonElement>();

  // NOTE: This is vital. This is the line where each process is given its very own `runningItem` handle.
  process.runningItemRef = runningItemRef;

  const handleActive = onLMB<HTMLButtonElement>((e) => {
    // NOTE: This event should not reach the Taskbar below, or it will become active instead of the window we meant to activate.
    e.stopPropagation();
    closeMenus();
    activate(process.windowRef);
    moveInFront(process.windowRef);
  });

  const style = isRef(activeRef, process.windowRef) ? css(styles.RunningItem, styles.Active) : styles.RunningItem;

  const { icon, name } = process;

  return (
    <button className={style} onMouseDown={handleActive} ref={runningItemRef} type="button">
      <img alt={name} className={styles.Icon} src={icon} />
      <p className={styles.Title}>{name}</p>
    </button>
  );
};
