import create from "zustand";
import { combine } from "zustand/middleware";

type Data = {
  isRunningAreaFull: boolean;
};

type Actions = {
  setIsRunningAreaFull: (to: boolean) => void;
};

export type RunningAreaState = Data & Actions;

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
