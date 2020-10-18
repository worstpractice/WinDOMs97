import { onLMB } from "event-filters/onLMB";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import * as React from "react";
import { is } from "type-predicates/is";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import { moveInFront } from "utils/moveInFront";
import styles from "./NotificationAreaItem.module.css";

type Props = {
  process: Process;
};

export const NotificationAreaItem: FC<Props> = ({ process }) => {
  const { activate, activeRef, closeMenus, minimize, unMinimize } = useKernel();
  const notificationItemRef = useOsRef<HTMLLIElement>();

  // NOTE: This is vital. This is the line where each `Process` is given its very own `NotificationItem` handle.
  process.notificationItemRef = notificationItemRef;

  const handleMouseDown = onLMB<HTMLLIElement>((e) => {
    // NOTE: This is required since the event would bubble up and hand control back over to the taskbar (which we don't want).
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

  const { icon, name } = process;

  return (
    <li className={styles.NotificationItem} onMouseDown={handleMouseDown} ref={notificationItemRef}>
      <img alt={name} className={styles.Icon} loading="eager" src={icon} />
    </li>
  );
};
