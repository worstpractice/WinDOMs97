// import { is } from "type-predicates/is";
// import type { Process } from "typings/Process";

// export const minimize = (process: Process) => {
//   const { isMinimized, notificationItemRef, runningItemRef, windowRef } = process;

//   if (isMinimized) return;

//   const runningItem = runningItemRef.current;
//   const osWindow = windowRef.current;
//   const notificationItem = notificationItemRef.current;

//   if (!runningItem) return;
//   if (!osWindow) return;
//   if (!notificationItem) return;

//   const oldDisplayStyle = osWindow.style.display;

//   const reEmbiggenBackUpAgain: EventListener = ({ target }) => {
//     if (is(target, notificationItem)) {
//       runningItem.removeEventListener("mousedown", reEmbiggenBackUpAgain);
//     }

//     if (is(target, runningItem)) {
//       notificationItem.removeEventListener("mousedown", reEmbiggenBackUpAgain);
//     }

//     // Restore
//     osWindow.style.display = oldDisplayStyle;
//     process.isMinimized = false;
//   };

//   const { style } = osWindow;
//   console.log(style);

//   // Alter
//   osWindow.style.display = `none`;
//   process.isMinimized = true;

//   notificationItem.addEventListener("mousedown", reEmbiggenBackUpAgain, { once: true });
//   runningItem.addEventListener("mousedown", reEmbiggenBackUpAgain, { once: true });
// };

export {};