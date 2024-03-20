import type { BSOD } from 'src/typings/BSOD';
import type { ErrorState } from 'src/typings/state/ErrorState';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export type Data = {
  readonly isBsod: boolean;
  readonly bsodError: string;
  readonly bsodMessage: string;
};

export type Actions = {
  readonly bluescreen: (this: void, bsod: BSOD) => void;
};

export const useErrorState = create<ErrorState>(
  combine<Data, Actions>(
    {
      ////////////////////////////////////////////////////////////////
      bsodError: '',
      bsodMessage: '',
      isBsod: false,
      ////////////////////////////////////////////////////////////////
    } as const,
    (set) => {
      return {
        ////////////////////////////////////////////////////////////////
        bluescreen: ({ error, message }: BSOD): void => {
          set(() => {
            return {
              bsodError: error,
              bsodMessage: message,
              isBsod: true,
            } as const;
          });
        },
        ////////////////////////////////////////////////////////////////
      } as const;
    },
  ),
);
