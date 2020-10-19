import type { Alternative } from "typings/Alternative";
import { alt } from "utils/alt";

export const useDesktopAlternatives = () => {
  const alternatives: readonly Alternative[] = [
    alt("New folder", () => {
      console.log("We create a new folder");
    }),
  ] as const;

  return alternatives;
};
