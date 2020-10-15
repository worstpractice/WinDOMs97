import { is } from "type-predicates/is";
import type { Process } from "typings/Process";

export const maximizeOrRestore = (process: Process) => {
  const { isMaximized, notificationItemRef, runningItemRef, windowRef } = process;

  if (isMaximized) return;

  const runningItem = runningItemRef.current;
  const osWindow = windowRef.current;
  const notificationItem = notificationItemRef.current;

  if (!runningItem) return;
  if (!osWindow) return;
  if (!notificationItem) return;

  // TRBL
  const oldTop = osWindow.style.top;
  const oldRight = osWindow.style.right;
  const oldBottom = osWindow.style.bottom;
  const oldLeft = osWindow.style.left;

  const oldWidth = osWindow.style.width;
  const oldHeight = osWindow.style.height;

  const reEnsmallenBackDownAgain: EventListener = ({ target }) => {
    if (is(target, notificationItem)) {
      runningItem.removeEventListener("mousedown", reEnsmallenBackDownAgain);
    }

    if (is(target, runningItem)) {
      notificationItem.removeEventListener("mousedown", reEnsmallenBackDownAgain);
    }

    // Restore
    osWindow.style.top = oldTop;
    osWindow.style.right = oldRight;
    osWindow.style.bottom = oldBottom;
    osWindow.style.left = oldLeft;

    osWindow.style.width = oldWidth;
    osWindow.style.height = oldHeight;

    process.isMaximized = false;
  };

  // Alter
  osWindow.style.top = `0px`;
  osWindow.style.right = `0px`;
  osWindow.style.bottom = `0px`;
  osWindow.style.left = `0px`;

  osWindow.style.width = `100vw`;
  // NOTE: The 30px denotes the `Taskbar` height.
  osWindow.style.height = `calc(100vh - 30px)`;

  process.isMaximized = true;

  notificationItem.addEventListener("mousedown", reEnsmallenBackDownAgain, { once: true });
  runningItem.addEventListener("mousedown", reEnsmallenBackDownAgain, { once: true });
};
