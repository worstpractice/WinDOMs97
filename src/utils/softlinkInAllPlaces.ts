import type { Softlinks } from 'src/typings/Softlinks';

/** For convenience. All `OsLocation`s at once. */
export const softlinkInAllPlaces = (): Softlinks => {
  return {
    isInQuickstartArea: true,
    isOnDesktop: true,
    isOnStartMenu: true,
  } as const;
};
