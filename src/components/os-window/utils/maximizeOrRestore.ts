// import { onLMB } from "event-filters/onLMB";
// import { is } from "type-predicates/is";
// import type { Process } from "typings/Process";

// export const maximizeOrRestore = (process: Process) => {
//   const { isMaximized, notificationItemRef, runningItemRef, osWindowRef } = process;

//   if (isMaximized) return;

//   const osWindow = osWindowRef.current;

//   if (!osWindow) return;

//   const runningItem = runningItemRef.current;
//   const notificationItem = notificationItemRef.current;

//   // TRBL
//   const oldTop = osWindow.style.top;
//   const oldRight = osWindow.style.right;
//   const oldBottom = osWindow.style.bottom;
//   const oldLeft = osWindow.style.left;

//   const oldWidth = osWindow.style.width;
//   const oldHeight = osWindow.style.height;

//   const reEnsmallenBackDownAgain = onLMB<Document>(({ target }) => {
//     // M.A.D. (Mutually Assured Disposal)
//     if (is(target, notificationItem)) {
//       runningItem?.removeEventListener("mousedown", reEnsmallenBackDownAgain);
//     }

//     // M.A.D. (Mutually Assured Disposal)
//     if (is(target, runningItem)) {
//       notificationItem?.removeEventListener("mousedown", reEnsmallenBackDownAgain);
//     }

//     // Restore
//     osWindow.style.top = oldTop;
//     osWindow.style.right = oldRight;
//     osWindow.style.bottom = oldBottom;
//     osWindow.style.left = oldLeft;

//     osWindow.style.width = oldWidth;
//     osWindow.style.height = oldHeight;

//     process.isMaximized = false;
//   }) as () => void;

//   // Alter
//   osWindow.style.top = `0px`;
//   osWindow.style.right = `0px`;
//   osWindow.style.bottom = `0px`;
//   osWindow.style.left = `0px`;

//   osWindow.style.width = `100vw`;
//   // NOTE: The 30px is adjusting for `Taskbar` height.
//   osWindow.style.height = `calc(100vh - 30px)`;

//   process.isMaximized = true;

//   notificationItem?.addEventListener("mousedown", reEnsmallenBackDownAgain, { once: true });
//   runningItem?.addEventListener("mousedown", reEnsmallenBackDownAgain, { once: true });
// };

export {};