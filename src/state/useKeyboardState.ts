import type { KeyPress } from 'typings/KeyboardCharacter';
import type { KeyboardState } from 'typings/state/KeyboardState';
import create from 'zustand';
import { combine } from 'zustand/middleware';

export type Data = {
  readonly lastKeyPress: KeyPress;
};

export type Actions = {
  readonly setLastKeyPress: (to: string) => void;
};

let ORDER_TALLY = 0;

export const useKeyboardState = create<KeyboardState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      lastKeyPress: {
        button: '' as never,
        character: '' as never,
        order: ORDER_TALLY++,
      },
      ///////////////////////////////////////////
    } as const,
    (set) => {
      return {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setLastKeyPress: (to: string): void => {
          set((): Data => {
            const isCharacter = to.length === 1;
            const isButton = !isCharacter;

            const keyPress: KeyPress = {
              button: (isButton ? to : '') as never,
              character: (isCharacter ? to : '') as never,
              order: ORDER_TALLY++,
            } as const;

            return { lastKeyPress: keyPress } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const;
    },
  ),
);
