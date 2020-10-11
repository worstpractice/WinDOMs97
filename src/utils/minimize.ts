import type { Process } from "typings/Process";
import { is } from "type-predicates/is";

export const minimize = (process: Process) => {
  const { isMinimized, notificationItemRef, runningItemRef, windowRef } = process;

  if (isMinimized) return;

  const runningItem = runningItemRef.current;
  const osWindow = windowRef.current;
  const notificationItem = notificationItemRef.current;

  if (!runningItem) return;
  if (!osWindow) return;
  if (!notificationItem) return;

  const old = osWindow.style.display;

  const embiggenFromNotificationItem: EventListener = ({ target }) => {
    if (is(target, notificationItem)) {
      console.log("notificationItem");
      runningItem.removeEventListener("mousedown", embiggenFromNotificationItem);
    }

    if (is(target, runningItem)) {
      console.log("runningItem");
      notificationItem.removeEventListener("mousedown", embiggenFromNotificationItem);
    }

    osWindow.style.display = old;
    process.isMinimized = false;
  };

  osWindow.style.display = `none`;
  process.isMinimized = true;

  notificationItem.addEventListener("mousedown", embiggenFromNotificationItem, { once: true });
  runningItem.addEventListener("mousedown", embiggenFromNotificationItem, { once: true });
};
