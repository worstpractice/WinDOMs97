import type { BSOD } from "typings/BSOD";
import type { ErrorState } from "typings/state/ErrorState";
import create from "zustand";
import { combine } from "zustand/middleware";

export type Data = {
  isBsod: boolean;
  bsodError: string;
  bsodMessage: string;
};

export type Actions = {
  bluescreen: (bsod: BSOD) => void;
};

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
