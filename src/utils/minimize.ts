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

  const reEmbiggenBackUpAgain: EventListener = ({ target }) => {
    if (is(target, notificationItem)) {
      console.log("notificationItem");
      runningItem.removeEventListener("mousedown", reEmbiggenBackUpAgain);
    }

    if (is(target, runningItem)) {
      console.log("runningItem");
      notificationItem.removeEventListener("mousedown", reEmbiggenBackUpAgain);
    }

    osWindow.style.display = old;
    process.isMinimized = false;
  };

  osWindow.style.display = `none`;
  process.isMinimized = true;

  notificationItem.addEventListener("mousedown", reEmbiggenBackUpAgain, { once: true });
  runningItem.addEventListener("mousedown", reEmbiggenBackUpAgain, { once: true });
};
