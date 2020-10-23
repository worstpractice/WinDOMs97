import type { Alternative } from "typings/Alternative";
import { alt } from "utils/alt";

export const useDesktopAlternatives = (): readonly Alternative[] => {
  // NOTE: `ContextMenuItems` get listed in the order specified here.
  return [
    alt("New folder", () => {
      console.log("We create a new folder");
    }),
  ] as const;
};
