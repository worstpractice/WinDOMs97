import { NotificationAreaItemIcon } from "components/taskbar/notification-area/notification-area-item/NotificationAreaItemIcon";
import { onLMB } from "event-filters/onLMB";
import { onRMB } from "event-filters/onRMB";
import { useOsRef } from "hooks/useOsRef";
import { useProcessAlternatives } from "hooks/useProcessAlternatives";
import { useKernel } from "kernel";
import * as React from "react";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import { moveInFront } from "utils/moveInFront";
import styles from "./NotificationAreaItem.module.css";

type Props = {
  process: Process;
};

export const NotificationAreaItem: FC<Props> = ({ process }) => {
  const { activate, activeRef, closeMenus, minimize, openContextMenu, unMinimize } = useKernel();
  const notificationItemRef = useOsRef<HTMLLIElement>();
  const alternatives = useProcessAlternatives(process);

  // NOTE: This is vital. This is the line where each `Process` is given its very own `NotificationItem` handle.
  process.notificationItemRef = notificationItemRef;

  const handleContextMenu = onRMB<HTMLLIElement>(() => {
    openContextMenu(alternatives);
  });

  const handleMouseDown = onLMB<HTMLLIElement>((e) => {
    // NOTE: This is required since the event would bubble up and hand control back over to the taskbar (which we don't want).
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

  return (
    <li
      className={styles.NotificationAreaItem}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      ref={notificationItemRef}
    >
      <NotificationAreaItemIcon process={process} />
    </li>
  );
};