import { useMutableRef } from "hooks/useMutableRef";
import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import { moveInFront } from "utils/moveInFront";
import { onLMB } from "utils/onLMB";
import styles from "./NotificationItem.module.css";

type Props = {
  process: Process;
};

export const NotificationItem: FC<Props> = ({ process }) => {
  const { activate } = useStore();
  const notificationItemRef = useMutableRef();

  // NOTE: This is vital. This is the line where each process is given its very own `notificationItem` handle.
  process.notificationItemRef = notificationItemRef;

  /** We must use capture here because the notificationItem is nested deep inside the taskbar. */
  const handleActiveCapture: MouseEventHandler = onLMB((e) => {
    // NOTE: This is required since after the capture phase, the event would bubble and hand control back over to the taskbar (which we don't want).
    e.stopPropagation();
    activate(process.windowRef);
    moveInFront(process.windowRef);
  });

  const { icon, name } = process;

  return (
    <li className={styles.NotificationItem} onMouseDownCapture={handleActiveCapture} ref={notificationItemRef as any}>
      <img alt={name} className={styles.Icon} src={icon} />
    </li>
  );
};
