import type { PressedState } from 'src/typings/state/PressedState';
import create from 'zustand';
import { combine } from 'zustand/middleware';

export type Data = {
  readonly isLmbPressed: boolean;
  readonly isRmbPressed: boolean;
};

export type Actions = {
  setIsLmbPressed: (this: void, to: boolean) => void;
  setIsRmbPressed: (this: void, to: boolean) => void;
};

export const usePressedState = create<PressedState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      isLmbPressed: false,
      isRmbPressed: false,
      ///////////////////////////////////////////
    } as const,
    (set) => {
      return {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setIsLmbPressed: (to: boolean): void => {
          set((state) => {
            // prettier-ignore
            return state.isLmbPressed === to
              ? state
              : { isLmbPressed: to } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setIsRmbPressed: (to: boolean): void => {
          set((state) => {
            // prettier-ignore
            return state.isRmbPressed === to
              ? state
              : { isRmbPressed: to } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const;
    },
  ),
);
