import type { Position } from 'src/typings/Position';
import type { ClickState } from 'src/typings/state/ClickState';
import create from 'zustand';
import { combine } from 'zustand/middleware';

export type Data = {
  readonly lastClickPosition: Position;
};

export type Actions = {
  readonly setLastClickPosition: (to: Position) => void;
};

export const useClickState = create<ClickState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      lastClickPosition: { x: 0, y: 0 },
      ///////////////////////////////////////////
    } as const,
    (set) => {
      return {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setLastClickPosition: ({ x, y }: Position): void => {
          set(() => {
            return { lastClickPosition: { x, y } } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const;
    },
  ),
);
