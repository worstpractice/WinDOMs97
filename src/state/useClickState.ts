import type { Position } from "typings/Position";
import type { ClickState } from "typings/state/ClickState";
import create from "zustand";
import { combine } from "zustand/middleware";

export type Data = {
  lastClickPosition: Position;
};

export type Actions = {
  setLastClickPosition: (to: Position) => void;
};

export const useClickState = create<ClickState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      lastClickPosition: { x: 0, y: 0 },
      ///////////////////////////////////////////
    } as const,
    (set) =>
      ({
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setLastClickPosition: ({ x, y }: Position) => {
          set(() => {
            return { lastClickPosition: { x, y } } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const),
  ),
);
