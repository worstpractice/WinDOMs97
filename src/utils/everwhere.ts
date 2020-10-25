import type { RawBinary } from "typings/RawBinary";

/** For convenience. All `OsLocation`s at once. */
export const everywhere = (): RawBinary["softlinks"] => {
  return {
    isOnDesktop: true,
    isOnStartMenu: true,
    isInQuickstartArea: true,
  } as const;
};
