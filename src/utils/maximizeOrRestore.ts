// import type { OsRef } from "typings/OsRef";
// import type { Process } from "typings/Process";

// export const maximizeOrRestore = (process: Process, buttonRef: OsRef<HTMLButtonElement>) => {
//   const { windowRef } = process;

//   const { current: button } = buttonRef;
//   const { current: osWindow } = windowRef;

//   if (!button) return;
//   if (!osWindow) return;

//   // TRBL
//   const oldTop = osWindow.style.top;
//   const oldRight = osWindow.style.right;
//   const oldBottom = osWindow.style.bottom;
//   const oldLeft = osWindow.style.left;

//   const oldWidth = osWindow.style.width;
//   const oldHeight = osWindow.style.height;

//   const reEnsmallenBackDownAgain = () => {
//     // Restore
//     osWindow.style.top = oldTop;
//     osWindow.style.right = oldRight;
//     osWindow.style.bottom = oldBottom;
//     osWindow.style.left = oldLeft;

//     osWindow.style.width = oldWidth;
//     osWindow.style.height = oldHeight;

//     process.isMaximized = false;
//   };

//   button.addEventListener("mousedown", reEnsmallenBackDownAgain, { once: true });

//   // Alter
//   osWindow.style.top = `0px`;
//   osWindow.style.right = `0px`;
//   osWindow.style.bottom = `0px`;
//   osWindow.style.left = `0px`;

//   osWindow.style.width = `100vw`;
//   // NOTE: The 30px is adjusting for `Taskbar` height.
//   osWindow.style.height = `calc(100vh - 30px)`;

//   process.isMaximized = true;
// };

export {};