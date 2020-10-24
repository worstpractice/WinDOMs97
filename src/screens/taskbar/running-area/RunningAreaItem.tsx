import { Icon } from "components/Icon";
import { Words } from "components/Words";
import { onLMB } from "event-filters/onLMB";
import { onRMB } from "event-filters/onRMB";
import { useProcessAlternatives } from "hooks/alternatives/useProcessAlternatives";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import { default as React } from "react";
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
  const { activate, activeRef, closeMenus, minimize, openContextMenu, unMinimize } = useKernel();
  const runningItemRef = useOsRef<HTMLButtonElement>();

  // NOTE: This is vital. This is the line where each `Process` is given its very own `RunningItem` handle.
  process.runningItemRef = runningItemRef;

  const alternatives = useProcessAlternatives(process);

  const handleContextMenu = onRMB(() => {
    openContextMenu(alternatives);
  });

  const handleMouseDown = onLMB((e) => {
    // NOTE: This event should not reach the `Taskbar` below, or it will become active instead of the `OsWindow` we meant to activate.
    e.stopPropagation();
    closeMenus();

    const { osWindowRef } = process;

    if (isRef(activeRef, osWindowRef)) {
      minimize(process);
      activate({ current: null });
    } else {
      unMinimize(process);
      activate(process.osWindowRef);
      moveInFront(process.osWindowRef);
    }
  });

  const { binaryImage, osWindowRef } = process;
  const { icon, name } = binaryImage;

  const buttonStyle = isRef(activeRef, osWindowRef)
    ? css(styles.RunningAreaItem, styles.Active)
    : styles.RunningAreaItem;

  return (
    <button
      className={buttonStyle}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      ref={runningItemRef}
      type="button"
    >
      <Icon alt={name} height={32} src={icon} />
      <Words of={name} style={{ fontSize: "20px", paddingTop: "4px" }} />
    </button>
  );
};
