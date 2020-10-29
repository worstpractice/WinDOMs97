import type { Position } from "typings/Position";
import create from "zustand";
import { combine } from "zustand/middleware";

type Data = {
  lastClickPosition: Position;
};

type Actions = {
  setLastClickPosition: (to: Position) => void;
};

export type ClickState = Data & Actions;

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
