import { MIN_HEIGHT, MIN_WIDTH } from "os-constants/OsWindow";
import type { RawBinary } from "typings/RawBinary";

export const enforceMinDimensions = ({ fileName, startingDimensions }: RawBinary) => {
  if (startingDimensions) {
    if (startingDimensions.x < MIN_WIDTH) {
      // prettier-ignore
      console.warn(`Starting width of ${fileName} OsWindow is too low! (was ${startingDimensions.x}, MIN_WIDTH is ${MIN_WIDTH}). Using MIN_WIDTH instead.`);
      startingDimensions.x = MIN_WIDTH;
    }
    if (startingDimensions.y < MIN_HEIGHT) {
      // prettier-ignore
      console.warn(`Starting height of ${fileName} OsWindow is too low! (was ${startingDimensions.y}, MIN_HEIGHT is ${MIN_HEIGHT}). Using MIN_HEIGHT instead.`);
      startingDimensions.y = MIN_HEIGHT;
    }
  }
};
