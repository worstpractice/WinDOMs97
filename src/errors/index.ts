import type { BSOD } from "typings/BSOD";

export const HALT_AND_CATCH_FIRE: BSOD = {
  error: "HALT_AND_CATCH_FIRE",
  message: "The system failed successfully.",
} as const;

export const OUT_OF_TASKBAR: BSOD = {
  error: "OUT_OF_TASKBAR",
  message: "Upgrade to 800x600 monitor to accomodate more processes",
} as const;

export const OUT_OF_PIDS: BSOD = {
  error: "OUT_OF_PIDS",
  message: "Do not launch more processes than there are in the universe",
} as const;
