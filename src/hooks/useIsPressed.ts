import { useEffect, useState } from 'react';
import { usePressedState } from 'src/state/usePressedState';
import type { PressedState } from 'src/typings/state/PressedState';
import { toFalse } from 'src/utils/setters/toFalse';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromPressed = from<PressedState>().select('isLmbPressed');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** NOTE: works like a normal `useState(boolean)`, except it also detects global `onmouseup` events (setting `isPressed` to `false` in such cases). */
export const useIsPressed = (initialState: boolean = false) => {
  const { isLmbPressed } = usePressedState(fromPressed);
  const [isPressed, setIsPressed] = useState(initialState);

  useEffect(() => {
    let isCancelled = false;

    const effect = (): void => {
      if (isCancelled) return;

      if (!isLmbPressed && isPressed) {
        setIsPressed(toFalse);
      }
    };

    effect();

    return () => {
      isCancelled = true;
    };
  }, [isLmbPressed, isPressed]);

  return [isPressed, setIsPressed] as const;
};
