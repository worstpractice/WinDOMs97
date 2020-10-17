import { onLMB } from "event-filters/onLMB";
import { useDomRef } from "hooks/useDomRef";
import { useKernel } from "kernel";
import * as React from "react";
import { useState } from "react";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import { moveInFront } from "utils/moveInFront";
import styles from "./RunningItem.module.css";

type Props = {
  closeMenus: () => void;
  process: Process;
};

export const RunningItem: FC<Props> = ({ closeMenus, process }) => {
  const { activate, minimize, unMinimize } = useKernel();
  const runningItemRef = useDomRef<HTMLButtonElement>();
  const [isPressed, setIsPressed] = useState(false);

  // NOTE: This is vital. This is the line where each process is given its very own `RunningItem` handle.
  process.runningItemRef = runningItemRef;

  const handleMouseDown = onLMB<HTMLButtonElement>((e) => {
    // NOTE: This event should not reach the `Taskbar` below, or it will become active instead of the window we meant to activate.
    e.stopPropagation();
    closeMenus();
    unMinimize(process);
    activate(process.windowRef);
    moveInFront(process.windowRef);
    setIsPressed(true);
  });

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const handleMouseUp = onLMB<HTMLButtonElement>((e) => {
    if (!isPressed) return;

    const { isMinimized } = process;

    if (isMinimized) {
      closeMenus();
      activate(process.windowRef);
      moveInFront(process.windowRef);
      unMinimize(process);
    } else {
      minimize(process);
      activate({ current: null });
    }

    setIsPressed(false);
  });

  const style = isPressed ? css(styles.RunningItem, styles.Active) : styles.RunningItem;

  const { icon, name } = process;

  return (
    <button
      className={style}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={runningItemRef}
      type="button"
    >
      <img alt={name} className={styles.Icon} loading="eager" src={icon} />
      <p className={styles.Title}>{name}</p>
    </button>
  );
};
