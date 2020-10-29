import type { BSOD } from "typings/BSOD";
import create from "zustand";
import { combine } from "zustand/middleware";

type Data = {
  isBsod: boolean;
  bsodError: string;
  bsodMessage: string;
};

type Actions = {
  bluescreen: (bsod: BSOD) => void;
};

export type ErrorState = Data & Actions;

export const useErrorState = create<ErrorState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      isBsod: false,
      bsodError: "",
      bsodMessage: "",
      ///////////////////////////////////////////
    } as const,
    (set) =>
      ({
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        bluescreen: ({ error, message }: BSOD) => {
          set(() => {
            return {
              isBsod: true,
              bsodError: error,
              bsodMessage: message,
            } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const),
  ),
);