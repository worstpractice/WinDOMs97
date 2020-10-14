import { onLMB } from "event-filters/onLMB";
import { useDomRef } from "hooks/useDomRef";
import { useKernel } from "kernel";
import type { FC } from "react";
import * as React from "react";
import type { Process } from "typings/Process";
import { moveInFront } from "utils/moveInFront";
import styles from "./NotificationItem.module.css";

type Props = {
  closeMenus: () => void;
  process: Process;
};

export const NotificationItem: FC<Props> = ({ closeMenus, process }) => {
  const { activate } = useKernel();
  const notificationItemRef = useDomRef<HTMLLIElement>();

  // NOTE: This is vital. This is the line where each process is given its very own `notificationItem` handle.
  process.notificationItemRef = notificationItemRef;

  const handleActive = onLMB<HTMLLIElement>((e) => {
    // NOTE: This is required since the event would bubble up and hand control back over to the taskbar (which we don't want).
    e.stopPropagation();
    closeMenus();
    activate(process.windowRef);
    moveInFront(process.windowRef);
  });

  const { icon, name } = process;

  return (
    <li className={styles.NotificationItem} onMouseDown={handleActive} ref={notificationItemRef}>
      <img alt={name} className={styles.Icon} loading="lazy" src={icon} />
    </li>
  );
};
