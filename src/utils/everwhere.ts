import type { Softlinks } from "typings/Softlinks";

/** For convenience. All `OsLocation`s at once. */
export const everywhere = (): Softlinks => {
  return {
    isOnDesktop: true,
    isOnStartMenu: true,
    isInQuickstartArea: true,
  } as const;
};
