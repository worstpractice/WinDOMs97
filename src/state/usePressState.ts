import type { PressState } from 'src/typings/state/PressState';
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

export const usePressState = create<PressState>(
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
