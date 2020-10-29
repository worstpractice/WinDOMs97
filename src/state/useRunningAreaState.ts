import type { RunningAreaState } from "typings/state/RunningAreaState";
import create from "zustand";
import { combine } from "zustand/middleware";

export type Data = {
  isRunningAreaFull: boolean;
};

export type Actions = {
  setIsRunningAreaFull: (to: boolean) => void;
};

export const useRunningAreaState = create<RunningAreaState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      isRunningAreaFull: false,
      ///////////////////////////////////////////
    } as const,
    (set) =>
      ({
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setIsRunningAreaFull: (to: boolean) => {
          set(() => {
            return { isRunningAreaFull: to } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const),
  ),
);
