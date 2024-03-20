import { useEffect, useState } from 'react';
import { usePressedState } from 'src/state/usePressedState';
import type { PressedState } from 'src/typings/state/PressedState';
import { toFalse } from 'src/utils/setters/toFalse';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromLmb = from<PressedState>().select('isLmbPressed');
////////////////////////////////////////////////////////////////

/** NOTE: works like a normal `useState(boolean)`, except it also detects global `onmouseup` events (setting `isPressed` to `false` in such cases). */
export const useIsPressed = (initialState: boolean = false) => {
  const { isLmbPressed } = usePressedState(fromLmb);
  const [isPressed, setIsPressed] = useState(initialState);

  useEffect(() => {
    if (!isLmbPressed && isPressed) {
      setIsPressed(toFalse);
    }
  }, [isLmbPressed, isPressed]);

  return [isPressed, setIsPressed] as const;
};
