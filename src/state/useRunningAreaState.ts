import type { RunningAreaState } from 'src/typings/state/RunningAreaState';
import create from 'zustand';
import { combine } from 'zustand/middleware';

export type Data = {
  readonly isRunningAreaFull: boolean;
};

export type Actions = {
  readonly setIsRunningAreaFull: (to: boolean) => void;
};

export const useRunningAreaState = create<RunningAreaState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      isRunningAreaFull: false,
      ///////////////////////////////////////////
    } as const,
    (set) => {
      return {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setIsRunningAreaFull: (to: boolean): void => {
          set(() => {
            return { isRunningAreaFull: to } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const;
    },
  ),
);
