import type { KernelError } from "typings/KernelError";

export const OUT_OF_TASKBAR: KernelError = {
  isBsod: true,
  bsodError: "OUT_OF_TASKBAR",
  bsodMessage: "Upgrade to 800x600 monitor to accomodate more processes",
} as const;

export const OUT_OF_PIDS: KernelError = {
  isBsod: true,
  bsodError: "OUT_OF_PIDS",
  bsodMessage: "Do not launch more processes than there are in the universe",
} as const;
