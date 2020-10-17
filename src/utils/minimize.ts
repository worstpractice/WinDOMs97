// import { onLMB } from "event-filters/onLMB";
// import { is } from "type-predicates/is";
// import type { Process } from "typings/Process";

// export const minimize = (process: Process) => {
//   const { isMinimized, notificationItemRef, runningItemRef, osWindowRef } = process;

//   if (isMinimized) return;

//   const osWindow = osWindowRef.current;

//   if (!osWindow) return;

//   const runningItem = runningItemRef.current;
//   const notificationItem = notificationItemRef.current;

//   const oldDisplayStyle = osWindow.style.display;

//   const reEmbiggenBackUpAgain = onLMB<Document>(({ target }) => {
//     // M.A.D. (Mutually Assured Disposal)
//     if (is(target, notificationItem)) {
//       runningItem?.removeEventListener("mousedown", reEmbiggenBackUpAgain);
//     }

//     // M.A.D. (Mutually Assured Disposal)
//     if (is(target, runningItem)) {
//       notificationItem?.removeEventListener("mousedown", reEmbiggenBackUpAgain);
//     }

//     // Restore
//     osWindow.style.display = oldDisplayStyle;
//     process.isMinimized = false;
//   }) as () => void;

//   // Alter
//   osWindow.style.display = `none`;
//   process.isMinimized = true;

//   notificationItem?.addEventListener("mousedown", reEmbiggenBackUpAgain, { once: true });
//   runningItem?.addEventListener("mousedown", reEmbiggenBackUpAgain, { once: true });
// };

export {};