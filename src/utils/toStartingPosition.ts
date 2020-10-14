import type { SetStateAction } from "react";
import type { Position } from "typings/Position";

export const toStartingPosition: SetStateAction<Position> = (prevState) => {
  prevState.x = 0;
  prevState.y = 0;
  return prevState;
};