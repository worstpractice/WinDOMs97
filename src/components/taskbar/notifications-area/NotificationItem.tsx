import { useMutableRef } from "hooks/useMutableRef";
import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import { moveInFront } from "utils/moveInFront";
import { onLMB } from "event-filters/onLMB";
import styles from "./NotificationItem.module.css";

type Props = {
  closeMenus: () => void;
  process: Process;
};

export const NotificationItem: FC<Props> = ({ closeMenus, process }) => {
  const { activate } = useStore();
  const notificationItemRef = useMutableRef();

  // NOTE: This is vital. This is the line where each process is given its very own `notificationItem` handle.
  process.notificationItemRef = notificationItemRef;

  const handleActive: MouseEventHandler = onLMB((e) => {
    // NOTE: This is required since after the capture phase, the event would bubble and hand control back over to the taskbar (which we don't want).
    e.stopPropagation();
    closeMenus();
    activate(process.windowRef);
    moveInFront(process.windowRef);
  });

  const { icon, name } = process;

  return (
    <li className={styles.NotificationItem} onMouseDown={handleActive} ref={notificationItemRef as any}>
      <img alt={name} className={styles.Icon} src={icon} />
    </li>
  );
};
