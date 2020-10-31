import type { KeyPress } from "typings/KeyboardCharacter";
import type { KeyboardState } from "typings/state/KeyboardState";
import create from "zustand";
import { combine } from "zustand/middleware";

export type Data = {
  lastKeyPress: KeyPress;
};

export type Actions = {
  setLastKeyPress: (to: string) => void;
};

let ORDER_TALLY = 0;

export const useKeyboardState = create<KeyboardState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      lastKeyPress: { character: "" as any, button: "" as any, order: ORDER_TALLY++ },
      ///////////////////////////////////////////
    } as const,
    (set) =>
      ({
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setLastKeyPress: (to: string) => {
          set(() => {
            const isCharacter = to.length === 1;
            const isButton = !isCharacter;

            const keyPress: KeyPress = {
              button: isButton ? to : "" as any,
              character: isCharacter ? to : "" as any,
              order: ORDER_TALLY++,
            } as const;

            return { lastKeyPress: keyPress } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const),
  ),
);
