import type { OsError } from "typings/kernel/OsError";

export const OUT_OF_TASKBAR: OsError = {
  isBsod: true,
  bsodError: "OUT_OF_TASKBAR",
  bsodMessage: "Upgrade to 800x600 monitor to accomodate more processes",
} as const;

export const OUT_OF_PIDS: OsError = {
  isBsod: true,
  bsodError: "OUT_OF_PIDS",
  bsodMessage: "Do not launch more processes than there are in the universe",
} as const;
